import "./globals.css";
import Link from "next/link"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export default async function RootLayout({ children }) {
  async function logout() {
    'use server'
    const cookieStore = await cookies()
    cookieStore.delete('session')
    redirect('/login')
  }

  const cookieStore = await cookies()
  const session = cookieStore.get('session')

  return (
    <html
      lang="en"
    >
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <nav className="w-full bg-white shadow flex justify-center gap-8 py-4">
        <Link href={"/"} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
        <Link href={"/play"} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">Play</Link>
        <Link href={"/contact"} className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
        {session && <form action ={logout}>
          <button type="submit" className="font-semibold text-gray-700 hover:text-blue-600 transition-colors">Logout</button>
        </form>}
      </nav>
      
      <main className="flex-1 flex flex-col items-center px-4 py-10 w-full max-w-2xl mx-auto">
        {children}
      </main>
    </body>
    </html>
  );
}
