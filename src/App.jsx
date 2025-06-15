import { useState } from 'react'
import TranslatorStart from './Components/TranslatorStart'
import TranslatorApp from './Components/TranslatorApp'

const App = () => {
  const [showTranslatorApp, setShowTranslatorApp] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex justify-center items-center p-4">
      <div className="w-full max-w-md lg:max-w-lg h-[90vh] max-h-[800px] bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 flex flex-col overflow-hidden">
        {showTranslatorApp ? (
          <TranslatorApp onClose={() => setShowTranslatorApp(false)} />
        ) : (
          <TranslatorStart onStart={() => setShowTranslatorApp(true)} />
        )}
      </div>
    </div>
  )
}

export default App