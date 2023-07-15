import About from '@/components/modules/home/About'
import Certs from '@/components/modules/home/Certs'
import Experience from '@/components/modules/home/Experience'
import Hero from '@/components/modules/home/Hero'
import '@/styles/highlight.css'

export default function Home() {
  return (
    <>
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="certs">
        <Certs />
      </div>
      <div id="experience">
        <Experience />
      </div>
    </>
  )
}
