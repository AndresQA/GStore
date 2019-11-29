window.addEventListener('load', function () {

    var valueprice = document.querySelectorAll(".valueprice");
    var totalrpice = 0;

    valueprice.forEach(viewvalue => {
        console.log(viewvalue)
        totalrpice += parseInt((viewvalue.innerHTML).replace("$", ""))
    });


    var totaltotal = document.querySelector(".totalpricevalue");

    totaltotal.innerHTML = "$ "+ totalrpice;



});
