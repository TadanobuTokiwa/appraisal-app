'use client'

import { LogOut, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { getFirebaseServices } from '@/lib/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function Header() {

    const { user } = useAuth();
    const { auth } = getFirebaseServices();
    const router = useRouter();

    const logout = async() => {
        if (auth) {
            await signOut(auth)
            router.push('/login');
        }
    }

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-800">
                        査定アプリ
                        </span>
                    </div>
                    
                    <div className="hidden sm:flex items-center space-x-4">
                        <div className="flex items-center text-gray-600">
                        <User className="w-5 h-5 mr-2" />
                        <span className='font-bold mr-3'>{user?.displayName}</span>
                        </div>
                        <Button variant="outline" onClick={() => logout()}>
                            <LogOut className="w-5 h-5 mr-2" />
                            ログアウト
                        </Button>
                    </div>

                    <div className="sm:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className='px-16' variant="outline" size="icon">
                                    <User className="w-4 h-4 mr-2" />
                                    {user?.displayName}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    <span onClick={() => logout()}>ログアウト</span>  
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