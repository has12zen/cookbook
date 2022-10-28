import Head from 'next/head';
import Image from 'next/image';
import CountryList from '../components/countryList';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/initSupabase'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

function Home() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [data, setData] = useState()

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])
  if (!user) {
    return (<div>
      <nav>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </div >);
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <a href='#' onClick={() => supabaseClient.auth.signOut()}>Sign out</a>
          </li>
        </ul>
      </nav>
      <hr />
    </div >
  )
}

export default Home;

