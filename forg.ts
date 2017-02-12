 // This is where stuff in our game will happen:
  var scene = new THREE.Scene();

  // This is what sees the stuff:
  var aspect_ratio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
  camera.position.z = 500;
  camera.position.y = 200;
  scene.add(camera);

  // This will draw what the camera sees onto the screen:
  var renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true
  document.body.appendChild(renderer.domElement);

  // ******** START CODING ON THE NEXT LINE ********

var cover = new THREE.MeshBasicMaterial();
var alak = new THREE.SphereGeometry(100);
cover.color.setRGB(0,0,0);
var gomb = new THREE.Mesh(alak,cover);
gomb.name = 'gomb'
scene.add(gomb);

gomb.position.set(0,0,0);

var labalak = new THREE.SphereGeometry(50);


var lab = new THREE.Mesh(labalak ,cover);
lab.name='lab'
scene.add(lab);
lab.position.set(-80,-120,0);

var lab2 = new THREE.Mesh(labalak ,cover);
lab2.name='lab2'
scene.add(lab2);
lab2.position.set(80,-120,0);

var lab3 = new THREE.Mesh(labalak ,cover);
lab3.name='lab3'
scene.add(lab3);
lab3.position.set(-150,0,0);

var boritas = new THREE.MeshNormalMaterial()

var cover2 = new THREE.MeshBasicMaterial();
cover2.color.setRGB(20,0,0);
var hatter = new THREE.Mesh(labalak,boritas);
hatter.name='hatter'
hatter.position.set(200,200,200);
scene.add(hatter)

var lab4 = new THREE.Mesh(labalak ,cover);
lab4.name='lab4'
scene.add(lab4);
lab4.position.set(150,0,0);

gomb.add(lab);
gomb.add(lab2);
gomb.add(lab3);
gomb.add(lab4);
gomb.add(camera);

var feny = new THREE.DirectionalLight() 
feny.intensity = 1
feny.position.set(100,100,100)
scene.add(feny)
feny.castShadow = true


function makeVP(x: number, y: number, z: number) {
  var boritas = new THREE.MeshNormalMaterial()
  var viszonyitasiPontalak = new THREE.CubeGeometry(100, 100, 100);
  var viszonyitasiPont = new THREE.Mesh(viszonyitasiPontalak, boritas)
  viszonyitasiPont.name = 'viszonyitasiPont'
  scene.add(viszonyitasiPont)
  viszonyitasiPont.position.set(x, y, z)
}

makeVP(-500, -120, -500);
makeVP(500, -120, -500);
makeVP(-500, -120, 500);
makeVP(500, -120, 500);
makeVP(-1000, -120, -1000);
makeVP(1000, -120, -1000);
makeVP(-1000, -120, 1000);
makeVP(1000, -120, 1000);

document.addEventListener("keydown", function(event){
  var code = event.keyCode;
   if (code == 37)gomb.rotation.y += Math.PI/180;
   if (code == 39) gomb.rotation.y -= Math.PI / 180;
   if (code == 38) menj(-10)
   if (code == 40) menj(10)
  });

function menj(step: number) {
  gomb.position.z += step * Math.cos(gomb.rotation.y)
  gomb.position.x += step * Math.sin(gomb.rotation.y)

  
}

/** olyan mint az animate, csak ez koncz 
*/
function konczmate(){
  renderer.render(scene, camera);
  requestAnimationFrame(konczmate)
}

requestAnimationFrame(konczmate)

// innen van a interfa;

function makeFa(x:number, z:number) {
  var torzsG = new THREE.CylinderGeometry(40, 40, 1000)
  var faszin = makeColor( 139, 69 , 19 )
  var torzs = new THREE.Mesh(torzsG, faszin)
  torzs.position.y += 330
  scene.add(torzs)
  var zold = makeColor(0, 100, 0)
var gula = new THREE.CylinderGeometry(40,200,800,4)
var lomb= new THREE.Mesh(gula,zold)
lomb.position.y = 100
torzs.add(lomb)
  torzs.name = 'torzs'
  torzs.castShadow = true
  lomb.castShadow = true
  torzs.position.x = x
  torzs.position.z = z


}

function makeColor(r: number, g: number, b: number) {
  var m = new THREE.MeshBasicMaterial()
  setColor(m, r, g, b)
  return m;
}
function setColor(material: THREE.MeshBasicMaterial, r: number, g: number, b: number) {
  material.color.setRGB(r / 255, g / 255, b / 255);
}

for (var i = 0; i < 10; i++){
  let x=(i-5)*500
  makeFa(randNum(x,x), randNum(-600,-600))
}

var vZold = makeColor(128,128,0)
var lap = new THREE.PlaneGeometry(100000,100000)
var ground = new THREE.Mesh(lap, vZold)
scene.add(ground)
ground.position.y = -195
ground.rotation.x = -Math.PI / 2
ground.receiveShadow = true

//innenfunction

function randNum(from:number, to: number) : number{
  var x;
  x = Math.random()*(to-from)+from
  return x;
  
}

