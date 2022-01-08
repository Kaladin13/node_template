import {ResponseMapper} from "../mapper/ResponseMapper";
import {Logger} from "./Logger";


export function logResponse(responseMapper: ResponseMapper) {
    Logger.info("Got request with such response",
        {additional: responseMapper});
}