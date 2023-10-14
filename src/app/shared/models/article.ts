export interface Article {
    id: number,
    title: string,
    description: string
    articleDate: Date
    hour ?: string,
    content: string,
    coverImage: string,
    hasVideo: boolean,
    videoLink ?: string,
    userId ?: any,
    rubricId ?: number
}

export interface ArticleRubric {
    id : number,
    name: string,
    description: string,
    isActive: Boolean
}