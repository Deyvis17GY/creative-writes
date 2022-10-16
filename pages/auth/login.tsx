import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FcGoogle } from 'react-icons/fc'
import { auth } from '../../utils/firebase'

const Login = () => {
  const route = useRouter()

  const googleProvider = new GoogleAuthProvider()
  const [user] = useAuthState(auth)

  const googleLogin = async () => {
    try {
      const res = await signInWithRedirect(auth, googleProvider)
      if (res) {
        route.push('/')
      }
    } catch (error) {
      console.log(error)
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
      <h2 className='text-2xl font-medium'>Join Today</h2>
      <div className='py-4'>
        <h3 className='py-4'>Sign in width one of the providers</h3>
        <button
          className='text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2'
          onClick={googleLogin}
        >
          <FcGoogle className='text-2xl' />
          Sing in with Google
        </button>
      </div>
    </div>
  )
}

export default Login
