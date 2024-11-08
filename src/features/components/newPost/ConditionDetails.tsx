import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { FormSchemaType } from "@/lib/schemas/formSchema";
import { FileText } from 'lucide-react'
import { UseFormReturn } from "react-hook-form";

interface ChildComponentProps {
    form: UseFormReturn<FormSchemaType>;
}

const ConditionDetails: React.FC<ChildComponentProps> = ({form}) => {
    return (
        <FormField
            control={form.control}
            name="conditionDetails"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="flex items-center text-lg font-semibold text-gray-700">
                <FileText className="w-5 h-5 mr-2 text-purple-500" />
                状態補足
                </FormLabel>
                <FormControl>
                <Textarea
                    {...field}
                    className="bg-white border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm"
                />
                </FormControl>
                <FormDescription>商品の状態について補足説明があれば入力してください。</FormDescription>
                <FormMessage />
            </FormItem>
            )}
        />
    )
}

export default ConditionDetails