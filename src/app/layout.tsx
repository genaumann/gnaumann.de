import Header from '@/components/layout/head/Header'
import '../styles/globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {config} from '@fortawesome/fontawesome-svg-core'
import Footer from '@/components/layout/foot/Footer'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'GNaumann · Home',
  description: 'Gino Naumann - Linux Administrator 🐧'
}

const RootLayout = ({children}: {children: React.ReactNode}) => {
  config.autoAddCss = false
  return (
    <html lang="de" className="bg-body">
      <body
        className={`${inter.className} antialiased text-black from-body bg-gradient-to-b to-gray-100`}>
        <Header />
        <div className="mb-4 mx-4 md:mx-7 lg:mx-10">{children}</div>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
