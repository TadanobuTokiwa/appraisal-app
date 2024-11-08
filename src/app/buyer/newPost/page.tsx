'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Header from '@/features/components/Header'
import Brand from '@/features/components/newPost/Brand'
import { formSchema } from '@/lib/schemas/formSchema'
import EstimatedPrice from '@/features/components/newPost/EstimatedPrice'
import Condition from '@/features/components/newPost/Condition'
import ConditionDetails from '@/features/components/newPost/ConditionDetails'
import Notes from '@/features/components/newPost/Notes'
import Images from '@/features/components/newPost/Images'

export default function AssessmentForm() {

  const form = useForm<z.infer<typeof formSchema>>({
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // TODO: ここで査定依頼を送信する処理を実装します
  }

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
          <CardTitle className="text-3xl font-bold">査定依頼フォーム</CardTitle>
          <CardDescription className="text-blue-100">商品の詳細情報を入力してください</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Brand form={form} />
                <EstimatedPrice form={form} />
              </div>
              <Separator className="my-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Condition form={form} />
                <ConditionDetails form={form} />
              </div>
              <Separator className="my-6" />
              <Notes form={form} />
              <Images form={form} />
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                査定を依頼する
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
    </>
  )
}