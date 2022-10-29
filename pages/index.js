import Head from 'next/head';
import Image from 'next/image';
import Home from '../components/Home';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/initSupabase'
import Link from 'next/link';
import Navigation from '../components/navbar';
import Slist from '../components/slist';
import { Flex } from '@chakra-ui/react';

function App() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()


  if (!user) {
    return (<div>
    <Home />
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

export default App;

