import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'src/content/articles');

export interface ArticleData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  content: string;
  readingTime: string;
  lastVerified?: string;
}

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// A simple custom frontmatter parser since we can't install gray-matter
function parseFrontmatter(fileContent: string): { data: Record<string, string>, content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const frontmatterString = match[1];
  const content = match[2];
  const data: Record<string, string> = {};

  frontmatterString.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, ''); // remove surrounding quotes
      data[key] = value;
    }
  });

  return { data, content };
}

// A very simple markdown to HTML parser for MVP purposes
// For production, a robust library like marked or remark/rehype should be used.
export function simpleMarkdownToHtml(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');

  // Lists (simple)
  html = html.replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>');
  html = html.replace(/<\/ul>\n<ul>/gim, ''); // group lists

  // Paragraphs (wrap lines that aren't tags)
  html = html.split('\n').map(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('<')) return line;
    return `<p>${trimmed}</p>`;
  }).join('\n');

  return html;
}

export function getArticleSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory);
}

export function getArticleBySlug(slug: string): ArticleData | null {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = parseFrontmatter(fileContents);

  return {
    slug: realSlug,
    title: data.title || 'Untitled',
    excerpt: data.excerpt || '',
    category: data.category || 'General',
    date: data.date || '',
    lastVerified: data.lastVerified || '',
    readingTime: calculateReadingTime(content),
    content: simpleMarkdownToHtml(content),
  };
}

export function getAllArticles(): ArticleData[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is ArticleData => article !== null)
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
  return articles;
}
