import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { COLLECTION_NAME, NoteSchema } from './schemas/note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: COLLECTION_NAME,
      schema: NoteSchema
    }])
  ],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
