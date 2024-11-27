'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileBox, FileDigit, Tag, DollarSign, Star, FileText, Image as LucideImage, Receipt, User, UserCheck, RefreshCw } from 'lucide-react'
import { DialogTitle } from '@radix-ui/react-dialog'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { fetchUser, getAppraisalPostById } from '@/lib/supabase/supabaseFunctions'
import { useEffect, useState } from 'react'
import { appraisal_posts, user } from '@/types/supabaseTableTypes'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/context/AuthContext'
import lineWorksIcon from '@/public/icons/LW_BI_Appicon.png'

const ItemInfo = () => {

    const [ assessmentData, setAssessmentData ] = useState<appraisal_posts | null>(null)
    const [ poster, setPoster ] = useState<user | null>(null)
    const [ respondent, setRespondent ] = useState<user | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ userType, setUserType ] = useState<string | null>("");
    const [ reload, setReload ] = useState<boolean>(true);

    const params = useParams();
    const id = Number(params.id)

    const { user } = useAuth();

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const result = await getAppraisalPostById(id);
            if (result) {
                setAssessmentData(result[0]);
                
                const { data: posterData } = await fetchUser(result[0].poster);
                if( posterData ){
                    setPoster(posterData)
                }
                const { data: respodentData } = await fetchUser(result[0].respondent);
                if( respodentData ){
                    setRespondent(respodentData)
                }
            }
            setIsLoading(false);
        };
    
        getData();
    }, [id, reload]);

    useEffect(() => {
        const getUser = async () => {
            if(user){
                const { data: userData } = await fetchUser(user.uid)
                if(userData){
                    setUserType(userData.usertype)
                }
            }
        }

        getUser()
    },[user])

    return (
        <Card className="bg-white bg-opacity-90">
        <CardHeader>
            <CardTitle className="grid grid-cols-1 sm:flex sm:justify-between text-2xl font-bold text-indigo-900">
                <strong>商品情報</strong>
                <em className='text-xl pt-1'>
                    {isLoading ? 
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    : 
                        "ステータス : " + assessmentData?.status
                    }
                </em>
                <div className='flex'>
                    <Button onClick={() => setReload(prev => !prev)}>
                        <RefreshCw />
                        更新
                    </Button>
                    {userType === "respondent" ?
                        <Button className='bg-indigo-900 ml-2'>
                            <Link href={`/post-response/${id}`}>
                                回答
                            </Link>
                        </Button>
                        :
                        <div></div>
                    }
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <Tag className="w-5 h-5 mr-2 text-blue-500" />
                ブランド名
                </h3>
                {isLoading ? 
                    <Skeleton className='w-full h-6 rounded-full'></Skeleton> :
                    <p>{assessmentData?.brand}</p>
                }
            </div>
            <div>
                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <FileBox className="w-5 h-5 mr-2 text-purple-500" />
                モデル、ライン名
                </h3>
                {isLoading ? 
                    <Skeleton className='w-full h-6 rounded-full'></Skeleton> :
                    <p>{assessmentData?.modelName}</p>
                }
            </div>
            <div>
                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <FileDigit className="w-5 h-5 mr-2 text-indigo-500" />
                型番、シリアル
                </h3>
                {isLoading ? 
                    <Skeleton className='w-full h-6 rounded-full'></Skeleton> :
                    <p>{assessmentData?.serialNumber}</p>
                }
            </div>
            <div>
                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                バイヤー予想額
                </h3>
                {isLoading ?
                    <Skeleton className='w-full h-6 rounded-full'></Skeleton> :
                    <p>¥{assessmentData?.estimatedPrice ? assessmentData?.estimatedPrice.toLocaleString() : ""}</p>
                }
            </div>
            <div>
                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <Receipt className="w-5 h-5 mr-2 text-pink-500" />
                回答額
                </h3>
                {isLoading ?
                    <Skeleton className='w-full h-6 rounded-full'></Skeleton> :
                    <p>
                        {assessmentData?.responseMin &&  assessmentData?.responseMax ? 
                        "¥" + assessmentData?.responseMin.toLocaleString() + " - " + 
                        "¥" + assessmentData?.responseMax.toLocaleString() : ""}
                    </p>
                }
            </div>
            <div>
                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                状態ランク
                </h3>
                {isLoading ? 
                    <Skeleton className='w-full h-6 rounded-full'></Skeleton> :
                    <p>{assessmentData?.conditionRank}</p>
                }
            </div>
            </div>
            <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <FileText className="w-5 h-5 mr-2 text-purple-500" />
                状態補足
            </h3>
                {isLoading ? 
                    <Skeleton className='w-full h-6 rounded-full'></Skeleton> :
                    <p>{assessmentData?.conditionDetails}</p>
                }
            </div>
            <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <FileText className="w-5 h-5 mr-2 text-orange-500" />
                備考
            </h3>
                {isLoading ? 
                    <Skeleton className='w-full h-6 rounded-full'></Skeleton> :
                    <p>{assessmentData?.notes}</p>
                }
            </div>
            <div>
            <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <LucideImage className="w-5 h-5 mr-2 text-pink-500" />
                画像
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                {isLoading ? 
                    <Skeleton className='w-full h-40'></Skeleton> :
                    JSON.parse(assessmentData!.images).map((src: string, index: number) => (
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
                                    <Link href={src} target='_blank' rel='noopener noreferrer' >
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
                    ))
                }
                
            </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                投稿者
                </h3>
                <div className='grid grid-cols-3'>
                    {isLoading ? 
                        <Skeleton className='w-full h-5 rounded-full'></Skeleton> :
                        <p>{poster?.username}</p>
                    }
                    {isLoading ? 
                        <></> :
                        poster?.email ?
                        <div className='col-span-2'>
                            <Link className='inline-block' target='_blank' rel='noopener noreferrer' href={`https://line.worksmobile.com/message/send?version=26&emailList=${poster.email}`}>
                                <Image src={lineWorksIcon} alt={"icon"} width={24} height={24}/>
                            </Link>
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
            <div>
                <h3 className="flex items-center text-lg font-semibold text-gray-700">
                <UserCheck className="w-5 h-5 mr-2 text-green-500" />
                回答担当者
                </h3>
                <div className='grid grid-cols-3'>
                    {isLoading ? 
                        <Skeleton className='w-full h-5 rounded-full'></Skeleton> :
                        <p>{respondent?.username}</p>
                    }
                    {isLoading ? 
                        <></> :
                        respondent?.email ?
                        <div className='col-span-2'>
                            <Link className="inline-block" target='_blank' rel='noopener noreferrer' href={`https://line.worksmobile.com/message/send?version=26&emailList=${respondent.email}`}>
                                <Image src={lineWorksIcon} alt={"icon"} width={24} height={24}/>
                            </Link>
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
            </div>
        </CardContent>
        </Card>
    )
}

export default ItemInfo