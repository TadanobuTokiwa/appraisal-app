import { useState } from "react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form"

type FormPropsType = {
    control: Control<any>;
    setValue: UseFormSetValue<any>;
    errors: FieldErrors<any>;
};

const Images: React.FC<FormPropsType> = ({control, setValue, errors}) => {

    const [imagePreview, setImagePreview] = useState<string[]>([])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setValue('images', files)
        
        const previews = files.map(file => URL.createObjectURL(file))
        setImagePreview(previews)
    }

    return (
        <FormField
            control={control}
            name="images"
            render={() => (
                <FormItem>
                <FormLabel className="flex items-center text-lg font-semibold text-gray-700">
                    <ImageIcon className="w-5 h-5 mr-2 text-pink-500" />
                    商品画像
                    <div className='ml-3 text-sm text-red-500'>※必須</div>
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
                {errors?.images && (
                    <p className="text-red-500 text-sm mt-1">{errors.images.message as string}</p>
                )}
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
    )
}

export default Images