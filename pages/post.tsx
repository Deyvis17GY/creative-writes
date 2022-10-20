import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify'
import { useI18N } from '../context/i18nContext'
import { auth, db } from '../utils/firebase'

export interface IPostData {
  description: string
  id?: string
  title: string
}

const Post = () => {
  const [post, setPost] = useState<IPostData>({ description: '', title: '' })
  const [isDisabled, setIsDisabled] = useState(false)
  const [user, loading] = useAuthState(auth)
  const route = useRouter()
  const { t } = useI18N()
  const routeData = route.query

  const submitPost = async (e: any) => {
    e.preventDefault()

    try {
      setIsDisabled(true)
      if (!post.description) {
        return toast.error('Description is required  😅', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        })
      }

      const collectionRef = collection(db, 'posts')
      if (post.id) {
        const docRef = doc(db, 'posts', post.id)
        await updateDoc(docRef, {
          ...post,
          timestamp: serverTimestamp()
        })
        route.push('/dashboard')
      } else {
        await addDoc(collectionRef, {
          ...post,
          timestamp: serverTimestamp(),
          user: user?.uid,
          avatar: user?.photoURL,
          username: user?.displayName
        })
        setPost({ description: '', title: '' })
        return route.push('/')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setIsDisabled(false)
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      if (loading) return <h1>Loading...</h1>
      if (!user) route.push('/auth/login')
      if (routeData?.id) {
        setPost({
          description: routeData?.description as string,
          id: routeData?.id as string,
          title: routeData?.title as string
        })
      }
    }
    checkUser()
  }, [loading, user])

  return (
    <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
      <form onSubmit={submitPost}>
        <h1 className='text-2xl font-bold dark:text-white'>
          {post.id ? t('post.editSubtitle') : t('post.subtitle')}
        </h1>
        <div className='py-2'>
          <h3 className='text-lg font-medium py-2 dark:text-white'>
            {t('post.description')}
          </h3>
          <textarea
            className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm'
            name=''
            id=''
            cols={1}
            rows={1}
            maxLength={300}
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          ></textarea>
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 300 ? 'text-red-600' : ''
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          className='w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm disabled:opacity-75'
          type='submit'
          disabled={isDisabled}
        >
          {t('post.submit')}
        </button>
      </form>
    </div>
  )
}

export default Post
