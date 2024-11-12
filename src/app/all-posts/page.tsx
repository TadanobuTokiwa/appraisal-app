'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar as CalendarIcon, Search } from 'lucide-react'
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import Header from '@/features/components/Header'

// Dummy data for demonstration
const allPosts = [
    { id: 1, date: '2023-06-01', poster: '田中太郎', brand: 'ブランドA', itemName: '商品1', status: '査定中' },
    { id: 2, date: '2023-06-02', poster: '鈴木花子', brand: 'ブランドB', itemName: '商品2', status: '完了' },
    { id: 3, date: '2023-06-03', poster: '佐藤次郎', brand: 'ブランドC', itemName: '商品3', status: '査定中' },
    { id: 4, date: '2023-06-04', poster: '山田優子', brand: 'ブランドD', itemName: '商品4', status: '完了' },
    { id: 5, date: '2023-06-05', poster: '田中太郎', brand: 'ブランドE', itemName: '商品5', status: '査定中' },
]

export default function AllPosts() {
    const [searchDate, setSearchDate] = useState<Date | undefined>()
    const [searchPoster, setSearchPoster] = useState("")
    const [filteredPosts, setFilteredPosts] = useState(allPosts)

    const handleSearch = () => {
        const filtered = allPosts.filter(post => {
            const dateMatch = !searchDate || post.date === format(searchDate, "yyyy-MM-dd")
            const posterMatch = !searchPoster || post.poster.includes(searchPoster)
            return dateMatch && posterMatch
        })
        setFilteredPosts(filtered)
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">全ての投稿</h1>
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-indigo-900">検索</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !searchDate && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {searchDate ? format(searchDate, "yyyy-MM-dd") : <span>投稿日を選択</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={searchDate}
                                    onSelect={setSearchDate}
                                    initialFocus
                                    />
                                </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex-1">
                                <Input
                                placeholder="投稿者名"
                                value={searchPoster}
                                onChange={(e) => setSearchPoster(e.target.value)}
                                />
                            </div>
                            <Button onClick={handleSearch} className="w-full sm:w-auto">
                                <Search className="mr-2 h-4 w-4" />
                                検索
                            </Button>
                            </div>
                        </CardContent>
                        </Card>
                        <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-indigo-900">投稿一覧</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>投稿日</TableHead>
                                    <TableHead>投稿者</TableHead>
                                    <TableHead>ブランド</TableHead>
                                    <TableHead>商品名</TableHead>
                                    <TableHead>ステータス</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {filteredPosts.map((post) => (
                                    <TableRow key={post.id}>
                                    <TableCell>{post.id}</TableCell>
                                    <TableCell>{post.date}</TableCell>
                                    <TableCell>{post.poster}</TableCell>
                                    <TableCell>{post.brand}</TableCell>
                                    <TableCell>{post.itemName}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        post.status === '完了' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {post.status}
                                        </span>
                                    </TableCell>
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