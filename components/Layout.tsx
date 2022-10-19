import getConfig from 'next/config'
import { ILayoutProps } from '../interfaces'
import { Nav } from './Nav'

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className='mx-6 md:max-w-2xl md:mx-auto font-poppins'>
      <Nav />
      <main>{children}</main>
      {process.env.NODE_ENV === 'development' && (
        <span className='fixed right-3 bottom-3 text-sm'>
          version: v.{getConfig().publicRuntimeConfig?.version}
        </span>
      )}
    </div>
  )
}
