import { Camera } from 'lucide-react'
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormSchemaType } from "../../../lib/schemas/formSchema";
import { brandNames } from '@/lib/brandNames';

interface ChildComponentProps {
    form: UseFormReturn<FormSchemaType>;
}

const Brand: React.FC<ChildComponentProps> = ({form}) => {
    return (
        <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="flex items-center text-lg font-semibold text-gray-700">
                    <Camera className="w-5 h-5 mr-2 text-blue-500" />
                    ブランド名
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <FormMessage />
            </FormItem>
            )}
        />
    )
}

export default Brand