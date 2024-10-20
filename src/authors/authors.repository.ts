import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Author } from "./entities/author.entity";
import { Repository } from "typeorm";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";

@Injectable()
export class AuthorRepository{
    constructor(@InjectRepository(Author)
                private authorRepository: Repository<Author>) 
    {}

    create(data: CreateAuthorDto){
        const newAuthor = this.authorRepository.create(data)

        return this.authorRepository.save(newAuthor)
    }

    findAll(){
        return this.authorRepository
        .createQueryBuilder("author")
        .getMany()
    }

    findOne(id: number){
        return this.authorRepository
        .createQueryBuilder("author")
        .where("author.id = :id", {id})
        .getMany()
    }

    async update(id: number, data: UpdateAuthorDto){
        await this.authorRepository
        .createQueryBuilder("author")
        .update()
        .set(data)
        .where("author.id = :id", {id})
        .execute()

        return this.authorRepository.findOneBy({id})
    }

    async remove(id: number){
        await this.authorRepository.softDelete(id)
        
        return this.authorRepository
        .createQueryBuilder("author")
        .withDeleted()
        .where("author.id = :id", {id})
        .getOne()
    }
}