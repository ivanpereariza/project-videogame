class Bullet {

    constructor(ctx, playerPos, playerSize, playerPos0) {
        this.ctx = ctx
        this.playerPos = playerPos
        this.playerSize = playerSize
        this.playerPos0 = playerPos0
        this.bulletSize = { w: 20, h: 20 }
        this.bulletPos = { x: (this.playerPos.x + this.playerSize.w), y: this.playerPos.y + ((playerSize.h / 2) - 10) }
        this.bulletVel = { x: 10, y: 0 }
    }



    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)
        this.move()
    }

    move() {
        this.bulletPos.x += this.bulletVel.x
    }

}