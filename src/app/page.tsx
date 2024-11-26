'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { fetchUser } from "@/lib/supabase/supabaseFunctions";

const Page = () => {

    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        const pageChenge = async() => {
            let usertype = ""
            if(user){
                const { data: userData } = await fetchUser(user.uid)
                if(userData){
                    usertype = userData.usertype
                }
            }
            
            if (usertype) {
                router.push(`/${usertype}/Home`);
            } else {
                router.push('/login');
            }
            setIsLoading(false);
        }
        
        pageChenge()
    },[router, user]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="mt-4 text-lg font-medium text-gray-600">認証状態を確認中...</p>
            </div>
        )
    }
    
    return <></>
}

export default Page