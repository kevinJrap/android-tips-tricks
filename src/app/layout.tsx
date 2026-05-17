import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Android Toolbox | Practical Android Tips",
  description: "Practical Android Tips That Actually Make Your Phone Better. Battery saving, performance boosts, hidden features, and brand-specific guides.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-gray-950 text-gray-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-200`}
      >
        <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="font-bold text-xl tracking-tight text-emerald-400">
              AndroidToolbox
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search tips..." 
                  className="bg-gray-900 border border-gray-800 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors w-64 text-gray-300 placeholder:text-gray-600"
                />
                <svg className="absolute right-3 top-1.5 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <button className="md:hidden text-gray-400 hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-gray-900 bg-black mt-auto">
          <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} AndroidToolbox. Practical guides for everyday users.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-emerald-400 transition-colors">About</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
