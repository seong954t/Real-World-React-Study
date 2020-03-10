import {GFeedItemVM} from "./GFeedItemVM";
import {MouseEventHandler} from "react";

export abstract class GFeedListVM {
    abstract feedItemList: Array<GFeedItemVM>
}