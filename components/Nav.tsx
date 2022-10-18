import Image from 'next/image'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'

export const Nav = () => {
  const [user, loading] = useAuthState(auth)
  return (
    <>
      <nav className='flex justify-between items-center py-10'>
        <Link href='/'>
          <button className='text-lg font-medium'>Creative Minds</button>
        </Link>
        <ul className='flex items-center gap-10'>
          {!user && (
            <Link href='/auth/login'>
              <a className='py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8 cursor-pointer'>
                Join Now
              </a>
            </Link>
          )}
          {user && (
            <div className='flex items-center gap-6'>
              <Link href='/post'>
                <button className='font-medium bg-cyan-500 text-white py-2 px-4 rounded-md text-sm'>
                  Post
                </button>
              </Link>
              <Link href='/dashboard'>
                <a className='m-auto flex'>
                  <Image
                    className='w-12 rounded-full cursor-pointer'
                    src={user.photoURL || 'https://i.pravatar.cc/150?img=32'}
                    alt=''
                    width={40}
                    height={40}
                    objectFit='cover'
                    referrerPolicy='no-referrer'
                  />
                </a>
              </Link>
            </div>
          )}
        </ul>
      </nav>
    </>
  )
}
