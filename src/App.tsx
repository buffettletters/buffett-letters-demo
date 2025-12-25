import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import remarkGfm from 'remark-gfm'
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import ChatInterface from './components/ChatInterface.tsx'

type MarkdownComponentProps = { children: ReactNode }

type Letter = {
  id: string
  year: number
  title: string
  summary: string
  description?: string 
  downloadUrl: string
  onlineUrl: string
}

// Función para generar las cartas basada en los archivos existentes - MODIFICADA
function generateLettersFromFiles(): Letter[] {
  const letters: Letter[] = []
  
  // Años desde 1977 hasta 2024
  for (let year = 1977; year <= 2024; year++) {
    letters.push({
      id: `letter-${year}`,
      year: year,
      title: `Carta a los Accionistas ${year}`,
      summary: `Carta anual de Warren Buffett a los accionistas de Berkshire Hathaway del año ${year}.`,
      downloadUrl: `#`, // Deshabilitado en demo
      onlineUrl: `/letters/es/${year}.md`
    })
  }
  
  return letters
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={[
        'px-4 py-2 text-sm font-medium rounded-md',
        active ? 'bg-blue-600 text-white' : 'bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-100',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export function EnhancedMarkdownRenderer({ markdown }: { markdown: string }) {
  const [ReactMarkdown, setRM] = useState<any>(null)

  useEffect(() => {
    import('react-markdown').then(mod => {
      setRM(() => mod.default)
    })
  }, [])

  if (!ReactMarkdown) {
    return (
      <div className="prose prose-zinc max-w-none">
        <div className="whitespace-pre-wrap text-emerald-800 font-sans text-base leading-relaxed">
          {markdown}
        </div>
      </div>
    )
  }

  return (
    <div className="prose prose-zinc max-w-none prose-lg 
      prose-headings:text-emerald-900 prose-p:text-emerald-800 
      prose-p:leading-relaxed prose-a:text-blue-600 
      prose-strong:text-emerald-900 prose-ul:text-emerald-800 
      prose-ol:text-emerald-800 prose-li:text-emerald-800 
      prose-blockquote:border-emerald-300 prose-blockquote:text-emerald-700">

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }: MarkdownComponentProps) => (
            <h1 className="text-2xl font-bold mt-6 mb-4 text-emerald-900">{children}</h1>
          ),
          h2: ({ children }: MarkdownComponentProps) => (
            <h2 className="text-xl font-semibold mt-5 mb-3 text-emerald-900">{children}</h2>
          ),
          h3: ({ children }: MarkdownComponentProps) => (
            <h3 className="text-lg font-semibold mt-4 mb-2 text-emerald-900">{children}</h3>
          ),
          p: ({ children }: MarkdownComponentProps) => (
            <p className="mb-4 leading-relaxed text-emerald-800">{children}</p>
          ),
          ul: ({ children }: MarkdownComponentProps) => (
            <ul className="list-disc list-inside mb-4 space-y-1 text-emerald-800">{children}</ul>
          ),
          ol: ({ children }: MarkdownComponentProps) => (
            <ol className="list-decimal list-inside mb-4 space-y-1 text-emerald-800">{children}</ol>
          ),
          li: ({ children }: MarkdownComponentProps) => (
            <li className="ml-4 text-emerald-800">{children}</li>
          ),
          strong: ({ children }: MarkdownComponentProps) => (
            <strong className="font-semibold text-emerald-900">{children}</strong>
          ),
          em: ({ children }: MarkdownComponentProps) => (
            <em className="italic text-emerald-800">{children}</em>
          ),
          blockquote: ({ children }: MarkdownComponentProps) => (
            <blockquote className="border-l-4 border-emerald-300 pl-4 my-4 italic text-emerald-700">
              {children}
            </blockquote>
          ),
          table: ({ children }: MarkdownComponentProps) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-emerald-200">
                {children}
              </table>
            </div>
          ),
          th: ({ children }: MarkdownComponentProps) => (
            <th className="border border-emerald-300 px-4 py-2 bg-emerald-50 font-semibold text-emerald-900">
              {children}
            </th>
          ),
          td: ({ children }: MarkdownComponentProps) => (
            <td className="border border-emerald-300 px-4 py-2 text-emerald-800">
              {children}
            </td>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

function DocumentCard({ letter }: { letter: Letter }) {
  const navigate = useNavigate()
  
  const handleViewOnline = () => {
    navigate(`/letter/${letter.year}`)
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    // En la demo, redirigir al proyecto completo
    window.open('https://buymeacoffee.com/buffettletters/proyecto-abierto-buffett-letters', '_blank')
  }

  // Usar la descripción larga si existe, sino usar el summary
  const displayDescription = letter.description || letter.summary

  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-4 flex flex-col gap-2 shadow-sm h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-emerald-900">{"Carta a los accionistas"}</h3>
        <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded">
          {letter.year}
        </span>
      </div>
      
      {/* Descripción con scroll */}
      <div className="flex-1 min-h-0"> {/* Contenedor flexible para el scroll */}
        <div className="text-xs text-emerald-800 overflow-y-auto max-h-24 text-justify leading-relaxed px-2"> {/* Altura máxima y scroll, justificado con padding */}
          {displayDescription}
        </div>
      </div>
      
      <div className="flex gap-2 pt-2">
        <button 
          onClick={handleDownload}
          className="inline-flex items-center rounded-md bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm flex-1 justify-center"
        >
          Proyecto Completo
        </button>
        <button 
          onClick={handleViewOnline}
          className="inline-flex items-center rounded-md border border-emerald-300 px-3 py-1.5 text-sm text-emerald-900 hover:bg-emerald-100 flex-1 justify-center"
        >
          Ver online
        </button>
      </div>
    </div>
  )
}

function HomePage() {
  const [letters, setLetters] = useState<Letter[]>([])
  const [activeTab, setActiveTab] = useState<'chat' | 'docs'>('docs')

  const handleTabChange = (tab: 'chat' | 'docs') => {
    setActiveTab(tab)
    window.scrollTo(0, 0)
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 10)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeTab])

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}letters/manifest.json`)
      .then(r => {
        if (r.ok) return r.json()
        throw new Error('Manifest not found')
      })
      .then((items: any[]) => {
        const mapped: Letter[] = items.map(it => ({
          id: it.id,
          year: it.year,
          title: it.title,
          summary: it.summary || `Carta anual de Warren Buffett...`,
          description: it.description,
          downloadUrl: '#', // Deshabilitado
          onlineUrl: it.path
        }))
        setLetters(mapped)
      })
      .catch(() => {
        const generatedLetters = generateLettersFromFiles()
        setLetters(generatedLetters)
      })
  }, [])

  return (
    <div className="bg-emerald-100">
      <header className="border-b border-emerald-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="Logo" className="h-8 w-8 rounded" />
            <h1 className="text-lg font-semibold text-emerald-900">Cartas de Warren Buffett (ES) - DEMO</h1>
          </div>
          <a
            href="https://buymeacoffee.com/buffettletters/proyecto-abierto-buffett-letters"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 text-sm shadow-sm transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Proyecto Completo
          </a>
        </div>
      </header>
      
      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 text-lg">ℹ️</div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Versión Demo</h3>
              <p className="text-sm text-blue-700">
                Esta es una versión de demostración que muestra las cartas de Warren Buffett. 
                El chat con IA y la descarga de documentos están disponibles en el{' '}
                <a href="https://buymeacoffee.com/buffettletters/proyecto-abierto-buffett-letters" className="font-medium underline">proyecto completo</a>.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <TabButton active={activeTab === 'docs'} onClick={() => handleTabChange('docs')}>
            Documentos
          </TabButton>
          <TabButton active={activeTab === 'chat'} onClick={() => handleTabChange('chat')}>
            Chat (Demo)
          </TabButton>
        </div>

        {activeTab === 'docs' ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {letters.map((letter) => (
              <DocumentCard key={letter.id} letter={letter} />
            ))}
          </section>
        ) : (
          <ChatInterface />
        )}
      </main>
      
      <footer className="border-t border-emerald-200 mt-12">
        <div className="mx-auto max-w-5xl px-4 py-4 text-xs text-emerald-700">
          © {new Date().getFullYear()} Buffet Letters Demo — by @buffettletters | 
          <a href="https://buymeacoffee.com/buffettletters/proyecto-abierto-buffett-letters" className="ml-1 text-blue-600 hover:underline">
            Ver proyecto completo
          </a>
        </div>
      </footer>
    </div>
  )
}

function LetterView() {
  const { year } = useParams<{ year: string }>()
  const navigate = useNavigate()
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [year]) 

  useEffect(() => {
    if (!year) return
    
    setLoading(true)
    setError('')
    fetch(`${import.meta.env.BASE_URL}letters/es/${year}.md`)
      .then(r => {
        if (!r.ok) throw new Error(`Documento no encontrado (${r.status})`)
        return r.text()
      })
      .then(setContent)
      .catch((err) => {
        setError(err.message)
        setContent('# Error cargando documento\n\nEl documento solicitado no está disponible.')
      })
      .finally(() => setLoading(false))
  }, [year])

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-dvh bg-emerald-100 py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <button 
            onClick={handleBack}
            className="inline-flex items-center text-sm text-emerald-700 hover:text-emerald-900 mb-4"
          >
            ← Volver a todas las cartas
          </button>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-emerald-200">
          <div className="border-b border-emerald-200 px-6 py-4">
            <h1 className="text-xl font-semibold text-emerald-900">
              Carta a los Accionistas {year}
            </h1>
          </div>
          
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-emerald-700">Cargando documento...</div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
              <h2 className="text-red-800 font-semibold">Error</h2>
              <p className="text-red-700">{error}</p>
              <div className="mt-2 text-sm text-red-600">
                <p>Ruta intentada: {import.meta.env.BASE_URL}letters/es/{year}.md</p>
              </div>
            </div>
          )}
          
          {!loading && (
            <div className="px-6 py-6">
              <EnhancedMarkdownRenderer markdown={content} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente principal con Router
export default function App() {
  return (
    <Router basename="/buffett-letters-demo/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/letter/:year" element={<LetterView />} />
      </Routes>
    </Router>
  )
}