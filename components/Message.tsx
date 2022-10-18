import Image from 'next/image'
import { IMessageProps } from '../interfaces'

export const Message = ({
  children,
  avatar,
  username,
  description
}: IMessageProps) => {
  return (
    <div className='bg-white p-8 border-b-2 rounded-lg'>
      <div className='flex items-center gap-2'>
        <Image
          src={avatar || 'https://i.pravatar.cc/150?img=32'}
          alt='illustration-1'
          className='w-10 rounded-full'
          width={50}
          height={50}
          referrerPolicy='no-referrer'
        />

        {/* <img
          src={avatar || 'https://i.pravatar.cc/150?img=32'}
          alt='illustration-1'
          className='w-10 rounded-full'
          width={50}
          height={50}
          referrerPolicy='no-referrer'
        /> */}

        <h2 className='font-bold'>{username}</h2>
      </div>
      <div className='py-4'>
        <p title={description} className='py-2 font-medium'>
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}
