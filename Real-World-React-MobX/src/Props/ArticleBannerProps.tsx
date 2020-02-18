import {MouseEventHandler} from "react";
import AuthorDTO from "../DTO/AuthorDTO";

export default interface ArticleBannerProps {
    title: string,
    createdAt: string,
    slug: string,
    author: AuthorDTO,
    onClickDelete: MouseEventHandler<HTMLButtonElement>,
    isDisableEditAndDeleteButton?: boolean
}