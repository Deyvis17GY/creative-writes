import getConfig from 'next/config'
import { ILayoutProps } from '../interfaces'
import { Nav } from './Nav'

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className='px-6 md:px-40 lg:px-80 overflow-hidden font-poppins dark:bg-gray-800 h-full  min-h-screen'>
      <Nav />
      <main>{children}</main>
      {process.env.NODE_ENV === 'development' && (
        <span className='fixed right-3 bottom-3 text-sm dark:text-gray-600'>
          version: v.{getConfig().publicRuntimeConfig?.version}
        </span>
      )}
    </div>
  )
}
