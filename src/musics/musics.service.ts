import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './musics.repository';

@Injectable()
export class MusicsService {
  constructor(private readonly musicsRepository: MusicRepository){}

  create(createMusicDto: CreateMusicDto) {
    return this.musicsRepository.create(createMusicDto)
  }

  findAll() {
    return this.musicsRepository.findAll()
  }

  findOne(id: number) {
    return this.musicsRepository.findOne(id)
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return this.musicsRepository.update(id, updateMusicDto)
  }

  remove(id: number) {
    return this.musicsRepository.remove(id)
  }
}
