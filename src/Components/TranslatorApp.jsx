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
  const maxChars = 500
  const dropdownRef = useRef(null)

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowLanguages(false)
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
  }

  const handleLanguagesSelect = (languageCode) => {
    if (currentLanguageSelection === 'from') {
      setSelectedLanguageFrom(languageCode)
    } else {
      setSelectedLanguageTo(languageCode)
    }
    setShowLanguages(false)
    setError('') // Clear any previous errors
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
    // MyMemory API uses different format for some languages
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
      
      // First try with MyMemory API
      const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        inputText.trim()
      )}&langpair=${fromLang}|${toLang}`

      console.log('Translation request:', { fromLang, toLang, text: inputText.trim() })

      const response = await fetch(myMemoryUrl)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      console.log('Translation response:', data)
      
      if (data.responseStatus === 200 && data.responseData) {
        const translation = data.responseData.translatedText
        
        // Check if translation is valid (not just returning the same text)
        if (translation && translation.toLowerCase() !== inputText.toLowerCase()) {
          setTranslatedText(translation)
        } else {
          // Fallback: Try with LibreTranslate API if available
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
      // Alternative translation service (you can add more fallbacks here)
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
    
    // If all else fails, show a helpful message
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
      // You could add a toast notification here
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

  return (
    <div className="w-full h-full flex flex-col animate-slide-up">
      {/* Clean Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700/30">
        <h2 className="text-lg font-semibold text-white">Translator</h2>
        <button 
          className="w-8 h-8 rounded-full hover:bg-gray-700/50 flex items-center justify-center transition-colors duration-150"
          onClick={onClose}
        >
          <i className="fas fa-times text-gray-400"></i>
        </button>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-4">
        {/* Language Selector */}
        <div className="glass-effect rounded-xl p-4 flex items-center justify-between">
          <button 
            className="language flex-1 text-left"
            onClick={() => handleLanguageClick('from')}
          >
            <div className="text-xs text-gray-500 mb-1">From</div>
            <div className="text-emerald-400 font-medium">
              {languages[selectedLanguageFrom] || 'English'}
            </div>
          </button>
          
          <button
            className="mx-4 w-10 h-10 rounded-full hover:bg-gray-700/50 flex items-center justify-center transition-colors duration-150"
            onClick={handleSwapLanguages}
          >
            <i className="fas fa-exchange-alt text-gray-400"></i>
          </button>
          
          <button 
            className="language flex-1 text-right"
            onClick={() => handleLanguageClick('to')}
          >
            <div className="text-xs text-gray-500 mb-1">To</div>
            <div className="text-emerald-400 font-medium">
              {languages[selectedLanguageTo] || 'Spanish'}
            </div>
          </button>
        </div>

        {/* Language Dropdown */}
        {showLanguages && (
          <div
            className="absolute inset-4 top-32 bg-gray-800/95 backdrop-blur-sm rounded-xl border border-gray-600/30 z-20 flex flex-col animate-fade-in"
            ref={dropdownRef}
          >
            <div className="p-4 border-b border-gray-600/30">
              <h3 className="text-white font-medium">
                Select {currentLanguageSelection === 'from' ? 'source' : 'target'} language
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide p-2">
              {Object.entries(languages).map(([code, name]) => (
                <button
                  className="w-full text-left px-3 py-2 text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 rounded-lg transition-colors duration-150"
                  key={code}
                  onClick={() => handleLanguagesSelect(code)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Input/Output Section */}
        <div className="flex-1 flex flex-col space-y-4">
          <div className="relative">
            <textarea
              className="textarea"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter text to translate..."
            />
            <div className="absolute bottom-3 right-3 flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                {charCount}/{maxChars}
              </span>
              {inputText && (
                <button
                  className="text-gray-500 hover:text-gray-400 transition-colors duration-150"
                  onClick={clearText}
                >
                  <i className="fas fa-times text-sm"></i>
                </button>
              )}
            </div>
          </div>

          {/* Translate Button */}
          <div className="flex justify-center">
            <button
              className="btn-icon"
              onClick={handleTranslate}
              disabled={!inputText.trim() || isTranslating}
            >
              {isTranslating ? (
                <i className="fas fa-spinner animate-spin"></i>
              ) : (
                <i className="fas fa-arrow-down"></i>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="relative">
            <textarea
              className="textarea text-emerald-400"
              value={translatedText}
              placeholder="Translation will appear here..."
              readOnly
            />
            {translatedText && !error && (
              <button
                className="absolute bottom-3 right-3 text-gray-500 hover:text-emerald-400 transition-colors duration-150"
                onClick={() => copyToClipboard(translatedText)}
                title="Copy translation"
              >
                <i className="fas fa-copy"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TranslatorApp