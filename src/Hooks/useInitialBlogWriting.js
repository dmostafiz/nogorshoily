import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Axios from '../Helpers/axiosHelper'

export default function useInitialBlogWriting() {

    const router = useRouter()

    const [editingPost, setEditingPost] = useState(null)

    const [editingPostLoading, setLoading] = useState(true)

    useEffect(() => {

        if (router?.query?.id) {

            (
                async () => {
                    const post = await Axios.post('/auth/check_post_author', { postId: router.query.id })

                    if (post?.data?.ok == true) {
                        setEditingPost(post.data.post)
                    }

                    console.log('check_post_author ', post)
                    setLoading(false)
                }
            )()
        }
    }, [router])


    const draftedPosts = async () => {

        const response = await Axios.get('/user/author_drafted_posts')

        console.log('Author drafted posts ase', response.data.posts)

        if(response?.data?.ok == true && response?.data?.posts?.length) return response.data.posts

        return []

    }

    const generateNewBlogId = async () => {

        const post = await Axios.post('/post')

        console.log('Post has created ', post)

        return post?.data?.post?.id || null
    }

    const redirectToNewPostEditor = async () => {

        const postId = await generateNewBlogId()

        console.log('Redirecting to post id', postId)

        return Router.push(`/write/${postId}`)

    }

    const getRedirectingUrl = async () => {

        // console.log(draftedPosts().length)
        const checkDraftedPosts = await draftedPosts()

        if (checkDraftedPosts.length ) return '/write/drafted_posts'

        const postId = await generateNewBlogId()

        return `/write/${postId}`
    }

    return { draftedPosts, generateNewBlogId, redirectToNewPostEditor, getRedirectingUrl, editingPost, editingPostLoading }
}
