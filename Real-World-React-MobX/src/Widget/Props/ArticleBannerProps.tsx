import {MouseEventHandler} from "react";
import LinkToProps from "./LinkToProps";

export default interface ArticleBannerProps extends LinkToProps{
    title: string,
    createdAt: string,
    username: string,
    image?: string,
    onClickDelete?: MouseEventHandler<HTMLButtonElement>,
    isDisableEditAndDeleteButton?: boolean,
}