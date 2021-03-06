 var scene = new THREE.Scene();
  // This is what sees the stuff:
  var aspect_ratio = window.innerWidth / window.innerHeight;                  
  var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
  camera.position.z = 500;
  scene.add(camera);
  // This will draw what the camera sees onto the screen:
  var renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  // ******** START CODING ON THE NEXT LINE ********
  var not_allowed = [];
  
var scoreboard = new Scoreboard();
scoreboard.countdown(45);
scoreboard.score()
scoreboard.help(
  'Mozogj a nyilakkal.'+
  ' Ugorj szóközzel a rázkódó fákhoz.'
  );
  var game_over = false;
  scoreboard.onTimeExpired(function(){
    scoreboard.message('Játék vége');
    game_over = true;
    })
var fa_kinccsel;
var fak = [];


var shape = new THREE.CubeGeometry(30,100,30)
var cover = new THREE.MeshNormalMaterial()
var box = new THREE.Mesh(shape,cover)
scene.add(box)
box.rotation.set(0,0,0)
var t=THREE
box.position.set(-25,-186,0)
var ball=new t.Mesh(new t.SphereGeometry(50,20,15), cover)
scene.add(ball)
ball.position.set(0,90,0)
var box2 = new t.Mesh(new t.CubeGeometry(30,100,30),cover)
scene.add(box2)
box2.position.set(25,-186,10)
var henger=new t.Mesh(new t.CylinderGeometry(40,39,100), cover)
henger.position.set(-0,-90,0)
scene.add(henger)
//animate()  
var ball2 = new t.Mesh(new t.SphereGeometry(25,10,7),cover)
scene.add(ball2)
ball2.position.set(-100,-50,0)
var ball3 = new t.Mesh(new t.SphereGeometry(25,10,7),cover)
scene.add(ball3)
ball3.position.set(100,-50,0)
ball.add(ball2)
ball.add(ball3)
ball.add(box)
ball.add(box2)
ball.add(henger)
document.addEventListener('keydown',function(event){
  
  var code = event.keyCode
  
  if (code == 37) {
    marker.position.x = marker.position.x-s
    is_moving_left=true;
  }
  if (code == 39) {
    marker.position.x = marker.position.x+s
    is_moving_right = true;
  }
  if (code == 38) {
    marker.position.z = marker.position.z-s
    is_moving_back = true;
  }
  if (code == 40) {
    marker.position.z = marker.position.z+s
    is_moving_forward = true;
  }
  if (code == 32) jump()
   if(detectCollisions()) {
    if (is_moving_left) marker.position.x = marker.position.x+s;
    if (is_moving_right) marker.position.x = marker.position.x-s;
    if (is_moving_forward) marker.position.z = marker.position.z-s;
    if (is_moving_back) marker.position.z = marker.position.z+s;
  }
renderer.render(scene, camera);
})
function jump() {
 kereskincset();
 animalUgras();
}
function kereskincset() {
  if (fa_kinccsel == undefined) return;
  
  var kincses_fa = fak[fa_kinccsel],
      p1 = kincses_fa.parent.position,
      p2 = marker.position;
  var distance = Math.sqrt(
    (p1.x - p2.x)*(p1.x - p2.x) +
    (p1.z - p2.z)*(p1.z - p2.z)
    );
    if (distance < 500) {
      scorePoints();
    }
}
function scorePoints() {
  if (scoreboard.getTimeRemaining() === 0) return;
  scoreboard.addPoints(10);
  Sounds.bubble.play();
  animateFruit();
}
function animalUgras() {
  new TWEEN
    .Tween({jump: 0})
    .to({jump: Math.PI}, 500)
    .onUpdate(function(){
      ball.position.y = 200* Math.sin(this.jump)
    })
    .start();
}
var donout = new t.Mesh(new t.TorusGeometry(100,25),cover)
scene.add(donout)
donout.rotation.set(0,1,0);
donout.position.set(-500,0,-100);
var donout2 = new t.Mesh(new t.TorusGeometry(100,25),cover)
scene.add(donout2)
donout2.rotation.set(0,-1,0);
donout2.position.set(500,0,-100);
makeTreeAt(500,0);
makeTreeAt(-500,0);
makeTreeAt(750,-1000);
makeTreeAt(-750,-1000);

