window.addEventListener('load', function () {

    var valueprice = document.querySelectorAll(".valueprice");
    var totalrpice = 0;

    valueprice.forEach(viewvalue => {
        console.log(viewvalue)
        totalrpice += parseInt((viewvalue.innerHTML).replace("$", ""))
    });


    var totaltotal = document.querySelector(".totalpricevalue");

    totaltotal.innerHTML = "$ "+ totalrpice;


    var btn = document.querySelector("#buyit");

    btn.addEventListener('click', function () {
        var nom = document.querySelector('#inp5').value;
        var ced = document.querySelector('#inp6').value;

        if (nom === "" || ced === "") {
            alert('llene todos los campos');
            return;
        } else {
            fetch(`/api/vars`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `nombre=${nom}&cedula=${ced}`
            }).then(function (respuesta) {
                return respuesta.text();
            }).catch(function (error) {
                console.error(error);
            }).then(function (mensaje) {
                console.log(mensaje);
            });

            window.location.href = "/pago";
        }

    });

});
