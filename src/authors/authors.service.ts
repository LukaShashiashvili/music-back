import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './authors.repository';

@Injectable()
export class AuthorsService {

  constructor(private readonly authorsRepository: AuthorRepository){}

  create(createAuthorDto: CreateAuthorDto) {
    return this.authorsRepository.create(createAuthorDto)
  }

  findAll() {
    return this.authorsRepository.findAll()
  }

  findOne(id: number) {
    return this.authorsRepository.findOne(id)
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorsRepository.update(id, updateAuthorDto)
  }

  remove(id: number) {
    return this.authorsRepository.remove(id)
  }
}
