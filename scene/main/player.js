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
        // 删除自己
        this.game.scene.delElement(this)
        // 返回菜单
        this.game.replaceScene(SceneTitle.instance(this.game))
        log("游戏结束，返回菜单")
    }
    collideWithBullet() {
        var array = this.game.scene.enemyBullets
        for (var index = 0; index < array.length; index++) {
            var element = array[index];
            if (rectIntersects(element, this)) {
                //碰撞清除子弹
                this.game.scene.enemyBullets.splice(index, 1)
                return true
            }
        }
        return false
    }
}