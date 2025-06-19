import { useState, useEffect } from 'react'
import TranslatorStart from './Components/TranslatorStart'
import TranslatorApp from './Components/TranslatorApp'

const App = () => {
  const [showTranslatorApp, setShowTranslatorApp] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Add a small delay for smooth initial animation
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/40 to-slate-900"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-teal-600/10 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex justify-center items-center p-4">
        <div className={`w-full max-w-md lg:max-w-lg h-[90vh] max-h-[800px] glass-card rounded-3xl overflow-hidden transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {showTranslatorApp ? (
            <TranslatorApp onClose={() => setShowTranslatorApp(false)} />
          ) : (
            <TranslatorStart onStart={() => setShowTranslatorApp(true)} />
          )}
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-6 right-6 flex flex-col space-y-3 z-20">
        <button className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 group">
          <i className="fas fa-question text-sm group-hover:scale-110 transition-transform"></i>
        </button>
        <button className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 group">
          <i className="fas fa-cog text-sm group-hover:rotate-90 transition-transform duration-300"></i>
        </button>
      </div>
    </div>
  )
}

export default App