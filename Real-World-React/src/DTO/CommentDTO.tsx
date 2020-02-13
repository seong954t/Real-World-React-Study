import AuthorDTO from "./AuthorDTO";

export default interface CommentDTO {
    id: number,
    createdAt: string,
    updatedAt: string,
    body: string,
    author: AuthorDTO
}