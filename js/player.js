class Player {
    constructor(ctx, canvasSize, keys) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerSize = { w: 60, h: 100 }
        this.playerPos = { x: 500, y: canvasSize.h - this.playerSize.h }
        this.playerPos0 = { x: 0, y: this.playerPos.y }
        this.playerVel = { x: 0, y: 3 }
        this.gravity = 0.1
        this.keys = keys
        this.fluidLeft = false
        this.fluidRight = false
        this.bullets = []
        this.setListeners()

    }


    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.bullets.forEach(elm => elm.draw())
        this.move()
        this.clearBullets()
        console.log(this.bullets)
    }

    move() {
        this.fluidLeft ? this.playerPos.x -= 3 : undefined
        this.fluidRight ? this.playerPos.x += 3 : undefined
        if (this.playerPos.y < this.playerPos0.y) {
            this.playerPos.y += this.playerVel.y
            this.playerVel.y += this.gravity
        }
        else {
            this.playerPos.y = this.playerPos0.y
            this.playerVel.y = 1
        }

    }

    setListeners() {
        document.addEventListener('keydown', event => {
            switch (event.code) {
                case this.keys.ARROWLEFT:
                    this.fluidLeft = true
                    break;
                case this.keys.ARROWRIGHT:
                    this.fluidRight = true
                    break;
                case this.keys.SPACE:
                    if (this.playerPos.y >= this.playerPos0.y) {
                        this.jump()
                    }
                    break;
                case this.keys.A:
                    this.shoot()
                    console.log('DISPARO')
                    break;

            }
        })
        document.addEventListener('keyup', event => {
            switch (event.code) {
                case this.keys.ARROWLEFT:
                    this.fluidLeft = false
                    break;
                case this.keys.ARROWRIGHT:
                    this.fluidRight = false
                    break;
            }
        })
    }

    jump() {
        this.playerPos.y -= 100
        this.playerVel.y -= 3

    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.playerPos, this.playerSize, this.playerPos0))
    }

    clearBullets() {
        this.bullets = this.bullets.filter(elm => elm.bulletPos.x <= this.canvasSize.w)
    }


}