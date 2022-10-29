import '../styles/globals.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionContextProvider>
  )
}
export default MyApp

