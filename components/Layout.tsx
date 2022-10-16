import { ILayoutProps } from '../interfaces'
import { Nav } from './Nav'

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className='mx-6 md:max-w-2xl md:mx-auto font-poppins'>
      <Nav />
      <main>{children}</main>
    </div>
  )
}
