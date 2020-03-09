import {action, computed, observable} from "mobx";
import RealWorldApi from "../Request/RealWorldApi";

export class TagService {

    @observable tags: string[] = [];
    @observable isLoading: boolean = false;

    @action
    loadTags() {
        this.isLoading = true;
        RealWorldApi.getTags()
            .then(action((result) => {
                const {errors, tags} = result;
                if (tags) {
                    this.tags = tags;
                }
                console.log(this.tags)
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
