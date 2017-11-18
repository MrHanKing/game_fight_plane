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