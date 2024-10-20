import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserRepository{
    constructor(@InjectRepository(User)
                private userRepository: Repository<User>)
                {}

    create(data: CreateUserDto){
        const newUser = this.userRepository.create(data)

        return this.userRepository.save(newUser)
    }

    findAll(){
        return this.userRepository
        .createQueryBuilder("user")
        .getMany()
    }

    findOne(id: number){
        return this.userRepository
        .createQueryBuilder("user")
        .where("user.id = :id", {id})
        .getMany()
    }

    async update(id: number, data: UpdateUserDto){
        await this.userRepository
        .createQueryBuilder("user")
        .update()
        .set(data)
        .where("user.id = :id", {id})
        .execute

        return this.userRepository.findOneBy({id})
    }

    async remove(id: number){
        await this.userRepository.softDelete(id)

        return this.userRepository
        .createQueryBuilder("user")
        .withDeleted()
        .where("user.id = :id", {id})
        .getOne()
    }
}