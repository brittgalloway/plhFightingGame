// left off https://youtu.be/vyqbNFMDRGQ?t=8670
class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1}) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.frameCurrent = 1;
        this.framesElapsed = 0;
        this.framesHold = 2;

    }
    draw() {
        canvasContext.drawImage(
            this.image, 
            // x start
            0,
            //y start
            0,
            //x end
            this.frameCurrent * (this.image.width / this.framesMax), // this.image.width divide by number of frames
            //y end
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax) * this.scale, 
            this.image.height * this.scale);
    }
    update() {
        this.draw();
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0){
            if(this.frameCurrent < this.framesMax){
                this.frameCurrent++;
            } else {
                this.frameCurrent = 1;
            }
        }
    }
   
}
class Fighter {
    constructor({position, velocity, color = 'red', offset}) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,
            width: 100,
            height: 50
        }
        this.color = color;
        this.isAttacking;
        this.health = 100;
    }
    draw() {
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.position.x, this.position.y,this.width, this.height);
        //attack box
        if(this.isAttacking){
            canvasContext.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }
    update() {
        this.draw();
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        this.velocity.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height-75) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }
    attack() {
        this.isAttacking = true;
        setTimeout(() =>{
            this.isAttacking = false;
        }, 100);
    }
}