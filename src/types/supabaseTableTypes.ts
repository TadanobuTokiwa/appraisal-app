export type appraisal_posts = {
    id: number,
    created_at: string,
    brand: string,
    modelName: string,
    serialNumber: string,
    responseMin: number,
    responseMax: number,
    estimatedPrice: number,
    conditionRank: string,
    conditionDetails: string,
    notes: string,
    poster: string,
    posterName: string,
    images: string,
    respondent: string,
    responsed_at: string,
    status: string
}

export type user = {
    id: string,
    username: string,
    email: string,
    usertype: string,
}