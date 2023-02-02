class EnemyBullet {
    constructor(ctx, enemyPos, enemySize) {
        this.ctx = ctx
        this.enemyPos = enemyPos
        this.enemySize = enemySize
        this.enemyBulletPos = { x: (enemyPos.x - 10), y: enemyPos.y + (enemySize.h / 2) - 25 }
        this.enemyBulletSize = { w: 20, h: 5 }
        this.enemyBulletVel = { x: 10, y: 0 }
        this.imgBullet = new Image()
        this.imgBullet.src = './img/soldier_bullet.png'
        // this.shootEnemySound()
    }

    draw() {
        this.ctx.drawImage(this.imgBullet, this.enemyBulletPos.x, this.enemyBulletPos.y, this.enemyBulletSize.w, this.enemyBulletSize.h)
        this.move()
    }


    // shootEnemySound() {
    //     this.enemySound = new Audio()
    //     this.enemySound.src = './sounds/soldier_shoot.mp3'
    //     this.enemySound.volume = 0.05
    //     this.enemySound.play()
    // }


    move() {
        this.enemyBulletPos.x -= this.enemyBulletVel.x
    }
}