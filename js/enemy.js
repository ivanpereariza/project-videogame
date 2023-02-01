class Enemy {

    constructor(ctx, canvasSize, platforms, player, enemyBullets, { x: enemyPosX, y: enemyPosY }) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platforms = platforms
        this.player = player
        this.enemySize = { w: 30, h: 50 }
        this.enemyPos = { x: enemyPosX, y: enemyPosY }
        this.enemyBullets = enemyBullets
        this.enemyLives = 3

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
            this.enemyBullets.forEach(elm => elm.enemyBulletPos.x += 5)
        } else if (this.player.fluidRight && this.player.playerPos.x >= 700) {
            this.enemyBullets.forEach(elm => elm.enemyBulletPos.x -= 5)
        }
    }


    shoot() {
        setInterval(() => {
            this.enemyBullets.push(
                new EnemyBullet(this.ctx, this.enemyPos, this.enemySize)
            )
        }, 1000)

    }

    clearBullets() {
        this.enemyBullets = this.enemyBullets.filter(elm => elm.enemyBulletPos.x >= 0)
        this.enemyBullets = this.enemyBullets.filter(elm => elm.enemyBulletPos.x <= this.canvasSize.w)
    }
}