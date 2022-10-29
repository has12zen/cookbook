import { useState, useEffect } from 'react'
import { supabase } from '../../lib/initSupabase'
import Link from 'next/link'
import { useRouter } from 'next/router'
import parser from 'html-react-parser'

const Post = () => {
    const router = useRouter()
    const [recipe, setRecipe] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [iglist, setIglist] = useState([]);
    const fetchRecipe = async () => {
        let { data: recipe, error } = await supabase
            .from('recipe')
            .select('*').match({ id: router.query.id })
        if (error) console.error(error, "err")
        console.log(recipe, "recipe")
        if (recipe.length > 0) {
            setRecipe(recipe[0]);
            setIglist([]);
            recipe[0].iglist.split(";^;").map((item) => {
                if (item === "") return;
                const ig = item.split("->");
                if (ig.length !== 2) return;
                console.log(ig, "ig")
                setIglist(iglist => [...iglist, { name: ig[0], amount: ig[1] }])
            })
        }
        setLoading(false);
    }
    useEffect(() => {
        if (!router.isReady) return;
        fetchRecipe();
    }, [router.isReady])
    if (loading) return <div>Loading...</div>
    if (recipe === undefined) return <>
        <div>Not found</div>
        <Link href="/">Go Back</Link>
    </>
    return <>
        <div>
            Title:
        </div>
        <div>{recipe.title}</div>
        <div>
            Ingredients:
        </div>
        {iglist.map((item, idx) => {
            return (<><div
                key={idx}
            >{item.name} - {item.amount}</div></>)
        })}
        <div>
            Instructions:
        </div>
        <>
            {parser(recipe?.instructions)}
        </>
        <Link href="/">Go Back</Link>
    </>
}

export default Post
