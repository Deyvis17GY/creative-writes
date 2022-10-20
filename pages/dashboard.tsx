import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AiFillEdit } from 'react-icons/ai'
import { BsTrash2Fill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { Loader } from '../components/Loader'
import { Message } from '../components/Message'
import { useI18N } from '../context/i18nContext'
import { auth, db } from '../utils/firebase'

const Dashboard = () => {
  const route = useRouter()
  const [user, loading] = useAuthState(auth)
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(false)
  const { t } = useI18N()
  // Delete post
  const deletePost = async (id: string) => {
    try {
      const docRef = doc(db, 'posts', id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      })
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingPosts(true)
        if (loading) {
          setLoadingPosts(true)
          return
        }
        if (!user) route.push('/auth/login')
        if (!auth.currentUser) return
        const collectionsRef = collection(db, 'posts')
        const queryUser = query(collectionsRef, where('user', '==', user?.uid))
        const unsubscribe = onSnapshot(queryUser, (snapshot: any) => {
          setPosts(
            snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
          )
          setLoadingPosts(false)
        })
        return unsubscribe
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [user, loading])

  return (
    <div>
      <h1 className='dark:text-white'>{t('dashboard.title')}</h1>
      <div>
        {loadingPosts ? (
          <Loader />
        ) : (
          posts.map((post: any) => (
            <Message key={post.id} {...post}>
              <div className='flex gap-4'>
                <button
                  className='text-pink-600 flex items-center justify-center gap-2 py-2 text-sm'
                  onClick={() => deletePost(post.id)}
                >
                  <BsTrash2Fill className='text-2xl' />
                  {t('dashboard.actionDelete')}
                </button>
                <Link href={{ pathname: '/post', query: post }}>
                  <button className='text-teal-600 flex items-center justify-center gap-2 py-2 text-sm'>
                    <AiFillEdit className='text-2xl' />
                    {t('dashboard.actionEdit')}
                  </button>
                </Link>
              </div>
            </Message>
          ))
        )}
      </div>
      <button
        className='font-medium text-white bg-gray-800 py-2 px-4 my-6 '
        onClick={() => auth.signOut()}
      >
        {t('dashboard.logout')}
      </button>
    </div>
  )
}

export default Dashboard
