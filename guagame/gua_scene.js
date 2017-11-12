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
    addElement(GuaImage) {
        this.elements.push(GuaImage)
    }
    clearUnusedBullets(){
        this.elements = this.elements.filter(function(element) {
            //是子弹则判断清理
            if (element.plOrEs != undefined) {
                return element.y <= 600 && element.y >= 0
            }
            return true
        })
    }
    draw() {
        for (var index = 0; index < this.elements.length; index++) {
            var element = this.elements[index];
            element.draw()
        }
    }
    update() {
        this.clearUnusedBullets()
        console.log(this.elements)
        for (var index = 0; index < this.elements.length; index++) {
            this.elements[index].update()
        }
    }
}
