// nextjs functional component
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NavLink } from './navbar';
import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { Flex, Input, Stack } from '@chakra-ui/react';

const Slist = () => {
    const supabaseClient = useSupabaseClient()
    const router = useRouter();
    const [recipe, setRecipe] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!router.isReady) return;
        fetchRecipe();
    }, [router.isReady])
    const fetchRecipe = async () => {
        let de = "";
        if (searchQuery) {
            de = searchQuery.split(" ").join(" & ");
        }
        // console.log("searchQuery",de)
        if (de === "") {
            const { data, error } = await supabaseClient.from('recipe').select('*');

            if (error) {
                console.error(error, "err")
                return [];
            }
            else console.log(data, "txt")
            setRecipe(data);
            return;

        }
        const { data, error } = await supabaseClient
            .rpc('server', {
                query: de
            });

        if (error) {
            console.error(error, "err")
            return [];
        }
        else console.log(data, "txt")
        setRecipe(data);
    };

    const handleChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
        if (searchQuery.length > 3) {
            console.log(searchQuery, "searchQuery")
            fetchRecipe();
        }
    };
    return (
        <>
            <Flex
                direction='column' alignContent='center' justifyContent='center'>
                <Input maxW="500" name='search' value={searchQuery} onChange={handleChange}
                    onSubmit={() => {
                        console.log("searching for: " + searchQuery);
                    }}
                    placeholder="Search"
                ></Input>
                <List data={recipe} />
            </Flex>
        </>
    )
}

export default Slist;

function List(props) {
    const data = props?.data;
    console.log(data, "data")
    return (
        <ul>
            {data?.length > 0 && data.map((item) => (
                <Stack as={'nav'} spacing={4} key={item.id}>
                    <NavLink link={"/recipe/" + item.id} >{item.title}</NavLink>
                </Stack>
            ))}
        </ul>
    )
}