import {action, computed, observable} from "mobx";
import RealWorldApi from "../RealWorldApi/RealWorldApi";

export class TagService {

    @observable tags: Array<string> = new Array<string>();
    @observable isLoading: boolean = false;

    @action
    loadTags() {
        this.isLoading = true;
        RealWorldApi.getTags()
            .then(action((result) => {
                const {errors, tags} = result;
                if (tags) {
                    this.tags = Array.from(tags);
                }
            })).finally(action(() => {
                this.isLoading = false;
            }))
    }

    @computed
    get tagList() {
        return this.tags;
    }

    static _instance: TagService;

    static get instance(): TagService {
        return this._instance;
    }
}

TagService._instance = new TagService();
