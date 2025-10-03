# tp1-backend

CRUD en MongoDB con TypeScript
Este proyecto implementa un CRUD (Create, Read, Update, Delete) sobre una colección de libros en MongoDB, utilizando TypeScript y Mongoose, sin necesidad de crear una API.
El objetivo es practicar la definición de esquemas en Mongoose, la manipulación de documentos en MongoDB y el uso de async/await para operaciones asíncronas.

## Requisitos

- Node.js (v18 o superior recomendado)
- MongoDB en local (`mongodb://localhost:27017/tp1-backend-crud`)
- Instalar dependencias con npm

## Instalación

1. Clona el repositorio o descarga los archivos.
2. Instala las dependencias:
   ```
   npm install
   ```

## Uso

Ejecuta los comandos desde la terminal usando npm run dev:

```
npm run dev <comando> [argumentos]
```

### Comandos disponibles

| Comando           | Descripción                                 | Parámetros requeridos                      |
|-------------------|---------------------------------------------|--------------------------------------------|
| info              | Muestra los comandos disponibles             | -                                          |
| lista             | Lista todos los libros                       | -                                          |
| buscarLibro       | Busca un libro por título                    | titulo                                     |
| agregarLibro      | Agrega un nuevo libro                        | titulo, autor, año, genero                 |
| borrarLibro       | Elimina un libro por su ID                   | id                                         |
| actualizarLibro   | Actualiza los datos de un libro              | id, titulo, autor, año, genero             |

### Ejemplos

- **Listar libros**
  ```
  npm run dev lista
  ```

- **Agregar libro**
  ```
  npm run dev "El Principito" "Antoine de Saint-Exupéry" 1943 "Ficción"
  ```

- **Buscar libro**
  ```
  npm run dev buscarLibro "El Principito"
  ```

- **Borrar libro**
  ```
  npm run dev  borrarLibro <id-del-libro>
  ```

- **Actualizar libro**
  ```
  npm run dev  actualizarLibro <id-del-libro> "Nuevo Título" "Nuevo Autor" 2020 "Nuevo Género"
  ```


  ## Ejemplo de libros para probar

Puedes agregar estos libros usando el comando `agregarLibro`:

| titulo                | autor                       | año  | genero      |
|-----------------------|-----------------------------|------|-------------|
| Cien años de soledad  | Gabriel García Márquez      | 1967 | Novela      |
| El Principito         | Antoine de Saint-Exupéry    | 1943 | Ficción     |
| Rayuela               | Julio Cortázar              | 1963 | Novela      |
| Don Quijote           | Miguel de Cervantes         | 1605 | Clásico     |
| La sombra del viento  | Carlos Ruiz Zafón           | 2001 | Misterio    |




## Notas

- El campo `id` es generado automáticamente al agregar un libro.
- Todos los comandos deben ejecutarse con los parámetros en el orden indicado.
- La base de datos debe estar corriendo en local.

---