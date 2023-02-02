class Enemy {

    constructor(ctx, canvasSize, platforms, player, { x: enemyPosX, y: enemyPosY }) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platforms = platforms
        this.player = player
        this.enemySize = { w: 150, h: 100 }
        this.enemyPos = { x: enemyPosX, y: enemyPosY }
        this.enemyBullets = []
        this.enemyLives = 3

        this.imgEnemy = new Image()
        this.imgEnemy.src = './img/soldier.png'
        this.imgEnemy.framesIndex = 3
        this.imgEnemy.frames = 4

        this.shoot()
    }


    draw(framesCounter) {
        this.ctx.drawImage(
            this.imgEnemy,
            (this.imgEnemy.width / this.imgEnemy.frames) * this.imgEnemy.framesIndex, 0,
            this.imgEnemy.width / this.imgEnemy.frames, this.imgEnemy.height,
            this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
        this.animateEnemy(framesCounter)
        this.enemyBullets.forEach(elm => elm.draw())
        this.moveBullets()
        this.clearBullets()

    }


    animateEnemy(framesCounter) {
        if (framesCounter % 18 === 0) {
            this.imgEnemy.framesIndex--
        }
        if (this.imgEnemy.framesIndex < 0) {
            this.imgEnemy.framesIndex = 3
        }

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