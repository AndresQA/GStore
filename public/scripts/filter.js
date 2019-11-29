window.addEventListener("load", () => {



    var filterManager = new FilterManager();

    var fitros = document.querySelectorAll(".filter-option");

    var orders = document.querySelectorAll(".filter-order");

    var query = {
        filter: {},
        filter2: {},
        filter3: {}
    };

    orders.forEach((filtro, i) => {

        filtro.addEventListener("click", () => {
            var item = filtro.value.split("/");

            filterManager.setOrder(item[0], item[1]);

            location.href = "/productos/" + JSON.stringify(filterManager.generateQuery());

        })
    })



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


class FilterManager {

    constructor() {
        this.filters = [];
        this.orders = "NNN";
        this.query = {};


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
            dataObject.first.forEach((d) => {
                this.addFilter(d.tipo, d.value);
            });
            dataObject.second.forEach((d) => {
                this.addFilter(d.tipo, d.value);
            });
            dataObject.third.forEach((d) => {
                this.addFilter(d.tipo, d.value);
            });

            this.orders = dataObject.order;
            
        }

    }

    setOrder(tipo, value) {
        this.orders = {
            tipo: tipo,
            value: value
        }
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
        var first = [];
        var second = [];
        var third = [];
        if (this.filters.length > 0) {


            var firstType = "";
            var secondType = "";
            var thirdType = "";

            this.filters.forEach((filter, i) => {
                if (i == 0) {
                    firstType = filter.tipo;
                }

                if (filter.tipo != firstType && secondType == "") {
                    secondType = filter.tipo;
                }

                if (filter.tipo != firstType && filter.tipo != secondType && secondType != "" && thirdType == "") {
                    thirdType = filter.tipo;
                }

                if (firstType == filter.tipo) {
                    first.push(filter);
                }

                if (secondType == filter.tipo) {
                    second.push(filter);
                }

                if (thirdType == filter.tipo) {
                    third.push(filter);
                }
            });
        }

        this.query = {
            first: first,
            second: second,
            third: third,
            order: this.orders
        }

        return this.query;
    }
}