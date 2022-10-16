import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc
} from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Message } from '../components/Message'
import { IDetailsPost, IRouterData } from '../interfaces'
import { getTimeAgo } from '../shared/utils/timeAgo'
import { auth, db } from '../utils/firebase'

const Details = () => {
  const router = useRouter()
  const routeData: IRouterData = {
    id: router.query.id as string,
    avatar: router.query.avatar as string,
    username: router.query.username as string,
    description: router.query.description as string
  }

  const [allMessages, setAllMessages] = useState<IDetailsPost[]>([])
  const messageRef = useRef<HTMLInputElement>(null)

  const submitMessages = async (e: any) => {
    e.preventDefault()
    if (!auth.currentUser) return router.push('/auth/login')
    if (!messageRef.current?.value) {
      return toast.error('Message is required 😅', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      })
    }

    try {
      if (!routeData?.id) return
      const docRef = doc(db, 'posts', routeData.id as string)
      await updateDoc(docRef, {
        comments: arrayUnion({
          message: messageRef.current?.value,
          avatar: auth.currentUser.photoURL,
          username: auth.currentUser.displayName,
          time: Timestamp.now()
        })
      })
      messageRef.current.value = ''
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const getComments = async () => {
      try {
        if (!router.isReady) return
        const docRef = doc(db, 'posts', routeData?.id as string)
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
          const messagesBack = snapshot
            .data()
            ?.comments?.sort((a: any, b: any) => b.time - a.time)
          setAllMessages(messagesBack || [])
        })
        return unsubscribe
      } catch (error) {
        throw new Error("Couldn't get comments", {
          cause: error
        })
      }
    }
    getComments()
  }, [])

  return (
    <div>
      <Message
        avatar={routeData.avatar}
        username={routeData.username}
        description={routeData.description}
      />
      <div className='my-4'>
        <form className='flex' onSubmit={submitMessages}>
          <input
            type='text'
            name=''
            id=''
            placeholder='Send a message 😀'
            className='bg-gray-800 w-full p-2 text-white text-sm'
            ref={messageRef}
          />
          <button
            className='bg-cyan-500 text-white py-2 px-4 text-sm'
            type='submit'
          >
            Submit
          </button>
        </form>

        <div className='py-6'>
          <h2 className='font-bold'>Comments</h2>
          {allMessages.map((message) => {
            return (
              <div
                key={message.time.toDate().getTime()}
                className='bg-white p-4 my-4 border-2'
              >
                <div className='flex items-center gap-2 mb-4'>
                  <Image
                    src={message?.avatar}
                    alt=''
                    width={40}
                    height={40}
                    className='w-10 rounded-full'
                  />
                  <h2>{message.username}</h2>
                </div>
                <h2>{message.message}</h2>
                <p>{getTimeAgo(message.time.toDate().getTime())}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Details
