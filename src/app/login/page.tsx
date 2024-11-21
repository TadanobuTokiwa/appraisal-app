'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LoginPage() {

    const router = useRouter()

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
    
        if (error) {
            console.error('OAuth Error:', error.message);
            return;
        }
    
        // セッションが返ってきた場合に続行
        const session = await supabase.auth.getSession();
        const user = session?.data.session?.user;
    
        if (!user) {
            window.alert('ログインに失敗しました。');
            return;
        }
    
        const emailDomain = user.email?.split('@')[1];
        if (emailDomain !== 'rext.work') {
            window.alert('@rext.work以外のメールアドレスはログインできません。');
            await supabase.auth.signOut();
            return;
        }
    
        const { data: userData, error: fetchError } = await supabase
            .from('user')
            .select('id, usertype')
            .eq('id', user.id)
            .single();
    
        if (fetchError || !userData) {
            router.push('/select-usertype');
            return;
        }
    
        if (userData.usertype === 'buyer') {
            router.push('/buyer/Home');
        } else if (userData.usertype === 'respondent') {
            router.push('/respondent/Home');
        } else {
            window.alert('無効なユーザータイプです。');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">ログイン</CardTitle>
            <CardDescription className="text-center">
                @rext.workのアカウントでログインを行ってください
            </CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline" type="button" onClick={() => handleGoogleLogin()} className='w-full'>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Googleでログイン
                </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
                <p>このアプリはテストのため下記リンクをしてください。</p>
                <Link href="/buyer/Home" className="underline text-indigo-600 hover:text-indigo-800">
                    バイヤー で ログイン
                </Link>
            </div>
            </CardFooter>
        </Card>
        </div>
    )
}