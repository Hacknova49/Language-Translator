const TranslatorStart = ({ onStart }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex-1 flex flex-col justify-center items-center space-y-8">
        {/* Logo/Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
          <i className="fas fa-language text-3xl text-white"></i>
        </div>

        {/* Welcome Text */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Universal
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {' '}Translator
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xs">
            Break language barriers with instant, accurate translations
          </p>
        </div>

        {/* Language Examples */}
        <div className="w-full max-w-sm space-y-3">
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-shojumaru text-emerald-400 mb-1">Hello</div>
            <div className="text-sm text-gray-400">English</div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl text-emerald-400 mb-1">გამარჯობა</div>
            <div className="text-sm text-gray-400">Georgian</div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-notoSansJp text-emerald-400 mb-1">こんにちは</div>
            <div className="text-sm text-gray-400">Japanese</div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="flex justify-center pt-8">
        <button
          className="btn-primary text-lg px-12 py-4 rounded-2xl font-semibold tracking-wide"
          onClick={onStart}
        >
          Get Started
          <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  )
}

export default TranslatorStart