export interface Program {
    _id: string;
    name: string;
    country: { name: string }; // Si necesitas mostrar el país
    participants: string[]; // Array de IDs de participantes
    startDate: string;
    endDate: string;
    status: string;
}