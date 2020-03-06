import {action, observable} from "mobx";
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
            })).finally(action(() => {
                this.isLoading = false;
            }))
    }

    private static _instance = new TagService();

    static get instance(): TagService {
        return this._instance;
    }
}