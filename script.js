let move_speed = 3
let gravity = .5;
let background = document.querySelector(".background").getBoundingClientRect();

let birb = document.querySelector(".birb");
let birb_dy = -15;
let birb_props = birb.getBoundingClientRect();

let points = document.querySelector(".points");
let message = document.querySelector(".message");
let game_state = "start";

let pipe_separation = 0;
let pipe_gap = 30;

message.classList.add("messageStyle");



function Play(){

    function move(){
        if(game_state != "Play") 
        return;

        let pipe = document.querySelectorAll(".pipe");
        pipe.forEach((element) => {
            let pipe_props = element.getBoundingClientRect();

            if(pipe_props.right <= 0){
                element.remove();
            }
            else{
                if(birb_props.left < pipe_props.left + pipe_props.width && birb_props.left + birb_props.width > pipe_props.left && birb_props.top < pipe_props.top + pipe_props.height && birb_props.top + birb_props.height > pipe_props.top){
                    birb.src = "pics/ded.png";
                    game_state = "End";
                    message.innerHTML = "Game Over" + "<br> Press ENTER to restart";
                    message.classList.add("messageStyle");
                }
                else{
                    if(pipe_props.right < birb_props.left && pipe_props.right + move_speed >= birb_props.left && element.increase_score == "1"){
                        points.innerHTML = + points.innerHTML + 1;
                    }
                    element.style.left = pipe_props.left - move_speed + "px";
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);
    
    function apply_gravity(){
        if(game_state != "Play") 
            return;
        birb_dy += gravity;
        document.addEventListener("keydown", (e) => {
            birb.src = "pics/down.png";
            birb_dy = -5;
            if(game_state == "End"){
                birb.src = "pics/ded.png";
            }
        });
        
        document.addEventListener("keyup", (e) => {
            birb.src = "pics/up.png";
            if(game_state == "End"){
                birb.src = "pics/ded.png";
            }
        });
        if(birb_props.top <= 0 || birb_props.bottom >= background.bottom){
            game_state = "End";
            window.location.reload();
        }
        birb.style.top = birb_props.top + birb_dy + "px";
        birb_props = birb.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    function create_pipe(){
        if(game_state != "Play") 
            return;

        if(pipe_separation > 150){
            pipe_separation = 0;
            let pipe_position = (Math.random() * 60) + 5;
            let pipe_inv = document.createElement("div");
            pipe_inv.className = "pipe";
            pipe_inv.style.top = pipe_position - 70 + "vh";

            document.body.appendChild(pipe_inv);
            let pipe = document.createElement("div");
            pipe.className = "pipe";
            pipe.style.top = pipe_position + pipe_gap + "vh";
            pipe.increase_score = "1";

            document.body.appendChild(pipe);
        }
        pipe_separation ++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);

    document.addEventListener("keydown", (e) => {
        if(e.key == "Enter" && game_state != "Play"){
            document.querySelectorAll(".pipe").forEach((e) => {
                e.remove();
            });
            game_state = "Play";
            message.innerHTML = "";
            points.innerHTML = "0";
            message.classList.remove("messageStyle");
            Play();
        };
    });
}


