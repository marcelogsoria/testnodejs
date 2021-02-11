import fs from 'fs'
import express from 'express'

let app=express()

const PORT=8000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const server=app.listen(PORT, () => {
    console.log(`Servidor escuchando en poerto ${server.address().port}`)
})

server.on('error', error=>console.log(`error en servidor ${error}`))

class ListadoArticulos {

    listaArticulos=[]

    constructor(listaInicial){
        this.listaArticulos=listaInicial
    }

    getArticulo(id) {
        return this.listaArticulos.filter(el => el.id == id)
    }

    getLength() {
        return this.listaArticulos.length
    }

    getArticulos() {
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

    guardarArticulo(title,price,thumbnail) {
        let nuevoProducto={
            id:this.contenidoArchivo.length+1,
            title:title,
            price:price,
            thumbnail:thumbnail,
        }
        this.contenidoArchivo.push(nuevoProducto)
        this.guardarArchivo()        
    }

}

let listaArticulos=new ListadoArticulos([])

app.get('/api/articulos',(req,res)=>{
    let result=null
    if (0==listaArticulos.getLength()) {
        result={error:'no hay productos cargados'}
    }
    else {
        result=this.listaArticulos.getArticulos()
    }
    res.json(result)

})

app.get('/api/articulos/:id',(req,res)=>{
    let articulos=listaArticulos.getArticulo(req.params.id)
    let result=null
    if (0==articulos.length) {
        result={error : 'producto no encontrado'}
    }
    else {
        result=articulos[0]
    }
    res.json(result)

})

app.post('/api/productos',(req,res)=>{
    visitas.items++
    res.json(vectorProductos)

})