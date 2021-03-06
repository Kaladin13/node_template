import {ResponseMapper} from "../endpoints_handling/mapper/ResponseMapper";
import {Logger} from "./Logger";


export function logParsedCookie(responseMapper: ResponseMapper) {
    Logger.info("Parsed cookie in middleware with such status",
        {additional: responseMapper});

}