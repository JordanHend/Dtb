//Jordan Hendl
/*


*/
var SCREEN_WIDTH = 1280;
var SCREEN_HEIGHT = 720;
var health = 50;
var multiplier = 1;
var missedNotes = 0;
var serial;  
var inData; 
var outByte = 0;
var ledState = 0;      
var portName = 'COM11';  
var NoteImage;
var currentState;
var stateID;
var titleBG;
var nextState;
var gMiss;
var SONG1;
var pressedImage;
var gTitleMusic;
var gSong;
var NoteHitBox = new Rect(75, 544, 600, 20);
var notes = [];
var notes2 = [];
var notes3 = [];
var notes4 = [];
var notes5 = [];
var pLane1 = false;
var pLane2 = false;
var pLane3 = false;
var pLane4 = false;
var pLane5 = false;
var mDown = false;
var STATE_NULL = 0;
var STATE_TITLE = 1;
var STATE_MAINMENU = 2;
var STATE_SELECT_MENU = 3;
var STATE_GAME = 4;
var STATE_OPTIONS = 5;
var STATE_RECORD = 6;
var STATE_VICTORY = 7;
var STATE_GAMEOVER = 8;
var CURRENTSONG;
  var Start1 = new Point(205, 75);
  var Start2 = new Point(285, 75);
  var Start3 = new Point(365, 75);
  var Start4 = new Point(445, 75);
  var Start5 = new Point(525, 75);
var SONGLIST = [];
var score = 0;
var songTimer = new Timer();
var bgImage;

function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}



   function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);


    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */



    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */



    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
}

function Point(x, y)
{
  this.x = x;
  this.y = y;
}

function parseFile(file)
{
var total_notes = file[0]

for(var i = 1; i < total_notes * 3; i+= 3)
{
  var noteID = file[i];
  var noteTime = file[i+1];
  var noteSpeed = file[i+2];


 if(noteID == 1)
    notes.push(new Note(noteSpeed, noteTime,  Start1));
  if(noteID == 2)
    notes2.push(new Note(noteSpeed, noteTime,  Start2));
 if(noteID == 3)
    notes3.push(new Note(noteSpeed, noteTime,  Start3));
  if(noteID == 4)
    notes4.push(new Note(noteSpeed, noteTime,  Start4));
  if(noteID == 5)
    notes5.push(new Note(noteSpeed, noteTime,  Start5));

  }













}


function loadFile(path) 
{
 var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // The request is done; did it work?
            if (xhr.status == 200) {
              console.log("LOADING FILE");
                // ***Yes, use `xhr.responseText` here***
                //callback(xhr.responseText);
                var response = xhr.responseText;
                var words = response.split(' ');            
                parseFile(words);

              
            } else {
                // ***No, tell the callback the call failed***
                console.log("Request failed." );
        }
    }
    else
      {
        console.log("IDK MAN LMAO " + xhr.readyState);

      };
    }
    xhr.open("GET", path);
    xhr.send();


console.log("FILE: " + path);
}


function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function mousePressed() {

}


//RECTANGLE CLASS
function Rect(x, y ,w, h)
{
this.x = x;
this.y = y;
this.w = w;
this.h = h;
}
function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}
function Timer()
{
this.startTicks = 0;
this.pausedTicks = 0;

this.isStarted = false;
this.isPaused = false;




this.isStarted = function()
{

  if(this.isStarted)
    return true;

  return false;

}


this.start = function()
{
this.isStarted = true;
this.isPaused = false;

this.startTicks = millis();
}



this.stop = function()
{
this.isStarted = false;
this.isPaused = false;

this.startTicks = 0;
this.pausedTicks = 0;



}

this.setTicks = function(ticks)
{
  
  if(this.isStarted)
  {
    if(this.isPaused)
    {
      this.pausedTicks = ticks;
    }
    else
     this.startTicks = ticks;
  }

}


this.getTicks = function()
{
  var time = 0;
  if(this.isStarted)
  {
    if(this.isPaused)
    {
      time = this.pausedTicks;
    }
    else
      time = millis() - this.startTicks;
  }
  return time;
}

this.pause = function()
{
  if(this.isStarted)
  {
    if(this.isPaused)
    {
      this.isPaused = false;
      this.startTicks  = millis() - this.pausedTicks;
      this.pausedTicks = 0;
    }
    else
    {
      this.isPaused = true;
      this.pausedTicks  = millis() - this.startTicks;
      this.startTicks = 0;
    }



  }


}

}

