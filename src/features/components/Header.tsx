import Link from 'next/link'
import { LogOut, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-gray-800">
                        査定アプリ
                        </Link>
                    </div>
                    
                    <div className="hidden sm:flex items-center space-x-4">
                        <div className="flex items-center text-gray-600">
                        <User className="w-5 h-5 mr-2" />
                        <span className='font-bold'>ユーザー名</span>
                        </div>
                        <Button variant="outline">
                            <LogOut className="w-5 h-5 mr-2" />
                            ログアウト
                        </Button>
                    </div>

                    <div className="sm:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className='px-16' variant="outline" size="icon">
                                    <User className="w-4 h-4 mr-2" />
                                    ユーザー名
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                <LogOut className="w-4 h-4 mr-2" />
                                <span>ログアウト</span>  
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            </header>
            <div className="h-[64px]" />
        </>
    )
}