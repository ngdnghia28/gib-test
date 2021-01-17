import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuery } from 'src/interfaces/IQuery.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { COLLECTION_NAME, NoteDocument } from './schemas/note.schema';


@Injectable()
export class NotesService {
  constructor(@InjectModel(COLLECTION_NAME) private readonly model: Model<NoteDocument>) { }

  create(createNoteDto: CreateNoteDto) {
    const createdDto = new this.model(createNoteDto);
    return createdDto.save();
  }

  async findAll(query: IQuery) {
    const { page = 1 } = query.page;
    let { perPage = 20 } = query.page;
    perPage = perPage > 20 ? 20 : perPage;

    const count = await this.model.find(query.filter).countDocuments()
    const meta = {
      perPage,
      currentPage: page,
      totalItems: count,
      totalPages: Math.ceil(count / perPage)
    }

    const skip = perPage * (page - 1);

    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .limit(perPage)
      .populate(query.population)
      .skip(skip)
      .exec()

    return {
      meta,
      data
    }
  }

  findOne(id: string) {
    return this.model.findById(id)
      .orFail()
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.model.findByIdAndUpdate(id, updateNoteDto)
      .orFail()
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id)
      .orFail()
  }
}
