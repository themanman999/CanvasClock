document.getElementById("canvas").style.width = "350px";

var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
ctx.lineWidth = 25;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.font = '25px Trebuchet MS';
ctx.fillStyle = 'black';

var draw = (function() {
    var start = 1.5 * Math.PI; // Start circle from top
    var end = (2 * Math.PI) / 100; // One percent of circle
  	return function(r, p, c) {
        p = p || 100; // When time is '00' we show full circle
        ctx.strokeStyle = c;
        ctx.beginPath();
        ctx.arc(175, 175, r, start, p * end + start, false);
        ctx.stroke();
    };
}());

function twoDigi(unit){
    return unit = unit < 10 ? "0"+unit : unit;
}

function dayNTime(){
    var date = new Date;
    //var y = date.getFullYear();
    //var mth = date.getMonth()+1;
    //var d = date.getDate();
    //var w = date.getDay();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var ms = date.getMilliseconds();
    return [h,m,s,ms];            
}
var h,m,s,ms;
var hour = function(arr) {
    h = arr[0];
    m = arr[1];
    // Calculate percentage to be drawn
    var hp = 100 / (12*60) * (((h % 12)*60)+m);
    draw(150, hp, '#339966');
};
var min = function(arr){
    m = arr[1];
    s = arr[2];            
    var mp = 100 / 3600 * ((m*60)+s);
    draw(125, mp, '#669999');
}
var sec = function(arr){
    s = arr[2];
    ms = arr[3];
    var sp = 100 / 60000 * ((s*1000)+ms);
    draw(100, sp, '#006666');
}
var miniSec = function(arr){
    ms = arr[3];            
    draw(75, 100 / 1000 * ms, '#003366');
}
var TimeNum = function(arr,onoff){
    h = arr[0];
    m = arr[1];   
    s = arr[2];
    var hasSecond = (onoff==="on") ? ":"+twoDigi(s) : "";
    ctx.fillText(twoDigi(h) + ':' + twoDigi(m) + hasSecond, 175, 175);
}
var timeID;
function repeatOften() {
    ctx.clearRect(0, 0, 350, 350);
    hour(dayNTime());
    min(dayNTime());
    sec(dayNTime());
    TimeNum(dayNTime(),"on");
    timeID = requestAnimationFrame(repeatOften);
}
function startRepeat() {
    timeID = requestAnimationFrame(repeatOften);
}
function stopRepeat() {
    cancelAnimationFrame(timeID);
}
var miniSecState="on";
function miniSecSwitch(){
    (miniSecState==="on") ? (miniSecStop(),miniSecState="off") : (miniSecStart(),miniSecState="on");
}
var miniSecID;
function miniSecStart(){
    miniSec(dayNTime());
    miniSecID = requestAnimationFrame(miniSecStart);
}
function miniSecStop() {
    cancelAnimationFrame(miniSecID);
};
repeatOften();
miniSecSwitch();
