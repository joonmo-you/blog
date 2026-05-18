'use client'

import { createContext, useContext } from 'react'
import type { Lang } from '@/lib/types'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextValue>({
  lang: 'ko',
  setLang: () => {},
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  return (
    <LangContext.Provider value={{ lang: 'ko', setLang: () => {} }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
