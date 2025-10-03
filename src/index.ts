import { readDb } from "./db/conection"
import { main } from "./controllers/controller"

const argumentos = process.argv
const accion = process.argv[2]
const books = readDb()

main(argumentos, accion, books)