class EnemyList {
	constructor() {
		this.bestiary = []
        this.armors = []
        this.weapons = []
	}
}



Promise.all(promiseList)
.then(function(values) {
    console.log(values)

    var enemyList = new EnemyList();

    values.forEach(function(item) {
        if(enemyList.hasOwnProperty(item.key)) {
            enemyList[item.key] = item.data

            // if (item.key == "enemyList") {
            //     enemyList.current = item.data[0]
            // }
        }
    })

    main(enemyList)
})

function main(enemyList) {
	var enemyListApp = new Vue({
        el: 'main',
        data: enemyList,
    })
}