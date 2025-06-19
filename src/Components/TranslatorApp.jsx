import { languages } from '../languagesData'
import { useState, useRef, useEffect } from 'react'

const TranslatorApp = ({ onClose }) => {
  const [selectedLanguageFrom, setSelectedLanguageFrom] = useState('en-GB')
  const [selectedLanguageTo, setSelectedLanguageTo] = useState('es-ES')
  const [showLanguages, setShowLanguages] = useState(false)
  const [currentLanguageSelection, setCurrentLanguageSelection] = useState(null)
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const maxChars = 500
  const dropdownRef = useRef(null)

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowLanguages(false)
      setSearchTerm('')
    }
  }

  useEffect(() => {
    if (showLanguages) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showLanguages])

  const handleLanguageClick = (type) => {
    setCurrentLanguageSelection(type)
    setShowLanguages(true)
    setSearchTerm('')
  }

  const handleLanguagesSelect = (languageCode) => {
    if (currentLanguageSelection === 'from') {
      setSelectedLanguageFrom(languageCode)
    } else {
      setSelectedLanguageTo(languageCode)
    }
    setShowLanguages(false)
    setSearchTerm('')
    setError('')
  }

  const handleSwapLanguages = () => {
    const temp = selectedLanguageFrom
    setSelectedLanguageFrom(selectedLanguageTo)
    setSelectedLanguageTo(temp)
    
    const tempText = inputText
    setInputText(translatedText)
    setTranslatedText(tempText)
    setCharCount(translatedText.length)
    setError('')
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    if (value.length <= maxChars) {
      setInputText(value)
      setCharCount(value.length)
      setError('')
      
      if (translatedText) {
        setTranslatedText('')
      }
    }
  }

  // Convert language codes to MyMemory API format
  const convertLanguageCode = (code) => {
    const languageMap = {
      'en-GB': 'en',
      'es-ES': 'es',
      'fr-FR': 'fr',
      'de-DE': 'de',
      'it-IT': 'it',
      'pt-PT': 'pt',
      'ru-RU': 'ru',
      'ja-JP': 'ja',
      'ko-KR': 'ko',
      'zh-CN': 'zh',
      'ar-SA': 'ar',
      'hi-IN': 'hi',
      'bn-IN': 'bn',
      'ur-PK': 'ur',
      'fa-IR': 'fa',
      'tr-TR': 'tr',
      'pl-PL': 'pl',
      'nl-NL': 'nl',
      'sv-SE': 'sv',
      'da-DK': 'da',
      'no-NO': 'no',
      'fi-FI': 'fi',
      'hu-HU': 'hu',
      'cs-CZ': 'cs',
      'sk-SK': 'sk',
      'ro-RO': 'ro',
      'bg-BG': 'bg',
      'hr-HR': 'hr',
      'sr-RS': 'sr',
      'sl-SI': 'sl',
      'et-EE': 'et',
      'lv-LV': 'lv',
      'lt-LT': 'lt',
      'uk-UA': 'uk',
      'be-BY': 'be',
      'el-GR': 'el',
      'he-IL': 'he',
      'th-TH': 'th',
      'vi-VN': 'vi',
      'id-ID': 'id',
      'ms-MY': 'ms',
      'tl-PH': 'tl',
      'sw-SZ': 'sw',
      'am-ET': 'am',
      'zu-ZA': 'zu',
      'xh-ZA': 'xh',
      'af-ZA': 'af',
      'sq-AL': 'sq',
      'eu-ES': 'eu',
      'ca-ES': 'ca',
      'gl-ES': 'gl',
      'cy-GB': 'cy',
      'ga-IE': 'ga',
      'mt-MT': 'mt',
      'is-IS': 'is',
      'fo-FO': 'fo',
      'kk-KZ': 'kk',
      'ky-KG': 'ky',
      'uz-UZ': 'uz',
      'tg-TJ': 'tg',
      'mn-MN': 'mn',
      'ka-GE': 'ka',
      'hy-AM': 'hy',
      'az-AZ': 'az',
      'ne-NP': 'ne',
      'si-LK': 'si',
      'my-MM': 'my',
      'km-KH': 'km',
      'lo-LA': 'lo',
      'dz-BT': 'dz',
      'bo-CN': 'bo',
      'gu-IN': 'gu',
      'pa-IN': 'pa',
      'te-IN': 'te',
      'kn-IN': 'kn',
      'ml-IN': 'ml',
      'ta-LK': 'ta',
      'or-IN': 'or',
      'as-IN': 'as',
      'mr-IN': 'mr'
    }
    
    return languageMap[code] || code.split('-')[0]
  }

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setTranslatedText('')
      return
    }

    setIsTranslating(true)
    setError('')
    
    try {
      const fromLang = convertLanguageCode(selectedLanguageFrom)
      const toLang = convertLanguageCode(selectedLanguageTo)
      
      const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        inputText.trim()
      )}&langpair=${fromLang}|${toLang}`

      const response = await fetch(myMemoryUrl)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.responseStatus === 200 && data.responseData) {
        const translation = data.responseData.translatedText
        
        if (translation && translation.toLowerCase() !== inputText.toLowerCase()) {
          setTranslatedText(translation)
        } else {
          await tryLibreTranslate(fromLang, toLang, inputText.trim())
        }
      } else {
        throw new Error(data.responseDetails || 'Translation failed')
      }
    } catch (error) {
      console.error('Translation error:', error)
      setError('Translation failed. Please try again or check your internet connection.')
      setTranslatedText('')
    } finally {
      setIsTranslating(false)
    }
  }

  const tryLibreTranslate = async (fromLang, toLang, text) => {
    try {
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        body: JSON.stringify({
          q: text,
          source: fromLang,
          target: toLang,
          format: 'text'
        }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.translatedText) {
          setTranslatedText(data.translatedText)
          return
        }
      }
    } catch (error) {
      console.error('LibreTranslate fallback failed:', error)
    }
    
    setTranslatedText(`Translation unavailable for ${languages[selectedLanguageFrom]} → ${languages[selectedLanguageTo]}. Please try a different language pair.`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleTranslate()
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const clearText = () => {
    setInputText('')
    setTranslatedText('')
    setCharCount(0)
    setError('')
  }

  // Filter languages based on search term
  const filteredLanguages = Object.entries(languages).filter(([code, name]) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full h-full flex flex-col animate-slide-up">
      {/* Enhanced Header */}
      <div className="glass-effect border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-language text-white text-sm"></i>
            </div>
            <h2 className="text-xl font-bold gradient-text-primary">Translator</h2>
          </div>
          <button 
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-all duration-200 group"
            onClick={onClose}
          >
            <i className="fas fa-times text-gray-400 group-hover:text-white transition-colors"></i>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-6">
        {/* Enhanced Language Selector */}
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <button 
              className="language flex-1 text-left group"
              onClick={() => handleLanguageClick('from')}
            >
              <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">From</div>
              <div className="gradient-text-primary font-semibold text-lg flex items-center justify-between">
                {languages[selectedLanguageFrom] || 'English'}
                <i className="fas fa-chevron-down text-sm opacity-50 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </button>
            
            <button
              className="btn-swap mx-6"
              onClick={handleSwapLanguages}
            >
              <i className="fas fa-exchange-alt text-gray-300"></i>
            </button>
            
            <button 
              className="language flex-1 text-right group"
              onClick={() => handleLanguageClick('to')}
            >
              <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">To</div>
              <div className="gradient-text-primary font-semibold text-lg flex items-center justify-between">
                <i className="fas fa-chevron-down text-sm opacity-50 group-hover:opacity-100 transition-opacity"></i>
                {languages[selectedLanguageTo] || 'Spanish'}
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Language Dropdown */}
        {showLanguages && (
          <div
            className="absolute inset-4 top-32 glass-card rounded-2xl z-20 flex flex-col animate-fade-in overflow-hidden"
            ref={dropdownRef}
          >
            <div className="p-5 border-b border-white/10">
              <h3 className="text-white font-semibold text-lg mb-3">
                Select {currentLanguageSelection === 'from' ? 'source' : 'target'} language
              </h3>
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-emerald-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map(([code, name]) => (
                  <button
                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 rounded-xl transition-all duration-200 flex items-center justify-between group"
                    key={code}
                    onClick={() => handleLanguagesSelect(code)}
                  >
                    <span className="font-medium">{name}</span>
                    <i className="fas fa-check text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <i className="fas fa-search text-2xl mb-2"></i>
                  <p>No languages found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Error/Success Messages */}
        {error && (
          <div className="status-error rounded-xl p-4 animate-fade-in">
            <div className="flex items-center space-x-3">
              <i className="fas fa-exclamation-triangle"></i>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {copySuccess && (
          <div className="status-success rounded-xl p-4 animate-fade-in">
            <div className="flex items-center space-x-3">
              <i className="fas fa-check-circle"></i>
              <p className="font-medium">Text copied to clipboard!</p>
            </div>
          </div>
        )}

        {/* Enhanced Input/Output Section */}
        <div className="flex-1 flex flex-col space-y-6">
          <div className="relative">
            <textarea
              className="textarea"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter text to translate..."
            />
            <div className="absolute bottom-4 right-4 flex items-center space-x-3">
              <span className={`text-xs font-medium ${charCount > maxChars * 0.8 ? 'text-yellow-400' : 'text-gray-500'}`}>
                {charCount}/{maxChars}
              </span>
              {inputText && (
                <button
                  className="text-gray-500 hover:text-red-400 transition-colors duration-200 p-1"
                  onClick={clearText}
                  title="Clear text"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>

          {/* Enhanced Translate Button */}
          <div className="flex justify-center">
            <button
              className="btn-icon"
              onClick={handleTranslate}
              disabled={!inputText.trim() || isTranslating}
            >
              {isTranslating ? (
                <i className="fas fa-spinner animate-spin text-lg"></i>
              ) : (
                <i className="fas fa-arrow-down text-lg"></i>
              )}
            </button>
          </div>

          {/* Enhanced Output Section */}
          <div className="relative">
            <textarea
              className={`textarea ${isTranslating ? 'loading-shimmer' : ''} ${translatedText ? 'text-emerald-300' : ''}`}
              value={translatedText}
              placeholder={isTranslating ? "Translating..." : "Translation will appear here..."}
              readOnly
            />
            {translatedText && !error && (
              <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                <button
                  className="text-gray-500 hover:text-emerald-400 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                  onClick={() => copyToClipboard(translatedText)}
                  title="Copy translation"
                >
                  <i className="fas fa-copy"></i>
                </button>
                <button
                  className="text-gray-500 hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(translatedText)
                    utterance.lang = selectedLanguageTo
                    speechSynthesis.speak(utterance)
                  }}
                  title="Listen to translation"
                >
                  <i className="fas fa-volume-up"></i>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Translation Stats */}
        {translatedText && !error && (
          <div className="glass-effect rounded-xl p-4 flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <i className="fas fa-clock text-xs"></i>
                <span>Instant</span>
              </span>
              <span className="flex items-center space-x-1">
                <i className="fas fa-language text-xs"></i>
                <span>{languages[selectedLanguageFrom]} → {languages[selectedLanguageTo]}</span>
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <i className="fas fa-check-circle text-emerald-400 text-xs"></i>
              <span>Translated</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TranslatorApp