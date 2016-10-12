// This is where stuff in our game will happen:
var scene = new THREE.Scene();
// This is what sees the stuff:
var aspect_ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
camera.position.z = 500;
scene.add(camera);
// This will draw what the camera sees onto the screen:
// var renderer = new THREE.CanvasRenderer();
var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// ******** START CODING ON THE NEXT LINE ********
var shape = new THREE.CubeGeometry(100, 100, 100)
var cover = new THREE.MeshNormalMaterial()
// var cover = new THREE.MeshBasicMaterial({color:"#00ff00"})
var box = new THREE.Mesh(shape, cover)
scene.add(box)
box.rotation.set(0.5, 0.5, 0.5)
var t = THREE
var ball = new t.Mesh(new t.SphereGeometry(100, 20, 15), cover)
scene.add(ball)
ball.position.set(200, 0, 0)
var clock = new t.Clock()
var henger = new t.Mesh(new t.CylinderGeometry(20, 20, 100), cover)
henger.position.set(-200, 0, 0)
scene.add(henger)
animate()

// Now, show what the camera sees on the screen:
renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate)
  var time = clock.getElapsedTime()
  ball.rotation.set(time, time, 0)
  box.rotation.set(time, time, 0)
  henger.rotation.set(2 * time, 2 * time, 0)
  renderer.render(scene, camera)
}
