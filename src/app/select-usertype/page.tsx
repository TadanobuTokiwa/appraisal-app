'use client'

import { useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import ProtectedRoute from "../protectedRoute"
import { initializeFirebaseApp } from "@/lib/firebase/firebaseConfig"
import { useAuth } from "@/context/AuthContext"
import { addUser } from "@/lib/supabase/supabaseFunctions"
import { Loader } from "lucide-react"

const Page = () => {

    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    
    useEffect(() => {
        initializeFirebaseApp();
    }, []);
    
    const router = useRouter();
    const { user } = useAuth();

    const handleSelection = async(type: string) => {
        setIsLoading(true)
        if(user && user.displayName && user.email){
            const { error } = await addUser(user.uid, user.displayName, user.email, type)
            if(error){
                window.alert("エラー:" + error.message)
                setIsLoading(false)
                return
            }
            router.push(type === 'buyer' ? '/buyer/Home' : '/respondent/Home')
        }else{
            window.alert("【エラー】ログイン画面からやり直してください")
            setIsLoading(false)
        }
        
    }

    return (
        <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
            <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-indigo-900">
                <span className="mx-2">{user?.displayName}</span>さん、はじめまして！
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
            <p className="text-center text-gray-600">
                ユーザータイプを選択してください
            </p>
            <div className="grid grid-cols-1 gap-4">
                <Button
                className="h-14 text-lg font-semibold bg-gray-400"
                onClick={() => handleSelection('buyer')}
                disabled={isLoading}
                >
                    バイヤー
                </Button>
                <Button
                className="h-14 text-lg font-semibold bg-gray-400"
                onClick={() => handleSelection('respondent')}
                disabled={isLoading}
                >
                    回答者(セラー、SCM)
                </Button>
            </div>
            </CardContent>
            <CardFooter>
                {isLoading ? 
                <div className="w-full flex items-center justify-center">
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    <span className="font-bold">登録中...</span> 
                </div>
                : 
                <></>}
            </CardFooter>
        </Card>
        </div>
        </ProtectedRoute>
    )
}

export default Page