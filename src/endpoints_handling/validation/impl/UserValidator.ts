import {Validator} from "../ifc/Validator";
import {User} from "../../../database_handling/entity/User";
import {
    MAX_LOGIN_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_LOGIN_LENGTH,
    MIN_PASSWORD_LENGTH
} from "../../../property/ConstantValues";

export class UserValidator implements Validator<User> {

    validate(user: User): boolean {
        return user.login && user.password
            && user.password.length >= MIN_PASSWORD_LENGTH
            && user.password.length <= MAX_PASSWORD_LENGTH
            && user.login.length >= MIN_LOGIN_LENGTH
            && user.login.length <= MAX_LOGIN_LENGTH;

    }

}
