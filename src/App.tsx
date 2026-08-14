import Hero from './components/Hero'
import About from './components/About'
import Sourcing from './components/Sourcing'
import Standards from './components/Standards'
import Range from './components/Range'
import WhereWeSell from './components/WhereWeSell'
import Trade from './components/Trade'
import SiteFooter from './components/SiteFooter'

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-bisque focus:px-4 focus:py-2 focus:text-basalt"
      >
        Skip to content
      </a>
      <Hero />
      <About />
      <Sourcing />
      <Standards />
      <Range />
      <WhereWeSell />
      <Trade />
      <SiteFooter />
    </>
  )
}
