import React from 'react'
import PostsList from './posts-list'
import { getRecentPosts } from '@/lib/queries/post'
import RecentPost from './recent-post';

export default async function RecentPostsList() {
    const posts = await getRecentPosts();

    return (
        <div className="flex flex-col flex-wrap gap-3">
            <h1 className="text-2xl text-slate-600 my-4">Recent posts</h1>
            <div className="flex flex-wrap gap-3">
                {posts.map((post) => (
                    <RecentPost key={post.id} {...post} />
                ))}
            </div>
        </div>
    )
}
