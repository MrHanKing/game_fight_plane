class Bullet extends GuaImage {
    //plOrEs 用于分辨敌方或玩家的子弹,玩家为1，敌人为2
    constructor(game, plOrEs = 1) {
        var name = ""
        if (plOrEs == 1) {
            name = "bullet"
        } else {
            name = "enemyBullet"
        }
        super(game, name)
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