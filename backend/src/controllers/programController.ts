import { Request, Response } from 'express';
import * as programService from '../services/programService';

export const searchPrograms = async (req: Request, res: Response) => {
  try {    
    
    // Recuperar los parámetros de búsqueda de la solicitud
    const { name, status, country, startDate, endDate } = req.query;

    // Llamar al servicio de búsqueda con los filtros
    const programs = await programService.searchPrograms({
      name: name as string,
      status: status as string,
      country: country as string,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
    });

    res.status(200).json(programs);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error al buscar programas' });
  }
};

export const createProgram = async (req: Request, res: Response) => {
  try {
    const { name, countryId, participants,startDate, endDate } = req.body;
    const program = await programService.createProgram(name, countryId,participants, startDate, endDate);
    res.status(201).json(program);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error al crear el programa' });
  }
};

export const getPrograms = async (req: Request, res: Response) => {
  try {    
    const programs = await programService.getPrograms();    
    res.status(200).json(programs);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los programas' });
  }
};

export const getProgramById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const program = await programService.getProgramById(id);
    res.status(200).json(program);
  } catch (error: any) {
    console.error(error);
    if (error.message === 'Programa no encontrado') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al obtener el programa' });
    }
  }
};

export const updateProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, startDate, endDate, participants,countryId  } = req.body;
    
    const program = await programService.updateProgram(id, name, startDate, endDate, countryId, participants);
    res.status(200).json(program);
  } catch (error: any) {
    console.error(error);
    console.log('error.message',error.message,req.body);
    
    if (error.message === 'Programa no encontrado') {
      res.status(404).json({ message: error.message });
    }else if(error.message === 'No se puede modificar el programa porque existen participantes asociados'){
      res.status(400).json({ message: error.message });
    }else if(error.message === 'Algunos participantes no son válidos'){
      res.status(400).json({ message: error.message });
    }else if(error.message === 'País no encontrado'){
      res.status(400).json({ message: error.message });
    }else {
      res.status(500).json({ message: 'Error al actualizar el programa' });
    }
  }
};

export const deleteProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await programService.deleteProgram(id);
    res.sendStatus(204);
  } catch (error: any) {
    console.error(error);
    if (error.message === 'Programa no encontrado') {
      res.status(404).json({ message: error.message });
    }else if (error.message === 'No se puede eliminar el programa porque existen participantes asociados') {
      res.status(400).json({ message: error.message });
    }else {
      res.status(500).json({ message: 'Error al eliminar el programa' });
    }
  }
};

export const addParticipant = async (req: Request, res: Response) => {
  try {
    const { programId, userId } = req.body;
    const program = await programService.addParticipant(programId, userId);
    res.status(200).json(program);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error al añadir participante' });
  }
};

export const removeParticipant = async (req: Request, res: Response) => {
  try {   
    const { programId, userId } = req.body;
    const program = await programService.removeParticipant(programId, userId);
    res.status(200).json(program);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error al eliminar participante' });
  }
};

export const getByParticipant = async (req: Request, res: Response) => {
  try {
    console.log('req.params',req.params);
    
    const { id } = req.params;
    const programs = await programService.getByParticipant(id);
    res.status(200).json(programs);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los programas' });
  }
}
