'use client'

import * as z from 'zod'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Save, Undo2, Tag, FileDigit, Receipt } from 'lucide-react'
import Link from 'next/link'
import Header from '@/features/components/Header'
import { useForm } from 'react-hook-form'
import { responseSchema } from '@/lib/schemas/formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Brand from '@/features/form/Brand'

// Placeholder data
const initialAssessmentData = {
    brandName: "ブランドA",
    modelName: "モデルX",
    serialNumber: "SN12345",
    responseRange: { min: 90000, max: 110000 },
    // Other fields that are displayed but not editable
    buyerEstimate: 100000,
    conditionRank: "A",
    conditionDetails: "若干の使用感あり",
    notes: "特記事項なし",
    poster: "田中太郎",
    images: [
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZln48VY7CdnZsCu09TSqtxXhT4fGfLhyphenhyphenffIUg2kt94UfNYsVr2UoH-xo9rvZX95A-HHI561vDnygAGJTvCkHL9T9reHg4DWQJNQkfdzRf9rOEuoRERkO0aBL9F7REmN2Koj8xO84CUJs/s800/pool_+bag.png",
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZln48VY7CdnZsCu09TSqtxXhT4fGfLhyphenhyphenffIUg2kt94UfNYsVr2UoH-xo9rvZX95A-HHI561vDnygAGJTvCkHL9T9reHg4DWQJNQkfdzRf9rOEuoRERkO0aBL9F7REmN2Koj8xO84CUJs/s800/pool_+bag.png",
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZln48VY7CdnZsCu09TSqtxXhT4fGfLhyphenhyphenffIUg2kt94UfNYsVr2UoH-xo9rvZX95A-HHI561vDnygAGJTvCkHL9T9reHg4DWQJNQkfdzRf9rOEuoRERkO0aBL9F7REmN2Koj8xO84CUJs/s800/pool_+bag.png"
    ]
}

export default function AssessmentResponse() {

    const form = useForm<z.infer<typeof responseSchema>>({
        resolver: zodResolver(responseSchema),
        defaultValues: {
            brand: initialAssessmentData.brandName,
            responseMin: initialAssessmentData.responseRange.min,
            responseMax: initialAssessmentData.responseRange.max,
            modelName: initialAssessmentData.modelName,
            serialNumber: initialAssessmentData.serialNumber,
        },
    })

    const params = useParams()
    const id = params.id

    const handleSave = () => {
        // Here you would typically make an API call to save the data
        console.log('Saving response data:')
        console.log("査定回答が正常に保存されました。")
        // Redirect to a confirmation page or back to the list (you'll need to implement this route)
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">査定回答</h1>
                <Card className="bg-white bg-opacity-90">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-indigo-900">商品情報</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Brand form={form} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="modelName" className="flex items-center text-lg font-semibold text-gray-700">
                        <FileText className="w-5 h-5 mr-2 text-purple-500" />
                        モデル、ライン名
                        </Label>
                        <Input
                        id="modelName"
                        name="modelName"
                        value={assessmentData.modelName}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="serialNumber" className="flex items-center text-lg font-semibold text-gray-700">
                        <FileDigit className="w-5 h-5 mr-2 text-indigo-500" />
                        型番、シリアル
                        </Label>
                        <Input
                        id="serialNumber"
                        name="serialNumber"
                        value={assessmentData.serialNumber}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="space-y-2"></div>
                    <div className="space-y-2">
                        <Label htmlFor="responseRangeMin" className="flex items-center text-lg font-semibold text-gray-700">
                        <Receipt className="w-5 h-5 mr-2 text-pink-500" />
                        回答額（最小）
                        </Label>
                        <Input
                        id="responseRangeMin"
                        name="responseRangeMin"
                        type="number"
                        value={assessmentData.responseRange.min}
                        onChange={(e) => handleRangeChange('min', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="responseRangeMax" className="flex items-center text-lg font-semibold text-gray-700">
                        <Receipt className="w-5 h-5 mr-2 text-pink-500" />
                        回答額（最大）
                        </Label>
                        <Input
                        id="responseRangeMax"
                        name="responseRangeMax"
                        type="number"
                        value={assessmentData.responseRange.max}
                        onChange={(e) => handleRangeChange('max', e.target.value)}
                        />
                    </div>
                    </div>
                    
                    {/* Display-only fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="space-y-2">
                        <Label className="text-lg font-semibold text-gray-700">バイヤー予想額</Label>
                        <p className="text-gray-600">¥{assessmentData.buyerEstimate.toLocaleString()}</p>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-lg font-semibold text-gray-700">状態ランク</Label>
                        <p className="text-gray-600">{assessmentData.conditionRank}</p>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label className="text-lg font-semibold text-gray-700">状態補足</Label>
                        <p className="text-gray-600">{assessmentData.conditionDetails}</p>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label className="text-lg font-semibold text-gray-700">備考</Label>
                        <p className="text-gray-600">{assessmentData.notes}</p>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-lg font-semibold text-gray-700">投稿者</Label>
                        <p className="text-gray-600">{assessmentData.poster}</p>
                    </div>
                    </div>

                    <div className="space-y-2">
                    <Label className="text-lg font-semibold text-gray-700">投稿画像</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {assessmentData.images.map((src, index) => (
                    <Dialog key={index}>
                        <DialogTrigger asChild>
                        <Image
                            src={src}
                            alt={`商品画像 ${index + 1}`}
                            width={200}
                            height={200}
                            className="rounded-md object-cover w-full h-40 cursor-pointer hover:scale-105"
                        />
                        </DialogTrigger>
                        <VisuallyHidden>
                            <DialogTitle>Hidden Dialog Title</DialogTitle>
                        </VisuallyHidden>
                        <DialogContent className="max-w-3xl">
                                <Image
                                    src={src}
                                    alt={`商品画像 ${index + 1}`}
                                    width={800}
                                    height={800}
                                    className="rounded-md object-contain w-full h-full"
                                />
                        </DialogContent>
                    </Dialog>
                    ))}
                    </div>
                    </div>
                </CardContent>
                <CardFooter className='grid grid-rows-2 gap-4'>
                    <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
                        <Save className="w-4 h-4 mr-2" />
                        回答を保存
                    </Button>
                    <Link href={`/post-detail/${id}`}>
                        <Button className="w-full bg-gray-600 hover:bg-gray-700">
                            <Undo2 className="w-4 h-4 mr-2" />
                            <span>保存せずに戻る</span>
                        </Button>
                    </Link>
                </CardFooter>
                </Card>
            </div>
            </div>
        </>
    )
}