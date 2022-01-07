import {User} from "../entity/User";
import {v4 as uuidv4} from 'uuid';
import jwt from 'jsonwebtoken'
import {TIME_TO_SAVE_COOKIES} from "../property/ConstantValues";
import {Logger} from "../logging/Logger";

export class AuthenticationToken {


    async generateAccessToken(user: User): Promise<string> {
        return await jwt.sign({user}, this.privateKey, {expiresIn: TIME_TO_SAVE_COOKIES});
    }


    async authenticateToken(token: string): Promise<object> | null {
        return jwt.verify(token, this.privateKey, async (err, user) => {
            if (err) {
                Logger.error(new Error(err));
                return null;
            }
            return user;
        });
    }

    // commented for easier testing
    //private privateKey = uuidv4().toString();
    private privateKey = "fa15859e-f5b4-42b7-ae77-653d842fec67";
}