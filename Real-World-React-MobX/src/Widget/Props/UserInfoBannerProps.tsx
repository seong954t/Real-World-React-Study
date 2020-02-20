import {MouseEventHandler} from "react";
import LinkToProps from "./LinkToProps";

export default interface UserInfoBannerProps extends LinkToProps{
    onClickFollow: MouseEventHandler<HTMLButtonElement>,
    username: string,
    following?: boolean,
    bio?: string,
    image?: string,
    isOwner?: boolean,
    hide?: boolean,
    isFollowLoading?: boolean
}