class Bestiary {

    constructor() {
        this.bestiary = []
        this.armors = []
        this.weapons = []
        this.current = null
        this.currentPosition = 0
    }

}
var promiseList = [];
var loadList = [
    {key:"bestiary", file:"./../data/bestiary/bestiary.json", local:"./../data/bestiary/bestiary-data.js", data:[]},
    {key:"armors", file:"./../data/items/armors.json",  local:"./../data/items/armors-data.js", data:[]},
    {key:"weapons", file:"./../data/items/weapons.json",  local:"./../data/items/armors-data.js", data:[]},
];

function createScript(item, resolve, reject){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = item.local;
    script.onload = function () {
        //console.log(arguments)
        if (typeof data != undefined && data != null) {
            item.data = data;
            console.log(data)    
        }
        
        resolve(item)
    }
    script.onerror = function () {
        reject(false)
    }
    document.head.appendChild(script)
}

function createLink(item, resolve, reject){
    var script = document.createElement("link");
    script.type = "application/json";
    script.href = item.local;
    script.rel = "alternate"
    script.onload = function () {
        //console.log(arguments)
        if (typeof data != undefined && data != null) {
            item.data = data;
            console.log(data)    
        }
        
        resolve(item)
    }
    script.onerror = function () {
        reject(false)
    }
    document.head.appendChild(script)
}

function httpRequest(method, url) {

    return new Promise(function(resolve, reject) {
        
        var http = new XMLHttpRequest();
        http.open(method.toUpperCase(), url)
        http.send()

        http.onreadystatechange = function (e) {

            if (this.readyState == 4 && this.status==200) {
                //console.log(this.responseText)
                console.log(JSON.parse(this.responseText))
                resolve(JSON.parse(this.responseText))
            }
        }

        http.onerror = function (e) {
         reject(e)
        }
    })

}

function loadData (item, resolve, reject) {

    //console.log(window.location.protocol)
    if (window.location.protocol === "file:") {
        
        createScript(item, resolve, reject)

    } else {

        var promise = httpRequest("GET", item.file)
        promise.then(function(response){
            item.data = response
            resolve(item)
        })


        //createScript(item, resolve, reject)

    }


}

loadList.forEach(function(item) {
    var promise = new Promise(function(resolve, reject){

        loadData(item, resolve, reject)

    });
    promiseList.push(promise)
})



Promise.all(promiseList)
.then(function(values) {
    console.log(values)

    var bestiary = new Bestiary();

    values.forEach(function(item) {
        if(bestiary.hasOwnProperty(item.key)) {
            bestiary[item.key] = item.data

            if (item.key == "bestiary") {
                bestiary.current = item.data[0]
            }
        }
    })

    main(bestiary)
})




/**
 * Bestiary Main
 */
function main (bestiary) {


    //console.log(bestiary.current)

    var bestiaryApp = new Vue({
        el: 'main',
        data: bestiary,
        methods: {
            search: function (tag) {
                var object = null;
                var keys = ["armors", "weapons"];

                for (var index in keys) {

                    var key = keys[index]
                    var data = this[key]

                    console.log(key)

                    data.forEach(function (item) {
                        if(item.tag == tag) {
                            object = item
                            return false
                        }
                    })

                    if (object != null) {
                        break;
                    }
                }

                if (object) {
                    console.log("result:", object, object.tag)
                }

                return object
            },
            loadDropItems: function() {

                var self = this

                for (var index in this.current.dropItems) {
                    var tag = this.current.dropItems[index]

                    if (typeof tag === "string") {
                        console.log("search: "+ tag)
                        var item = self.search(tag)

                        if (item) {
                            this.current.dropItems[index] = item
                        } else {
                            this.current.dropItems[index] = null
                        }

                    }
                }

                console.log(this.current.dropItems)
            },
            prev: function() {
                //console.log('prev')

                if (this.currentPosition > 0) {
                    this.currentPosition--;
                }

                this.current = this.bestiary[this.currentPosition]

                this.loadDropItems()
            },
            next: function() {
                //console.log('next')

                var max = (this.bestiary.length)-1
                if (this.currentPosition < max) {
                    this.currentPosition++;
                }

                this.current = this.bestiary[this.currentPosition]

                this.loadDropItems()
            }
        }

    });

    bestiaryApp.loadDropItems()

    //var defaultId = 70;


    window.onkeyup = function (e) {

        //console.log(e.code)
        switch (e.code) {
            case "ArrowUp":
                break;
            case "ArrowDown":
                break;
            case "ArrowRight":
                bestiaryApp.next()
                break;
            case "ArrowLeft":
                bestiaryApp.prev()
                break;
        }

    }

}

