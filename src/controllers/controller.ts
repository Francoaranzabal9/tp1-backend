import { commands } from "../utils/commands"
import mongoose, { Schema, Document } from "mongoose"
import crypto from "crypto"

const URI_DB = "mongodb://localhost:27017/tp1-backend-crud"

const connectDb = async (URI: string) => {
  try {
    await mongoose.connect(URI)
  } catch (e) {
    console.log("error al conectarse a la base de datos")
    process.exit(1)
  }
}

interface IBook {
  id: string;
  titulo: string;
  autor: string;
  año: number;
  genero: string;
  disponible: boolean;
}

const BookSchema = new Schema<IBook>({
  id: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  año: { type: Number, required: true },
  genero: { type: String, required: true },
  disponible: { type: Boolean, required: true }
})

const Book = mongoose.model<IBook>("Book", BookSchema)

const main = async (argumentos: string[], accion: string) => {
  await connectDb(URI_DB)
  const id = argumentos[3]
  const titulo = argumentos[3]
  const autor = argumentos[4]
  const año = parseInt(argumentos[5])
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
      if (!titulo || !autor || !año || !genero) {
        console.log("Debes ingresar todos los parametros requeridos");
        break;
      }

      const existe = await Book.findOne({ titulo });

      if (existe) {
        console.log("El libro ya existe en la base de datos");
        break;
      }

      const nuevoLibro = new Book({
        id: crypto.randomUUID(),
        titulo: titulo.toLowerCase(),
        autor: autor.toLowerCase(),
        año,
        genero: genero.toLowerCase(),
        disponible: true
      });

      await nuevoLibro.save();
      console.log("Libro agregado:", nuevoLibro);
      break;

    case "borrarLibro":
      if (!id) {
        console.log("debes ingresar el UUID del libro")
        break
      }

      const libroABorrar = await Book.findOneAndDelete({ id })

      if (!libroABorrar) {
        console.log("El libro que deseas borrar no existe")
        break
      } else {
        console.log("El libro ha sido borrado con exito")
      }
      console.log(libroABorrar)

      break;
    case "actualizarLibro":
      const idaActualizar = argumentos[3]
      const tituloaActualizar = argumentos[4]
      const autoraActualizar = argumentos[5]
      const añoaActualizar = parseInt(argumentos[6])
      console.log(typeof (añoaActualizar))
      const generoaActualizar = argumentos[7]
      console.log(argumentos)

      if (!idaActualizar || !tituloaActualizar || !autoraActualizar || isNaN(añoaActualizar) || !generoaActualizar) {
        console.log("Debes ingresar todos los parámetros requeridos y el año debe ser un número válido");
        break;
      }
      const libroAActualizar = await Book.findOneAndUpdate(
        { id: idaActualizar },
        { titulo: tituloaActualizar, autor: autoraActualizar, año: añoaActualizar, genero: generoaActualizar, disponible: true },
        { new: true }
      );
      console.log(libroAActualizar)
      if (libroAActualizar) {
        console.log("Libro actualizado:", libroAActualizar);
      } else {
        console.log("No se encontro el libro para actualizar");
      }
      break;
    default:
      console.log("comando invalido")
      break
  }

  process.exit(0);
}

export { main } 