function touchesBox(a, b)
{
//The sides of the rectangles
  var leftA, leftB;
  var rightA, rightB;
  var topA, topB;
  var bottomA, bottomB;

  //Calculate the sides of rect A
  leftA = a.x;
  rightA = a.x + a.w;
  topA = a.y;
  bottomA = a.y + a.h;

  //Calculate the sides of rect B
  leftB = b.x;
  rightB = b.x + b.w;
  topB = b.y;
  bottomB = b.y + b.h;

  //If any of the sides from A are outside of B
  if (bottomA <= topB)
  {
    return false;
  }

  if (topA >= bottomB)
  {
    return false;
  }

  if (rightA <= leftB)
  {
    return false;
  }

  if (leftA >= rightB)
  {
    return false;
  }
  return true;
}

function portClose() {
  print('The serial port closed.');
}


function Note(speed, whenshouldhit, start)
{

this.speed = speed;
this.timetorelease = whenshouldhit - ((548 - start.y) / ((speed - (speed / 25)) / 1000));
this.whenshouldhit = whenshouldhit;
this.box = new Rect(start.x, start.y, 40, 40);
this.y = start.y;
 this.gMissSound = new Tone.Player("miss.wav").toMaster();
 this.gHitSound = new Tone.Player("hit.wav").toMaster();
this.score = 20;
this.movementTimer = new Timer();
this.movementTimer.stop();

this.getBox = function()
{
  return this.box;
}

this.getScore = function()
{
return this.score;
}

this.move = function()
{
  if(!this.movementTimer.isStarted)
  {
    this.movementTimer.start();
  
  }
this.box.y  += this.speed * (this.movementTimer.getTicks() / 1000);
print("this Y: " + this.box.y);
this.movementTimer.start();

}

this.shouldDie = function(box)
{
if(this.box.y > box.y + box.h)
{
  return true;
}
return false;

}

this.render = function()
{
 // console.log("BOX: x: " + this.box.x + " y: " + this.box.y + " w: " + this.box.w + " h: " + this.box.h + " TIME TO COME DOWN: " + this.timetorelease);
image(NoteImage, this.box.x, this.box.y, 40, 40);

}


this.render = function(y)
{
 // console.log("BOX: x: " + this.box.x + " y: " + this.box.y + " w: " + this.box.w + " h: " + this.box.h + " TIME TO COME DOWN: " + this.timetorelease);
 if(y == null)
 image(NoteImage, this.box.x, this.box.y, 40, 40);
else
image(NoteImage, this.box.x, y, 40, 40);

}



this.active = function(time)
{
//console.log("AM I ACTIVE?");
if(this.timetorelease < time)
{
console.log("YES");
  return true;
}
else
{
 //console.log("NO")
return false;

}

}


}


function mousePressed()
{

currentState.mousePressed();

}

function mouseReleased()
{

currentState.mouseReleased();

}

function keyPressed()
{
currentState.pressedEvent();  

}


function keyReleased()
{
currentState.releasedEvent();
}




function checkLane(lane, notes)
{
for(var i = 0; i < notes.length; i++)
{
  if(touchesBox(lane, notes[i].getBox()))
  {
    score += notes[i].getScore() * multiplier;
    health += 15;
    if(health > 100)
    {
      health = 100;
    }
    multiplier+= .1;
       notes[i].gHitSound.start();
    notes.splice(i,1);
 
  return true;
  }


}
return false;
}



function preload()
{
NoteImage = loadImage("note.png");
bgImage = loadImage("bg.png");
titleBG = loadImage("titlebg.png");
pressedImage = loadImage("pressed.png");
  SONGLIST.push(new Tone.Player("dtyd.mp3").toMaster());
  SONGLIST.push(new Tone.Player("OMFGDOGS.mp3").toMaster());
  SONGLIST[0].volume.value = -10;
   SONGLIST[1].volume.value = -10;
  gMiss = new Tone.Player("miss.wav").toMaster();
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
disableScrolling();

songTimer.stop();
stateID = 0;
nextState = STATE_TITLE;
currentState = new TITLE();
  
  serial = new p5.SerialPort();      
  serial.on('list', print); 
  serial.on('connected', serverConnected); 
  serial.on('open', portOpen);       
  serial.on('data', serialEvent);     
  serial.on('error', serialError);    
  serial.on('close', portClose);     
 
  serial.list();                      
  serial.open(portName);     






}
 
