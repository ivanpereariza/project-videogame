class Boss {
    constructor(ctx, canvasSize, player) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.bossSize = { w: 500, h: 500 }
        this.bossPos = { x: 1000, y: 100 }
        this.bossBullets = []
        this.player = player
        // this.shoot()
        this.clearBullets()
    }

    draw() {
        this.ctx.fillStyle = "purple"
        this.ctx.fillRect(this.bossPos.x, this.bossPos.y, this.bossSize.w, this.bossSize.h)
        this.bossBullets.forEach(elm => elm.draw())
        console.log(this.bossBullets)
    }

    shoot() {

        setInterval(() => {
            this.bossBullets.push(new BossBullet(this.ctx, this.canvasSize, this.player, this.bossSize, this.bossPos))
        }, 1000)
    }
    clearBullets() {
        this.bossBullets = this.bossBullets.filter(elm => elm.bossBulletPos.x >= 0)
        this.bossBullets = this.bossBullets.filter(elm => elm.bossBulletPos.x <= this.canvasSize.w)
    }

}