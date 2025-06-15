const TranslatorStart = ({ onStart }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-6 sm:p-8 relative">
      {/* Minimal Background Accent */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>
      
      {/* Main Content */}
      <div className="text-center space-y-8 max-w-md">
        {/* Simplified Logo */}
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
          <i className="fas fa-language text-2xl text-white"></i>
        </div>

        {/* Clean Typography */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Universal Translator
          </h1>
          <p className="text-gray-400 text-base">
            Instant translation for 100+ languages
          </p>
        </div>

        {/* Minimal Language Preview */}
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>Hello</span>
            <i className="fas fa-arrow-right text-emerald-500"></i>
            <span>こんにちは</span>
          </div>
        </div>

        {/* Simple CTA */}
        <button
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200"
          onClick={onStart}
        >
          Start Translating
        </button>
      </div>
    </div>
  )
}

export default TranslatorStart