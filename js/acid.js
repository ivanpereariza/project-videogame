class Acid {

    constructor(ctx, canvasSize, player, { x: acidPosX, y: acidsPosY }, { w: acidSizeW, h: acidSizeH }) {

        this.ctx = ctx
        this.canvasSize = canvasSize
        this.img = undefined
        this.acidsPos = { x: acidPosX, y: acidsPosY }
        this.acidsSize = { w: acidSizeW, h: acidSizeH }
        this.player = player

        this.init()
    }

    init() {
        this.img = new Image()
        this.img.src = "./img/Acid1.png"
    }

    draw() {
        this.ctx.drawImage(this.img, this.acidsPos.x, this.acidsPos.y, this.acidsSize.w, this.acidsSize.h)
    }

}