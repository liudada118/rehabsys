import React, { useEffect } from 'react'
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const ALT_KEY = 18;
const CTRL_KEY = 17;
const CMD_KEY = 91;

function moveTrack(model , speed){
  
}

function animate(darts){
  console.log(darts)
  requestAnimationFrame(animate.bind(this,darts));
  darts.controls.update();
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01; 
  if (darts.run) {
    // console.log(cube2)
    if (darts.child.position.z < 0) {
      darts.run = false
      darts.end = true
      return
    }
    darts.cube2.visible = false
    darts.child.position.x -= 200 * Math.sin(darts.child.rotation.y) * Math.cos(darts.child.rotation.x)
    darts.child.position.y += 200 * Math.sin(darts.child.rotation.x) * Math.cos(darts.child.rotation.y)
    darts.child.position.z -= 200 * Math.cos(darts.child.rotation.x) * Math.cos(darts.child.rotation.y)


  }
  // console.log(111)
  darts.renderer.render(darts.scene, darts.camera);
}

class Darts {
  
  constructor() {
    this.run = false
    this.end = false
  }

  // 初始化场景
  initScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.camera.position.z = 1500;
    this.camera.position.x = 100;
    this.camera.position.y = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 200, 0);
    this.scene.add(hemiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 200, 200);
    this.scene.add(dirLight);
    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(200, 10, 0);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x444444);
    dirLight2.position.set(200, 0, 2000);
    this.scene.add(dirLight2);

    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.dynamicDampingFactor = 0.1;
    this.controls.domElement = this.renderer.domElement;
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN, // make pan the default instead of rotate
      MIDDLE: THREE.MOUSE.ZOOM,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    this.controls.keys = [
      ALT_KEY, // orbit
      CTRL_KEY, // zoom
      CMD_KEY, // pan
    ];


  }

  // 加载物体模型
  loadObject() {
    const geometry = new THREE.PlaneGeometry(2000, 2000,);
    const texture = new THREE.TextureLoader().load("./img/bg.png")
    const material = new THREE.MeshLambertMaterial({ map: texture, transparent: true });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    const geometry2 = new THREE.PlaneGeometry(200, 200);
    const texture2 = new THREE.TextureLoader().load("./img/demo1.png")
    const material2 = new THREE.MeshLambertMaterial({ map: texture2, transparent: true });
    this.cube2 = new THREE.Mesh(geometry2, material2);
    this.cube2.position.z = 20
    this.scene.add(this.cube2);


    const loader = new GLTFLoader();
    const that = this
    loader.load("./model/demo.glb", function (gltf) {
      that.child = gltf.scene;
      that.child.scale.x = 60;
      that.child.scale.y = 60;
      that.child.scale.z = 60;
      
      that.child.position.z = 700
      that.scene.add(that.child);
     
    });
  }

  // 绑定飞镖移动的事件
  addEvent(){
    document.addEventListener('keydown', (e) => {

      if (this.child && !this.run && !this.end) {

        if (e.code === 'KeyA') {
          this.child.rotation.y += 0.01
        }
        if (e.code === 'KeyW') {
          this.child.rotation.x += 0.01
        }
        if (e.code === 'KeyD') {
          this.child.rotation.y -= 0.01
        }
        if (e.code === 'KeyS') {
          this.child.rotation.x -= 0.01
        }

        if (e.code === 'KeyP') {
          this.run = true
        }


        if (this.cube2) {
          this.cube2.position.x = -700 * Math.tan(this.child.rotation.y) 
          this.cube2.position.y = 700 * Math.tan(this.child.rotation.x) 
        }
      }


    })
  }

  // 渲染


}

