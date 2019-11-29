window.addEventListener('load', function(){
    
    var counter_products = document.querySelector('.counter_products');

    function updatecart(){
        fetch('/api/cart/')
            .then(function(response) {
                    console.log(response);
                    return response.json();
                })
                .then(function(data) {
                    console.log(data); //data es lo que le pedi
                    if(data.products.length > 0){
                        counter_products.innerText = data.products.length;
                        var colorcount = document.querySelector('.counter_products');
                        colorcount.style.background = "#FF0B6B";
                    }
                });
    }

    updatecart();
    this.window.updatecart = updatecart;


});