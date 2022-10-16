import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router'
import { FcGoogle } from 'react-icons/fc'
import { auth } from '../../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
const Login = () => {
  const route = useRouter()
  //Sign in with Google
  const googleProvider = new GoogleAuthProvider()
  const [user, loading] = useAuthState(auth)

  const googleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
      if (res) {
        route.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      route.push('/')
    } else {
      route.push('/auth/login')
    }
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
