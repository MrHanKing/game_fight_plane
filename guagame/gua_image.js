var randomBetween = function(start, end) {
    var value = Math.random() * (end - start + 1)
    return Math.floor(value) + start
}

class GuaImage {
    constructor(game, name) {
        this.game = game
        this.x = 0
        this.y = 0
        this.texture = game.textureByName(name)
        this.w = this.texture.width
        this.h = this.texture.height
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

class Bullet extends GuaImage {
    //plOrEs 用于分辨敌方或玩家的子弹,玩家为1，敌人为2
    constructor(game, plOrEs = 1) {
        super(game, "bullet")
        this.plOrEs = plOrEs
        this.setUp()
    }
    setUp() {
        // this.up 用于区别子弹方向
        switch (this.plOrEs) {
            case 1:
                this.speed = randomBetween(5, 8)
                this.up = 1
                break;
            case 2:
                this.speed = randomBetween(8, 12)
                this.up = 2
            default:
                break;
        }
    }
    update() {
        if (this.up == 1) {
            this.y -= this.speed
        }
        if (this.up == 2) {
            this.y += this.speed
        }
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, "player")
        this.setUp()
    }
    setUp() {
        this.speedX = 5
        this.speedY = 5
        this.cd = 9
        // this.bullets = []
    }
    moveLeft() {
        this.x -= this.speedX
    }
    moveRight() {
        this.x += this.speedX
    }
    moveUp() {
        this.y -= this.speedY
    }
    moveDown() {
        this.y += this.speedY
    }
    fire() {
        var b = Bullet.new(this.game, 1)
        b.x = this.x + this.w / 2
        b.y = this.y
        this.game.scene.addPlayerBullets(b)
        this.cd = 9
    }
    update() {
        if (this.cd > 0) {
            this.cd--;
        } else {
            this.fire()
        }
    }
}


class Enemy extends GuaImage {
    constructor(game) {
        name = "enemy" + randomBetween(0, 4)
        super(game, name)
        this.setUp()
    }
    setUp() {
        this.speedY = randomBetween(2, 5)
        this.cd = randomBetween(20, 40)
        // this.bullets = []
        this.x = randomBetween(0, 350)
        this.y = 0
    }
    fire() {
        var b = Bullet.new(this.game, 2)
        b.x = this.x + this.w / 2
        b.y = this.y + this.h
        this.game.scene.addEnemyBullets(b)
        this.cd = randomBetween(20, 40)  
    }
    update() {
        this.y += this.speedY
        if (this.y > 600) {
            this.setUp()
        }
        //发射子弹
        if (this.cd > 0) {
            this.cd--;
        } else {
            this.fire()
        }
    }
}