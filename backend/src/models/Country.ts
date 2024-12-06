import { Schema, model, Document } from 'mongoose';

interface ICountry extends Document {
    name: string;
    code?: string; //codigo ISO del pais
    population?: number;
    language?: string;
}

const CountrySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, maxlength: 3  },
    population: { type: Number, min: 0 },
    language: { type: String}
});

const Country = model<ICountry>('Country', CountrySchema);

export default Country;