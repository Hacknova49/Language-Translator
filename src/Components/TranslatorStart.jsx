import { useState, useEffect } from 'react'

const TranslatorStart = ({ onStart }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 4 + 6,
      color: ['#10b981', '#06d6a0', '#667eea', '#764ba2'][Math.floor(Math.random() * 4)]
    }))
    setParticles(newParticles)
  }, [])

  const languageExamples = [
    { from: 'Hello', to: 'こんにちは', lang: 'Japanese' },
    { from: 'Bonjour', to: 'مرحبا', lang: 'Arabic' },
    { from: 'Hola', to: 'Привет', lang: 'Russian' },
    { from: 'Guten Tag', to: '你好', lang: 'Chinese' }
  ]

  const [currentExample, setCurrentExample] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % languageExamples.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-6 sm:p-8 relative overflow-hidden">
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}

      {/* Enhanced Background Accents */}
      <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-2xl animate-float"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="text-center space-y-10 max-w-md z-10 animate-bounce-in">
        {/* Enhanced Logo */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl animate-glow">
            <i className="fas fa-language text-3xl text-white"></i>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
        </div>

        {/* Enhanced Typography */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            <span className="gradient-text-primary">Universal</span>
            <br />
            <span className="gradient-text">Translator</span>
          </h1>
          <p className="text-gray-300 text-lg font-medium">
            Break language barriers with
            <span className="gradient-text-accent"> AI-powered </span>
            translation
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>100+ Languages</span>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <span>Instant Results</span>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <span>Free Forever</span>
          </div>
        </div>

        {/* Dynamic Language Preview */}
        <div className="glass-effect rounded-2xl p-6 space-y-4">
          <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Live Translation Preview
          </div>
          <div className="flex items-center justify-center space-x-4 text-lg">
            <span className="text-white font-medium animate-fade-in" key={`from-${currentExample}`}>
              {languageExamples[currentExample].from}
            </span>
            <div className="relative">
              <i className="fas fa-arrow-right text-emerald-400 text-xl animate-pulse"></i>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
            <span className="gradient-text-primary font-medium animate-fade-in" key={`to-${currentExample}`}>
              {languageExamples[currentExample].to}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Translating to {languageExamples[currentExample].lang}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-bolt text-blue-400"></i>
            </div>
            <div className="text-xs text-gray-400">Lightning Fast</div>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-shield-alt text-green-400"></i>
            </div>
            <div className="text-xs text-gray-400">Secure & Private</div>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl flex items-center justify-center">
              <i className="fas fa-magic text-purple-400"></i>
            </div>
            <div className="text-xs text-gray-400">AI Powered</div>
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="space-y-4">
          <button
            className="btn-primary w-full relative group"
            onClick={onStart}
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <i className="fas fa-rocket"></i>
              <span>Start Translating Now</span>
            </span>
          </button>
          <p className="text-xs text-gray-500">
            No registration required • Completely free
          </p>
        </div>
      </div>
    </div>
  )
}

export default TranslatorStart