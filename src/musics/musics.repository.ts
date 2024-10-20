import { Injectable } from "@nestjs/common";
import { CreateMusicDto } from "./dto/create-music.dto";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Music } from "./entities/music.entity";
import { Like, Repository } from "typeorm";

@Injectable()

export class MusicRepository {
    constructor(@InjectRepository(Music)
    private musicRepository: Repository<Music>) { };

    create(data: CreateMusicDto) {
        const newMusic = this.musicRepository.create(data)

        return this.musicRepository.save(newMusic);
   };

    findAll() {
        return this.musicRepository
            .createQueryBuilder("music")
            .getMany()
    };

    findOne(id: number) {
        return this.musicRepository
            .createQueryBuilder("music")
            .where('music.id = :id', { id })
            .getMany()
    };

    findByName(name: string){
        return this.musicRepository
        .createQueryBuilder("music")
        .where('music.name Like :name', {name: `%${name}%`})
        .getMany()
    }

    async update(id: number, data: UpdateMusicDto) {
        await this.musicRepository
            .createQueryBuilder("music")
            .update()
            .set(data)
            .where("music.id = :id", { id })
            .execute()

        return this.musicRepository.findOneBy({ id });
    };

    async remove(id: number) {
        await this.musicRepository.softDelete(id)

        return this.musicRepository
            .createQueryBuilder('music')
            .withDeleted()
            .where("music.id = :id", { id })
            .getOne()
    };
}