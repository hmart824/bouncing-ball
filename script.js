let ball = document.getElementById('ball');
let bound = document.getElementById('container');
let rod1 = document.querySelector('#rod1');
let rod2 = document.querySelector('#rod2');
let hScore = document.querySelector('#hScore');
let cScore = document.querySelector('#cScore');
let btn = document.getElementById('btn');
let score = 0;
let left = 40;
let moveBy = 10;
let bar = false;
let bounce = {
    x : 200,
    y : 40,
    dx: 1,
    dy: 1,
    speed : 2,
    move : false,
}

//Intilization
function Intilization(){
    ball.style.left = `${bounce.x}px`;
    ball.style.top = `${bounce.y}px`;
    rod1.style.left = `${left}px`;
    rod2.style.left = `${left}px`;
}
Intilization();
//Reset to initial position
function reset(){
    bounce.x = 200;
    bounce.y = 40;
    left = 40;
    score = 0;
    Intilization();
}

//Getting the user name and store into localstorage
let user = {
    name: '',
    highScore : 0
}
user.name = prompt('Enter your name');
localStorage.setItem('user' , JSON.stringify(user));
while(!user.name){
        alert("Enter the name");
        user.name = prompt('Enter your name');
        localStorage.setItem('user' , JSON.stringify(user));
}

//Handle click event
btn.addEventListener('click', start);

//Start bouncing the ball
function start(){
    if(!bounce.move){
        reset();
        requestAnimationFrame(mover);
        scoreCounter();
        bounce.move = true;
    };
};

//Score Counter
function scoreCounter(){
    let id = setInterval(function(){
        score++;
        console.log(score);
        cScore.innerText = score;
        if(bounce.move === false){
            if(score > user.highScore){
                user.highScore = score;
            }
            localStorage.setItem('user' , JSON.stringify(user));
            hScore.innerText = user.highScore;
            alert(user.name + ' your score is : ' + score);
            clearInterval(id);
        }
    },1000);
};

//Handle keydown event
document.addEventListener('keydown',function(e){
    if(e.key === 'ArrowLeft'){
        if (left > 0) {
            left -= moveBy;
            rod1.style.left = `${left}px`;
            rod2.style.left = `${left}px`;
          };
    };
    if(e.key === 'ArrowRight'){
        if (left < bound.offsetWidth - rod1.offsetWidth) {
            left += moveBy;
            rod1.style.left = `${left}px`;
            rod2.style.left = `${left}px`;
          };
    };
});



function mover(){

    //Handle left and right bounce
    if(bounce.x >= bound.getBoundingClientRect().width - ball.getBoundingClientRect().width || bounce.x < 0){
        bounce.dx *= -1;
    };

    //Handle top bar bounce
    if(bounce.x <= eval(left + rod1.offsetWidth) && bounce.y >= eval(rod1.offsetHeight + rod1.offsetTop) && bounce.y <= eval(rod1.offsetHeight + rod1.offsetTop) + bounce.speed && eval(bounce.x + ball.offsetWidth) >= left && eval(bounce.x + ball.offsetWidth) >= left ){
        bounce.dy *= -1;
    };

    //Handle bottom bar bounce
    if(bounce.x <= eval(left + rod2.offsetWidth) && bounce.y <= (rod2.offsetTop - ball.offsetHeight) && bounce.y >= (rod2.offsetTop - ball.offsetHeight) - bounce.speed && eval(bounce.x + ball.offsetWidth) >= left ){
        bounce.dy *= -1;
    };

    //Handle top and bottom boundary
    if(bounce.y >= bound.getBoundingClientRect().height - ball.getBoundingClientRect().height || bounce.y <= 0){
        bounce.move = false;
    };
    
    //Increase x and y value
    bounce.x += bounce.dx*bounce.speed;
    bounce.y += bounce.dy*bounce.speed;
      
    //update the positon after increasing x and y value
    ball.style.left = `${bounce.x}px`;
    ball.style.top = `${bounce.y}px`;
    rod1.style.left = `${left}px`;
    rod2.style.left = `${left}px`;

    //recall the mover function
    if(bounce.move === true){
        requestAnimationFrame(mover);
    };
};