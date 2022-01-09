

export class ResponseMapper {


    constructor(responseStatus: any, responseMessage: string, responseAdditional?: any) {
        this.responseStatus = responseStatus;
        this.responseMessage = responseMessage;
        this.responseAdditional = responseAdditional;
    }


    get status() {
        return this.responseStatus;
    }

    get message() {
        return this.responseMessage;
    }

    get additional() {
        return this.responseAdditional;
    }


    private readonly responseStatus: any;
    private readonly responseMessage: string;
    private readonly responseAdditional?: any;
}