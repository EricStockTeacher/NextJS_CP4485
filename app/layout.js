import "./globals.css";
import Link from "next/link"


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
    
    <body className="min-h-full flex flex-col">
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/play"}>Play</Link>
    </nav>
    {children}

    </body>
    </html>
  );
}
