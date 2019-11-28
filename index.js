var exphbs = require('express-handlebars');

const express = require('express');



const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://AndresQA:icarus0712@cluster0-1obzw.mongodb.net/taller2?retryWrites=true&w=majority';
const dbName = 'taller2';
const client = MongoClient(url);

var db = null;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;
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

    var dataQuery = request.params.id;

    var values = {};

    var query = {};

    if (dataQuery) {

        dataQuery = JSON.parse(dataQuery)
        dataQuery.first.forEach((d) => {
            values[(d.value)] = true;
        });
        dataQuery.second.forEach((d) => {
            values[(d.value)] = true;
        });
        dataQuery.third.forEach((d) => {
            values[(d.value)] = true;
        });


        values[(dataQuery.order.tipo)+"" + (dataQuery.order.value)] = true;
         
    }



    var filtros = {
        Steam: values["Steam"] ? true : false,
        Origin: values["Origin"] ? true : false,
        Epic: values["Epic"] ? true : false,
        FPS: values["FPS"] ? true : false,
        Carreras: values["Carreras"] ? true : false,
        RPG: values["RPG"] ? true : false,
        Aventura: values["Aventura"] ? true : false,
        Juego: values["Juego"] ? true : false,
        DLC: values["DLC"] ? true : false,
        Mayor: values["price1"] ? true : false,
        Menor: values["price-1"] ? true : false,
        P: values["popularity1"] ? true : false,
        Years: values["year-1"] ? true : false
    }

    var sort = {};
    if(filtros.Mayor){
        sort = {price:1}
    }else if(filtros.Menor){
        sort = {price:-1}
    }else if(filtros.P){
        sort = {populity:1}
    }else if(filtros.Years){
        sort = {year:-1}
    }

    const collection = db.collection('productos');
    collection.find({}).sort(sort).toArray( (err, docs) =>{
        if (err) {
            console.error(err);
            response.send(err);
            return;
        }

        var contexto = {};

        if (dataQuery) {

            var producto = [];
            var productoB = [];
            var productoC = [];
            var result = [];
          

            docs.forEach((d) => {
                for (let i = 0; i < dataQuery.first.length; i++) {
                    let p = dataQuery.first[i];
                  
                    if ((p.tipo === "Plataforma" && p.value === d.platform) || (p.tipo === "Genero" && p.value === d.genre) || (p.tipo === "Tipo" && p.value === d.type)) {
                        producto.push(d);
                    }
                }
            });



            if (producto.length <= 0) {
                result = docs;
            } else {

                producto.forEach((d) => {
                    for (let i = 0; i < dataQuery.second.length; i++) {
                        let p = dataQuery.second[i];
                        if ((p.tipo === "Plataforma" && p.value === d.platform) || (p.tipo === "Genero" && p.value === d.genre) || (p.tipo === "Tipo" && p.value === d.type)) {
                            productoB.push(d);
                        }
                    }
                });

                if (dataQuery.second.length <= 0) {
                    result = producto;
                } else {

                    productoB.forEach((d) => {
                        for (let i = 0; i < dataQuery.third.length; i++) {
                            let p = dataQuery.third[i];
                            if ((p.tipo === "Plataforma" && p.value === d.platform) || (p.tipo === "Genero" && p.value === d.genre) || (p.tipo === "Tipo" && p.value === d.type)) {
                                productoC.push(d);
                            }
                        }
                    });

                    if (dataQuery.third.length <= 0) {
                        result = productoB;
                    } else {

                        result = productoC;
                         

                    }

                }

               

            }



            contexto = {
                products: result,
                filtros
            }
        } else {
            contexto = {
                products: docs,
                filtros
            }
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


app.post('/api/cart/', (request, response) => {
    const cart = db.collection('carrito'); //selecciono la colección de la base de datos
    cart.find({}).toArray((err, result) => { //result es lo que me trae
        var arrayCart = result[0]; //lo guardo en una variable
        arrayCart.products.push(request.body.idProduct); //le agrego en texto lo que me llegó de body, le llega en texto

        cart.updateOne({
                _id: new ObjectID(arrayCart._id)
            }, //convierte el id qu ele llegó en texto, a un id de mongo
            {
                $set: {
                    products: arrayCart.products
                } //lo actualiza
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



app.get('/api/cart/', (request, response) => {
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
        .toArray((err, result) => {
            //aseguramos de que no hay error
            assert.equal(null, err);

            var idsCart = []; //un arreglo para guardar todos los ids que tengo en el carrito
            result[0].products.forEach(id => {
                idsCart.push(new ObjectID(id)); //agrego todos los id al nuevo arreglo
            });
            console.log(idsCart);


            //buscamos todos los productos
            products.find({
                    _id: {
                        $in: idsCart
                    }
                })
                //transformamos el cursor a un arreglo
                .toArray((err, resultProducts) => {
                    //aseguramos de que no hay error
                    assert.equal(null, err);
                    var context = {
                        products: resultProducts,
                    };
                    response.render('cart', context);
                });
        });
});





app.listen(process.env.PORT || port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});