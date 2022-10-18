import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/icon.png'></link>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,800;1,300;1,600;1,700&family=Poppins:wght@400;500;700&display=swap'
          rel='stylesheet'
        />
        <meta name='theme-color' content='#1f2937' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
