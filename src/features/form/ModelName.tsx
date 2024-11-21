import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { FileText } from 'lucide-react'
import { Control } from "react-hook-form";

type FormPropsType = {
    control: Control<any>;
};

const ModelName: React.FC<FormPropsType> = ({control}) => {
    return (
        <FormField
        control={control}
        name="modelName"
        render={({ field }) => (
            <FormItem>
            <FormLabel className="flex items-center text-lg font-semibold text-gray-700">
                <FileText className="w-5 h-5 mr-2 text-purple-500" />
                モデル、ライン名
            </FormLabel>
            <FormControl>
                <Input
                {...field}
                className="bg-white border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm"
                />
            </FormControl>
            </FormItem>
        )}
        />
    )
}

export default ModelName