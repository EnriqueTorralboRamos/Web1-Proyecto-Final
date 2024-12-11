import { Schema, model, Document } from 'mongoose';
import ProgramStatus from '../enum/programStatus';
import mongoose from "mongoose";

interface IProgram extends Document {
    name: string; // Nombre del programa
    country: mongoose.Types.ObjectId; // Relación con el país
    participants: mongoose.Types.ObjectId[]; // Array de referencias a usuarios
    startDate: Date;
    endDate: Date;
    status: ProgramStatus; // Derivado de las fechas
}

const ProgramSchema: Schema = new Schema({
    name: { type: String, required: true }, // Nombre del programa
    country: { type: Schema.Types.ObjectId, ref: 'Country', required: true }, // Relación con el país
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Usuarios inscritos
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { 
        type: String, 
        enum: Object.values(ProgramStatus), 
        default: ProgramStatus.PENDING 
      }, // Derivado de las fechas
});

const Program = model<IProgram>('Program', ProgramSchema);

export default Program;