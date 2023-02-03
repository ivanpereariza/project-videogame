class Boss {
    constructor(ctx, canvasSize, player) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.bossSize = { w: 500, h: 500 }
        this.bossPos = { x: 11550, y: 120 }
        this.bossBullets = []
        this.player = player
        this.bossLives = 100

        this.imgBoss = new Image()
        this.imgBoss.src = './img/boss_shoot.png'
        this.imgBoss.framesIndex = 0
        this.imgBoss.frames = 4


        this.shoot()
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.imgBoss,
            (this.imgBoss.width / this.imgBoss.frames) * this.imgBoss.framesIndex, 0,
            this.imgBoss.width / this.imgBoss.frames, this.imgBoss.height,
            this.bossPos.x, this.bossPos.y, this.bossSize.w, this.bossSize.h)
        this.animateBoss(framesCounter)
        this.bossBullets.forEach(elm => elm.draw())
        this.clearBullets()

    }

    animateBoss(framesCounter) {
        if (framesCounter % 10 === 0) {
            this.imgBoss.framesIndex++
        }
        if (this.imgBoss.framesIndex >= this.imgBoss.frames) {
            this.imgBoss.framesIndex = 0
        }

    }

    shoot() {

        setInterval(() => {
            this.bossBullets.push(new BossBullet(this.ctx, this.canvasSize, this.bossSize, this.bossPos))
            this.shootSound()
        }, 1000)
    }

    shootSound() {
        if (this.bossPos.x < 1500) {
            this.bossSound = new Audio()
            this.bossSound.src = './sounds/boss_shoot.mp3'
            this.bossSound.volume = 0.3
            this.bossSound.play()
        }

    }

    clearBullets() {
        this.bossBullets = this.bossBullets.filter(elm => elm.bossBulletPos.x >= 0)
        this.bossBullets = this.bossBullets.filter(elm => elm.bossBulletPos.x <= this.canvasSize.w)

    }

}