'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, ArrowRight, Loader, RefreshCw } from 'lucide-react'
import Header from '@/features/components/Header'
import PostsList from '@/features/PostsList'
import ProtectedRoute from '@/app/protectedRoute'
import { useEffect, useState } from 'react'
import { appraisal_posts } from '@/types/supabaseTableTypes'
import { getNotSupportedPosts } from '@/lib/supabase/supabaseFunctions'
import { Button } from '@/components/ui/button'

export default function MenuScreen() {

    const [ notSupportedList, setNotSupportedList ] = useState<appraisal_posts[] | null>(null)
    const [ isloading, setIsloading ] = useState<boolean>(true)
    const [ reload, setReload ] = useState<boolean>(true)

    useEffect(() => {
        const getList = async() => {
            setIsloading(true)

            const { data } = await getNotSupportedPosts()
            if(data){
                setNotSupportedList(data)
            }

            setIsloading(false)
        }

        getList()
    }, [reload])
    
    return (
        <ProtectedRoute>
        <Header />
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-indigo-900 mb-12">回答者 メニュー</h1>
            <div className="grid gap-6 grid-cols-1 mb-12">
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
            </div>

            <Card className="bg-white bg-opacity-90">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-900 flex justify-between">
                    未対応 の 投稿
                    <Button onClick={() => setReload(prev => !prev)}>
                        <RefreshCw />
                        更新
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    isloading ?
                    <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        <span className="font-bold">読み込み中...</span> 
                    </> 
                    :
                    <PostsList posts={notSupportedList} />
                }
            </CardContent>
            </Card>
        </div>
        </div>
        </ProtectedRoute>
    )
}