import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { conditionRanks } from "@/lib/conditionRanks";
import { Star } from 'lucide-react'
import { Control, FieldErrors } from "react-hook-form";

type FormPropsType = {
    control: Control<any>;
    errors: FieldErrors<any>;
};


const Condition: React.FC<FormPropsType> = ({control, errors}) => {
    return (
        <FormField
            control={control}
            name="conditionRank"
            render={({ field }) => (
            <FormItem>
                <FormLabel className="flex items-center text-lg font-semibold text-gray-700">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    状態ランク
                    <div className='ml-3 text-sm text-red-500'>※必須</div>
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
                {errors?.condition && (
                    <p className="text-red-500 text-sm mt-1">{errors.condition.message as string}</p>
                )}
            </FormItem>
            )}
        />
    )
}

export default Condition