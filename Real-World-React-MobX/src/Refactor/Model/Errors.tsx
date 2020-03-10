import ErrorsVo from "../../Vo/ErrorsVo";
import {observable} from "mobx";

export class Errors implements ErrorsVo {
    @observable body: string[] = [];

    constructor(errors?: string[]) {
        if (errors) {
            this.body = errors;
        }
    }

}