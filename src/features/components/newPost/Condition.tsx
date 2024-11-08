import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { conditionRanks } from "@/lib/conditionRanks";
import { FormSchemaType } from "@/lib/schemas/formSchema";
import { Star } from 'lucide-react'
import { UseFormReturn } from "react-hook-form";

interface ChildComponentProps {
    form: UseFormReturn<FormSchemaType>;
}

const Condition: React.FC<ChildComponentProps> = ({form}) => {
    return (
        <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="flex items-center text-lg font-semibold text-gray-700">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                状態ランク
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger className="bg-white border-2 border-gray-300 focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 rounded-md shadow-sm">
                    <SelectValue placeholder="状態ランクを選択してください" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {conditionRanks.map((rank,index) => {
                        return <SelectItem key={index} value={rank}>{rank}</SelectItem>
                    })}
                </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )}
        />
    )
}

export default Condition