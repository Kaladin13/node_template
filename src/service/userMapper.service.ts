import {Mapper} from "./ifc/mapper";
import {UserDtoModel} from "../model/dto/userDto.model";
import {UserModel} from "../model/user.model";
import {UserDtoValidator} from "../validation/impl/userDto.validator";

class UserMapperService implements Mapper<UserDtoModel, UserModel>{

    private userValidator = new UserDtoValidator();

    toDto(model: UserModel): UserDtoModel {
        return {login: model.login};
    }

    fromDto(dto: UserDtoModel): UserModel | undefined {
        const validDto = this.userValidator.validate(dto);
        if (validDto) {
            return { login: dto.login, password: dto.password};
        }
        return undefined;
    }

}

export default new UserMapperService();
