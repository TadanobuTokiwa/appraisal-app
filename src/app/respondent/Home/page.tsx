import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, ArrowRight } from 'lucide-react'
import Header from '@/features/components/Header'
import PostsList from '@/features/PostsList'

// 仮のデータ
const nonCompllantPosts = [
    { id: 1, brand: 'ブランドA', itemName: '商品1', lastUpdated: '2023-06-10 10:30', status: '査定中', thumbnail: "" },
    { id: 3, brand: 'ブランドC', itemName: '商品3', lastUpdated: '2023-06-10 14:20', status: '査定中', thumbnail: "" },
]

export default function MenuScreen() {
    return (
        <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
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
                <CardTitle className="text-2xl font-bold text-indigo-900">未対応 の 投稿</CardTitle>
            </CardHeader>
            <CardContent>
                <PostsList posts={nonCompllantPosts} destination={"post-edit"}/>
            </CardContent>
            </Card>
        </div>
        </div>
        </>
    )
}