function portOpen() {
  print('the serial port opened.')
}
 function serialEvent() {
  inData = Number(serial.read());
 
}
function serverConnected() {
  print('connected to server.');
  
}

function GAME()
{

this.songTimer = new Timer();
this.songTimer.stop();
SONG.start();
 missedNotes = 0;
this.pressedEvent = function()
{


  if(key == 'Z')
  {
   if(!pLane1)
   {
     if(!checkLane(NoteHitBox, notes))
     {
      score-= 20;
       multiplier = 1;
       health-=10;
          missedNotes++;
      gMiss.start();
     }
      pLane1 = true;
   }
  }
   if(key == 'X')
  {
   if(!pLane2)
   {
     if(!checkLane(NoteHitBox, notes2))
     {
      score-= 20;
       multiplier = 1;
       health-=10;
          missedNotes++;
      gMiss.start();
     }
      pLane2 = true;
   }
  }

   if(key == 'C')
  {
   if(!pLane3)
   {
     if(!checkLane(NoteHitBox, notes3))
     {
      score-= 20;
          multiplier = 1;
          health-=10;
             missedNotes++;
      gMiss.start();
     }
      pLane3 = true;
   }
  }

     if(key == 'V')
  {
   if(!pLane4)
   {
     if(!checkLane(NoteHitBox, notes4))
     {
      score-= 20;
          multiplier = 1;
          health-=10;
             missedNotes++;
      gMiss.start();
     }
      pLane4 = true;
   }
  }

     if(key == 'B')
  {
   if(!pLane5)
   {
     if(!checkLane(NoteHitBox, notes5))
     {
      score-= 20;
          multiplier = 1;
          health-=10;
             missedNotes++;
      gMiss.start();
     }
      pLane5 = true;
   }
  }
}



this.releasedEvent = function()
{

if(key == 'Z')
{
 pLane1 = false;
}
if(key == 'X')
{
 pLane2 = false;
}
if(key == 'C')
{
 pLane3 = false;
}
if(key == 'V')
{
 pLane4 = false;
}
if(key == 'B')
{
 pLane5 = false;
}

}


this.draw = function()
{
    background(0);
  image(bgImage, 0, 0);
  fill(255);
 

if(!this.songTimer.isStarted && SONG.state == "started")
{
  this.songTimer.start();
}


if(pLane1)
{
image(pressedImage, Start1.x - 15, 544);
}
if(pLane2)
{
image(pressedImage, Start2.x - 15, 544);
}
if(pLane3)
{
image(pressedImage, Start3.x - 15, 544);

}
if(pLane4)
{
image(pressedImage, Start4.x - 15, 544);

}
if(pLane5)
{
image(pressedImage, Start5.x - 15, 544);

}
for(var i = 0; i < notes.length; i++)
{

if(notes[i].active(this.songTimer.getTicks()))
{
 // console.log("NOTE #: " + i);
 notes[i].move();
 notes[i].render();
}

if(notes[i].shouldDie(NoteHitBox))
{
      score -= notes[i].getScore();
      notes.splice(i,1);
      health-=10;
         missedNotes++;
       multiplier = 1;
      gMiss.start();
      
}


}



for(var j = 0; j < notes2.length; j++)
{

if(notes2[j].active(this.songTimer.getTicks()))
{
 // console.log("NOTE #: " + i);
 notes2[j].move();
 notes2[j].render();
}

if(notes2[j].shouldDie(NoteHitBox))
{
      score -= notes2[j].getScore();
       multiplier = 1;
       health-=10;
          missedNotes++;
      notes2.splice(j,1);
       gMiss.start();
     
}


}

for(var k = 0; k < notes3.length; k++)
{

if(notes3[k].active(this.songTimer.getTicks()))
{

 notes3[k].move();
 notes3[k].render();
}

if(notes3[k].shouldDie(NoteHitBox))
{
      score -= notes3[k].getScore();
       multiplier = 1;
       health-=10;
       missedNotes++;
      notes3.splice(k,1);
    gMiss.start();
     
}


}

for( k = 0; k < notes4.length; k++)
{

if(notes4[k].active(this.songTimer.getTicks()))
{

 notes4[k].move();
 notes4[k].render();
}

if(notes4[k].shouldDie(NoteHitBox))
{
      score -= notes4[k].getScore();
       multiplier = 1;
       health-=10;
       missedNotes++;
      notes4.splice(k,1);
    gMiss.start();
     
}


}


for( k = 0; k < notes5.length; k++)
{

if(notes5[k].active(this.songTimer.getTicks()))
{

 notes5[k].move();
 notes5[k].render();
}

if(notes5[k].shouldDie(NoteHitBox))
{
      score -= notes5[k].getScore();
       multiplier = 1;
       health-=10;
       missedNotes++;
      notes5.splice(k,1);
    gMiss.start();
     
}


}

fill(255);
textSize(40);
text("SCORE: " + score, SCREEN_WIDTH - 375, 200)

textSize(20);
var v = multiplier.toString();
text("MULTIPLIER: " + v, SCREEN_WIDTH - 365, 230)
text("Z", Start1.x, 630);
text("X", Start2.x, 630);
text("C", Start3.x, 630);
text("V", Start4.x, 630);
text("B", Start5.x, 630);
text("Missed Notes: " + missedNotes, SCREEN_WIDTH-365, 260);
text("Health " + health + " / 100",340, 670);
//text("TIME: " + songTimer.getTicks(), 20, 20);
if(health <= 0)
{
  SONG.stop();
  health = 50;
  nextState = STATE_GAMEOVER;
}

if(this.songTimer.getTicks() >= SONG.buffer.duration * 1000)
{
  SONG.stop();
  nextState = STATE_VICTORY;
}

if(pLane1 || pLane2 || pLane3)
{
  serial.write('H');
}

fill(112, 73, 68);
rect(40, 35, 600, 15);
fill(51, 33, 31);

rect(40 + ((this.songTimer.getTicks() / (SONG.buffer.duration * 1000)) * 600), 20, 15, 50);

}


this.mousePressed = function()
{



}

this.mouseReleased = function()
{

  
}


}


