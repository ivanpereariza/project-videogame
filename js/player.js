class Player {
    constructor(ctx, canvasSize, keys, platforms, enemys, coins, hearts, acids, enemyBullets, boss, wallsLeft, wallsRight) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerSize = { w: 60, h: 100 }
        this.playerPos = { x: 500, y: (canvasSize.h - this.playerSize.h - 120) }
        this.playerPos0 = { x: 0, y: (canvasSize.h - this.playerSize.h) }
        this.playerVel = { x: 0, y: 3 }
        this.gravity = 0.28
        this.keys = keys
        this.fluidLeft = false
        this.fluidRight = false
        this.bullets = []
        this.platforms = platforms
        this.canShoot = true
        this.enemys = enemys
        this.coins = coins
        this.hearts = hearts
        this.acids = acids
        this.boss = boss
        this.wallsLeft = wallsLeft
        this.wallsRight = wallsRight
        this.enemyBullets = enemyBullets
        this.coinsCount = 0
        this.livesCount = 3
        this.imgStop = new Image()
        this.imgStop.src = "./img/stop.png"
        this.imgStop.framesIndex = 0
        this.imgStop.frames = 3
        this.imgRight = new Image()
        this.imgRight.src = './img/run_Rgth.png'
        this.imgRight.framesIndex = 0
        this.imgRight.frames = 6
        this.imgLeft = new Image()
        this.imgLeft.src = './img/run_Left.png'
        this.imgLeft.framesIndex = 5
        this.imgLeft.frames = 6

        this.setListeners()


    }

    init(framesCounter) {

        this.draw(framesCounter)
        this.collisions()
        this.clearBullets()


    }



    draw(framesCounter) {
        console.log(this.playerVel.y)

        if (this.fluidRight) {
            this.ctx.drawImage(
                this.imgRight,
                (this.imgRight.width / this.imgRight.frames) * this.imgRight.framesIndex, 0,
                this.imgRight.width / this.imgRight.frames, this.imgRight.height,
                this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
            this.animateRunRight(framesCounter)

        } else if (this.fluidLeft) {
            this.ctx.drawImage(
                this.imgLeft,
                (this.imgLeft.width / this.imgLeft.frames) * this.imgLeft.framesIndex, 0,
                this.imgLeft.width / this.imgLeft.frames, this.imgLeft.height,
                this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
            this.animateRunLeft(framesCounter)

        } else {
            this.ctx.drawImage(
                this.imgStop,
                (this.imgStop.width / this.imgStop.frames) * this.imgStop.framesIndex, 0,
                this.imgStop.width / this.imgStop.frames, this.imgStop.height,
                this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
            this.animeteStop(framesCounter)
        }





        // this.ctx.fillRect(this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)









        this.bullets.forEach(elm => elm.draw())
        this.ctx.font = '50px Serif'
        this.ctx.fillText(`Coins: ${this.coinsCount}`, 1300, 50)
        this.ctx.fillText(`Lives: ${this.livesCount}`, 50, 50)
        this.move()


    }

    animeteStop(framesCounter) {
        if (framesCounter % 15 === 0) {
            this.imgStop.framesIndex++
        }
        if (this.imgStop.framesIndex >= this.imgStop.frames) {
            this.imgStop.framesIndex = 0
        }

    }

    animateRunRight(framesCounter) {
        if (framesCounter % 9 === 0) {
            this.imgRight.framesIndex++
        } if (this.imgRight.framesIndex >= this.imgRight.frames) {
            this.imgRight.framesIndex = 0
        }

    }

    animateRunLeft(framesCounter) {
        if (framesCounter % 6 === 0) {
            this.imgLeft.framesIndex--
        } if (this.imgLeft.framesIndex === 0) {
            this.imgLeft.framesIndex = this.imgLeft.frames - 1
        }

    }


    collisions() {
        this.collisionEnemyBullet()
        this.collisionBullet()
        this.collisionCoin()
        this.collisionHeart()
        this.collisionWithEnemy()
        this.collisionWithBoss()
        this.collisionBossBullet()
        this.collisionPlayerBulletBoss()
        this.collisionPlayerWallsLeft()
        this.collisionPlayerWallsRight()
    }


    move() {

        //Player movement restricted
        if (this.fluidLeft && this.playerPos.x > 300) this.playerVel.x = -5
        else if (this.fluidRight && this.playerPos.x < 700) this.playerVel.x = 5
        else this.playerVel.x = 0
        this.playerPos.x += this.playerVel.x

        //Plaatforms movement
        if (this.fluidLeft && this.playerPos.x <= 300) {
            this.platforms.forEach(elm => elm.platformsPos.x += 5)
        } else if (this.fluidRight && this.playerPos.x >= 700) {
            this.platforms.forEach(elm => elm.platformsPos.x -= 5)
        }

        //Enemy movement
        if (this.fluidLeft && this.playerPos.x <= 300) {
            this.enemys.forEach(elm => elm.enemyPos.x += 5)
        } else if (this.fluidRight && this.playerPos.x >= 700) {
            this.enemys.forEach(elm => elm.enemyPos.x -= 5)
        }

        //Coins movement
        if (this.fluidLeft && this.playerPos.x <= 300) {
            this.coins.forEach(elm => elm.coinPos.x += 5)
        } else if (this.fluidRight && this.playerPos.x >= 700) {
            this.coins.forEach(elm => elm.coinPos.x -= 5)
        }


        //Hearts movement
        if (this.fluidLeft && this.playerPos.x <= 300) {
            this.hearts.forEach(elm => elm.heartPos.x += 5)
        } else if (this.fluidRight && this.playerPos.x >= 700) {
            this.hearts.forEach(elm => elm.heartPos.x -= 5)
        }


        //Acids movement
        if (this.fluidLeft && this.playerPos.x <= 300) {
            this.acids.forEach(elm => elm.acidsPos.x += 5)
        } else if (this.fluidRight && this.playerPos.x >= 700) {
            this.acids.forEach(elm => elm.acidsPos.x -= 5)
        }

        //Walls Left movement
        if (this.fluidLeft && this.playerPos.x <= 300) {
            this.wallsLeft.forEach(elm => elm.wallLeftPos.x += 5)
        } else if (this.fluidRight && this.playerPos.x >= 700) {
            this.wallsLeft.forEach(elm => elm.wallLeftPos.x -= 5)
        }

        // //Walls Right movement
        // if (this.fluidRight && this.playerPos.x <= 300) {
        //     this.wallsRight.forEach(elm => elm.wallRightPos.x += 5)
        // } else if (this.fluidRight && this.playerPos.x >= 700) {
        //     this.wallsRight.forEach(elm => elm.wallRightPos.x -= 5)
        // }



        //Boss movement
        if (this.fluidLeft && this.playerPos.x <= 300) {
            this.boss.bossPos.x += 5
        } else if (this.fluidRight && this.playerPos.x >= 700) {
            this.boss.bossPos.x -= 5
        }

        if (this.playerPos.y < this.playerPos0.y) {
            this.playerPos.y += this.playerVel.y
            this.playerVel.y += this.gravity
            this.collisionPlatform()
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
        this.playerVel.y -= 5

    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.playerPos, this.playerSize, this.playerPos0, this.fluidLeft, this.fluidRight))
    }

    clearBullets() {
        this.bullets = this.bullets.filter(elm => elm.bulletPos.x <= this.canvasSize.w)
    }



    //Collision player with platforms

    collisionPlatform() {
        this.platforms.forEach(elm => {
            if (this.playerPos.y + this.playerSize.h <= elm.platformsPos.y &&
                this.playerPos.y + this.playerSize.h + this.playerVel.y >= elm.platformsPos.y &&
                this.playerPos.x + this.playerSize.w >= elm.platformsPos.x &&
                this.playerPos.x <= elm.platformsPos.x + elm.platformsSize.w) {
                this.playerVel.y = 0
            }
        })
    }

    //Collision player bullet with enemy

    collisionBullet() {
        this.bullets.forEach((bullet, i) => {
            this.enemys.forEach((enemy, j) => {
                if (bullet.bulletPos.x < enemy.enemyPos.x + enemy.enemySize.w &&
                    bullet.bulletPos.y < enemy.enemyPos.y + enemy.enemySize.h &&
                    bullet.bulletPos.x + bullet.bulletSize.w > enemy.enemyPos.x &&
                    bullet.bulletPos.y + bullet.bulletSize.h > enemy.enemyPos.y) {
                    enemy.enemyLives--
                    this.bullets.splice(i, 1)
                    if (enemy.enemyLives === 0) {
                        this.enemys.splice(j, 1)
                    }
                }
            })

        })
    }

    //Collision enemy bullet with player

    collisionEnemyBullet() {
        this.enemys.forEach(elm => {
            elm.enemyBullets.forEach((enemyBullet, i) => {
                if (this.playerPos.x < enemyBullet.enemyBulletPos.x + enemyBullet.enemyBulletSize.w &&
                    this.playerPos.y < enemyBullet.enemyBulletPos.y + enemyBullet.enemyBulletSize.h &&
                    this.playerPos.x + this.playerSize.w > enemyBullet.enemyBulletPos.x &&
                    this.playerPos.y + this.playerSize.h > enemyBullet.enemyBulletPos.y) {
                    this.livesCount--
                    this.enemys.forEach(elm => elm.enemyBullets.splice(i, 1))
                }
            })
        })

    }

    //Collision player with coins

    collisionCoin() {
        this.coins.forEach((elm, i) => {
            if (this.playerPos.x < elm.coinPos.x + elm.coinSize.w &&
                this.playerPos.y < elm.coinPos.y + elm.coinSize.h &&
                this.playerPos.x + this.playerSize.w > elm.coinPos.x &&
                this.playerPos.y + this.playerSize.h > elm.coinPos.y) {
                this.coins.splice(i, 1)
                this.coinsCount++
            }
        })
    }

    //Collision player with hearts

    collisionHeart() {
        if (this.livesCount < 3) {
            this.hearts.forEach((elm, i) => {
                if (this.playerPos.x < elm.heartPos.x + elm.heartSize.w &&
                    this.playerPos.y < elm.heartPos.y + elm.heartSize.h &&
                    this.playerPos.x + this.playerSize.w > elm.heartPos.x &&
                    this.playerPos.y + this.playerSize.h > elm.heartPos.y) {
                    this.hearts.splice(i, 1)
                    this.livesCount++
                }
            })
        }
    }

    // Collision player whith enemys

    collisionWithEnemy() {
        this.enemys.forEach(elm => {
            if (this.playerPos.x < elm.enemyPos.x + elm.enemySize.w &&
                this.playerPos.y < elm.enemyPos.y + elm.enemySize.h &&
                this.playerPos.x + this.playerSize.w > elm.enemyPos.x &&
                this.playerPos.y + this.playerSize.h > elm.enemyPos.y) {
                if (this.playerPos.x < elm.enemyPos.x) {
                    this.playerPos.x -= 100
                    this.playerPos.y -= 50
                    this.playerVel.x -= 7
                    this.playerVel.y -= 3
                    this.livesCount--
                } else if (this.playerPos.x > elm.enemyPos.x) {
                    this.playerPos.x += 100
                    this.playerPos.y -= 50
                    this.playerVel.x += 7
                    this.playerVel.y += 3
                    this.livesCount--
                }
            }

        });

    }

    // Collision player whith boss

    collisionWithBoss() {
        if (this.playerPos.x < this.boss.bossPos.x + this.boss.bossSize.w &&
            this.playerPos.y < this.boss.bossPos.y + this.boss.bossSize.h &&
            this.playerPos.x + this.playerSize.w > this.boss.bossPos.x &&
            this.playerPos.y + this.playerSize.h > this.boss.bossPos.y) {
            this.playerPos.x -= 100
            this.playerPos.y -= 50
            this.playerVel.x -= 7
            this.playerVel.y -= 3
            this.livesCount--
        }
    }

    // Collision boss bullet with player

    collisionBossBullet() {
        this.boss.bossBullets.forEach((elm, i) => {
            if (this.playerPos.x < elm.bossBulletPos.x + elm.bossBulletSize.w &&
                this.playerPos.y < elm.bossBulletPos.y + elm.bossBulletSize.h &&
                this.playerPos.x + this.playerSize.w > elm.bossBulletPos.x &&
                this.playerPos.y + this.playerSize.h > elm.bossBulletPos.y) {
                this.livesCount--
                this.boss.bossBullets.splice(i, 1)
            }
        })
    }

    // Player bullet with boss

    collisionPlayerBulletBoss() {
        this.bullets.forEach((elm, i) => {
            if (elm.bulletPos.x < this.boss.bossPos.x + this.boss.bossSize.w &&
                elm.bulletPos.y < this.boss.bossPos.y + this.boss.bossSize.h &&
                elm.bulletPos.x + elm.bulletSize.w > this.boss.bossPos.x &&
                elm.bulletPos.y + elm.bulletSize.h > this.boss.bossPos.y) {
                this.boss.bossLives--
                this.bullets.splice(i, 1)
            }
        })
    }


    // Player with walls Left

    collisionPlayerWallsLeft() {
        this.wallsLeft.forEach(elm => {
            if (elm.wallLeftPos.x < this.playerPos.x + this.playerSize.w &&
                elm.wallLeftPos.y < this.playerPos.y + this.playerSize.h &&
                elm.wallLeftPos.x + elm.wallLeftSize.w > this.playerPos.x &&
                elm.wallLeftPos.y + elm.wallLeftSize.h > this.playerPos.y) {
                if (elm.wallLeftPos.x < this.playerPos.x + this.playerSize.w) {
                    this.fluidRight = false
                }
            }
        })
    }


    collisionPlayerWallsRight() {
        this.wallsRight.forEach(elm => {
            if (elm.wallRightPos.x < this.playerPos.x + this.playerSize.w &&
                elm.wallRightPos.y < this.playerPos.y + this.playerSize.h &&
                elm.wallRightPos.x + elm.wallRightSize.w > this.playerPos.x &&
                elm.wallRightPos.y + elm.wallRightSize.h > this.playerPos.y) {
                this.fluidLeft = false
            }
        })
    }


}
