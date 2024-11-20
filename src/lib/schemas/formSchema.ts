import * as z from 'zod'

export const formSchema = z.object({
    brand: z.string().min(1, { message: "ブランド名を選択してください" }),
    estimatedPrice: z.number().positive({ message: "予想金額を入力してください" }),
    condition: z.string().min(1, { message: "状態ランクを選択してください" }),
    conditionDetails: z.string().optional(),
    notes: z.string().optional(),
    images: z.array(z.instanceof(File)).refine((files) => files.length > 0, "少なくとも1枚の画像をアップロードしてください")
})

export type FormSchemaType = z.infer<typeof formSchema>;

export const responseSchema = z.object({
    brand: z.string().min(1, { message: "ブランド名を選択してください" }),
    responseMin: z.number().positive({ message: "回答額を入力してください" }),
    responseMax: z.number().positive({ message: "回答額を入力してください" }),
    modelName: z.string().optional(),
    serialNumber: z.string().optional(),
})

export type responseSchemaType = z.infer<typeof responseSchema>;

export const appraisalPostsSchema = z.object({
    brand: z.string().min(1, { message: "ブランド名を選択してください" }),
    estimatedPrice: z.number().positive({ message: "予想金額を入力してください" }),
    responseMin: z.number().positive({ message: "回答額を入力してください" }),
    responseMax: z.number().positive({ message: "回答額を入力してください" }),
    condition: z.string().min(1, { message: "状態ランクを選択してください" }),
    conditionDetails: z.string().optional(),
    modelName: z.string().optional(),
    serialNumber: z.string().optional(),
    notes: z.string().optional(),
    images: z.array(z.instanceof(File)).refine((files) => files.length > 0, "少なくとも1枚の画像をアップロードしてください")
})

export type appraisalPostsSchemaType = z.infer<typeof appraisalPostsSchema>;