import {UserModel} from "../model/user.model";
import userStorage from "../userStorage";

export class UserRepository {

    getAllUsers(): Set<UserModel> {
        return userStorage.storage;
    }

    addUser(user: UserModel) : void {
        return userStorage.addUser(user);
    }

}
