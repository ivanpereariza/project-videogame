class BossBullet {
    constructor(ctx, canvasSize, bossSize, bossPos) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.bossSize = bossSize
        this.bossPos = bossPos
        this.bossBulletSize = { w: 100, h: 25 }
        this.bossBulletPos = { x: bossPos.x, y: ((Math.random() * 350) + 225) }
        this.imgBullet = new Image()
        this.imgBullet.src = './img/boss_bullet.png'
    }

    draw() {
        this.ctx.drawImage(this.imgBullet, this.bossBulletPos.x, this.bossBulletPos.y, this.bossBulletSize.w, this.bossBulletSize.h)
        this.move()
    }

    move() {
        this.bossBulletPos.x -= 10

    }
}