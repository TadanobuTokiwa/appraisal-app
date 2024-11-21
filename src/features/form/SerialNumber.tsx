import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { FileDigit } from 'lucide-react'
import { Control } from "react-hook-form";

type FormPropsType = {
    control: Control<any>;
};

const SerialNumber: React.FC<FormPropsType> = ({control}) => {
    return (
        <FormField
        control={control}
        name="serialNumber"
        render={({ field }) => (
            <FormItem>
            <FormLabel className="flex items-center text-lg font-semibold text-gray-700">
                <FileDigit className="w-5 h-5 mr-2 text-indigo-500" />
                型番、シリアル
            </FormLabel>
            <FormControl>
                <Input
                {...field}
                className="bg-white border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                />
            </FormControl>
            </FormItem>
        )}
        />
    )
}

export default SerialNumber