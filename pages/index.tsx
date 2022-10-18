import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Message } from '../components/Message'
import { Loader } from '../components/Loader'
import { db } from '../utils/firebase'

const Home: NextPage = () => {
  const [allPosts, setAllPosts] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const getPosts = async () => {
    try {
      setLoading(true)
      const collectionRef = collection(db, 'posts')
      const querySnapshot = query(collectionRef, orderBy('timestamp', 'desc'))
      const unsubscribe = onSnapshot(querySnapshot, (snapshot) => {
        setAllPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        setLoading(false)
      })
      return unsubscribe
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.debug('version', process.env.NEXT_PUBLIC_VERSION)
    getPosts()
  }, [])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='my-12 font-medium'>
        <h2>See what other people are saying</h2>
        {loading ? (
          <Loader />
        ) : (
          allPosts.map((post: any) => (
            <Message key={post.id} {...post}>
              <Link href={{ pathname: `${post.id}`, query: { ...post } }}>
                <button>
                  {post.comments?.length > 0 ? post.comments?.length : 0}{' '}
                  comments
                </button>
              </Link>
            </Message>
          ))
        )}
      </div>
    </div>
  )
}

export default Home
