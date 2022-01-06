import {User} from "../entity/User";
import {v4 as uuidv4} from 'uuid';

export class AuthenticationToken {

    async generateAccessToken(user: User): Promise<string> {
        console.log(this.privateKey);
        return await this.jwt.sign({user}, this.privateKey, {expiresIn: AuthenticationToken.timeToSaveCookies});
    }

    async authenticateToken(token: string): Promise<object> | null {
        return this.jwt.verify(token, this.privateKey, async (err, user) => {
            if (err) {
                // just bad cookie, no need for logging
                // console.log(err);
                return null;
            }
            return user;
        });
    }

    static get timeToSaveCookies(): number {
        return AuthenticationToken._timeToSaveCookies;
    }

    // save cookies for 1000 days
    private static _timeToSaveCookies: number = 60 * 60 * 24 * 1000;
    //private privateKey = uuidv4().toString();
    private privateKey = "fa15859e-f5b4-42b7-ae77-653d842fec67";
    private jwt = require('jsonwebtoken');
}