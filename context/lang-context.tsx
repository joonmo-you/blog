'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Lang } from '@/lib/types'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => {},
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    const resolved = stored === 'ko' ? 'ko' : 'en'
    setLangState(resolved)
    document.documentElement.dataset.lang = resolved
  }, [])

  function setLang(next: Lang) {
    setLangState(next)
    localStorage.setItem('lang', next)
    document.documentElement.dataset.lang = next
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
