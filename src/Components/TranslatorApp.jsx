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
  }

  const handleSwapLanguages = () => {
    const temp = selectedLanguageFrom
    setSelectedLanguageFrom(selectedLanguageTo)
    setSelectedLanguageTo(temp)
    
    // Also swap the text content
    const tempText = inputText
    setInputText(translatedText)
    setTranslatedText(tempText)
    setCharCount(translatedText.length)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    if (value.length <= maxChars) {
      setInputText(value)
      setCharCount(value.length)
      
      // Clear translated text when input changes
      if (translatedText) {
        setTranslatedText('')
      }
    }
  }

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setTranslatedText('')
      return
    }

    setIsTranslating(true)
    
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          inputText,
        )}&langpair=${selectedLanguageFrom}|${selectedLanguageTo}`,
      )

      const data = await response.json()
      setTranslatedText(data.responseData.translatedText)
    } catch (error) {
      console.error('Translation error:', error)
      setTranslatedText('Translation failed. Please try again.')
    } finally {
      setIsTranslating(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleTranslate()
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const clearText = () => {
    setInputText('')
    setTranslatedText('')
    setCharCount(0)
  }

  return (
    <div className="w-full h-full flex flex-col animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
        <h2 className="text-lg font-semibold text-white">Translator</h2>
        <button 
          className="w-8 h-8 rounded-full bg-gray-700/50 hover:bg-gray-600/50 flex items-center justify-center transition-colors"
          onClick={onClose}
        >
          <i className="fas fa-times text-gray-300"></i>
        </button>
      </div>

      <div className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden">
        {/* Language Selector */}
        <div className="glass-effect rounded-xl p-4 flex items-center justify-between">
          <button 
            className="language flex-1 text-left"
            onClick={() => handleLanguageClick('from')}
          >
            <div className="text-xs text-gray-400 mb-1">From</div>
            <div className="text-emerald-400 font-medium">
              {languages[selectedLanguageFrom] || 'English'}
            </div>
          </button>
          
          <button
            className="mx-4 w-10 h-10 rounded-full bg-gray-700/50 hover:bg-gray-600/50 flex items-center justify-center transition-all duration-200 hover:rotate-180"
            onClick={handleSwapLanguages}
          >
            <i className="fas fa-exchange-alt text-gray-300"></i>
          </button>
          
          <button 
            className="language flex-1 text-right"
            onClick={() => handleLanguageClick('to')}
          >
            <div className="text-xs text-gray-400 mb-1">To</div>
            <div className="text-emerald-400 font-medium">
              {languages[selectedLanguageTo] || 'Spanish'}
            </div>
          </button>
        </div>

        {/* Language Dropdown */}
        {showLanguages && (
          <div
            className="absolute inset-4 top-32 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-600/50 z-20 flex flex-col animate-fade-in"
            ref={dropdownRef}
          >
            <div className="p-4 border-b border-gray-600/50">
              <h3 className="text-white font-medium">
                Select {currentLanguageSelection === 'from' ? 'source' : 'target'} language
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide p-2">
              {Object.entries(languages).map(([code, name]) => (
                <button
                  className="w-full text-left px-3 py-2 text-gray-300 hover:bg-emerald-500/20 hover:text-emerald-400 rounded-lg transition-colors"
                  key={code}
                  onClick={() => handleLanguagesSelect(code)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Section */}
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
              <span className="text-xs text-gray-400">
                {charCount}/{maxChars}
              </span>
              {inputText && (
                <button
                  className="text-gray-400 hover:text-gray-300 transition-colors"
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
            {translatedText && (
              <button
                className="absolute bottom-3 right-3 text-gray-400 hover:text-emerald-400 transition-colors"
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