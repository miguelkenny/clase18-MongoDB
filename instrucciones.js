// 1° Creamos la Base de Datos ecommerce
use ecommerce

// 2° Creamos las colecciones mensajes y productos
db.createCollection("mensajes")
db.createCollection("productos")

// 3° Insertamos 10 mensajes y productos

db.mensajes.insertMany(
    [{email: "miguel@email.com", mensajes: "Hola Pepe", date: "16/07/2022 20:00:00"},
    {email: "pepe@email.com", mensajes: "Hola Miguel", date: "16/07/2022 20:01:00"},
    {email: "miguel@email.com", mensajes: "Estas trabajando?", date: "16/07/2022 20:00:00"},
    {email: "pepe@email.com", mensajes: "Estoy haciendo el safío", date: "16/07/2022 20:00:00"},
    {email: "miguel@email.com", mensajes: "y como va?, yo tambien", date: "16/07/2022 20:00:00"},
    {email: "pepe@email.com", mensajes: "por ahora bien y vos", date: "16/07/2022 20:00:00"},
    {email: "miguel@email.com", mensajes: "bien también", date: "16/07/2022 20:00:00"},
    {email: "pepe@email.com", mensajes: "cualquier cosa me avisas", date: "16/07/2022 20:00:00"},
    {email: "miguel@email.com", mensajes: "gracias, igual vos", date: "16/07/2022 20:00:00"},
    {email: "pepe@email.com", mensajes: "dale, ok", date: "16/07/2022 20:00:00"}])

db.productos.insertMany(
    [{nombre:"Lapiz", precio: 2860, url: "https://cdn0.iconfinder.com/data/icons/economico-a-business-icon-set/74/pencil-lapis-128.png"}, 
    {nombre:"Regla", precio: 560, url: "https://cdn0.iconfinder.com/data/icons/"}, 
    {nombre:"Goma", precio: 1700, url: "https://cdn0.iconfinder.com/data/icons"}, 
    {nombre:"Cuaderno", precio: 1320, url: "https://cdn0.iconfinder.com/data/icons"}, 
    {nombre:"Lapicera", precio: 920, url: "https://cdn0.iconfinder.com/data/icons"},
    {nombre:"Mochila", precio: 2250, url: "https://cdn0.iconfinder.com/data/icons"},
    {nombre:"Escuadra", precio: 4990, url: "https://cdn0.iconfinder.com/data/icons"},
    {nombre:"Compas", precio: 2350, url: "https://cdn0.iconfinder.com/data/icons"},
    {nombre:"Carpeta", precio: 123, url: "https://cdn0.iconfinder.com/data/icons"},
    {nombre:"Kit escolar", precio: 4330, url: "https://cdn0.iconfinder.com/data/icons"}])

// 4° Listamos los documentos de cada una de las colleciones

db.mensajes.find().pretty()
db.productos.find().pretty()

// 5° Listamos la cantidad de documentos de cada collecion

db.mensajes.estimatedDocumentCount()
db.productos.estimatedDocumentCount()

// 6° CRUD de la coleccion productos
    // Insertamos un producto más
    db.productos.insertOne({nombre:"plasticola", precio: 790, stock: 23, url: "https://cdn0.iconfinder.com/data/icons"})

    //Listar los productos con precio menor a 1000
    db.productos.find({precio:{$lt: 1000}}, {_id:0}).pretty()

    //Listar los productos con precio entre los 1000 a 3000 pesos.
    db.productos.find({precio:{$gte: 1000, $lte: 3000}}, {_id:0}).pretty()

    //Listar los productos con precio mayor a 3000 pesos.
    db.productos.find({precio:{$gt: 3000}}, {_id:0}).pretty()

    //Realizar una consulta que traiga sólo el nombre del tercer producto más barato
    db.productos.find({}, {_id:0, nombre: 1}).sort({precio: 1}).limit(1).skip(2)

    //Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100
    db.productos.updateMany({}, {$set:{stock: 100}})

    //Cambiar el stock a cero de los productos con precios mayores a 4000 pesos
    db.productos.updateMany({precio:{$gt: 4000}}, {$set:{stock: 0}})

    //Borrar los productos con precio menor a 1000 pesos
    db.productos.deleteMany({precio: {$lt: 1000}})

// Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce.
    db.createUser({
        user: "pepe",
        pwd: "asd456",
        roles: [
            {role: "read", db: "ecommerce"}
        ]
    })

// Verificar que pepe no pueda cambiar la información.

//mongo -u pepe -p asd456