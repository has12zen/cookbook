import Head from 'next/head';
import Image from 'next/image';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../lib/initSupabase'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navigation from '../components/navbar';

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
    </div >
  )
}

export default Home;

