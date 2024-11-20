'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Camera, FileText, Hash, CreditCard, Save, ZoomIn, ZoomOut, Undo2 } from 'lucide-react'

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
    const [assessmentData, setAssessmentData] = useState(initialAssessmentData)
    const [zoomLevel, setZoomLevel] = useState(1)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setAssessmentData(prev => ({ ...prev, [name]: value }))
    }

    const handleRangeChange = (type: 'min' | 'max', value: string) => {
        setAssessmentData(prev => ({
        ...prev,
        responseRange: { ...prev.responseRange, [type]: parseInt(value) || 0 }
        }))
    }

    const handleSave = () => {
        // Here you would typically make an API call to save the data
        console.log('Saving response data:', assessmentData)
        console.log("査定回答が正常に保存されました。")
        // Redirect to a confirmation page or back to the list (you'll need to implement this route)
    }

    const zoomIn = () => {
        setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 3))
    }

    const zoomOut = () => {
        setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 0.5))
    }

    const ImageDialog = ({ src, alt }: { src: string, alt: string }) => (
        <Dialog>
        <DialogTrigger asChild>
            <Image
            src={src}
            alt={alt}
            width={200}
            height={200}
            className="rounded-md object-cover w-full h-40 cursor-pointer"
            />
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
            <div className="relative flex-grow overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <Image
                src={src}
                alt={alt}
                width={800}
                height={800}
                className="rounded-md object-contain"
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s' }}
                />
            </div>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
            <Button onClick={zoomOut} variant="outline" size="icon">
                <ZoomOut className="h-4 w-4" />
                <span className="sr-only">縮小</span>
            </Button>
            <Button onClick={zoomIn} variant="outline" size="icon">
                <ZoomIn className="h-4 w-4" />
                <span className="sr-only">拡大</span>
            </Button>
            </div>
        </DialogContent>
        </Dialog>
    )

    return (
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
                    <Label htmlFor="brandName" className="flex items-center text-lg font-semibold text-gray-700">
                    <Camera className="w-5 h-5 mr-2 text-blue-500" />
                    ブランド名
                    </Label>
                    <Input
                    id="brandName"
                    name="brandName"
                    value={assessmentData.brandName}
                    onChange={handleInputChange}
                    />
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
                    <Hash className="w-5 h-5 mr-2 text-indigo-500" />
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
                    <CreditCard className="w-5 h-5 mr-2 text-pink-500" />
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
                    <CreditCard className="w-5 h-5 mr-2 text-pink-500" />
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

                {/* Image section */}
                <div className="space-y-2">
                <Label className="text-lg font-semibold text-gray-700">投稿画像</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {assessmentData.images.map((src, index) => (
                    <ImageDialog key={index} src={src} alt={`商品画像 ${index + 1}`} />
                    ))}
                </div>
                </div>
            </CardContent>
            <CardFooter className='grid grid-rows-2 gap-4'>
                <Button onClick={handleSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                回答を保存
                </Button>
                <Button onClick={handleSave} className="w-full">
                <Undo2 className="w-4 h-4 mr-2" />
                保存せずに戻る
                </Button>
            </CardFooter>
            </Card>
        </div>
        </div>
    )
}