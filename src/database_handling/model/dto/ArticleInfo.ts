

export class ArticleInfo {


    constructor(articleId: number, articleTitle: string, articleAuthor: string, articleDescription?: string) {
        this.articleId = articleId;
        this.articleTitle = articleTitle;
        this.articleAuthor = articleAuthor;
        this.articleDescription = articleDescription;
    }

    private readonly articleId: number;
    private readonly articleTitle: string;
    private readonly articleDescription?: string;
    private readonly articleAuthor: string;
}