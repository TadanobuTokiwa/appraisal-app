import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { DollarSign } from 'lucide-react'
import { Control, FieldErrors } from "react-hook-form";

type FormPropsType = {
    control: Control<any>;
    errors: FieldErrors<any>;
};

const EstimatedPrice: React.FC<FormPropsType> = ({control, errors}) => {
    return (
        <FormField
            control={control}
            name="estimatedPrice"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="flex items-center text-lg font-semibold text-gray-700">
                    <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                    予想金額
                    <div className='ml-3 text-sm text-red-500'>※必須</div>
                </FormLabel>
                <FormControl>
                <Input
                    type="number"
                    value={field.value ?? ""}
                    onChange={e => {
                    const inputValue = e.target.value;
                    field.onChange(inputValue === "" ? undefined : Number(inputValue));
                    }}
                    className="bg-white border-2 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm"
                />
                </FormControl>
                <div className='flex justify-end gap-2'>
                <Button
                    type="button"
                    onClick={() => field.onChange(Math.floor((field.value || 0) * 10000))}
                    className="px-3 py-1 bg-green-500 text-white rounded-md"
                >
                    万
                </Button>
                <Button
                    type="button"
                    onClick={() => field.onChange(Math.floor((field.value || 0) * 100000))}
                    className="px-3 py-1 bg-green-500 text-white rounded-md"
                >
                    十万
                </Button>
                <Button
                    type="button"
                    onClick={() => field.onChange(Math.floor((field.value || 0) * 1000000))}
                    className="px-3 py-1 bg-green-500 text-white rounded-md"
                >
                    百万
                </Button>
                </div>
                {errors?.estimatedPrice && (
                    <p className="text-red-500 text-sm mt-1">{errors.estimatedPrice.message as string}</p>
                )}
            </FormItem>
            )}
        />
    )
}

export default EstimatedPrice