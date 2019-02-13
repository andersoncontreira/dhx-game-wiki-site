// console.log('Ok')

window.onload = function () {
    // console.log('onload')
    var bestiaryJsonPath = "./../data/bestiary/bestiary-data.js"
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.src = bestiaryJsonPath
    script.onload = function () {
        main(data)
    }
    document.head.appendChild(script)
}


/**
 * Bestiary Main
 */
function main (data) {
// console.log("main")

    var mainData = {
        "bestiary": data,
        "current": data[0],
        "currentPosition": 0
    };

    console.log(mainData.current)

    var bestiaryApp = new Vue({
        el: 'main',
        data: mainData,
        methods: {
            prev: function() {
                //console.log('prev')

                if (this.currentPosition > 0) {
                    this.currentPosition--;
                }

                this.current = this.bestiary[this.currentPosition]
            },
            next: function() {
                //console.log('next')

                var max = (this.bestiary.length)-1
                if (this.currentPosition < max) {
                    this.currentPosition++;
                }

                this.current = this.bestiary[this.currentPosition]
            }
        }

    });

    var defaultId = 70;


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