function TITLE()
{
this.mousePressed = function()
{



}

this.mouseReleased = function()
{


}
this.draw = function()
{
image(titleBG,0,0);
textSize(60);
fill(255);
textSize(20);
textSize(15);
text ("How to play:", 840, 20);
text("-Z, X, C, V, and B coorespond to the each row.", 840, 40);
text ("-Hit the button when the circles are over the bottom bar in their lane!", 840, 60);
text ("-If you miss more than 20, its game over!", 840, 80);



}
this.pressedEvent = function()
{

    if(keyCode == ENTER)
    {
      nextState = STATE_MAINMENU;
    }

}
this.releasedEvent = function()
{



}

}


function GAMEOVER()
{
  this.timer = new Timer();
  this.timer.stop();
  this.timer.start();

this.draw = function()
{

background(0);
textSize(60);
fill(225);
text("GAME OVER ", 300, 300);
text(" :c ", 350, 585);
text(" SCORE: " + score, 300, 150);
if(this.timer.getTicks() > 3000)
{
  score = 0;
  missedNotes = 0;
   songTimer.stop();
  notes = [];
  notes2 = [];
  notes3 = [];
  notes4 = [];
  notes5 = [];
  nextState = STATE_MAINMENU;
}


this.pressedEvent = function()
{

}
this.releasedEvent = function()
{
  
}



}


this.pressedEvent = function()
{


}
this.releasedEvent = function()
{



}


this.mousePressed = function()
{



}

this.mouseReleased = function()
{

  
}



}



function VICTORY()
{
  this.timer = new Timer();
  this.timer.stop();
  this.timer.start();
this.draw = function()
{
background(150,150,150);
textSize(60);
fill(0);
text("YOU WON!!!", 200, 200);
text("C:", 200, 350);
text(" SCORE: " + score, 200, 470);
text("You only missed: " + missedNotes + " Notes!", 200, 570);


if(this.timer.getTicks() > 3000)
{
    score = 0;
  missedNotes = 0;
  songTimer.stop();
    notes = [];
  notes2 = [];
  notes3 = [];
  notes4 = [];
  notes5 = [];
  nextState = STATE_MAINMENU;
}

}

this.pressedEvent = function()
{

}
this.releasedEvent = function()
{

}


this.mousePressed = function()
{



}

this.mouseReleased = function()
{

  
}

}




