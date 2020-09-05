import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    title: String,
    description: String,
    imagePath: String
});

export interface IJuego extends Document {
    title: string;
    description: string;
    imagePath: string;
}

export default model<IJuego>('Juego', schema);