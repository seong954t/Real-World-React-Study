import {MouseEventHandler} from "react";

export default interface UserInfoBannerProps {
    onClickFollow: MouseEventHandler<HTMLButtonElement>,
    username: string,
    following?: boolean,
    bio?: string,
    image?: string,
    isOwner?: boolean,
    isDisable?: boolean,
    isFollowLoading?: boolean
}