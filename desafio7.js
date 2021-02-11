import fs from 'fs'
import express from 'express'

let app=express()

const PORT=8000

const server=app.listen(PORT, () => {
    console.log(`Servidor escuchando en poerto ${server.address().port}`)
})

server.on('error', error=>console.log(`error en servidor ${error}`))

let visitas={items:0,item:0}

let nombreArchivo='productos.txt'

let vectorProductos=[]

try {
    let arch=fs.readFileSync(nombreArchivo)
    let archString=arch.toString()
    vectorProductos=JSON.parse(archString)
}
catch (err){
    console.log('error '+err)
}

app.get('/items',(req,res)=>{
    visitas.items++
    res.json(vectorProductos)

})

app.get('/item-random',(req,res)=>{
    visitas.item++
    let index=Math.floor(Math.random()*vectorProductos.length)
    res.json(vectorProductos)
    res.end()
})

app.get('/visits',(req,res)=>{

    res.json(visitas);
})

class Archivo {

    contenidoArchivo=''
    nombreArchivo=''

    constructor(nombreArchivo){
        this.nombreArchivo=nombreArchivo
        this.leer()
    }
    
    async guardarArchivo(linea){
        try {
            let contenidoAGuardar=JSON.stringify(this.contenidoArchivo)
            await fs.promises.writeFile(this.nombreArchivo,contenidoAGuardar)
        }
        catch (err){
            console.log('error '+err)
        }
    }

    async leer() {
        try {
            let arch=fs.readFileSync(this.nombreArchivo)
            let archString=arch.toString()
            this.contenidoArchivo=JSON.parse(archString)
            console.log(this.contenidoArchivo)
        }
        catch (err){
            console.log('error '+err)
        }
    }
    guardar(title,price,thumbnail) {
        let nuevoProducto={
            id:this.contenidoArchivo.length+1,
            title:title,
            price:price,
            thumbnail:thumbnail,
        }
        this.contenidoArchivo.push(nuevoProducto)
        this.guardarArchivo()        
    }

   async borrar(){
        try {
            await fs.promises.unlink(this.nombreArchivo)
        }
        catch (err){
            console.log('error '+err)
        }
    }
}

// let arch1=new Archivo('prueba.txt')
// arch1.guardar('hola',222,'http://11')
// arch1.guardar('hola2',222222,'http://222')
//arch1.escribir('Pruebaaaa!\n')