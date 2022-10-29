import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { supabase } from '../lib/initSupabase';

const ShopPage = () => {
    const router = useRouter()
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (!router.isReady) return;
        console.log('DATA')
        console.log(router)
        const name = router?.query?.name
        fetchCountries(name);
    }, [router.isReady])

    const fetchCountries = async (name) => {
        console.log(name, router, "wtc")
        let { data, error } = await supabase
            .rpc('server', {
                query: 'rice'
            })

        if (error) console.error(error, "err")
        else console.log(data, "txt")
        console.log(router.query) // returns query params object
        setCountries(countries);
    };

    return (
        <div>Shop Page</div>
    )
}

export default ShopPage