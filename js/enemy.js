class Enemy {

    constructor(ctx, canvasSize, platforms, player, { x: enemyPosX, y: enemyPosY }) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platforms = platforms
        this.player = player
        this.enemySize = { w: 30, h: 50 }
        this.enemyPos = { x: enemyPosX, y: enemyPosY }
        this.enemyBullets = []

        this.shoot()
    }


    draw() {
        this.ctx.fillStyle = "green"
        this.ctx.fillRect(this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
        this.enemyBullets.forEach(elm => elm.draw())
        this.moveBullets()
        this.clearBullets()
    }

    moveBullets() {
        if (this.player.fluidLeft && this.player.playerPos.x <= 300) {
            this.enemyBullets.forEach(elm => elm.enemyBulletPos.x += 3)
        } else if (this.player.fluidRight && this.player.playerPos.x >= 700) {
            this.enemyBullets.forEach(elm => elm.enemyBulletPos.x -= 3)
        }
    }


    shoot() {
        setInterval(() => {
            this.enemyBullets.push(
                new EnemyBullet(this.ctx, this.enemyPos, this.enemySize)
            )
        }, 2000)

    }

    clearBullets() {
        this.enemyBullets = this.enemyBullets.filter(elm => elm.enemyBulletPos.x >= 0)
        this.enemyBullets = this.enemyBullets.filter(elm => elm.enemyBulletPos.x <= this.canvasSize.w)
    }
}