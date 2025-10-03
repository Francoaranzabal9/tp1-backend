import { commands } from "../commands/commands"
import mongoose, { Schema, Document } from "mongoose"


const URI_DB = "mongodb://localhost:27017/tp1-backend-crud"

const connectDb = async (URI: string) => {
  try {
    await mongoose.connect(URI)
    console.log("conectado a mongo db")
  } catch (e) {
    console.log("error al conectarse a la base de datos")
    process.exit(1)
  }
}

interface IBook {
  titulo: string;
  autor: string;
  anio: number;
  genero: string;
  disponible: boolean;
}

const BookSchema = new Schema<IBook>({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  anio: { type: Number, required: true },
  genero: { type: String, required: true },
  disponible: { type: Boolean, required: true }
})

const Book = mongoose.model<IBook>("Book", BookSchema)

