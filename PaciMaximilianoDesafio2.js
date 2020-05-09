/* resolucion desafio2 Maximiliano Paci -- pacimaximiliano@gmail.com */
const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://admin:admin@cluster0-aw4tj.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongoclient(uri, {useNewUrlParser:true, useUnifiedTopology:true});

let collection;
const CRUD = new Promise((resolve,reject) => {
    resolve(client.connect());
    reject("error al conectar");
})

CRUD
/* conexion */
.then((result) => {
    collection = result.db("sample_betp2").collection("inventors");
    console.log(chalk.green("conectado"));

    /* retorna la promesa para listar */
    return new Promise((resolve,reject) => {
        resolve(collection.find().limit(20).toArray());
        reject("error al listar");
    })
})
/* listado */
.then((result) => {
    console.log(result);
    
    /* retorna la promesa para insertar */
    return new Promise((resolve,reject) =>{
        const nuevoInventor = {
            first: "Pedro",
            last: "Perez",
            year: 1987
        }
        resolve(collection.insertOne(nuevoInventor));
        reject("no pudo insertarse el inventor");
    });
})
/* insert a la coleccion */
.then((result) =>{
    console.log(chalk.green("inventor insertado"));

    /* retorna la promesa para actualizar */
    return new Promise((resolve, reject) =>{
        resolve(collection.updateOne({last: "Perez"}, {$set: {year: 2000}}));
        reject("error al actualizar");
    });
})
/* actualizacion */
.then((result) =>{
    console.log(chalk.green("actualizado correctamente"));

    /* retorna la promesa para eliminar */
    return new Promise((resolve, reject) => {
        resolve(collection.deleteOne({last: "Perez"}));
        reject("error al eliminar");
    });
})
/* eliminacion */
.then((result) =>{
    console.log(chalk.green("eliminado correctamente"));  
})
.catch(error => {
    console.log(chalk.red(error));
})
