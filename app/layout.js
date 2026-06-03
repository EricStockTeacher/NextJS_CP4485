import "./globals.css";
import Link from "next/link"


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <nav className="w-full bg-white shadow flex justify-center gap-8 py-4">
        <Link href={"/"} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
        <Link href={"/play"} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">Play</Link>
        <Link href={"/contact"} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
      </nav>
      <main className="flex-1 flex flex-col items-center px-4 py-10 w-full max-w-2xl mx-auto">
        {children}
      </main>
    </body>
    </html>
  );
}
