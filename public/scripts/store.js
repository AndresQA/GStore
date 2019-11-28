window.addEventListener('load', function () {

    var btn_cart = document.querySelectorAll('.addtocart');
    //var shopping_counter = document.querySelector('.shopping_counter');

    btn_cart.forEach(function (btn) {

        btn.addEventListener('click', function (event) {

            event.preventDefault();

            var animation = document.querySelector('.cartandcount');
            animation.classList.add('animated', 'bounceIn')

            animation.addEventListener('animationend', function () {
                animation.classList.remove('animated', 'bounceIn')
            })


            var data = new URLSearchParams();
            data.append("idProduct", btn.getAttribute("data-name")); //idProduct es el nombre de la variable con el que se lee en la ruta

            var promise = fetch('/api/cart/', {
                method: 'POST',
                body: data
            });

            promise.then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) { //data es lo que le mando
                    updatecart(); //aquí se llama la función que refresca el carrito
                    console.log(data);
                });

        });


    });


    var btn_buynow = document.querySelectorAll('.buynow');
    //var shopping_counter = document.querySelector('.shopping_counter');

    btn_buynow.forEach(function (btn) {

        btn.addEventListener('click', function (event) {



            var animation = document.querySelector('.cartandcount');
            animation.classList.add('animated', 'bounceIn')

            animation.addEventListener('animationend', function () {
                animation.classList.remove('animated', 'bounceIn')
            })


            var data = new URLSearchParams();
            data.append("idProduct", btn.getAttribute("data-name")); //idProduct es el nombre de la variable con el que se lee en la ruta

            var promise = fetch('/api/cart/', {
                method: 'POST',
                body: data
            });

            promise.then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) { //data es lo que le mando
                    updatecart(); //aquí se llama la función que refresca el carrito
                    console.log(data);
                });

        });


    });



    var open = false;
    var cliks =0;

    const openFilters = ()=>{
        
        if (open === false) {
            var openlistorder = document.querySelector('.orderlistview');
            openlistorder.style.display = "block";
      
         
            
            cliks++;
        }

        if (cliks == 2) {
            open = true;
        }

        if (open === true ) {
            var openlistorder = document.querySelector('.orderlistview');
            openlistorder.style.display = "none";
            cliks =0
            open = false;
        }

        console.log(open)
        console.log(cliks)
    }



    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }



    var params = location.href.split("/");
    if (params[4]) {
        var dataUrl = params[4];
        var dataUrlstring = replaceAll(dataUrl, "%22", '"');
        dataUrlstring = replaceAll(dataUrlstring, "%7B", '{');
        dataUrlstring = replaceAll(dataUrlstring, "%7D", '}');

        var dataObject = JSON.parse(dataUrlstring);
       

        orders = dataObject.order;

        if(orders !== "NNN"){
            openFilters()
        }
    }

    


    

    var btn_listorder = document.querySelector('.listorder');
    btn_listorder.addEventListener('click', function (event) {
        openFilters();

    });



});