class EnemyBullet {
    constructor(ctx, enemyPos, enemySize) {
        this.ctx = ctx
        this.enemyPos = enemyPos
        this.enemySize = enemySize
        this.enemyBulletPos = { x: (enemyPos.x - 10), y: enemyPos.y + (enemySize.h / 2) }
        this.enemyBulletSize = { w: 20, h: 20 }
        this.enemyBulletVel = { x: 5, y: 0 }
    }

    draw() {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(this.enemyBulletPos.x, this.enemyBulletPos.y, this.enemyBulletSize.w, this.enemyBulletSize.h)
        this.move()
    }

    move() {
        this.enemyBulletPos.x -= this.enemyBulletVel.x
    }
}