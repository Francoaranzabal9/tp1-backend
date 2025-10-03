import fs from "node:fs"

const DB_PATH = "./src/libreria.json"

const readDb = () => JSON.parse(fs.readFileSync("./src/libreria.json", "utf-8"))

const writeDb = (libros: any) => fs.writeFileSync(DB_PATH, JSON.stringify(libros))

export { readDb, writeDb }