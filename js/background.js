class Background {
    constructor(ctx, canvasSize, player) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.player = player
        this.background = undefined

        this.backgroundSize = { w: 1262, h: 914 }
        this.backgroundPos = { x: 0, y: 0 }

        this.init()
    }


    init() {
        this.background = new Image()
        this.background.src = "./img/fondo.jpg"
    }


    draw() {
        this.ctx.drawImage(this.background, this.backgroundPos.x, this.backgroundPos.y, this.backgroundSize.w, this.backgroundSize.h)
        this.ctx.drawImage(this.background, this.backgroundPos.x + this.backgroundSize.w, this.backgroundPos.y, this.backgroundSize.w, this.backgroundSize.h)
        this.move()
    }


    move() {
        if (this.player.fluidLeft && this.player.playerPos.x <= 300) {
            this.backgroundPos.x += 0.5
        } else if (this.player.fluidRight && this.player.playerPos.x >= 700) {
            this.backgroundPos.x -= 0.5
        }
    }

}