import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUrl()
    @IsOptional()
    url: string;
}
