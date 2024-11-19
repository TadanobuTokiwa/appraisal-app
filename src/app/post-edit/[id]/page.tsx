'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, DollarSign, Star, FileText, LucideImage, Hash, CreditCard, User, UserCheck, Save } from 'lucide-react'

// Placeholder data (same as in the detail view)
const initialAssessmentData = {
    brandName: "ブランドA",
    modelName: "モデルX",
    serialNumber: "SN12345",
    buyerEstimate: 100000,
    responseRange: { min: 90000, max: 110000 },
    conditionRank: "A",
    conditionDetails: "若干の使用感あり",
    notes: "特記事項なし",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    poster: "田中太郎",
    respondent: "鈴木花子"
}

export default function AssessmentEdit() {
    const [assessmentData, setAssessmentData] = useState(initialAssessmentData)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setAssessmentData(prev => ({ ...prev, [name]: value }))
    }

    const handleRangeChange = (type: 'min' | 'max', value: string) => {
        setAssessmentData(prev => ({
        ...prev,
        responseRange: { ...prev.responseRange, [type]: parseInt(value) || 0 }
        }))
    }

return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">査定依頼編集</h1>
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
                <div className="space-y-2">
                    <Label htmlFor="buyerEstimate" className="flex items-center text-lg font-semibold text-gray-700">
                    <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                    バイヤー予想額
                    </Label>
                    <Input
                    id="buyerEstimate"
                    name="buyerEstimate"
                    type="number"
                    value={assessmentData.buyerEstimate}
                    onChange={handleInputChange}
                    />
                </div>
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
                <div className="space-y-2">
                    <Label htmlFor="conditionRank" className="flex items-center text-lg font-semibold text-gray-700">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    状態ランク
                    </Label>
                    <Select
                    value={assessmentData.conditionRank}
                    onValueChange={(value) => setAssessmentData(prev => ({ ...prev, conditionRank: value }))}
                    >
                    <SelectTrigger id="conditionRank">
                        <SelectValue placeholder="ランクを選択" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </div>
                <div className="space-y-2">
                <Label htmlFor="conditionDetails" className="flex items-center text-lg font-semibold text-gray-700">
                    <FileText className="w-5 h-5 mr-2 text-purple-500" />
                    状態補足
                </Label>
                <Textarea
                    id="conditionDetails"
                    name="conditionDetails"
                    value={assessmentData.conditionDetails}
                    onChange={handleInputChange}
                    rows={3}
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="notes" className="flex items-center text-lg font-semibold text-gray-700">
                    <FileText className="w-5 h-5 mr-2 text-orange-500" />
                    備考
                </Label>
                <Textarea
                    id="notes"
                    name="notes"
                    value={assessmentData.notes}
                    onChange={handleInputChange}
                    rows={3}
                />
                </div>
                <div className="space-y-2">
                <Label className="flex items-center text-lg font-semibold text-gray-700">
                    <LucideImage className="w-5 h-5 mr-2 text-pink-500" />
                    画像
                </Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                    {assessmentData.images.map((src, index) => (
                    <div key={index} className="relative">
                        <Image
                        src={src}
                        alt={`商品画像 ${index + 1}`}
                        width={200}
                        height={200}
                        className="rounded-md object-cover w-full h-40"
                        />
                        <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => {/* Implement image change logic */}}
                        >
                        変更
                        </Button>
                    </div>
                    ))}
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="poster" className="flex items-center text-lg font-semibold text-gray-700">
                    <User className="w-5 h-5 mr-2 text-blue-500" />
                    投稿者
                    </Label>
                    <Input
                    id="poster"
                    name="poster"
                    value={assessmentData.poster}
                    onChange={handleInputChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="respondent" className="flex items-center text-lg font-semibold text-gray-700">
                    <UserCheck className="w-5 h-5 mr-2 text-green-500" />
                    回答担当者
                    </Label>
                    <Input
                    id="respondent"
                    name="respondent"
                    value={assessmentData.respondent}
                    onChange={handleInputChange}
                    />
                </div>
                </div>
                <Button className="w-full">
                <Save className="w-4 h-4 mr-2" />
                保存
                </Button>
            </CardContent>
            </Card>
        </div>
        </div>
    )
}