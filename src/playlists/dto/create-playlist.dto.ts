import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUrl()
    @IsOptional()
    url: string;
}
