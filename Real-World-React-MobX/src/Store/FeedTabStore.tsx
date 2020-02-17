import {action, observable} from "mobx";

export default class FeedTabStore {
    @observable tab: string = "";
    @observable tag: string = "";
    @observable name: string = "";


    @action
    public initialize(tab: string, tag: string, name: string): void {
        this.tab = tab;
        this.tag = tag;
        this.name = name;
    }

    @action
    public isEqualFeedTabData(tab: string, tag: string, name?: string): boolean {
        return this.tab === tab && this.tag === tag && this.name === name;
    }

    static INSTANCE: FeedTabStore;
}

FeedTabStore.INSTANCE = new FeedTabStore();