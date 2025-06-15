import { languages } from '../languagesData'
import { useState, useRef, useEffect } from 'react'

const TranslatorApp = ({ onClose }) => {
  const [selectedLanguageFrom, setSelectedLanguageFrom] = useState('en')
  const [selectedLanguageTo, setSelectedLanguageTo] = useState('en')
  const [showLanguages, setShowLanguages] = useState(false)
  const [currentLanguageSelection, setCurrentLanguageSelection] = useState(null)
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [charCount, setCharCount] = useState(0)
  const maxChars = 200
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
    setSelectedLanguageFrom(selectedLanguageTo)
    setSelectedLanguageTo(selectedLanguageFrom)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    if (value.length <= maxChars) {
      setInputText(value)
      setCharCount(value.length)
    }
  }

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setTranslatedText('')
      return
    }

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        inputText,
      )}&langpair=${selectedLanguageFrom}|${selectedLanguageTo}`,
    )

    const data = await response.json()

    setTranslatedText(data.responseData.translatedText)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleTranslate()
    }
  }

  return (
    <div className="w-full flex flex-col gap-y-4 justify-center items-center px-6 sm:px-8 pt-12 pb-6 relative">
      <button className="absolute top-4 right-4">
        <i className="fa-solid fa-xmark text-xl text-gray-300" onClick={onClose}></i>
      </button>
      <div className="w-full min-h-20 flex justify-center items-center px-4 bg-gradient-to-r from-[#b6f492] to-[#338b93] text-gray-700 rounded-lg">
        <div className="language" onClick={() => handleLanguageClick('from')}>
          {languages[selectedLanguageFrom] || 'English'}
        </div>
        <i
          className="fa-solid fa-arrows-rotate text-2xl mx-8 cursor-pointer"
          onClick={handleSwapLanguages}
        ></i>
        <div className="language" onClick={() => handleLanguageClick('to')}>
          {languages[selectedLanguageTo] || 'English'}
        </div>
      </div>
      {showLanguages && (
        <div
          className="w-[calc(100%-4rem)] h-[calc(100%-9rem)] bg-gradient-to-r from-[#b6f492] to-[#338b93] absolute top-32 left-8 z-10 rounded shadow-lg p-4 overflow-y-scroll scrollbar-hide"
          ref={dropdownRef}
        >
          <ul>
            {Object.entries(languages).map(([code, name]) => (
              <li
                className="cursor-pointer hover:bg-[#10646b] transition duration-200 p-2 rounded"
                key={code}
                onClick={() => handleLanguagesSelect(code)}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="w-full relative">
        <textarea
          className="textarea text-gray-200"
          value={inputText || ''}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        ></textarea>
        <div className="absolute bottom-2 right-4 text-gray-400">
          {charCount}/{maxChars}
        </div>
      </div>
      <button
        className="w-12 h-12 bg-gradient-to-r from-[#b6f492] to-[#338b93] rounded-full text-2xl text-gray-600 flex justify-center items-center active:translate-y-[1px]"
        onClick={handleTranslate}
      >
        <i className="fa-solid fa-chevron-down"></i>
      </button>
      <div className="w-full">
        <textarea
          className="textarea text-[#b6f492]"
          value={translatedText || ''}
          readOnly
        ></textarea>
      </div>
    </div>
  )
}

export default TranslatorApp