var RecordingUrl = "NULL";





function MAINMENU()
{
this.menuiterator = 0;
this.options = ["Play", "Record", "Settings", "Quit"];
this.pressedEvent = function()
{
if(keyCode == UP_ARROW)
{
this.menuiterator--;
if(this.menuiterator < 0)
this.menuiterator = 0;
}
if(keyCode == DOWN_ARROW)
{
this.menuiterator++;
if(this.menuiterator > this.options.length - 1)
{
this.menuiterator = this.options.length - 1;
}


}


if(keyCode == ENTER)
{
  switch(this.menuiterator)
  {
    case 0:
    nextState = STATE_SELECT_MENU;

    sleep(500);
    break;
    case 1:
    RecordingUrl = prompt("What song do you want to record?");
    nextState = STATE_RECORD;
    break;
    case 2:
    nextState = STATE_OPTIONS;
    break;
    case 3: 
    close();
    break;
  }
}

}

this.releasedEvent = function()
{


}


this.mousePressed = function()
{



}

this.mouseReleased = function()
{

  
}




this.draw = function()
{
background(0);

fill(255);
textSize(40);

text("Drop the Beats", 66, 75);
textSize(25);
for(var i = 0; i < this.options.length; i++)
{

    if(this.menuiterator == i)
  {
    fill(150, 150, 0);
  rect(400, 400 + (50 * i), 170, 30);
  }
  fill( 255);
  rect(400, 400 + (50 * i), 150, 30);
  fill(0);
  text(this.options[i], 420, 425 + ( 50* i));

}




}


}

