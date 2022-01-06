import {UserModel} from "./model/user.model";


class UserStorage {
    private _storage = new Set<UserModel>();

    constructor() {
    }

    get storage(): Set<UserModel> {
        return this._storage;
    }

    addUser(user: UserModel) : void {
        this._storage.add(user);
    }
}


export default new UserStorage();
