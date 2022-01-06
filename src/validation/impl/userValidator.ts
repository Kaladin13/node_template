import {Validator} from "../ifc/validator";
import {User} from "../../entity/User";

export class UserValidator implements Validator<User> {

    validate(requestBody): boolean {
        return requestBody.login && requestBody.password && requestBody.password.length > 6
            && requestBody.password.length < 20 && requestBody.login.length > 8 && requestBody.login.length < 20;

    }

}
