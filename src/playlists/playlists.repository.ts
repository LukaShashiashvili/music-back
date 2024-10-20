import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "./entities/playlist.entity";
import { Repository } from "typeorm";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { UpdatePlaylistDto } from "./dto/update-playlist.dto";

@Injectable()
export class PlaylistRepository{
    constructor(@InjectRepository(Playlist)
                private playlistRepository: Repository<Playlist>)
                {}
    
    create(data: CreatePlaylistDto){
        const newPlaylist = this.playlistRepository.create(data)

        return this.playlistRepository.save(newPlaylist)
    }

    findAll(){
        return this.playlistRepository
        .createQueryBuilder("playlist")
        .getMany()
    }

    findOne(id: number){
        return this.playlistRepository
        .createQueryBuilder("playlist")
        .where("playlist.id = :id", {id})
        .getMany()
    }

    async update(id: number, data: UpdatePlaylistDto){
        await this.playlistRepository
        .createQueryBuilder("playlist")
        .update()
        .set(data)
        .where("playlist.id = :id", {id})
        .execute()

        return this.playlistRepository.findOneBy({id})
    }

    async remove(id: number){
        await this.playlistRepository.softDelete(id)

        return this.playlistRepository
        .createQueryBuilder("playlist")
        .withDeleted()
        .where("playlist.id = :id", {id})
        .getOne()
    }
}