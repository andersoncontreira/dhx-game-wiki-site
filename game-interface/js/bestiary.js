class Bestiary {

    constructor() {
        this.bestiary = []
        this.armors = []
        this.weapons = []
        this.current = null
        this.currentPosition = 0
    }

}


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

