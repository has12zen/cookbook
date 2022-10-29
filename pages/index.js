import Head from 'next/head';
import Image from 'next/image';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/initSupabase'
import Link from 'next/link';
import Navigation from '../components/navbar';
import Slist from '../components/slist';
import { Flex } from '@chakra-ui/react';

function Home() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()


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
      <Navigation />
      <Flex
        direction='row' alignContent='center' justifyContent='center'>
        <Slist />
      </Flex>
    </div >
  )
}

export default Home;

