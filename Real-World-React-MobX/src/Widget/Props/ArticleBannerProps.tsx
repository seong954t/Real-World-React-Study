import {MouseEventHandler} from "react";

export default interface ArticleBannerProps {
    title: string,
    createdAt: string,
    username: string,
    image?: string,
    onClickDelete?: MouseEventHandler<HTMLButtonElement>,
    isDisableEditAndDeleteButton?: boolean,
    linkToEdit?: string,
    linkToUser?: string
}