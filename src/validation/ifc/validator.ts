
export interface Validator<T> {

    validate(t: T) : T | undefined;
}
