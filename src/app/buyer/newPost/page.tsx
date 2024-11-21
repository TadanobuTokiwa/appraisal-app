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

export default function AssessmentForm() {

  const { control, handleSubmit, setValue, formState: {errors} } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
      estimatedPrice: undefined,
      condition: "",
      conditionDetails: "",
      notes: "",
      images: []
    },
  })
  const methods = useForm();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // TODO: ここで査定依頼を送信する処理を実装します
  }

  return (
    <>
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
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                査定を依頼する
              </Button>
            </form>
          </FormProvider>
          <Link href={'/buyer/Home'}>
            <Button className='w-full bg-gray-600 hover:bg-gray-700 mt-3'>
              <Undo2 className="w-4 h-4 mr-2" />
              <span>依頼せずに戻る</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
    </>
  )
}