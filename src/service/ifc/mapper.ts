
export interface Mapper<Dto, Model> {

    fromDto(dto: Dto) : Model | undefined;

    toDto(model: Model) : Dto;

}
