'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileBox, FileDigit, Tag, DollarSign, Star, FileText, Image as LucideImage, Receipt, User, UserCheck } from 'lucide-react'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import image1 from '@/public/images/IMG_0044.jpeg'
import image2 from '@/public/images/IMG_0045.jpeg'
import image3 from '@/public/images/IMG_0046.jpeg'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const ItemInfo = () => {

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
            image1,
            image2,
            image3,
        ],
        poster: "田中太郎",
        respondent: "鈴木花子"
    }

    const params = useParams();
    const id = params.id

    return (
        <Card className="bg-white bg-opacity-90">
        <CardHeader>
            <CardTitle className="flex justify-between text-2xl font-bold text-indigo-900">
                <strong>商品情報</strong>
                <Link href={`/post-response/${id}`}>
                    <Button className='bg-indigo-900'>回答</Button>
                </Link>
            </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <Tag className="w-5 h-5 mr-2 text-blue-500" />
                ブランド名
                </h3>
                <p>{assessmentData.brandName}</p>
            </div>
            <div>
                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <FileBox className="w-5 h-5 mr-2 text-purple-500" />
                モデル、ライン名
                </h3>
                <p>{assessmentData.modelName}</p>
            </div>
            <div>
                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <FileDigit className="w-5 h-5 mr-2 text-indigo-500" />
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
                <Receipt className="w-5 h-5 mr-2 text-pink-500" />
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
    )
}

export default ItemInfo