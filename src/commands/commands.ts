const commands = [
  { comando: "listarLibros", descripcion: "Muestra la lista de todos los libros", parametros: "" },
  { comando: "agregarLibro", descripcion: "Agrega un nuevo libro a la colección", parametros: ["titulo", "autor", "anio", "genero"] },
  { comando: "buscarLibro", descripcion: "Busca un libro mediante un argumento proporcionado", parametros: ["titulo"] },
  { comando: "borrarLibro", descripcion: "Elimina un libro de la colección", parametros: ["id"] },
  { comando: "actualizarLibro", descripcion: "Actualiza la información de un libro", parametros: ["id", "titulo", "autor", "anio", "genero"] }
]

export { commands }