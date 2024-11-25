'use client';

import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { useParams, useRouter } from 'next/navigation'
import Brand from '@/features/form/Brand'
import ModelName from '@/features/form/ModelName'
import SerialNumber from '@/features/form/SerialNumber'
import ResponseRangeMin from '@/features/form/ResponseRangeMin'
import ResponseRangeMax from '@/features/form/ResponseRangeMax'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { DialogTitle } from '@radix-ui/react-dialog'
import { Separator } from '@/components/ui/separator'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Save, Undo2 } from 'lucide-react'
import Link from 'next/link'
import { responseSchema } from '@/lib/schemas/formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { appraisal_posts } from '@/types/supabaseTableTypes';
import { getAppraisalPostById, updateAppraisalPostById } from '@/lib/supabase/supabaseFunctions';
import { useAuth } from '@/context/AuthContext';

const ResponseForm = () => {

    const [ initialAssessmentData, setInitialAssessmentData ] = useState<appraisal_posts | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    const { user } = useAuth();

    const params = useParams()
    const id = Number(params.id)
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const result = await getAppraisalPostById(id);
            if (result) {
                setInitialAssessmentData(result[0]);
            }
            setIsLoading(false);
        };
    
        getData();
    }, [id]);

    const { control, handleSubmit, reset, formState: {errors}} = useForm<z.infer<typeof responseSchema>>({
        resolver: zodResolver(responseSchema),
        defaultValues: {
            brand: "",
            responseMin: 0,
            responseMax: 0,
            modelName: "",
            serialNumber: "",
        },
    })
    const methods = useForm();

    useEffect(() => {
        if (initialAssessmentData) {
            reset({
                brand: initialAssessmentData.brand || "",
                responseMin: initialAssessmentData.responseMin ?? (initialAssessmentData.estimatedPrice || 0),
                responseMax: initialAssessmentData.responseMax ?? (initialAssessmentData.estimatedPrice || 0),
                modelName: initialAssessmentData.modelName || "",
                serialNumber: initialAssessmentData.serialNumber || "",
            });
        }
    }, [initialAssessmentData, reset]);

    const router = useRouter();

    const onSubmit = async(values: z.infer<typeof responseSchema>) => {
        try {
            if(user?.displayName){
                const newPost = {
                    ...initialAssessmentData,
                    ...values,
                    respondent: user?.uid,
                    status: "対応済み",
                }
                console.log(newPost)
                const error = await updateAppraisalPostById(id, newPost)
        
                if( !error ) {
                    router.push(`/post-detail/${id}`)
                }else{
                    window.alert("エラーが発生しました")
                }
            }else{
                window.alert("エラーが発生しました")
            }
        }catch{
            window.alert("エラーが発生しました")
        }
    }

    if(isLoading || !initialAssessmentData){
        return(
            <h1 className='text-2xl font-bold'>Loading...</h1>
        )
    }

    return (
        <Card className="bg-white bg-opacity-90">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-900">商品情報</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Brand control={control} errors={errors} />
                        </div>
                        <div className="space-y-2">
                            <ModelName control={control} />
                        </div>
                        <div className="space-y-2">
                            <SerialNumber control={control} />
                        </div>
                        <div className="space-y-2"></div>
                        <div className="space-y-2">
                            <ResponseRangeMin control={control} errors={errors} />
                        </div>
                        <div className="space-y-2">
                            <ResponseRangeMax control={control} errors={errors} />
                        </div>
                        </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            <Save className="w-4 h-4 mr-2" />
                            回答を保存
                    </Button>
                    </form>
                </FormProvider>
            <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                    <Label className="text-lg font-semibold text-gray-700">バイヤー予想額</Label>
                    <p className="text-gray-600">¥{initialAssessmentData.estimatedPrice.toLocaleString()}</p>
                </div>
                <div className="space-y-2">
                    <Label className="text-lg font-semibold text-gray-700">状態ランク</Label>
                    <p className="text-gray-600">{initialAssessmentData.conditionRank}</p>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label className="text-lg font-semibold text-gray-700">状態補足</Label>
                    <p className="text-gray-600">{initialAssessmentData.conditionDetails}</p>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label className="text-lg font-semibold text-gray-700">備考</Label>
                    <p className="text-gray-600">{initialAssessmentData.notes}</p>
                </div>
                <div className="space-y-2">
                    <Label className="text-lg font-semibold text-gray-700">投稿者</Label>
                    <p className="text-gray-600">{initialAssessmentData.poster}</p>
                </div>
                </div>

                <div className="space-y-2">
                <Label className="text-lg font-semibold text-gray-700">投稿画像</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {JSON.parse(initialAssessmentData.images).map((src: string, index: number) => (
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
            </CardContent>
            <CardFooter className='grid grid-rows-1'>
                <Link href={`/post-detail/${id}`}>
                    <Button className="w-full bg-gray-600 hover:bg-gray-700">
                        <Undo2 className="w-4 h-4 mr-2" />
                        <span>保存せずに戻る</span>
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

export default ResponseForm