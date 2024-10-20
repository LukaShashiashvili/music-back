import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Album } from "./entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";

@Injectable()
export class albumsRepository {
    constructor(
        @InjectRepository(Album)
        private albumRepository: Repository<Album>
    ){}

    create(data: CreateAlbumDto){
        const newAlbum = this.albumRepository.create(data)

        return this.albumRepository.save(newAlbum)
    }

    findAll(){
        return this.albumRepository
            .createQueryBuilder("album")
            .getMany()
    }

    findOne(id: number){
        return this.albumRepository
            .createQueryBuilder("album")
            .where("album.id = :id", { id })
            .getMany()
    }

    findByName(title:string){
        return this.albumRepository
        .createQueryBuilder("album")
        .where('album.title Like :title', {title: `%${title}%`})
        .getMany()
    }

    async update(id: number, data: UpdateAlbumDto){
        await this.albumRepository.createQueryBuilder("album")
        .update()
        .set(data)
        .where("album.id = :id", {id})
        .execute()

        return this.albumRepository.findOneBy({id})
    }

    async remove(id: number){
        await this.albumRepository.softDelete(id)

        return this.albumRepository
        .createQueryBuilder("album")
        .withDeleted()
        .where("album.id = :id", {id})
        .getOne()
    }
}
