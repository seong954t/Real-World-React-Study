import AuthorVo from "./AuthorVo";

export default interface CommentVo {
    id: number,
    createdAt: string,
    updatedAt: string,
    body: string,
    author: AuthorVo
}