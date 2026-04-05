'use client'

import { useLang } from '@/context/lang-context'
import { Button } from '@/components/ui/button'

export function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
      className="font-medium"
    >
      {lang === 'en' ? '한국어' : 'English'}
    </Button>
  )
}
