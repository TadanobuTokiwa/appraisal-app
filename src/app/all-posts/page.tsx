'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon, Search } from 'lucide-react'
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import Header from '@/features/components/Header'
import ItemsList from '@/features/PostsList'

export default function AllPosts() {
    const [searchDate, setSearchDate] = useState<Date | undefined>()
    const [searchPoster, setSearchPoster] = useState("")

    const handleSearch = () => {
        // 処理を記入
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
                            <ItemsList />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}