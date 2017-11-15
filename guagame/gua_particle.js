class ParticleImage extends GuaImage {
    constructor(game) {
        super(game, "fire")
        this.setUp()
    }
    setUp() {
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.speedX = vx
        this.speedY = vy
    }
    update() {
        super.update()
        this.x += this.speedX
        this.y += this.speedY
        this.speedX += this.speedX * 0.1
        this.speedY += this.speedY * 0.1
    }
}

class Particle {
    constructor(game) {
        this.game = game
        this.particleNum = 100
        this.particles = []
        this.setUp()
    }
    setUp() {
        this.x = 200
        this.y = 200
    }
    draw() {
        for (var index = 0; index < this.particles.length; index++) {
            this.particles[index].draw()
        }
    }
    update() {
        // 画小火花粒子
        for (var index = this.particles.length; index < this.particleNum; index++) {
            var p = ParticleImage.new(this.game)
            var vx = randomBetween(-10, 10)
            var vy = randomBetween(-10, 10)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新小火花粒子位置
        for (var index = 0; index < this.particles.length; index++) {
            this.particles[index].update()
        }
    }
}