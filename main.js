var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); // getContext()는 캔버스 그리기 기능 제공

canvas.width = window.innerWidth - 100; 
canvas.height = window.innerHeight - 100;

cactusIMG = new Image();
cactusIMG.src = 'img/c.png'
dinoIMG = new Image();
dinoIMG.src = 'img/s.png'


/* 공룡 유닛 만들기 */

// object data type
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        //ctx.fillStyle = 'green'; // 초록색을 네모 만들건데
        //ctx.fillRect(this.x, this.y, this.width, this.height); // 왼쪽 위에서부터 (10, 10)부터 100 * 100 사이즈로 그릴 것
        ctx.drawImage(dinoIMG, this.x,this.y)
    }
}

// dino.draw()


class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    
    draw(){
        //ctx.fillStyle = 'red'
        //ctx.fillRect(this.x, this.y, this.width, this.height); // 왼쪽 위에서부터 (10, 10)부터 100 * 100 사이즈로 그릴 것
        ctx.drawImage(cactusIMG, this.x,this.y)
    }
}

var cactus = new Cactus();
//cactus.draw()

timer =0;
jumptimer = 0;
var cactuses = [];
var animation;

function action(){
    animation=requestAnimationFrame(action);
    ctx.clearRect(0,0,canvas.width, canvas.height);

    //dino.draw();
    //dino.x++;
    if(timer %120 ===0)
    {
        var cactus = new Cactus()
        cactuses.push(cactus);
    }
    

    cactuses.forEach((c,i,o)=>{
        c.x = c.x-3
        c.draw();
        if (c.x <10) {
            o.slice(i,1)
        }
        else{
            collision_detection(dino, c)
        }
    })

    if (jump ===true){
        dino.y = dino.y-3;
        jumptimer++;
    }
    else{
        if(dino.y<200){
            dino.y = dino.y+3;
        }
    if (jump ===true){
        jump = false;
        jumptimer=0
    }
    }
    dino.draw()
    timer++;
}

action();

var jump = false;
document.addEventListener('keydown',function(e){
    if(e.code === 'Space'){
        jump = true;
    }
})

function collision_detection(dino,cactus){
    var x_diff = cactus.x - (dino.x +dino.width);
    var y_diff = cactus.y - (dino.y +dino.height);

    if(x_diff<0 && y_diff<0){
        cancelAnimationFrame(animation);
    }
}