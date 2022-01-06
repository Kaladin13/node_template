import {Validator} from "../ifc/validator";
import {UserDtoModel} from "../../model/dto/userDto.model";

export class UserDtoValidator implements Validator<UserDtoModel> {

    validate(t: UserDtoModel): boolean {
        return t.login && t.password && t.password.length > 6 && t.password.length < 20 && t.login.length > 8 && t.login.length < 20;

    }

}
