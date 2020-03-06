import ErrorsVo from "../Vo/ErrorsVo";
import {observable} from "mobx";

export class Errors implements ErrorsVo {
    @observable body: string[] = [];

    constructor(errors?: Readonly<ErrorsVo>) {
        if (errors) {
            this.body = errors.body;
        }
    }

}