export default function ChatInterface() {
  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg border border-emerald-200 shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3 border-b border-emerald-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-lg">Consultar a Warren Buffett</h3>
            <p className="text-sm text-emerald-100">Basado en sus cartas a los accionistas (1977-2024)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              🔄 Versión Demo
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area - Placeholder */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <div className="text-center text-emerald-700 py-12">
          <div className="text-4xl mb-4">🤖</div>
          <p className="font-semibold text-lg mb-4">Chat con IA - Versión Demo</p>
          <p className="text-sm mb-6 text-emerald-600 max-w-md mx-auto">
            Esta funcionalidad de chat con inteligencia artificial está disponible en la versión completa del proyecto, 
            donde puedes hacer preguntas sobre las cartas y recibir respuestas basadas en el contenido real.
          </p>
          
          <div className="space-y-3 max-w-sm mx-auto">
            <a 
              href="https://buymeacoffee.com/buffettletters/proyecto-abierto-buffett-letters" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              🚀 Visitar Proyecto Completo
            </a>
            <a 
              href="https://buymeacoffee.com/buffettletters/proyecto-abierto-buffett-letters" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full border border-emerald-300 text-emerald-700 py-3 px-4 rounded-md hover:bg-emerald-50 transition-colors font-medium"
            >
              📝 Colaborar
            </a>
          </div>

          <div className="mt-8 text-xs text-emerald-500 space-y-1">
            <p>💡 <strong>En la versión completa:</strong></p>
            <p>• Pregunta sobre inversiones, valor intrínseco, negocios</p>
            <p>• Respuestas basadas en las cartas reales de Buffett</p>
            <p>• Múltiples modelos de IA disponibles</p>
            <p>• Fuentes citadas de las cartas consultadas</p>
          </div>
        </div>
      </div>

      {/* Input Area - Disabled */}
      <div className="border-t border-emerald-200 p-4 bg-white">
        <div className="flex space-x-3">
          <div className="flex-1">
            <textarea
              placeholder="Esta funcionalidad está disponible en el proyecto completo..."
              className="w-full border border-emerald-300 rounded-xl px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed resize-none"
              rows={2}
              disabled
            />
            <div className="text-xs text-gray-500 mt-1">
              ⚠️ Chat deshabilitado en versión demo
            </div>
          </div>
          <button
            disabled
            className="bg-gray-400 text-white px-6 py-3 rounded-xl font-medium cursor-not-allowed self-end flex items-center space-x-2"
          >
            <span>Enviar</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}