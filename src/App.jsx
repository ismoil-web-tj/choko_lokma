import Footer from './components/Footer.jsx';
import ConfectioneryHeader from './components/header.jsx'
import Hero from './components/hero.jsx';
import { useLanguage } from './context/LanguageContext.jsx'

function App() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      {/* Шапка сайта */}
      <ConfectioneryHeader />
      <Hero/>
      <Footer/>
    </div>
  )
}

export default App