function RECORD()
{
this.pOffset = 0;
this.record = "";
this.preMouseX = 0;
this.isPaused = false;
this.totalnotes = 0;
print("OPENING SONG: " + RecordingUrl);
  this.Song = new Tone.Player(RecordingUrl).toMaster(); 
  this.touchingBox = false;

    this.Song.autostart = true;
    //this.duration = this.Song.buffer.duration;



this.notes1 = [];
this.notes2 = [];
this.notes3 = [];
this.notes4 = [];
this.notes5 = [];
  this.SongTimer = new Timer();
  this.SongTimer.stop();
this.pause = function()
{
  if(this.isPaused)
  {
    this.Song.start();
    this.Song.seek(this.pOffset);

    this.isPaused = false;
    this.SongTimer.pause();
  }
  else
  {
    this.pOffset =  this.Song.buffer.duration * (this.SongTimer.getTicks() / (this.Song.buffer.duration * 1000));
    console.log("OFFSET: " + this.pOffset);
    this.Song.stop();
    this.isPaused = true;
    this.SongTimer.pause();
  }



}


this.draw = function()
{
  if(!this.SongTimer.isStarted && this.Song.state == "started")
  {
    this.SongTimer.start();
  }
  image(bgImage, 0, 0);
if(pLane1)
{
image(pressedImage, Start1.x - 15, 544);
}
if(pLane2)
{
image(pressedImage, Start2.x - 15, 544);
}
if(pLane3)
{
image(pressedImage, Start3.x - 15, 544);

}
if(pLane4)
{
image(pressedImage, Start4.x - 15, 544);
}
if(pLane5)
{
image(pressedImage, Start5.x - 15, 544);

}


if(this.SongTimer.getTicks() >= this.Song.buffer.duration * 1000 && this.SongTimer.isStarted)
{
  this.Song.stop();
  this.record =  this.totalnotes + " ";
  for(var i = 0; i < this.notes1.length; i++)
  {
    this.record += "1 " + this.notes1[i].whenshouldhit + " 200 ";  
  }
    for( i = 0; i < this.notes2.length; i++)
  {
    this.record += "2 " + this.notes2[i].whenshouldhit + " 200 ";  
  }
    for( i = 0; i < this.notes3.length; i++)
  {
    this.record += "3 " + this.notes3[i].whenshouldhit + " 200 ";  
  }
    for( i = 0; i < this.notes4.length; i++)
  {
    this.record += "4 " + this.notes4[i].whenshouldhit + " 200 ";  
  }
    for( i = 0; i < this.notes5.length; i++)
  {
    this.record += "5 " + this.notes5[i].whenshouldhit + " 200 ";  
  }
  download(this.record, "RecordedTrack.txt", "text/data");
  nextState = STATE_MAINMENU;
  nextState = STATE_MAINMENU;
}

if(pLane1 || pLane2 || pLane3)
{
  serial.write('H');
}

fill(112, 73, 68);
rect(40, 35, 600, 15);
fill(51, 33, 31);
var x1 = 40 + ((this.SongTimer.getTicks() / (this.Song.buffer.duration * 1000)) * 600)
rect(x1, 20, 15, 50);


if(mDown)
{
var box = {x: mouseX - 1,y:  mouseY - 1,w:  2,h:  2};
var box2 = {x: x1,y: 20,w:  15,h:  50};
if(touchesBox(box, box2))
{
this.touchingBox = true;
}


}

if(this.touchingBox)
{
if(this.preMouseX == 0)
{
  this.preMouseX = mouseX;
}
else
{
  var offset = mouseX - this.preMouseX;
  this.preMouseX = mouseX;

var wheretomove = mouseX;
 var percent = (wheretomove) / x1;
this.SongTimer.setTicks(this.SongTimer.getTicks() * percent);
if(this.isPaused)
this.pOffset =  this.Song.buffer.duration * (this.SongTimer.getTicks() / (this.Song.buffer.duration * 1000));
else
{
  this.SongTimer.pause();
this.pOffset =  this.Song.buffer.duration * (this.SongTimer.getTicks() / (this.Song.buffer.duration * 1000));
    this.Song.stop();
    this.Song.start();
    this.Song.seek(this.pOffset);
    this.SongTimer.pause();

}
}

}





for(var j = 0; j < this.notes1.length; j++)
 {
//when to release =  whenshouldhit - ((548 - start.y) / ((speed - (speed / 25)) / 1000));
if(this.notes1[j].active(this.SongTimer.getTicks() + 2000) )
{

  var y =  75 + ((548 - 75) * (this.SongTimer.getTicks() / this.notes1[j].whenshouldhit));
 // console.log("NOTE #: " + i);
 //if(!this.isPaused)
 //this.notes1[j].move();
if(!this.notes1[j].shouldDie(NoteHitBox))
this.notes1[j].render(y);
}
}
for( j = 0; j < this.notes2.length; j++)
 {
//when to release =  whenshouldhit - ((548 - start.y) / ((speed - (speed / 25)) / 1000));
if(this.notes2[j].active(this.SongTimer.getTicks() + 2000) )
{

  var y =  75 + ((548 - 75) * (this.SongTimer.getTicks() / this.notes2[j].whenshouldhit));
 // console.log("NOTE #: " + i);
 //if(!this.isPaused)
 //this.notes2[j].move();
if(!this.notes2[j].shouldDie(NoteHitBox))
this.notes2[j].render(y);
}
}
for( j = 0; j < this.notes3.length; j++)
 {
//when to release =  whenshouldhit - ((548 - start.y) / ((speed - (speed / 25)) / 1000));
if(this.notes3[j].active(this.SongTimer.getTicks() + 2000) )
{

  var y =  75 + ((548 - 75) * (this.SongTimer.getTicks() / this.notes3[j].whenshouldhit));
 // console.log("NOTE #: " + i);
 //if(!this.isPaused)
 //this.notes3[j].move();
if(!this.notes3[j].shouldDie(NoteHitBox))
this.notes3[j].render(y);
}
}
for( j = 0; j < this.notes4.length; j++)
 {
//when to release =  whenshouldhit - ((548 - start.y) / ((speed - (speed / 25)) / 1000));
if(this.notes4[j].active(this.SongTimer.getTicks() + 2000) )
{

  var y =  75 + ((548 - 75) * (this.SongTimer.getTicks() / this.notes4[j].whenshouldhit));

if(!this.notes4[j].shouldDie(NoteHitBox))
this.notes4[j].render(y);
}
}
for( j = 0; j < this.notes5.length; j++)
 {
//when to release =  whenshouldhit - ((548 - start.y) / ((speed - (speed / 25)) / 1000));
if(this.notes5[j].active(this.SongTimer.getTicks() + 2000) )
{

  var y =  75 + ((548 - 75) * (this.SongTimer.getTicks() / this.notes5[j].whenshouldhit));

if(!this.notes5[j].shouldDie(NoteHitBox))
this.notes5[j].render(y);
}
}


}





this.pressedEvent = function()
{
if(key == "Z")
{

this.notes1.push(new Note(200, this.SongTimer.getTicks(),  Start1));
this.totalnotes++;
pLane1 = true;
//his.notes1.push(new Note())
}
if(key == "X")
{

this.notes2.push(new Note(200, this.SongTimer.getTicks(),  Start2));
this.totalnotes++;
pLane2 = true;
}
if(key == "C")
{

this.notes3.push(new Note(200, this.SongTimer.getTicks(),  Start3));
this.totalnotes++;
pLane3 = true;
}
if(key == "V")
{
 
this.notes4.push(new Note(200, this.SongTimer.getTicks(),  Start4));
this.totalnotes++;
pLane4 = true;
}
if(key == "B")
{

this.notes5.push(new Note(200, this.SongTimer.getTicks(),  Start5));
this.totalnotes++;
pLane5 = true;
}

if(keyCode == ESCAPE)
{
  this.Song.stop();
  this.record =  this.totalnotes + " ";
  for(var i = 0; i < this.notes1.length; i++)
  {
    this.record += "1 " + this.notes1[i].whenshouldhit + " 200 ";  
  }
    for( i = 0; i < this.notes2.length; i++)
  {
    this.record += "2 " + this.notes2[i].whenshouldhit + " 200 ";  
  }
    for( i = 0; i < this.notes3.length; i++)
  {
    this.record += "3 " + this.notes3[i].whenshouldhit + " 200 ";  
  }
    for( i = 0; i < this.notes4.length; i++)
  {
    this.record += "4 " + this.notes4[i].whenshouldhit + " 200 ";  
  }
    for( i = 0; i < this.notes5.length; i++)
  {
    this.record += "5 " + this.notes5[i].whenshouldhit + " 200 ";  
  }
  download(this.record, "RecordedTrack.txt", "text/data");
  nextState = STATE_MAINMENU;
}

if(keyCode == ENTER)
{
  this.pause();
}

}

this.releasedEvent = function()
{
if(key == 'Z')
{
 pLane1 = false;
}
if(key == 'X')
{
 pLane2 = false;
}
if(key == 'C')
{
 pLane3 = false;
}
if(key == 'V')
{
 pLane4 = false;
}
if(key == 'B')
{
 pLane5 = false;
}
}

this.mousePressed = function()
{
mDown = true;
for(var j = 0; j < this.notes1.length; j++)
{
    var box = {x: mouseX - 1, y: mouseY -1, w: 3, h:3};
  var y1 =  75 + ((544 - 75) * (this.SongTimer.getTicks() / this.notes1[j].whenshouldhit));
  var box2 = {x: Start1, y: y1, w: 40, h:40 };
  if(touchesBox(box2, box))
  {
    this.notes1.splice(j, 1);
  }

}
for( j = 0; j < this.notes2.length; j++)
{
    var box = {x: mouseX - 1, y: mouseY -1, w: 2, h:2};
  var y1 =  75 + ((544 - 75) * (this.SongTimer.getTicks() / this.notes2[j].whenshouldhit));
  var box2 = {x: Start2, y: y1, w: 40, h:40 };
  if(touchesBox(box2, box))
  {
    this.notes2.splice(j, 1);
  }

}
for( j = 0; j < this.notes3.length; j++)
{
    var box = {x: mouseX - 1, y: mouseY -1, w: 2, h:2};
  var y1 =  75 + ((544 - 75) * (this.SongTimer.getTicks() / this.notes3[j].whenshouldhit));
  var box2 = {x: Start3, y: y1, w: 40, h:40 };
  if(touchesBox(box2, box))
  {
    this.notes3.splice(j, 1);
  }
}
for( j = 0; j < this.notes4.length; j++)
{
  var box = {x: mouseX - 1, y: mouseY -1, w: 2, h:2};
  var y1 =  75 + ((544 - 75) * (this.SongTimer.getTicks() / this.notes4[j].whenshouldhit));
  var box2 = {x: Start4, y: y1, w: 40, h:40 };
  if(touchesBox(box2, box))
  {
    this.notes4.splice(j, 1);
  }
}
for( j = 0; j < this.notes5.length; j++)
{
  var box = {x: mouseX, y: mouseY , w: 2, h:2};
  var y1 =  75 + ((544 - 75) * (this.SongTimer.getTicks() / this.notes5[j].whenshouldhit));
  var box2 = {x: Start5, y: y1, w: 40, h:40 };
  if(touchesBox(box2, box))
  {
    this.notes5.splice(j, 1);
  }

}
}
this.mouseReleased = function()
{
mDown = false;
  this.preMouseX = 0;
  this.touchingBox = false;
}

}


