class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.playerBullets = []
        this.enemyBullets = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    static instance(game) {
        this.i = this.i || new this(game)
        return this.i
    }
    addElement(GuaImage) {
        this.elements.push(GuaImage)
    }
    addPlayerBullets(GuaImage) {
        this.playerBullets.push(GuaImage)
    }
    addEnemyBullets(GuaImage) {
        this.enemyBullets.push(GuaImage)
    }
    delElement(GuaImage) {
        var array = this.elements
        for (var index = 0; index < array.length; index++) {
            if (GuaImage.name == array[index].name) {
                array.splice(index, 1)
            }
        }
    }
    clearUnusedBullets(){
        this.playerBullets = this.playerBullets.filter(function(element) {
            return element.y <= 600 && element.y >= 0
        })
        this.enemyBullets = this.enemyBullets.filter(function(element) {
            return element.y <= 600 && element.y >= 0
        })
        // this.elements = this.elements.filter(function(element) {
        //     //是子弹则判断清理
        //     if (element.plOrEs != undefined) {
        //         return element.y <= 600 && element.y >= 0
        //     }
        //     return true
        // })
    }
    draw() {
        //画其他元素、玩家子弹、敌方子弹
        for (var element of this.elements) {
            element.draw()
        }
        for (var element of this.playerBullets) {
            element.draw()
        }
        for (var element of this.enemyBullets) {
            element.draw()
        }
    }
    update() {
        this.clearUnusedBullets()
        // console.log(this.elements)
        for (var element of this.elements) {
            element.update()
        }
        for (var element of this.playerBullets) {
            element.update()
        }
        for (var element of this.enemyBullets) {
            element.update()
        }
    }
}
