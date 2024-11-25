import { Tag } from 'lucide-react'
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { brandNames } from '@/lib/brandNames';
import { Control, FieldErrors } from 'react-hook-form';

type FormPropsType = {
    control: Control<any>;
    errors: FieldErrors<any>;
};

const Brand: React.FC<FormPropsType> = ({control, errors}) => {
    return (
        <FormField
            control={control}
            name="brand"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="flex items-center text-lg font-semibold text-gray-700">
                    <Tag className="w-5 h-5 mr-2 text-blue-500" />
                    ブランド名
                    <div className='ml-3 text-sm text-red-500'>※必須</div>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                        <SelectTrigger className="bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm">
                            <SelectValue placeholder="ブランドを選択してください" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {brandNames.map((name, index) => {
                            return <SelectItem key={index} value={name}>{name}</SelectItem>
                        })}
                    </SelectContent>
                </Select>
                {errors?.brand && (
                    <p className="text-red-500 text-sm mt-1">{errors.brand.message as string}</p>
                )}
            </FormItem>
            )}
        />
    )
}

export default Brand