import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { albumsRepository } from './albums.repository';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumsRepository: albumsRepository){}


  create(createAlbumDto: CreateAlbumDto) {
    return this.albumsRepository.create(createAlbumDto);
  }

  findAll() {
    return this.albumsRepository.findAll();
  }

  findOne(id: number) {
    return this.albumsRepository.findOne(id);
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return this.albumsRepository.update(id, updateAlbumDto);
  }

  remove(id: number) {
    return this.albumsRepository.remove(id);
  }
}
