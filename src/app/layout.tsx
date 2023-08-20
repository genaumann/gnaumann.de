import Header from '@/components/layout/head/Header'
import '../styles/globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Footer from '@/components/layout/foot/Footer'
import ReduxProvider from '@/redux/Provider'
import {dynamicMetadata} from '@/utils/metadata'

const inter = Inter({subsets: ['latin'], preload: true})

const title = 'GNaumann · Home'
const description = 'Gino Naumann - Linux Administrator 🐧'

export const metadata: Metadata = dynamicMetadata(title, description, '/', true)

const RootLayout = ({children}: {children: React.ReactNode}) => {
  config.autoAddCss = false
  return (
    <html lang="de" className="bg-body">
      <body
        className={`${inter.className} antialiased text-black from-body bg-gradient-to-b to-gray-100`}>
        <ReduxProvider>
          <Header />
          <div className="mb-4 mx-4 md:mx-7 lg:mx-10">{children}</div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}

export default RootLayout
