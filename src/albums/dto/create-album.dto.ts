import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    releaseDate: string;

    @IsArray()
    musics: string[];

    @IsString()
    @IsNotEmpty()
    artistName: string;

    @IsUrl()
    @IsOptional()
    url: string;
}
