class Player {
    constructor(ctx, canvasSize, keys, platforms, enemys, coins) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerSize = { w: 60, h: 100 }
        this.playerPos = { x: 500, y: (canvasSize.h - this.playerSize.h - 120) }
        this.playerPos0 = { x: 0, y: (canvasSize.h - this.playerSize.h) }
        this.playerVel = { x: 0, y: 3 }
        this.gravity = 0.1
        this.keys = keys
        this.fluidLeft = false
        this.fluidRight = false
        this.bullets = []
        this.platforms = platforms
        this.canShoot = true
        this.enemys = enemys
        this.coins = coins
        this.setListeners()

    }



    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.bullets.forEach(elm => elm.draw())
        this.colisionEnemyBullet()
        this.colisionBullet()
        this.colisionCoin()
        this.move()
        this.clearBullets()
    }


    move() {

        //Movimiento personaje limitado
        if (this.fluidLeft && this.playerPos.x > 300) this.playerVel.x = -3
        else if (this.fluidRight && this.playerPos.x < 700) this.playerVel.x = 3
        else this.playerVel.x = 0
        this.playerPos.x += this.playerVel.x

        //Movimiento plataformas
        if (this.fluidLeft && this.playerPos.x <= 300) {
            this.platforms.forEach(elm => elm.platformsPos.x += 3)
        } else if (this.fluidRight && this.playerPos.x >= 700) {
            this.platforms.forEach(elm => elm.platformsPos.x -= 3)
        }

        //Movimiento enemigos
        if (this.fluidLeft && this.playerPos.x <= 300) {
            this.enemys.forEach(elm => elm.enemyPos.x += 3)
        } else if (this.fluidRight && this.playerPos.x >= 700) {
            this.enemys.forEach(elm => elm.enemyPos.x -= 3)
        }

        //Movimiento monedas
        if (this.fluidLeft && this.playerPos.x <= 300) {
            this.coins.forEach(elm => elm.coinPos.x += 3)
        } else if (this.fluidRight && this.playerPos.x >= 700) {
            this.coins.forEach(elm => elm.coinPos.x -= 3)
        }

        if (this.playerPos.y < this.playerPos0.y) {
            this.playerPos.y += this.playerVel.y
            this.playerVel.y += this.gravity
            this.colisionPlatform()
        }
        else {
            this.playerPos.y = this.playerPos0.y
            this.playerVel.y = 0
        }
    }

    setListeners() {
        document.addEventListener('keydown', event => {
            switch (event.code) {
                case this.keys.MOVELEFT:
                    this.fluidLeft = true
                    break;
                case this.keys.MOVERIGHT:
                    this.fluidRight = true
                    break;
                case this.keys.JUMP:
                    if (this.playerVel.y === 0) this.jump()
                    break;
                case this.keys.SHOOT:
                    if (this.canShoot) this.shoot()
                    this.canShoot = false
                    break;

            }

        })
        document.addEventListener('keyup', event => {
            switch (event.code) {
                case this.keys.MOVELEFT:
                    this.fluidLeft = false
                    break;
                case this.keys.MOVERIGHT:
                    this.fluidRight = false
                    break;
                case this.keys.SHOOT:
                    this.canShoot = true
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



    //Colision del player con las plataformas

    colisionPlatform() {
        this.platforms.forEach(elm => {
            if (this.playerPos.y + this.playerSize.h <= elm.platformsPos.y &&
                this.playerPos.y + this.playerSize.h + this.playerVel.y >= elm.platformsPos.y &&
                this.playerPos.x + this.playerSize.w >= elm.platformsPos.x &&
                this.playerPos.x <= elm.platformsPos.x + elm.platformsSize.w) {
                this.playerVel.y = 0
            }
        })
    }

    //Colision de la bala del player contra el enemigo

    colisionBullet() {
        this.bullets.forEach((bullet, i) => {
            this.enemys.forEach((enemy, j) => {
                if (bullet.bulletPos.x < enemy.enemyPos.x + enemy.enemySize.w &&
                    bullet.bulletPos.y < enemy.enemyPos.y + enemy.enemySize.h &&
                    bullet.bulletPos.x + bullet.bulletSize.w > enemy.enemyPos.x &&
                    bullet.bulletPos.y + bullet.bulletSize.h > enemy.enemyPos.y) {
                    this.enemys.splice(j, 1)
                    this.bullets.splice(i, 1)
                }
            })

        })
    }

    //Colision de la bala enemiga en el player

    colisionEnemyBullet() {
        this.enemys.forEach(elm => {
            elm.enemyBullets.forEach(enemyBullet => {
                if (this.playerPos.x < enemyBullet.enemyBulletPos.x + enemyBullet.enemyBulletSize.w &&
                    this.playerPos.y < enemyBullet.enemyBulletPos.y + enemyBullet.enemyBulletSize.h &&
                    this.playerPos.x + this.playerSize.w > enemyBullet.enemyBulletPos.x &&
                    this.playerPos.y + this.playerSize.h > enemyBullet.enemyBulletPos.y) {
                    console.log('me han dado!!!')
                }
            })
        })

    }

    //Colision player con coin

    colisionCoin() {
        this.coins.forEach((elm, i) => {
            if (this.playerPos.x < elm.coinPos.x + elm.coinSize.w &&
                this.playerPos.y < elm.coinPos.y + elm.coinSize.h &&
                this.playerPos.x + this.playerSize.w > elm.coinPos.x &&
                this.playerPos.y + this.playerSize.h > elm.coinPos.y) {
                this.coins.splice(i, 1)
                console.log('+1 moneda!!!')
            }
        })
    }






}
