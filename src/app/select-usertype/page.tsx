'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()

    const handleSelection = (type: string) => {
        // Here you would typically set the user type in your app's state or storage
        console.log(`Selected user type: ${type}`)
        // Redirect to the appropriate page based on user type
        router.push(type === 'buyer' ? '/buyer/Home' : '/respondent/Home')
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
            <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-indigo-900">
                ○○さん、はじめまして！
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
            <p className="text-center text-gray-600">
                ユーザータイプを選択してください
            </p>
            <div className="grid grid-cols-1 gap-4">
                <Button
                className="h-14 text-lg font-semibold"
                onClick={() => handleSelection('buyer')}
                >
                    バイヤー
                </Button>
                <Button
                className="h-14 text-lg font-semibold"
                onClick={() => handleSelection('seller')}
                >
                    回答者(セラー、SCM)
                </Button>
            </div>
            </CardContent>
        </Card>
        </div>
    )
}

export default Page