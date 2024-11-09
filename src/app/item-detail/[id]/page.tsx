'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Send, Camera, DollarSign, Star, FileText, Image as LucideImage, Hash, CreditCard, User, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Header from '@/features/components/Header'

const assessmentData = {
    brandName: "ブランドA",
    modelName: "モデルX",
    serialNumber: "SN12345",
    buyerEstimate: 100000,
    responseRange: { min: 90000, max: 110000 },
    conditionRank: "A",
    conditionDetails: "若干の使用感あり",
    notes: "特記事項なし",
    images: [
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZln48VY7CdnZsCu09TSqtxXhT4fGfLhyphenhyphenffIUg2kt94UfNYsVr2UoH-xo9rvZX95A-HHI561vDnygAGJTvCkHL9T9reHg4DWQJNQkfdzRf9rOEuoRERkO0aBL9F7REmN2Koj8xO84CUJs/s800/pool_+bag.png",
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZln48VY7CdnZsCu09TSqtxXhT4fGfLhyphenhyphenffIUg2kt94UfNYsVr2UoH-xo9rvZX95A-HHI561vDnygAGJTvCkHL9T9reHg4DWQJNQkfdzRf9rOEuoRERkO0aBL9F7REmN2Koj8xO84CUJs/s800/pool_+bag.png",
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZln48VY7CdnZsCu09TSqtxXhT4fGfLhyphenhyphenffIUg2kt94UfNYsVr2UoH-xo9rvZX95A-HHI561vDnygAGJTvCkHL9T9reHg4DWQJNQkfdzRf9rOEuoRERkO0aBL9F7REmN2Koj8xO84CUJs/s800/pool_+bag.png",
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZln48VY7CdnZsCu09TSqtxXhT4fGfLhyphenhyphenffIUg2kt94UfNYsVr2UoH-xo9rvZX95A-HHI561vDnygAGJTvCkHL9T9reHg4DWQJNQkfdzRf9rOEuoRERkO0aBL9F7REmN2Koj8xO84CUJs/s800/pool_+bag.png",
    ],
    poster: "田中太郎",
    respondent: "鈴木花子"
}

interface messageType {
    sender: string;
    message: string;
    image?: string | null;
}

const chatMessages: messageType[] = [
    { sender: "田中太郎", message: "こちらの商品の状態について詳しく教えていただけますか？" },
    { sender: "鈴木花子", message: "はい、商品は全体的に良好な状態です。若干の使用感はありますが、大きな傷や汚れは見られません。" },
]

