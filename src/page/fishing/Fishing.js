import React, { useEffect } from 'react'
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Water } from 'three/examples/jsm/objects/Water';
import { Sky } from 'three/examples/jsm/objects/Sky';
let container;
let controls;
let renderer, cube, scene, camera
const ALT_KEY = 18;
const CTRL_KEY = 17;
const CMD_KEY = 91;
let sceneManager, sky, water, sphere, sun, orbitCon
// function animate() {
//   requestAnimationFrame(animate);
//   controls.update()
//   renderer.render(scene, camera);
// };
// function init() {
//   scene = new THREE.Scene();
//   camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   container = document.getElementById(`canvas2`);
//   renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   container.appendChild(renderer.domElement);
//   // document.body.appendChild(renderer.domElement);


//   // const loader = new FBXLoader();

//   // loader.load('/model/Samba Dancing.fbx', function (gltf) {

//   //   console.log(gltf)
//   //   // scene.add(gltf.scene);
//   //   scene.add(gltf);
//   // }, undefined, function (error) {

//   //   console.error(error);

//   // });

//   const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
//   hemiLight.position.set(0, 200, 0);
//   scene.add(hemiLight);
//   const dirLight = new THREE.DirectionalLight(0xffffff);
//   dirLight.position.set(0, 200, 200);
//   scene.add(dirLight);
//   const dirLight1 = new THREE.DirectionalLight(0xffffff);
//   dirLight1.position.set(200, 10, 0);

//   camera.position.z = 5;

//   controls = new TrackballControls(camera, renderer.domElement);
//   controls.dynamicDampingFactor = 0.1;
//   controls.domElement = container;
//   controls.mouseButtons = {
//     LEFT: THREE.MOUSE.PAN, // make pan the default instead of rotate
//     MIDDLE: THREE.MOUSE.ZOOM,
//     RIGHT: THREE.MOUSE.ROTATE,
//   };
//   controls.keys = [
//     ALT_KEY, // orbit
//     CTRL_KEY, // zoom
//     CMD_KEY, // pan
//   ];
//   console.log('open')


// }

class sceneManag {

  constructor(canvas) {

  }
  // Magic goes here
  update() {
    // Animates our water
    water.material.uniforms['time'].value += 1.0 / 60.0;

    // Reposition our sphere to appear to float up and down
    const time = performance.now() * 0.001;
    // sphere.position.y = Math.sin(time) * 2;
    // sphere.rotation.x = time * 0.3;
    // sphere.rotation.z = time * 0.3;

    // Finally, render our scene
    renderer.render(scene, camera);
  }
}


function buildScene() {
  const scene = new THREE.Scene();
  return scene;
}

function buildCamera() {
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.set(30, 30, 100);
  return camera;
}

function buildRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  canvas.appendChild(renderer.domElement);
  return renderer;
}

function buildSky() {
  const sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);
  return sky;
}

function buildSun() {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const sun = new THREE.Vector3();

  // Defining the x, y and z value for our 3D Vector
  const theta = Math.PI * (0.49 - 0.5);
  const phi = 2 * Math.PI * (0.205 - 0.5);
  sun.x = Math.cos(phi);
  sun.y = Math.sin(phi) * Math.sin(theta);
  sun.z = Math.sin(phi) * Math.cos(theta);

  sky.material.uniforms['sunPosition'].value.copy(sun);
  scene.environment = pmremGenerator.fromScene(sky).texture;
  return sun;
}

function buildWater() {
  const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
  const water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('img/water.png', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      alpha: 1.0,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      // waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
      transparent : true,
      opacity : 0
    }
  );
  water.rotation.x = - Math.PI / 2;
  scene.add(water);

  const waterUniforms = water.material.uniforms;
  return water;
}

function buildSphere() {
  // const geometry = new THREE.SphereGeometry(20, 20, 20);
  // const material = new THREE.MeshStandardMaterial({ color: 0xfcc742 });

  // const sphere = new THREE.Mesh(geometry, material);
  // scene.add(sphere);
  // return sphere;
}

function buildFish() {
  var texture = THREE.ImageUtils.loadTexture("img/fishDemo.png")
  const geometry = new THREE.PlaneGeometry(30, 15, 2, 1);
  const material = new THREE.MeshBasicMaterial({
    // color: 0x00ff00,
    map: texture,
    overdraw: true,
    // alphaMap: chungeAlphaTexture, // 设置透明纹理
    transparent: true, // 允许材质透明
    side: THREE.DoubleSide
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.x = -Math.PI/3

  scene.add(cube);
  return cube
}

function setOrbitControls() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set(0, 10, 0);
  controls.minDistance = 40.0;
  controls.maxDistance = 200.0;
  controls.update();
  return controls;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function init() {

}

function animate() {
  requestAnimationFrame(animate);
  // console.log(sceneManager)
  sceneManager.update();
}


export default function Fishing() {
  useEffect(() => {
    // init()
    const canvas = document.getElementById("canvas");
    scene = buildScene();
    renderer = buildRenderer(canvas);
    camera = buildCamera();
    sphere = buildSphere();
    sky = buildSky();
    sun = buildSun();
    water = buildWater();
    orbitCon = setOrbitControls();

    const fish = buildFish()

    sceneManager = new sceneManag(canvas);
    // console.log(sceneManager)
    // console.log(sceneManager)
    window.addEventListener('resize', onWindowResize);
    animate()
  }, [])
  return (
    <div id="canvas"></div>
  )
}
