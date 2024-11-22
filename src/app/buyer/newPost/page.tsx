'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Header from '@/features/components/Header'
import Brand from '@/features/form/Brand'
import { formSchema } from '@/lib/schemas/formSchema'
import EstimatedPrice from '@/features/form/EstimatedPrice'
import Condition from '@/features/form/Condition'
import ConditionDetails from '@/features/form/ConditionDetails'
import Notes from '@/features/form/Notes'
import Images from '@/features/form/Images'
import { Undo2 } from 'lucide-react'
import Link from 'next/link'
import { addAppraisalPost } from '@/lib/supabase/supabaseFunctions'
import { useEffect, useState } from 'react'
import { initializeFirebaseApp } from '@/lib/firebase/firebaseConfig'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import ProtectedRoute from '@/app/protectedRoute'

export default function AssessmentForm() {

  const [ isLoading, setIsLoading ] = useState<boolean>(false)
    
  useEffect(() => {
      initializeFirebaseApp();
  }, []);
  
  const router = useRouter();
  const { user } = useAuth();

  const { control, handleSubmit, setValue, formState: {errors} } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      estimatedPrice: undefined,
      conditionRank: "",
      conditionDetails: "",
      notes: "",
      images: []
    },
  })
  const methods = useForm();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
        if (user && user.displayName) {
            const { error } = await addAppraisalPost(values, user.displayName);
            
            if (error) {
                // エラーが発生した場合
                throw new Error(`エラーが発生しました: ${error}`);
            }
            
            await router.push("/buyer/Home");
        } else {
            throw new Error("ユーザー情報が不足しています");
        }
    } catch (err) {
        // エラーをキャッチしてアラートを表示
        console.error(err);
        window.alert(err || "エラーが発生しました");
    } finally {
        // 最終的にローディングを解除
        setIsLoading(false);
    }
};


  return (
    <ProtectedRoute>
    <Header />
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
          <CardTitle className="text-3xl font-bold">査定依頼フォーム</CardTitle>
          <CardDescription className="text-blue-100">商品の詳細情報を入力してください</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Brand control={control} errors={errors}/>
                <EstimatedPrice control={control} errors={errors}/>
              </div>
              <Separator className="my-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Condition control={control} errors={errors} />
                <ConditionDetails control={control} />
              </div>
              <Separator className="my-6" />
              <Notes control={control} />
              <Images control={control} setValue={setValue} errors={errors} />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                disabled={isLoading}>
                {isLoading ? 
                  "査定依頼投稿中…"
                  :
                  "査定を依頼する"
                }
              </Button>
            </form>
          </FormProvider>
          <Link href={'/buyer/Home'}>
            <Button className='w-full bg-gray-600 hover:bg-gray-700 mt-3' disabled={isLoading}>
              <Undo2 className="w-4 h-4 mr-2" />
              <span>依頼せずに戻る</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
    </ProtectedRoute>
  )
}