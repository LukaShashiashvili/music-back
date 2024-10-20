import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateMusicDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUrl()
    @IsOptional()
    url: string;
}
