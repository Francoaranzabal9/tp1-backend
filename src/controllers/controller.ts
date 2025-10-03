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

const main = async (argumentos: string[], accion: string, books: any[]) => {
  await connectDb(URI_DB)
  const titulo = argumentos[3]
  const autor = argumentos[4]
  const anio = argumentos[5]
  const genero = argumentos[6]
  switch (accion) {
    case "info":
      console.log("---------- Comandos validos ----------")
      console.table(commands)
      break;
    case "lista":
      const dbbooks = await Book.find({}, {})
      console.log(dbbooks)
      break;
    case "buscarLibro":
      if (!argumentos[3]) {
        console.log("Debes ingresar el titulo del libro que deseas buscar")
        break
      }
      const libroEncontrado = await Book.findOne({
        titulo: new RegExp(`${argumentos[3]}`, "i")
      })

      if (!libroEncontrado) {
        console.log("El libro que estas buscando no existe")
        break
      } else {
        console.log(libroEncontrado)
      }
      break;
    case "agregarLibro":

      if (!titulo || !autor || !anio || !genero) {
        console.log("Debes ingresar todos los parametros requeridos")
        break
      }

      const existe = await Book.findOne({ titulo })

      if (existe) {
        console.log("El libro ya existe en la base de datos")
        break
      }
      const nuevoLibro = new Book({
        titulo: titulo.toLowerCase(),
        autor: autor.toLowerCase(),
        anio,
        genero: genero.toLowerCase()
      })

      await nuevoLibro.save()
      console.log(nuevoLibro, "nuevo libro")

      break;
    case "borrarLibro":
      break;
    case "actualizarLibro":
      break;
    default:
      break
  }


}



export { main }