var s=10//sebesseg


function makeTreeAt(x,z){

  var trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(50,50,200),
    new THREE.MeshBasicMaterial({color:  0xA0522D })
    )
  var top = new THREE.Mesh(
    new THREE.SphereGeometry(150),
    new THREE.MeshBasicMaterial({color: 0x228B22})
    )
      
  top.position.y = 175
  trunk.add(top);
 
  var boundary = new THREE.Mesh(
    new THREE.CircleGeometry(270),
    new THREE.MeshNormalMaterial()
  );
  
  not_allowed.push(boundary);
  
  boundary.material.opacity=0
  boundary.position.y = -100;
  boundary.rotation.x = -Math.PI/2;
  trunk.add(boundary);
  
  trunk.position.set(x, -75,z);
  scene.add(trunk);
  return top;
}

var marker = new THREE.Object3D()
scene.add(marker);
marker.add(camera);
marker.add(ball);
var clock = new THREE.Clock(true);

function animate(){
  requestAnimationFrame(animate);
  walk();
  turn();
  TWEEN.update()
  renderer.render(scene,camera);
}
animate();
function walk(){
  if (!isWalking()) return;
  var position = Math.sin(clock.getElapsedTime() *10) *100;
  ball2.position.z = position;
  ball3.position.z = -position;
  box.position.z = -position/2;
  box2.position.z = position/2;
}
var is_moving_right, is_moving_left, is_moving_forward, is_moving_back;
function isWalking(){
  if (is_moving_right) return true;
  if (is_moving_left) return true;
  if (is_moving_back) return true;
  if (is_moving_forward) return true;
  return false;
}
function turn() {
  var direction = 0
  if (is_moving_forward) direction = Math.PI;
  if (is_moving_back) direction = 0;
  if (is_moving_left) direction = Math.PI/2;
  if (is_moving_right) direction = Math.PI/2;
  ball.rotation.y = direction;
}
document.addEventListener('keyup', function(event){
  var code = event.keyCode;
  if (code == 37) is_moving_left = false;
  if (code == 39) is_moving_right = false;
  if (code == 40) is_moving_forward = false;
  if (code == 38) is_moving_back = false;
}); 

fak.push(makeTreeAt( 500,0));
fak.push(makeTreeAt( -500,0));
fak.push(makeTreeAt(750,-1000));
fak.push(makeTreeAt( -750,-1000));



function razzFa() {
  fa_kinccsel = Math.floor(Math.random() * fak.length);
  
  new TWEEN
    .Tween({x: 0})
    .to ({x: 2*Math.PI},200)
    .repeat(20)
    .onUpdate(function (){
      fak[fa_kinccsel].position.x = 75 * Math.sin(this.x);
    })
    .start()
  setTimeout(razzFa, 12*1000);
}

razzFa();
var fruit;
function animateFruit() {
  if (fruit) return;
  fruit = new THREE.Mesh(
    new THREE.CylinderGeometry(25,25,5,25),
    new THREE.MeshBasicMaterial({color: 0xFFD700})
    );
    fruit.rotation.x = Math.PI/2;

    marker.add(fruit);
    
    new TWEEN.
      Tween({
        height: 150,
        spin: 0
      }).
      to({
        height: 250,
        spin: 4
      }, 500).
      onUpdate(function (){
        fruit.position.y = this.height;
        fruit.rotation.z = this.spin;
      }).
      onUpdate(function () {
        marker.remove(fruit);
        fruit = undefined;
      }).
      start();
}
//var alap = new THREE.Mesh(new THREE.CubeGeometry(1000,10,1000), cover);
//scene.add(alap);
  // Now, show what the camera sees on the screen:
  renderer.render(scene, camera);
  function detectCollisions() {
    var vector = new THREE.Vector3(0,-1,0);
    var ray = new THREE.Ray(marker.position,vector);
    var intersects = ray.intersectObjects(not_allowed);
    if (intersects.length > 0) return true;
    return false;
  }