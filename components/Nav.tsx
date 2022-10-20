import dynamicClass from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AiOutlineClose } from 'react-icons/ai'
import { BiBookAdd } from 'react-icons/bi'
import { FiMenu } from 'react-icons/fi'
import { MdTranslate } from 'react-icons/md'
import { useI18N } from '../context/i18nContext'
import { currentTheme } from '../shared/utils/currentTheme'
import { auth } from '../utils/firebase'

export const Nav = () => {
  const [user, loading] = useAuthState(auth)
  const { locale, locales } = useRouter()
  const { t } = useI18N()

  const [isToggle, setIsToggle] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const restOfLocales = locales ? locales.filter((l) => l !== locale) : []

  const toggleMenu = () => {
    setIsToggle(!isToggle)
  }

  const classMenuBurger = dynamicClass(
    'sm:flex items-center transition-all phone:w-0 bottom-0 burger phone:left-0 justify-between delay-200 phone:bg-gray-800 phone:fixed phone:overflow-hidden flex phone:z-10 left-2 ',
    {
      'phone:w-full ': isToggle
    }
  )

  const classItemBurger = dynamicClass(
    'sm:flex-row flex items-center gap-6 phone:gap-8  flex-col-reverse left-1 phone:absolute phone:top-8'
  )

  const onRouteClick = () => {
    setIsToggle(false)
  }

  const onThemeClick = () => {
    setIsToggle(false)
    document.body.classList.toggle('dark')
    setIsDark(!isDark)
  }

  useEffect(() => {
    document.body.classList.add(currentTheme())
    setIsDark(currentTheme() === 'dark' ? true : false)
  }, [])

  useEffect(() => {
    if (isToggle) {
      document.body.classList.toggle('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isToggle])

  return (
    <>
      <nav className='flex justify-between items-center py-10'>
        <Link href='/'>
          <button
            className='md:text-lg phone:text-base  font-medium dark:text-white'
            onClick={() => onRouteClick()}
          >
            {t('nav.title')}
          </button>
        </Link>
        <article className={classMenuBurger}>
          <ul className='flex items-center gap-10 phone:flex-col relative top-0 left-0 w-full phone:h-full'>
            {!user && (
              <div className={classItemBurger}>
                <button
                  className='flex justify-start items-center phone:w-full gap-4 text-white'
                  onClick={onThemeClick}
                >
                  <span>{isDark ? '🌞' : '🌙'}</span>
                  <span className='text-white dark:text-white sm:hidden'>
                    {isDark ? t('nav.light') : t('nav.dark')}
                  </span>
                </button>
                <Link href='/' locale={restOfLocales[0]}>
                  <a
                    onClick={() => onRouteClick()}
                    className='items-center justify-start text-sm font-medium cursor-pointer phone:text-white flex gap-4 phone:w-full'
                  >
                    <MdTranslate className='phone:text-3xl text-lg dark:text-white' />

                    <span className='sm:hidden text-white'>
                      {t(`nav.${restOfLocales[0]}`)}{' '}
                    </span>
                  </a>
                </Link>
                <Link href='/auth/login'>
                  <a
                    className='py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium cursor-pointer phone:w-full flex justify-start'
                    onClick={() => onRouteClick()}
                  >
                    {t('nav.join')}
                  </a>
                </Link>
              </div>
            )}
            {user && (
              <div className={classItemBurger}>
                <button
                  className='flex justify-start items-center phone:w-full gap-4 text-white'
                  onClick={onThemeClick}
                >
                  <span>{isDark ? '🌞' : '🌙'}</span>
                  <span className='text-white dark:text-white sm:hidden'>
                    {isDark ? t('nav.light') : t('nav.dark')}
                  </span>
                </button>
                <Link href='/' locale={restOfLocales[0]}>
                  <a
                    onClick={() => onRouteClick()}
                    className='items-center justify-start text-sm font-medium cursor-pointer phone:text-white flex gap-4 phone:w-full'
                  >
                    <MdTranslate className='phone:text-3xl text-lg dark:text-white' />

                    <span className='sm:hidden text-white'>
                      {t(`nav.${restOfLocales[0]}`)}{' '}
                    </span>
                  </a>
                </Link>
                <Link href='/post'>
                  <a
                    onClick={() => onRouteClick()}
                    className='flex items-center gap-2 w-full justify-start'
                  >
                    <button className='font-medium bg-cyan-500 text-white py-2 px-4 rounded-md text-sm phone:hidden'>
                      {t('nav.post')}
                    </button>
                    <div className='flex sm:hidden text-white gap-4 items-center w-full justify-start'>
                      <BiBookAdd className='text-3xl' />
                      <span>{t('nav.post')}</span>
                    </div>
                  </a>
                </Link>
                <Link href='/dashboard'>
                  <a
                    className='flex items-center gap-2 w-full justify-start'
                    onClick={() => onRouteClick()}
                  >
                    <Image
                      className='w-12 rounded-full cursor-pointer'
                      src={user.photoURL || 'https://i.pravatar.cc/150?img=32'}
                      alt=''
                      width={40}
                      height={40}
                      objectFit='cover'
                      referrerPolicy='no-referrer'
                    />
                    <span className='sm:hidden text-white'>
                      {t('nav.dashboard')}
                    </span>
                  </a>
                </Link>
              </div>
            )}
          </ul>
        </article>

        <div
          className='flex flex-col w-8 h-6 border-0 gap-2 sm:hidden cursor-pointer '
          onClick={toggleMenu}
        >
          {!isToggle ? (
            <FiMenu className='text-2xl dark:text-white text-black' />
          ) : (
            <AiOutlineClose className='text-2xl dark:text-white text-black' />
          )}
        </div>
      </nav>
    </>
  )
}
