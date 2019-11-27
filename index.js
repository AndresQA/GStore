var exphbs = require('express-handlebars');

const express = require('express');



const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://AndresQA:icarus0712@cluster0-1obzw.mongodb.net/taller2?retryWrites=true&w=majority';
const dbName = 'taller2';
const client = MongoClient(url);

var db = null;
const assert = require('assert');
const ObjectID = require ('mongodb').ObjectID;
client.connect(function (err) {
    if (err) {
        console.error(err);
        return;
    }
    db = client.db(dbName);
})

var bodyParser = require('body-parser');

var fs = require('fs');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: true
}));

const port = 3000;

app.use(express.static('public'));

app.get('/', (request, response) => {
    console.log('alguien entró a la ruta inicial');
    response.sendFile(__dirname + '/public/index.html');
});

app.get("/filter/:id", () => {
    const collection = db.collection('productos');
    collection.find({


    }).toArray((err, docs) => {
        console.log(docs);
    });
});

app.get('/productos/:id?', (request, response) => {

    //var dataQuery = request.params.id;
    //console.log(JSON.parse(dataQuery))
    const collection = db.collection('productos');
    collection.find({}).toArray(function (err, docs) {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }


        var contexto = {
            products: docs,
        }
        response.render('product', contexto);


    });

});

app.get('/juego/:id?', (request, response) => {

       const collection = db.collection('productos');
    var idJuego = request.params.id;

    var query = {
        title: idJuego
    };

    collection.find(query).toArray(function (err, docs) {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }
        
        var contexto = docs[0];
        console.log(contexto);
        response.render('productview', contexto);


    });

    //response.render('productview');
});

app.get('/agregarDocumento', function (request, response) {
    const collection = db.collection('productos');
    collection.insert({
        title: 'need for speed',
        platform: 'Steam',
        price: 15000,
    }, function (err, result) {
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }

        response.send('documento agregado');
    });
})


app.post('/api/cart/',(request,response)=>{
    const cart = db.collection('carrito'); //selecciono la colección de la base de datos
    cart.find({}).toArray((err, result) => { //result es lo que me trae
        var arrayCart = result[0]; //lo guardo en una variable
        arrayCart.products.push(request.body.idProduct); //le agrego en texto lo que me llegó de body, le llega en texto

        cart.updateOne({_id: new ObjectID (arrayCart._id) }, //convierte el id qu ele llegó en texto, a un id de mongo
            {
                $set: {products: arrayCart.products} //lo actualiza
            } 
        );
        //aseguramos de que no hay error
        assert.equal(null, err);
        response.send({
            message: 'todo bien',
            arrayCart
        });
    });
});



app.get('/api/cart/',(request,response)=>{
    const cart = db.collection('carrito');

    cart.find({}).toArray((err, result) => { //result es lo que me trae

        //aseguramos de que no hay error
        assert.equal(null, err);
        response.send(result[0]);
    });
});




app.get('/carro_de_compras', (request, response) => {
    const products = db.collection('productos');
    const cart = db.collection("carrito");
    console.log('Alguien entró al carrito');
    
    //buscamos los id de los productos que agregué al carro
    cart.find({})
    //transformamos el cursor en un arreglo
    .toArray((err,result)=>{
        //aseguramos de que no hay error
        assert.equal(null, err);
        
        var idsCart = [];//un arreglo para guardar todos los ids que tengo en el carrito
        result[0].products.forEach(id => {
            idsCart.push(new ObjectID (id));//agrego todos los id al nuevo arreglo
        });
        console.log(idsCart);
    
        
        //buscamos todos los productos
        products.find({ _id: {$in: idsCart}})
        //transformamos el cursor a un arreglo
        .toArray((err, resultProducts) => {
            //aseguramos de que no hay error
            assert.equal(null, err);
            var context = {
                products: resultProducts,
            };
            response.render('cart',context);
        });
    });
});





app.listen(process.env.PORT || port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});

