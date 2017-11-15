class GuaImage {
    constructor(game, name) {
        this.game = game
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

class ParticleImage extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setUp()
    }
    setUp() {
        this.x = 200
        this.y = 200
        this.speedX = randomBetween(-3, 3)
        this.speedY = randomBetween(-3, 3)
    }
    update() {
        super.update()
        this.x += this.speedX
        this.y += this.speedY
    }
}

class Particle {
    constructor(game) {
        this.game = game
        this.particleNum = 100
        this.setUp()
    }
    // setUp() {
    //     for (var index = 0; index < this.particleNum; index++) {
    //         var element = array[index];
            
    //     }
    // }
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
        if (this.collideWithBullet()) {
            log("你中弹了")
            this.destroy()
        }
        if (this.cd > 0) {
            this.cd--;
        } else {
            this.fire()
        }
    }
    destroy() {
        // 播放爆炸特效
        // 返回菜单
        log("游戏结束，返回菜单")
    }
    collideWithBullet() {
        var array = this.game.scene.enemyBullets
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (rectIntersects(element, this)) {
                //碰撞清除子弹
                this.game.scene.playerBullets.splice(index, 1)
                return true
            }
        }
        return false
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
        this.imgRotate = Math.PI
        // console.log("1",this.imgRotate)
    }
    fire() {
        var b = Bullet.new(this.game, 2)
        b.x = this.x + this.w / 2
        b.y = this.y + this.h
        this.game.scene.addEnemyBullets(b)
        this.cd = randomBetween(20, 40)  
    }
    update() {
        if (this.collideWithBullet()) {
            console.log("处理销毁")
            this.destroy()
        }
        
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
    destroy() {
        // 播放爆炸特效
        // 重置飞机
        this.setUp()
    }
    collideWithBullet() {
        var array = this.game.scene.playerBullets
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (rectIntersects(element, this)) {
                //碰撞清除子弹
                this.game.scene.playerBullets.splice(index, 1)
                return true
            }
        }
        return false
    }
}