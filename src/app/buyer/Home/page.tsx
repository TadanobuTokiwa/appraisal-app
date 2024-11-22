'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ListPlus, Eye, ArrowRight } from 'lucide-react'
import Header from '@/features/components/Header'
import PostsList from '@/features/PostsList'
import { useAuth } from '@/context/AuthContext'
import ProtectedRoute from '@/app/protectedRoute'
import { getTodayAppraisalPostsByUser } from '@/lib/supabase/supabaseFunctions'
import { Loader } from "lucide-react"
import { appraisal_posts } from '@/types/supabaseTableTypes'

const Page = () => {

    const { user } = useAuth();
    const [posts, setPosts] = useState<appraisal_posts[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [ error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            if (user && user.displayName) {
                try {
                    const { data, error } = await getTodayAppraisalPostsByUser(user.displayName);
                    if (error) {
                        throw new Error(error.message);
                    }
                    setPosts(data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setError('ユーザー情報が見つかりません');
                setLoading(false);
            }
        };

        if( user ){
            fetchPosts();
        }
    }, [user]);

    return (
        <ProtectedRoute>
        <Header />
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-indigo-900 mb-12">バイヤー メニュー</h1>
            <div className="grid gap-6 md:grid-cols-2 mb-12">
            <Link href="/all-posts" className="transform transition duration-500 hover:scale-105">
                <Card className="h-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-300">
                <CardContent className="flex flex-col items-center justify-center h-full p-6">
                    <Eye className="h-12 w-12 text-indigo-600 mb-4" />
                    <h2 className="text-2xl font-semibold text-indigo-900 mb-2">全ての投稿を閲覧</h2>
                    <p className="text-indigo-700 mb-4 text-center">過去の全ての査定依頼を確認できます</p>
                    <ArrowRight className="h-6 w-6 text-indigo-500" />
                </CardContent>
                </Card>
            </Link>
            <Link href="/buyer/newPost" className="transform transition duration-500 hover:scale-105">
                <Card className="h-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-300">
                <CardContent className="flex flex-col items-center justify-center h-full p-6">
                    <ListPlus className="h-12 w-12 text-indigo-600 mb-4" />
                    <h2 className="text-2xl font-semibold text-indigo-900 mb-2">新規投稿</h2>
                    <p className="text-indigo-700 mb-4 text-center">新しい査定依頼を作成します</p>
                    <ArrowRight className="h-6 w-6 text-indigo-500" />
                </CardContent>
                </Card>
            </Link>
            </div>

            <Card className="bg-white bg-opacity-90">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-900">本日の {user?.displayName} さんの投稿</CardTitle>
            </CardHeader>
            <CardContent>
                {
                    loading ?
                    <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        <span className="font-bold">読み込み中...</span> 
                    </> 
                    :
                    error ?
                    <span>{error}</span>
                    :
                    <PostsList posts={posts} />
                }
            </CardContent>
            </Card>
        </div>
        </div>
        </ProtectedRoute>
    )
}

export default Page;