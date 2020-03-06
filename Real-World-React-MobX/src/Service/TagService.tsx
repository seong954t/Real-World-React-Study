import {action, observable} from "mobx";
import RealWorldApi from "../Request/RealWorldApi";

export class TagService {

    @observable tags: string[] = [];

    @action
    loadTags() {
        RealWorldApi.getTags()
            .then(action((result) => {
                const {errors, tags} = result;
                if (tags) {
                    this.tags = tags;
                }
            }))
    }

    private static _instance = new TagService();

    static get instance(): TagService {
        return this._instance;
    }
}