'use client'

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { fetchUser } from "@/lib/supabase/supabaseFunctions"
import { useRouter } from "next/navigation"

const ReturntoHomeButton = () => {

    const { user } = useAuth();
    const router = useRouter();

    const returnHome = async() => {
        if(user){
            const { data } = await fetchUser(user.uid)
            if(data){
                router.push(`/${data.usertype}/Home`)
            }else{
                window.alert("エラーが発生しました")
            }
        }else{
            window.alert("エラーが発生しました")
        }

    }

    return (
        <div className="mx-auto">
            <Button
                className="w-36"
                onClick={() => returnHome()}>
                ホーム画面へ戻る
            </Button>
        </div>
    )
}

export default ReturntoHomeButton