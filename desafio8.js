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
        return this.listaArticulos
    }

    guardarArticulo(title,price,thumbnail) {
        let nuevoProducto={
            id:this.listaArticulos.length+1,
            title:title,
            price:price,
            thumbnail:thumbnail,
        }
        this.listaArticulos.push(nuevoProducto)      
    }

}

let listaArticulos=new ListadoArticulos([])

app.get('/api/productos',(req,res)=>{
    let result=null
    if (0==listaArticulos.getLength()) {
        result={error:'no hay productos cargados'}
    }
    else {
        result=listaArticulos.getArticulos()
    }
    res.json(result)

})

app.get('/api/productos/:id',(req,res)=>{
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
    console.log(req.body)
    let nuevoArticulo=req.body
    let result=[]
    if ( ('title' in nuevoArticulo)
        && ('price' in nuevoArticulo)
        && ('thumbnail' in nuevoArticulo)
    ) {
        console.log(nuevoArticulo)
        listaArticulos.guardarArticulo(nuevoArticulo.title,nuevoArticulo.price,nuevoArticulo.thumbnail)
        result=nuevoArticulo
    } else {
        result={error : 'producto con formato no válido'}
    }

    res.json(result)

})