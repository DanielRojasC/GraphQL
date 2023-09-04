DATOS PARA CONSULTAR A TRAVÉS DEL API

**Para obtener TODOS los datos de la BD**

{
  books {
    id
    title
  }
}


**Para obtener UN solo dato de la base de datos**

**NOTA: Se cambia la cadena "ID" para consultar algún otro dato**
{
  book(id: "1") {
    title
    author {
      name
    }
  }
}


**PARA INICIAR**

node dis/app.js