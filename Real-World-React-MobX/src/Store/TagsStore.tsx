import {action, observable} from "mobx";
import RealWorldApi from "../RealWordApi/RealWorldApi";

export default class TagsStore {
    @observable
    private tags: string[] = [];

    @action
    public loadTags(): void{
        RealWorldApi.getTags()
            .then(res => res.json())
            .then(action((result) => {
                const {errors, tags} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else if (tags !== undefined) {
                    this.tags = tags;
                }
            }))
    }

    static INSTANCE: TagsStore;
}

TagsStore.INSTANCE = new TagsStore();
