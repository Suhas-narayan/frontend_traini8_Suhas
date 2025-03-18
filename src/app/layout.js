import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Traini8 Training Center Registry',
  description: 'MVP for Govt funded Training Centers Registry',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-indigo-600 text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">Traini8 Registry</Link>
            <nav>
              <ul className="flex space-x-6">
                <li><Link href="/training-centers">Training Centers</Link> 
                </li>
                <li><Link href="/view-all-centers">View All Centers</Link> 
                </li>
                <li><Link href="/create-center">Create Center</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="container mx-auto py-8 px-4">
          {children}
        </main>
        <footer className="bg-gray-100 border-t border-gray-200 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Traini8. All rights reserved.
        </footer>
      </body>
    </html>
  )
}