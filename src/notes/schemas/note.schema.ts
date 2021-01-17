import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const COLLECTION_NAME = 'notes';
export type NoteDocument = Note & Document;

@Schema({
    collection: COLLECTION_NAME
})
export class Note {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true, default: false })
    status: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);