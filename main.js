song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score_leftWrist=0;
score_rightWrist=0;
function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("Model is loaded");
}
function gotPoses(results){
    if(results.length>0){
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("The position of left WristX: "+leftWristX+" And the position of left WristY: "+leftWristY);
        
        score_leftWrist=results[0].pose.keypoints[9].score;
        console.log("The score of left Wrist: "+score_leftWrist);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        score_rightWrist=results[0].pose.keypoints[10].score;
        console.log("The position of right WristX= "+rightWristX+ " And the position of right WristY= "+rightWristY);
    }
}
function preload(){
    song=loadSound('music.mp3');
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    if(score_leftWrist>0.2){
    circle(leftWristX, leftWristY, 25);
    number_leftWristX=Number(leftWristY);
    remove_decimals=floor(number_leftWristX);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="The volume: "+volume;
    song.setVolume(volume);
    }
    if(score_rightWrist>0.2){
        circle(rightWristX, rightWristY, 25);
    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML="Speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML="Speed=1x;";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML="Speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML="Speed=2x";
        song.rate(2);
    }
    else if(rightWristY>400){
       document.getElementById("speed").innerHTML="SPeed=2.5x";
       song.rate(2.5);
    }
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop(){
    song.stop();
}