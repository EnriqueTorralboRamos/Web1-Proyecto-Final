import Country from "../models/Country";
import Program from "../models/Program";
import ProgramStatus from "../enum/programStatus";
import { calculateProgramStatus } from "../helpers/programHelpers";
import User from "../models/User";
import mongoose from "mongoose";

export const createProgram = async (
    name: string,
    countryId: string,
    startDate: Date,
    endDate: Date
) => {
    const country = await Country.findById(countryId);
    if (!country) {
        throw new Error('País no encontrado');
    }
    
    const status = calculateProgramStatus(startDate, endDate);
    if (status === ProgramStatus.COMPLETED) {
        throw new Error('La fecha de inicio no puede ser mayor a la fecha de fin');
    }
    const newProgram = new Program({ 
        name,
        country: countryId,
        startDate, 
        endDate,
        status
    });

    return await newProgram.save();
}

export const getProgramById = async (programId: string) => {
    const program = await Program.findById(programId).populate('country participants');
    if (!program) {
        throw new Error('Programa no encontrado');
    }
    return program;
}
export const getPrograms = async () => {
    return await Program.find().populate('country participants');
}

export const updateProgram = async (
    programId: string,
    name?: string,
    startDate?: Date,
    endDate?: Date
) => {
    const program = await Program.findById(programId);
    if (!program) {
        throw new Error('Programa no encontrado');
    }
    if (name) program.name = name;
    if (startDate) program.startDate = startDate;
    if (endDate) program.endDate = endDate;
    if (startDate && endDate&&endDate<startDate){
        throw new Error('La fecha de inicio no puede ser mayor a la fecha de fin');
    }
    program.status = calculateProgramStatus(program.startDate, program.endDate);
    return await program.save();
}

export const deleteProgram = async (programId: string) => {
    const program = await Program.findByIdAndDelete(programId);
    if (!program) {
        throw new Error('Programa no encontrado');
    }
}

export const addParticipant = async (programId: string, userId: string) => {
    const program = await Program.findById(programId);
    if (!program) {
        throw new Error('Programa no encontrado');
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    const userObjectId = new mongoose.Types.ObjectId(userId); // Convertir el ID
    if (program.participants.some(participant => participant.equals(userId))) {
      throw new Error('El usuario ya está inscrito en el programa');
    }
    program.participants.push(userObjectId);
    return await program.save();
}

export const removeParticipant = async (programId: string, userId: string) => {
    
    if (!mongoose.Types.ObjectId.isValid(programId)) {
        throw new Error(`ID de programa inválido: ${programId}`);
    }
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error(`ID de usuario inválido: ${userId}`);
    }
    
    const program = await Program.findById(programId);
    if (!program) {
        throw new Error('Programa no encontrado');
    }
    if (!program.participants.some((participantId) => participantId.equals(userId))) {
        throw new Error('El usuario no está inscrito en el programa');
    }
    
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    program.participants = program.participants.filter(
        (participantId) => !participantId.equals(userId)
    );
    return await program.save();
}