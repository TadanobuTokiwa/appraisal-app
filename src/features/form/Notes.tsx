import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { FileText } from 'lucide-react'
import { Control } from "react-hook-form";

type FormPropsType = {
    control: Control<any>;
};

const Notes: React.FC<FormPropsType> = ({control}) => {
    return (
        <FormField
        control={control}
        name="notes"
        render={({ field }) => (
            <FormItem>
            <FormLabel className="flex items-center text-lg font-semibold text-gray-700">
                <FileText className="w-5 h-5 mr-2 text-orange-500" />
                備考
            </FormLabel>
            <FormControl>
                <Textarea
                {...field}
                className="bg-white border-2 border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 focus:ring-opacity-50 rounded-md shadow-sm"
                />
            </FormControl>
            <FormDescription>その他、伝えたいことがあれば入力してください。</FormDescription>
            <FormMessage />
            </FormItem>
        )}
        />
    )
}

export default Notes