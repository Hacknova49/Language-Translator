const TranslatorStart = ({ onStart }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 animate-fade-in relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header Section */}
      <div className="flex-1 flex flex-col justify-center items-center space-y-8 relative z-10">
        {/* Enhanced Logo */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-300">
            <div className="absolute inset-2 bg-white/10 rounded-2xl backdrop-blur-sm"></div>
            <div className="relative flex items-center justify-center">
              <i className="fas fa-globe text-3xl sm:text-4xl text-white drop-shadow-lg"></i>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Welcome Text */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="inline-block animate-fade-in-up">Universal</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x inline-block animate-fade-in-up delay-200">
                Translator
              </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full animate-fade-in-up delay-400"></div>
          </div>
          
          <p className="text-gray-300 text-base sm:text-lg max-w-md leading-relaxed animate-fade-in-up delay-600">
            Break language barriers with instant, accurate translations powered by AI
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 animate-fade-in-up delay-800">
            <div className="glass-effect px-4 py-2 rounded-full text-sm text-emerald-400 border border-emerald-400/30">
              <i className="fas fa-bolt mr-2"></i>Instant
            </div>
            <div className="glass-effect px-4 py-2 rounded-full text-sm text-teal-400 border border-teal-400/30">
              <i className="fas fa-shield-alt mr-2"></i>Secure
            </div>
            <div className="glass-effect px-4 py-2 rounded-full text-sm text-cyan-400 border border-cyan-400/30">
              <i className="fas fa-language mr-2"></i>100+ Languages
            </div>
          </div>
        </div>

        {/* Enhanced Language Examples */}
        <div className="w-full max-w-sm space-y-4 animate-fade-in-up delay-1000">
          <div className="text-center mb-4">
            <h3 className="text-gray-400 text-sm font-medium">Try translating between</h3>
          </div>
          
          <div className="space-y-3">
            <div className="glass-effect rounded-2xl p-5 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-white/10 hover:border-emerald-400/30 group">
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                Hello
              </div>
              <div className="text-sm text-gray-400 flex items-center justify-center">
                <span className="w-4 h-3 bg-red-500 mr-2 rounded-sm"></span>
                <span className="w-4 h-3 bg-white mr-2 rounded-sm"></span>
                <span className="w-4 h-3 bg-blue-500 mr-2 rounded-sm"></span>
                English
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center animate-bounce">
                <i className="fas fa-arrow-down text-white text-sm"></i>
              </div>
            </div>
            
            <div className="glass-effect rounded-2xl p-5 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-white/10 hover:border-teal-400/30 group">
              <div className="text-3xl sm:text-4xl text-teal-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                こんにちは
              </div>
              <div className="text-sm text-gray-400 flex items-center justify-center">
                <span className="w-4 h-3 bg-white mr-2 rounded-sm"></span>
                <span className="w-4 h-3 bg-red-500 mr-2 rounded-sm"></span>
                Japanese
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Start Button */}
      <div className="flex justify-center pt-8 relative z-10 animate-fade-in-up delay-1200">
        <button
          className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
          onClick={onStart}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center space-x-3">
            <span className="tracking-wide">Start Translating</span>
            <i className="fas fa-rocket text-xl group-hover:translate-x-1 transition-transform duration-300"></i>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/50 to-teal-400/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </button>
      </div>
    </div>
  )
}

export default TranslatorStart