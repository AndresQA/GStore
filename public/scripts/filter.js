window.addEventListener("load", () => {
    /*
        var steam = document.querySelector("#steam");
        var origin = document.querySelector("#origin");
        var epic = document.querySelector("#epic");
        var FPS = document.querySelector("#FPS");
        var Carreras = document.querySelector("#Carreras");
        var RPG = document.querySelector("#RPG");
        var Aventura = document.querySelector("#Aventura");
        var Juego = document.querySelector("#Juego");
        var DlC = document.querySelector("#DlC");
    

    var filterManager = new FilterManager();

    var fitros = document.querySelectorAll(".filter-option");

    var query = {
        filter: {},
        filter2: {},
        filter3: {}
    };




    fitros.forEach((filtro, i) => {

        filtro.addEventListener("click", () => {
            var item = filtro.value.split("/");

            if (filtro.checked) {
                filterManager.addFilter(item[0], item[1]);
            } else {
                filterManager.removeFilter(item[0], item[1]);
            }

            location.href = "/productos/" + JSON.stringify(filterManager.generateQuery());

        })
    })


    /**
     * Filtro 1 : el primer click
     * 
     * filtro 2: forech
     * 
     * filtro 3: forech
    

    var fil = {
        $or: [{
                genre: 'Carreras'
            },
            {
                genre: 'FPS'
            },
        ]

    }
    */

});

/*
class FilterManager {

    constructor() {
        this.filters = [];
        this.query = {};
        var params = location.href.split("/");
        console.log(params);
        params.forEach(p=>{
         
        })
        console.log(params[4]);
    
    }

    addFilter(tipo, value) {
        var find = false;
        this.filters.forEach((filter) => {
            if (filter.value == value && filter.tipo == tipo) {
                find = true;
            }
        });
        if (!find) {
            this.filters.push({
                tipo: tipo,
                value: value
            });
        }
    }

    removeFilter(tipo, value) {
        var find = false;
        var index = 0;
        this.filters.forEach((filter, i) => {
            if (filter.value == value && filter.tipo == tipo) {
                find = true;
                index = i;
            }
        });
        if (find) {
            this.filters.splice(index, 1);
        }
    }



    generateQuery() {
        if (this.filters.length > 0) {
            var first = [];
            var second = [];
            var third = [];

            var firstType = "";
            var secondType = "";
            var thirdType = "";

            this.filters.forEach((filter, i) => {
                if (i == 0) {
                    firstType = filter.tipo;
                }

                if(filter.tipo != firstType && secondType == ""){
                    secondType = filter.tipo;
                }

                if(filter.tipo != firstType && filter.tipo != secondType && secondType != "" && thirdType == ""){
                    thirdType = filter.tipo;
                }

                if (firstType == filter.tipo) {
                    first.push(filter);
                }

                if (secondType == filter.tipo) {
                    second.push(filter);
                }

                if(thirdType == filter.tipo){
                    third.push(filter);
                }
            });

            this.query = {
                first:first,
                second:second,
                third:third
            }

        }

        return this.query;
    }
}
*/