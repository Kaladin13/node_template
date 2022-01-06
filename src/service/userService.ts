import {userRepository} from "../repository/userRepository";
import {getCustomRepository} from "typeorm";


export class UserService {


    get userRepository(): userRepository {
        return this._userRepository;
    }

    private _userRepository: userRepository = getCustomRepository(userRepository);
}