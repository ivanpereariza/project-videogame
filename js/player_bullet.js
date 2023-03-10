class Bullet {

    constructor(ctx, playerPos, playerSize, playerPos0, fluidLeft, fluidRight) {
        this.ctx = ctx
        this.playerPos = playerPos
        this.playerSize = playerSize
        this.playerPos0 = playerPos0
        this.bulletSize = { w: 20, h: 20 }
        this.bulletPos = { x: (this.playerPos.x + this.playerSize.w), y: this.playerPos.y + ((playerSize.h / 2) - 10) }
        this.bulletVel = { x: 10, y: 0 }
        this.fluidLeft = fluidLeft
        this.fluidRight = fluidRight
        this.imgBulletLeft = new Image()
        this.imgBulletLeft.src = './img/player_bullet_left.png'
        this.imgBulletRight = new Image()
        this.imgBulletRight.src = './img/player_bullet_right.png'
        this.bulletsPos()
    }



    draw() {
        if (this.fluidRight) {
            this.ctx.drawImage(this.imgBulletRight, this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)
        } else if (this.fluidLeft) {
            this.ctx.drawImage(this.imgBulletLeft, this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)
        } else this.ctx.drawImage(this.imgBulletRight, this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)

        this.move()
    }


    bulletsPos() {
        if (this.fluidRight) {
            this.bulletPos.x = (this.playerPos.x + this.playerSize.w)
        } else if (this.fluidLeft) {
            this.bulletPos.x = (this.playerPos.x - this.bulletSize.w)
        } else this.bulletPos.x = (this.playerPos.x + this.playerSize.w)


    }

    move() {
        if (this.fluidRight) {
            this.bulletPos.x += this.bulletVel.x
        } else if (this.fluidLeft) {
            this.bulletPos.x -= this.bulletVel.x
        } else this.bulletPos.x += this.bulletVel.x


    }

}