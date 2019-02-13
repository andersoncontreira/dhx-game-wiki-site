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