class BossBullet {
    constructor(ctx, canvasSize, player, bossSize, bossPos) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.bossSize = bossSize
        this.bossPos = bossPos
        this.player = player
        this.bossBulletSize = { w: 100, h: 25 }
        this.bossBulletPos = { x: bossPos.x, y: this.player.playerPos.y }
    }

    draw() {
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(this.bossBulletPos.x, this.bossBulletPos.y, this.bossBulletSize.w, this.bossBulletSize.h)
        this.move()
    }

    move() {
        this.bossBulletPos.x -= 10

    }
}