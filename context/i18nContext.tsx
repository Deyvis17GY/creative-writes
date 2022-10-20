import { useRouter } from 'next/router'
import { createContext, useCallback, useContext } from 'react'
import es from '../i18n/es.json'
import en from '../i18n/en.json'

const I18nContext = createContext({
  t: (key: string, keyTwo?: string) => key
})

const languages: any = { en, es }

export const I18nProvider = ({ children }: any) => {
  const { locale } = useRouter()

  const t = useCallback(
    (key: string, ...args: any) => {
      const validateLocale = locale ? locale : 'es'
      if (key.includes('.')) {
        const [keyOne, keyTwo] = key.split('.')
        return languages[validateLocale][keyOne][keyTwo]
      }
      let translation = languages[validateLocale][key]

      if (args.length === 0) return translation
      args.forEach((value: string, index: number) => {
        translation = translation.replace(`\${${index + 1}}`, value)
      })

      return translation
    },
    [locale]
  )

  return <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>
}

export const useI18N = () => {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18N must be used a I18NProvider')
  }
  return context
}
