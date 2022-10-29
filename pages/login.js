import { Auth } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import styles from '../styles/Login.module.css'
import { useEffect, useState } from 'react'
const customTheme = {
    default: {
        colors: {
            brand: 'hsl(153 60.0% 53.0%)',
            brandAccent: 'hsl(154 54.8% 45.1%)',
            brandButtonText: 'white',
            // ..
        },
        dark: {
            colors: {
                brandButtonText: 'white',
                defaultButtonBackground: '#2e2e2e',
                defaultButtonBackgroundHover: '#3e3e3e',
                //..
            },
        },
        // You can also add more theme variations with different names.
        evenDarker: {
            colors: {
                brandButtonText: 'white',
                defaultButtonBackground: '#1e1e1e',
                defaultButtonBackgroundHover: '#2e2e2e',
                //..
            },
        },
    }
}

const LoginPage = () => {
    const supabaseClient = useSupabaseClient()
    const user = useUser()

    if (!user)
        return (
            <div className={styles.loginbox}>
                <Auth
                    redirectTo={process.env.NEXT_PUBLIC_VERCEL_URL}
                    supabaseClient={supabaseClient}
                    // providers={['google', 'github']}
                    socialLayout="horizontal"
                    theme='default'
                    appearance={{ theme: customTheme }}
                />
            </div>
        )
    window.location.href = "/";
    return (
        <div>
            <h1>Logged in</h1>
        </div>
    );
}

export default LoginPage