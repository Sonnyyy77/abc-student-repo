const WORLD_HALF_SIZE = 600;
const COLOR_BG = 0x000000;
const FLOOR_POSITION = -20;

let t = 0.0;

let plane;
let cubes = [];
let lights = [];
let pieces = [];
let targetBox;

function setupTHREE() {
  // plane
  plane = getPlane();
  plane.position.y = FLOOR_POSITION;
  plane.rotation.x = PI / 2;
  scene.add(plane);


  // ambiLight
  const ambiLight = new THREE.AmbientLight(0x333333);
  scene.add(ambiLight);

  // hemiLight
  const hemiLight = new THREE.HemisphereLight(0x000000, 0x000000, 1);
  hemiLight.color.set(0x7322ff); // sky
  hemiLight.groundColor.set(0xffffff); // ground
  scene.add(hemiLight);

  // lights
  let tLight = new Light();
  tLight.setPosition(18.5, 100, -10);
  lights.push(tLight);

}

function updateTHREE() {
  // we usually call this in initTHREE().
  scene.fog = new THREE.Fog(COLOR_BG, params.near, params.far);

  for (let p of pieces) {
    p.rotate();
    p.update();
  }

  // update the lights
  for (let l of lights) {
    l.update();
  }
}

function getLight() {
  const light = new THREE.SpotLight(0xffffff, 3, 180, 1.25);
  //const light = new THREE.SpotLight(color(random(1)), 3, 180, 1.25);
  light.castShadow = true; // default false

  //Set up shadow properties for the light
  light.shadow.mapSize.width = 1024; // default
  light.shadow.mapSize.height = 1024; // default

  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 200;
  light.shadow.camera.fov = 60;
  // const helper = new THREE.CameraHelper( light.shadow.camera );
  // scene.add( helper );

  return light;
}

function getPlane() {
  const geometry = new THREE.PlaneGeometry(
    WORLD_HALF_SIZE * 2,
    WORLD_HALF_SIZE * 2,
    32
  );
  const material = new THREE.MeshPhongMaterial({
    //color: 0xffff00,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  //mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}

function getSphere() {
  const geometry = new THREE.SphereGeometry(3, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
}

// function getPiece() {
//   //
//   const geometry = new THREE.PlaneGeometry(random(4, 7), random(4, 7));
//   const material = new THREE.MeshBasicMaterial({
//     color: 0x4700c3,
//     side: THREE.DoubleSide
//   });
//   const mesh = new THREE.Mesh(geometry, material);
//   mesh.castShadow = true;
//   mesh.receiveShadow = true;
//
//   return mesh;
// }

class Light {
  constructor() {
    this.pos = createVector();
    this.vel = createVector();
    this.acc = createVector();
    this.scl = createVector(1, 1, 1);
    this.mass = this.scl.x * this.scl.y * this.scl.z;
    this.rot = createVector();
    this.rotVel = createVector();
    this.rotAcc = createVector();

    this.mesh = getSphere();
    this.light = getLight();

    this.group = new THREE.Group();
    this.group.add(this.mesh);
    this.group.add(this.light);

    scene.add(this.group);
  }
  setPosition(x, y, z) {
    this.pos = createVector(x, y, z);
    return this;
  }
  setVelocity(x, y, z) {
    this.vel = createVector(x, y, z);
    return this;
  }
  setRotationAngle(x, y, z) {
    this.rot = createVector(x, y, z);
    return this;
  }
  setRotationVelocity(x, y, z) {
    this.rotVel = createVector(x, y, z);
    return this;
  }
  setScale(w, h, d) {
    h = h === undefined ? w : h;
    d = d === undefined ? w : d;
    const minScale = 0.01;
    if (w < minScale) w = minScale;
    if (h < minScale) h = minScale;
    if (d < minScale) d = minScale;
    this.scl = createVector(w, h, d);
    this.mass = this.scl.x * this.scl.y * this.scl.z;
    return this;
  }
  setTranslation(x, y, z) {
    this.mesh.geometry.translate(x, y, z);
    return this;
  }
  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  rotate() {
    this.rotVel.add(this.rotAcc);
    this.rot.add(this.rotVel);
    this.rotAcc.mult(0);
  }
  applyForce(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
  }
  update() {
    this.group.position.set(this.pos.x, this.pos.y, this.pos.z);
    this.group.rotation.set(this.rot.x, this.rot.y, this.rot.z);
    this.group.scale.set(this.scl.x, this.scl.y, this.scl.z);
  }
}

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

///// p5.js /////

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("container-p5");
  canvas.hide();
  background(50);

  initTHREE();
}

function draw() {
  noLoop();
  rect(0, 0, 50, 100);
}

///// three.js /////

let container, stats, gui, params;
let scene, camera, renderer;
let time = 0;
let frame = 0;

function initTHREE() {
  // scene
  scene = new THREE.Scene();

  // camera (fov, ratio, near, far)
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.5,
    5000
  );
  camera.position.z = 140;
  camera.position.y = 110;
  camera.position.x = -35;

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(COLOR_BG);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  // container
  container = document.getElementById("container-three");
  container.appendChild(renderer.domElement);

  // controls
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.maxDistance = 180;
  controls.minDistance = 180;

  // gui
  // https://davidwalsh.name/dat-gui
  gui = new dat.gui.GUI();
  params = {
    near: 1,
    far: 500,
    density: 0.001
  };
  dat.GUI.toggleHide();
  // let guiFog = gui.addFolder("FOG");
  // guiFog.add(params, "near", 1, 600).step(1);
  // guiFog.add(params, "far", 1, 500).step(1);

  // stats
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  //container.appendChild(stats.dom);

  setupTHREE();

  // let's draw!
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  //stats.update();
  time = performance.now();
  frame++;

  t += 0.01;

  for (let i = 0; i < pieces.length; i++) {
    pieces[i].pos.y = noise(t) * 30;
  }


  for (let i = 0; i < lights.length; i++) {
    lights[i].pos.y = sin(t*3) * 10 + 130;
    lights[i].pos.x = cos(t*3) * 50 + 10;
    lights[i].pos.z = cos(t*3) * 15;
  }

  updateTHREE();

  render();
}

function render() {
  renderer.render(scene, camera);
}

// event listeners
window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
