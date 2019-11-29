window.addEventListener('load', function () {

    var btn_listorder = document.querySelector('.listorder');
    btn_listorder.addEventListener('click', function (event) {
        openFilters();

    });

    var btn = document.querySelector("#entrar");

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
