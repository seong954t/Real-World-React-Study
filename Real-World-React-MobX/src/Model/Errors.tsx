import ErrorsVo from "../Vo/ErrorsVo";

export class Errors implements ErrorsVo {
    body: string[] = [];

    constructor(errors?: Readonly<ErrorsVo>) {
        if (errors) {
            this.body = errors.body;
        }
    }

}