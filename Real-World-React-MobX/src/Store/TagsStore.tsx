import {action, computed, observable} from "mobx";
import RealWorldApi from "../RealWordApi/RealWorldApi";

export default class TagsStore {
    @observable
    private _tags: string[] = [];

    @action
    public loadTags(): void{
        RealWorldApi.getTags()
            .then(action((result) => {
                const {errors, tags} = result;
                if (errors !== undefined) {
                    RealWorldApi.alertError(errors);
                } else if (tags !== undefined) {
                    this._tags = tags;
                }
            }))
    }

    @computed
    get tags(){
        return this._tags;
    }

    static INSTANCE: TagsStore;
}

TagsStore.INSTANCE = new TagsStore();
