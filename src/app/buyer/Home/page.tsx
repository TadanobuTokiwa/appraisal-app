import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ListPlus, Eye, ArrowRight } from 'lucide-react'
import Header from '@/features/components/Header'
import image from '@/public/images/IMG_0044.jpeg'

// 仮のデータ
const todaysPosts = [
    { id: 1, brand: 'ブランドA', itemName: '商品1', lastUpdated: '2023-06-10 10:30', status: '査定中', thumbnail: image },
    { id: 2, brand: 'ブランドB', itemName: '商品2', lastUpdated: '2023-06-10 11:45', status: '完了', thumbnail: image },
    { id: 3, brand: 'ブランドC', itemName: '商品3', lastUpdated: '2023-06-10 14:20', status: '査定中', thumbnail: image },
]

export default function MenuScreen() {
    return (
        <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
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
                <CardTitle className="text-2xl font-bold text-indigo-900">本日の 田中 さんの投稿</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto -mx-6 px-6">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">サムネイル</TableHead>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>ブランド名</TableHead>
                        <TableHead>品名</TableHead>
                        <TableHead>最終更新日時</TableHead>
                        <TableHead>ステータス</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {todaysPosts.map((post) => (
                        <TableRow key={post.id}>
                        <TableCell>
                            <Image
                            src={post.thumbnail}
                            alt={`${post.itemName} のサムネイル`}
                            width={100}
                            height={100}
                            className="rounded-md object-cover"
                            />
                        </TableCell>
                        <TableCell className="font-medium">{post.id}</TableCell>
                        <TableCell>{post.brand}</TableCell>
                        <TableCell>{post.itemName}</TableCell>
                        <TableCell>{post.lastUpdated}</TableCell>
                        <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            post.status === '完了' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {post.status}
                            </span>
                        </TableCell>
                        <TableCell><a href={`/item-detail/${post.id}`}>詳細</a></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </CardContent>
            </Card>
        </div>
        </div>
        </>
    )
}