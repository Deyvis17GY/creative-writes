import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FcGoogle } from 'react-icons/fc'
import { useI18N } from '../../context/i18nContext'
import { auth } from '../../utils/firebase'

const Login = () => {
  const route = useRouter()
  const googleProvider = new GoogleAuthProvider()
  const [user] = useAuthState(auth)
  const { t } = useI18N()

  const googleLogin = async () => {
    try {
      const res = await signInWithRedirect(auth, googleProvider)
      if (res) {
        route.push('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const getUser = () => {
      if (!user) return Router.push('/auth/login')
      return Router.push('/')
    }
    getUser()
  }, [user])

  return (
    <div className='shadow-xl mt-32 p-10 text-gray-700  rounded-lg'>
      <h2 className='text-2xl font-medium dark:text-white'>
        {t('login.subtitle')}
      </h2>
      <div className='py-4'>
        <h3 className='py-4 dark:text-white'>{t('login.providers')}</h3>
        <button
          className='text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2'
          onClick={googleLogin}
        >
          <FcGoogle className='text-2xl' />
          {t('login.google')}
        </button>
      </div>
    </div>
  )
}

export default Login