export default function AssessmentDetail() {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState(chatMessages)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const sendMessage = () => {
        if (message.trim() || selectedImage) {
        setMessages([...messages, { sender: "あなた", message, image: selectedImage }])
        setMessage("")
        setSelectedImage(null)
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
            setSelectedImage(reader.result as string)
        }
        reader.readAsDataURL(file)
        }
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-indigo-900 mb-8">査定依頼詳細</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="bg-white bg-opacity-90">
                        <CardHeader>
                            <CardTitle className="flex justify-between text-2xl font-bold text-indigo-900">
                                <strong>商品情報</strong>
                                <Button className='bg-indigo-900'>編集</Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                                <Camera className="w-5 h-5 mr-2 text-blue-500" />
                                ブランド名
                                </h3>
                                <p>{assessmentData.brandName}</p>
                            </div>
                            <div>
                                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                                <FileText className="w-5 h-5 mr-2 text-purple-500" />
                                モデル、ライン名
                                </h3>
                                <p>{assessmentData.modelName}</p>
                            </div>
                            <div>
                                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                                <Hash className="w-5 h-5 mr-2 text-indigo-500" />
                                型番、シリアル
                                </h3>
                                <p>{assessmentData.serialNumber}</p>
                            </div>
                            <div>
                                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                                バイヤー予想額
                                </h3>
                                <p>¥{assessmentData.buyerEstimate.toLocaleString()}</p>
                            </div>
                            <div>
                                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                                <CreditCard className="w-5 h-5 mr-2 text-pink-500" />
                                回答額
                                </h3>
                                <p>¥{assessmentData.responseRange.min.toLocaleString()} - ¥{assessmentData.responseRange.max.toLocaleString()}</p>
                            </div>
                            <div>
                                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                                状態ランク
                                </h3>
                                <p>{assessmentData.conditionRank}</p>
                            </div>
                            </div>
                            <div>
                            <h3 className="flex items-center text-lg font-semibold text-gray-700">
                                <FileText className="w-5 h-5 mr-2 text-purple-500" />
                                状態補足
                            </h3>
                            <p>{assessmentData.conditionDetails}</p>
                            </div>
                            <div>
                            <h3 className="flex items-center text-lg font-semibold text-gray-700">
                                <FileText className="w-5 h-5 mr-2 text-orange-500" />
                                備考
                            </h3>
                            <p>{assessmentData.notes}</p>
                            </div>
                            <div>
                            <h3 className="flex items-center text-lg font-semibold text-gray-700">
                                <LucideImage className="w-5 h-5 mr-2 text-pink-500" />
                                画像
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                                {assessmentData.images.map((src, index) => (
                                <Dialog key={index}>
                                    <DialogTrigger asChild>
                                    <Image
                                        src={src}
                                        alt={`商品画像 ${index + 1}`}
                                        width={200}
                                        height={200}
                                        className="rounded-md object-cover w-full h-40 cursor-pointer"
                                    />
                                    </DialogTrigger>
                                    <VisuallyHidden>
                                        <DialogTitle>Hidden Dialog Title</DialogTitle>
                                    </VisuallyHidden>
                                    <DialogContent className="max-w-3xl">
                                        <Link href={src}>
                                            <Image
                                                src={src}
                                                alt={`商品画像 ${index + 1}`}
                                                width={800}
                                                height={800}
                                                className="rounded-md object-contain w-full h-full"
                                            />
                                        </Link>
                                    </DialogContent>
                                </Dialog>
                                ))}
                            </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                                <User className="w-5 h-5 mr-2 text-blue-500" />
                                投稿者
                                </h3>
                                <p>{assessmentData.poster}</p>
                            </div>
                            <div>
                                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                                <UserCheck className="w-5 h-5 mr-2 text-green-500" />
                                回答担当者
                                </h3>
                                <p>{assessmentData.respondent}</p>
                            </div>
                            </div>
                        </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-1">
                        <Card className="bg-white bg-opacity-90 h-full flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-indigo-900">チャット</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                            <ScrollArea className="flex-grow mb-4 h-[calc(100vh-400px)] lg:h-[calc(100vh-300px)]">
                            {messages.map((msg, index) => (
                                <div key={index} className="mb-4">
                                <p className="font-semibold text-indigo-700">{msg.sender}</p>
                                {msg.message && <p className="bg-indigo-100 p-2 rounded-md">{msg.message}</p>}
                                {msg.image && (
                                    <Dialog>
                                    <DialogTrigger asChild>
                                        <Image
                                        src={msg.image}
                                        alt="チャット画像"
                                        width={200}
                                        height={200}
                                        className="rounded-md object-cover w-full h-40 mt-2 cursor-pointer"
                                        />
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                        <Image
                                        src={msg.image}
                                        alt="チャット画像"
                                        width={800}
                                        height={800}
                                        className="rounded-md object-contain w-full h-full"
                                        />
                                    </DialogContent>
                                    </Dialog>
                                )}
                                </div>
                            ))}
                            </ScrollArea>
                            <Separator className="my-4" />
                            <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                                <Input
                                placeholder="メッセージを入力..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="flex-grow mr-2"
                                />
                                <Button onClick={sendMessage}>
                                <Send className="h-4 w-4" />
                                <span className="sr-only">送信</span>
                                </Button>
                            </div>
                            <div className="flex items-center">
                                <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="flex-grow mr-2"
                                />
                                {selectedImage && (
                                <Image
                                    src={selectedImage}
                                    alt="アップロード画像プレビュー"
                                    width={50}
                                    height={50}
                                    className="rounded-md object-cover"
                                />
                                )}
                            </div>
                            </div>
                        </CardContent>
                        </Card>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
    }