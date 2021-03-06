const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = 900;
canvas.height = 453;

canvasContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
   position: { 
        x: 0,
        y: 0
    },
    imageSrc: './img/night-sm.jpg'
})

const player = new Fighter({
    position: {
        x: 150,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/harmony/HarmonyAttackRest.png',
    framesMax: 7,
    scale: 2.5,
    sprites: {
        idle: {
            imageSrc: './img/harmony/HarmonyAttackRest.png',
            framesMax: 7,
        },
        run: {
            imageSrc: './img/harmony/HarmonyRun.png',
            framesMax: 8,
        }
    }
})

const enemy = new Fighter({
    position: {
        x: 650 ,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 50,
        y: 0,
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

let lastKey;

decreaseTimer();

function animate () {
    window.requestAnimationFrame(animate);
    canvasContext.clearRect(0,0, canvas.width, canvas.height);
    background.update();

    player.update();
    // enemy.update();
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
        player.image = player.sprites.run.image;
        player.framesMax= player.sprites.run.framesMax;
        
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.image = player.sprites.run.image;
        player.framesMax= player.sprites.run.framesMax;
    } else if(keys.a.pressed === false && keys.d.pressed === false){
        player.image = player.sprites.idle.image;
        player.framesMax= player.sprites.idle.framesMax;
    };
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    }

    //detect player attacking
    if( rectCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttacking){
            player.isAttacking = false; 
            enemy.health -= 20;
            document.querySelector('#enemyHealth').style.width = enemy.health + '%';
            console.log('player');
    }
    //detect enemy attacking
    if( rectCollision({
        rectangle1: enemy,
        rectangle2: player
    }) && enemy.isAttacking){
            enemy.isAttacking = false; 
            player.health -= 20;
            document.querySelector('#playerHealth').style.width = player.health + '%';  
            console.log('enemy');
    }
    // end game
    if(enemy.health <= 0 || player.health <= 0){
        determineWinner({player, enemy, timerId})
    }

};

animate();

window.addEventListener('keydown',  (e)=>{
    switch (e.key){
        //player
        case 'd': 
            keys.d.pressed = true;
            player.lastKey = 'd'
            break;
        case 'a': 
            keys.a.pressed = true;
            player.lastKey = 'a'
            break;
        case 'w': 
            player.velocity.y = -20;
            break;
        case ' ':
            player.attack()
            break;
            
            // enemy
            case 'ArrowRight': 
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
            case 'ArrowLeft': 
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
            case 'ArrowUp': 
            enemy.velocity.y = -20;
            break;
            case 'ArrowDown':
                enemy.attack()
                break;
    }
})
window.addEventListener('keyup',  (e)=>{
    switch (e.key){
        //player
        case 'd': 
            keys.d.pressed = false;
            break;
        case 'a': 
            keys.a.pressed = false;
            break;
        // enemy
        case 'ArrowRight': 
            keys.ArrowRight.pressed = false;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = false;
            enemy.lastKey = 'ArrowLeft';
            break;
    }
})