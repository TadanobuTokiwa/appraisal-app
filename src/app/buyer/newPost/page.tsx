'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileText, Image as ImageIcon } from 'lucide-react'
import Header from '@/features/components/Header'
import Image from 'next/image'
import Brand from '@/features/components/newPost/Brand'
import { formSchema } from '@/lib/schemas/formSchema'
import EstimatedPrice from '@/features/components/newPost/EstimatedPrice'
import Condition from '@/features/components/newPost/Condition'
import ConditionDetails from '@/features/components/newPost/ConditionDetails'

export default function AssessmentForm() {
  const [imagePreview, setImagePreview] = useState<string[]>([])

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    form.setValue('images', files)
    
    const previews = files.map(file => URL.createObjectURL(file))
    setImagePreview(previews)
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
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-lg font-semibold text-gray-700">
                      <FileText className="w-5 h-5 mr-2 text-orange-500" />
                      備考
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-white border-2 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm"
                      />
                    </FormControl>
                    <FormDescription>その他、伝えたいことがあれば入力してください。</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel className="flex items-center text-lg font-semibold text-gray-700">
                      <ImageIcon className="w-5 h-5 mr-2 text-pink-500" />
                      商品画像
                    </FormLabel>
                    <FormControl>
                      <div className="hidden lg:flex items-center justify-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">クリックしてアップロード</span> またはドラッグ＆ドロップ
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF (MAX. 800x400px)</p>
                          </div>
                          <Input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormControl>
                      <Input
                          id="dropzone-file"
                          type="file"
                          className="lg:hidden"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                      />
                    </FormControl>
                    <FormDescription>少なくとも1枚の画像をアップロードしてください。複数選択可能です。</FormDescription>
                    <FormMessage />
                    {imagePreview.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {imagePreview.map((src, index) => (
                          <Image key={index} src={src} width={50} height={50} alt={`プレビュー ${index + 1}`} className="w-full h-40 object-cover rounded-lg shadow-md" />
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />
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