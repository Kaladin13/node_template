import {Validator} from "../ifc/Validator";
import {User} from "../../entity/User";
import {
    MAX_LOGIN_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_LOGIN_LENGTH,
    MIN_PASSWORD_LENGTH
} from "../../property/ConstantValues";

export class UserValidator implements Validator<User> {

    validate(reqBody: { login: any; password: any; }): boolean {
        return reqBody.login && reqBody.password
            && reqBody.password.length >= MIN_PASSWORD_LENGTH
            && reqBody.password.length <= MAX_PASSWORD_LENGTH
            && reqBody.login.length >= MIN_LOGIN_LENGTH
            && reqBody.login.length <= MAX_LOGIN_LENGTH;

    }

}