function SELECTMENU()
{

this.songs = [{displayname: "Dance Till You're Dead", song:"dtyd.mp3", image: loadImage("menuart.png"), notesrc: "src.txt"}, {displayname: "OMFGDOGS", song:"OMFGDOGS.mp3", image: loadImage("omfgdogmart.png"), notesrc: "src2.txt"}, {displayname: "Love B.B.B", song:"lovebbb.mp3", image: loadImage("lovemart.png"), notesrc: "src3.txt"}, {displayname: "{Parasite Eve - Out of Time}", song:"outofphase.mp3", image: loadImage("pevemart.png"), notesrc: "src4.txt"}, {displayname: "Deja Vu", song:"dejavu.mp3", image: loadImage("dejart.png"), notesrc: "src5.txt"}];
this.loading = false;
this.Selection = 0;

this.draw = function()
{
background(61, 43, 41  );
var x = 50, y = 150;
var xStep = 225, yStep = 80;
var cRow = 0;

for(var i = 0; i < this.songs.length; i++)
{
    if(this.Selection == i)
  {
    fill(247,187,84);
    rect(x -  15, y - 15, 125, 75);

  }
  image(this.songs[i].image, x, y);

 
  if(i / 5 > cRow)
  {
    cRow++;
    x = 50;
    y += yStep;
  }
  else
  x+= xStep;

}

}

this.pressedEvent = function()
{
   switch(keyCode)
   {
    case LEFT_ARROW:
     this.Selection--;
    if(this.Selection < 0)
    {
      this.Selection++;
    }
    break;
    case RIGHT_ARROW:
 
      this.Selection++;
    if(this.Selection > this.songs.length - 1)
    {
      this.Selection--;
    }
    break;
    case ENTER:
    if(!this.loading)
    {


    loadFile(this.songs[this.Selection].notesrc);
    print("NOTE SHEET: " + this.songs[this.Selection].notesrc);
    print("THE URL OF THE SONG: " + this.songs[this.Selection].song + "SONG TRYING TO BE PLAYED: " + this.Selection);
    SONG  = new Tone.Player(this.songs[this.Selection].song, function(){
      nextState = STATE_GAME;
    //SONG.volume.value = -10;
  
}).toMaster(); 
 this.loading = true;
 }
      

 
    
    break;



   }

}
this.releasedEvent = function()
{



}

this.mousePressed = function()
{



}

this.mouseReleased = function()
{

  
}



}


function changeState()
{
//print("NEXTSTATE: " + stateID);
if(nextState != STATE_NULL)
{

stateID = nextState;
nextState = 0;

if(stateID == STATE_SELECT_MENU)
{
currentState = new SELECTMENU();

}

if(stateID == STATE_TITLE)
{
  currentState = new TITLE();

}

if(stateID == STATE_GAME)
{

  currentState = new GAME();
}

if(stateID == STATE_GAMEOVER)
{

  currentState = new GAMEOVER();
}
if(stateID == STATE_RECORD)
{
currentState = new RECORD();


}
if(stateID == STATE_MAINMENU)
{
currentState = new MAINMENU;


}
if(stateID == STATE_VICTORY)
{

  currentState = new VICTORY();
}



}


}
function draw() {

currentState.draw();
changeState();

  if (serial.available() > 0) {
    var data = serial.read();
    SONG1.volume.value = data;
  }

}