export default function Canvas() {
  let controls, child, renderer, scene, camera, run = false, end = false, cube2
  const ALT_KEY = 18;
  const CTRL_KEY = 17;
  const CMD_KEY = 91;


  // function animate() {
  //   requestAnimationFrame(animate);
  //   controls.update();
  //   // cube.rotation.x += 0.01;
  //   // cube.rotation.y += 0.01; 
  //   if (run) {
  //     // console.log(cube2)
  //     if (child.position.z < 0) {
  //       run = false
  //       end = true
  //       return
  //     }
  //     cube2.visible = false
  //     child.position.x -= 200 * Math.sin(child.rotation.y) * Math.cos(child.rotation.x)
  //     child.position.y += 200 * Math.sin(child.rotation.x) * Math.cos(child.rotation.y)
  //     child.position.z -= 200 * Math.cos(child.rotation.x) * Math.cos(child.rotation.y)


  //   }
  //   // console.log(111)
  //   renderer.render(scene, camera);
  // }



  useEffect(() => {

    const darts = new Darts()
    darts.initScene()
    darts.loadObject()
    darts.addEvent()
    // darts.animate()
    animate(darts)
    // document.addEventListener('keydown', (e) => {

    //   if (child && !run && !end) {

    //     if (e.code === 'KeyA') {
    //       child.rotation.y += 0.01
    //     }
    //     if (e.code === 'KeyW') {
    //       child.rotation.x += 0.01
    //     }
    //     if (e.code === 'KeyD') {
    //       child.rotation.y -= 0.01
    //     }
    //     if (e.code === 'KeyS') {
    //       child.rotation.x -= 0.01
    //     }

    //     if (e.code === 'KeyP') {
    //       run = true
    //     }


    //     if (cube2) {
    //       cube2.position.x = -700 * Math.tan(child.rotation.y) //+ 700*Math.sin(child.rotation.y)*Math.cos(child.rotation.x)
    //       cube2.position.y = 700 * Math.tan(child.rotation.x) //+ 700 *  Math.sin(child.rotation.x)*Math.cos(child.rotation.y)
    //     }
    //   }





    // })

    // scene = new THREE.Scene();
    // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    // renderer = new THREE.WebGLRenderer();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    // const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    // hemiLight.position.set(0, 200, 0);
    // scene.add(hemiLight);
    // const dirLight = new THREE.DirectionalLight(0xffffff);
    // dirLight.position.set(0, 200, 200);
    // scene.add(dirLight);
    // const dirLight1 = new THREE.DirectionalLight(0xffffff);
    // dirLight1.position.set(200, 10, 0);
    // scene.add(dirLight1);

    // const dirLight2 = new THREE.DirectionalLight(0x444444);
    // dirLight2.position.set(200, 0, 2000);
    // scene.add(dirLight2);
    // // const light = new THREE.AmbientLight(0xffffff); // soft white light
    // // scene.add(light);

    // const geometry = new THREE.PlaneGeometry(2000, 2000,);
    // const texture = new THREE.TextureLoader().load("./img/bg.png")
    // const material = new THREE.MeshLambertMaterial({ map: texture, transparent: true });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // const geometry2 = new THREE.PlaneGeometry(200, 200);
    // const texture2 = new THREE.TextureLoader().load("./img/demo1.png")
    // const material2 = new THREE.MeshLambertMaterial({ map: texture2, transparent: true });
    // cube2 = new THREE.Mesh(geometry2, material2);
    // cube2.position.z = 20
    // scene.add(cube2);


    // const loader = new GLTFLoader();
    // loader.load("./model/demo.glb", function (gltf) {
    //   child = gltf.scene;
    //   // console.log(child)

    //   child.scale.x = 60;
    //   child.scale.y = 60;
    //   child.scale.z = 60;
    //   // child.rotation.z = Math.PI/2;
    //   // child.rotation.y = -Math.PI/12;
    //   child.position.z = 700
    //   scene.add(child);
    //   // console.log(scene)
    // });

    // controls = new TrackballControls(camera, renderer.domElement);
    // controls.dynamicDampingFactor = 0.1;
    // controls.domElement = renderer.domElement;
    // controls.mouseButtons = {
    //   LEFT: THREE.MOUSE.PAN, // make pan the default instead of rotate
    //   MIDDLE: THREE.MOUSE.ZOOM,
    //   RIGHT: THREE.MOUSE.ROTATE,
    // };
    // controls.keys = [
    //   ALT_KEY, // orbit
    //   CTRL_KEY, // zoom
    //   CMD_KEY, // pan
    // ];

    // camera.position.z = 1500;
    // camera.position.x = 100;
    // camera.position.y = 100;

    // animate();

  }, [])
  return (
    <div></div>
  )
}
