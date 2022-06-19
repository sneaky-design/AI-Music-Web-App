music = "";
music2 = "";
playing = "";

function preload(){
    music = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
    scoreLeftWrist = 0;
    scoreRightWrist= 0;

    leftWristY= 0;
    leftWristX= 0;

    rightWristY= 0;
    rightWristX= 0;

}



function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("poseNet has started.")
}

function gotPoses(results){

    if(results.length > 0){
        console.log(results)
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("score Right Wrist =" + scoreRightWrist + "score Left Wrist" + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x =" + rightWristX + "right wrist y" + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x =" + leftWristX + "left wrist y" + leftWristY);

    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000")
    stroke("#FF0000")
    if(scoreRightWrist > 0.2){

        circle(rightWristX,rightWristY,30);
        music2.stop();
        music2.play();
        music2.setVolume(1);
        music2.rate(1);
        music.stop();
        console.log("test 1")
        document.getElementById("song").innerHTML = "music playing now is peter pan"

    }
    else if (scoreLeftWrist  > 0.2){
        circle(leftWristX,leftWristY,30);
        music.stop();
        music.play();
        music.setVolume(1);
        music.rate(1);
        music2.stop();
        console.log("test 2")
        document.getElementById("song").innerHTML = "music playing now is harry potter"
    }
}
