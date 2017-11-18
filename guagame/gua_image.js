class GuaImage {
    constructor(game, name) {
        this.game = game
        this.name = name
        this.x = 0
        this.y = 0
        this.texture = game.textureByName(name)
        this.w = this.texture.width
        this.h = this.texture.height
        this.imgRotate = 0
    }

    static new(game, name) {
        var i = new this(game, name)
        return i
    }

    // static log() {
    //     console.log("hahahaha")
    // }

    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}