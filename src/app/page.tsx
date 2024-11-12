'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        const target = event.target as typeof event.target & {
        email: { value: string }
        password: { value: string }
        }

        const email = target.email.value
        const password = target.password.value

        // Here you would typically make an API call to authenticate the user
        // For demonstration, we'll use a timeout to simulate an API call
        setTimeout(() => {
            if (email === 'user@example.com' && password === 'password') {
                // Successful login
                router.push('/buyer/Home')
            } else {
                setError('Invalid email or password')
                setIsLoading(false)
            }
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">ログイン</CardTitle>
            <CardDescription className="text-center">
                アカウントにログインしてください
            </CardDescription>
            </CardHeader>
            <CardContent>
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">パスワード</Label>
                    <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    autoCapitalize="none"
                    autoComplete="current-password"
                    disabled={isLoading}
                    />
                </div>
                </div>
            </form>
            {error && (
                <p className="text-sm text-red-500 mt-2">{error}</p>
            )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    または
                </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={isLoading}>
                Googleでログイン
            </Button>
            <div className="text-center text-sm">
                このアプリはテストのため{' '}
                <Link href="/buyer/Home" className="underline text-indigo-600 hover:text-indigo-800">
                ここをクリック
                </Link>
                {' '}してください。
            </div>
            </CardFooter>
        </Card>
        </div>
    )
}