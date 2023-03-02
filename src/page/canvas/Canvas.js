import React, { useEffect } from 'react'
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class darts{
  constructor(){

  }

  // 初始化场景
  initScene(){

  }

  // 加载物体模型
  loadObject(){

  }

}

export default function Canvas() {
  let controls, child,renderer,scene, camera,run = false , end = false,cube2
  const ALT_KEY = 18;
  const CTRL_KEY = 17;
  const CMD_KEY = 91;


  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01; 
    if(run){
      // console.log(cube2)
      if(child.position.z < 0){
        run = false 
        end = true
        return
      }
      cube2.visible = false
      child.position.x -= 200 * Math.sin(child.rotation.y)*Math.cos(child.rotation.x)
      child.position.y += 200 * Math.sin(child.rotation.x)*Math.cos(child.rotation.y)
      child.position.z -= 200 * Math.cos(child.rotation.x) * Math.cos(child.rotation.y)

      
    }
    // console.log(111)
    renderer.render(scene, camera);
  }



  useEffect(() => {

    document.addEventListener('keydown', (e) => {

      if (child && !run && !end) {
        
        if (e.code === 'KeyA') {
          child.rotation.y += 0.01
        }
        if (e.code === 'KeyW') {
          child.rotation.x += 0.01
        }
        if (e.code === 'KeyD') {
          child.rotation.y -= 0.01
        }
        if (e.code === 'KeyS') {
          child.rotation.x -= 0.01
        }

        if(e.code === 'KeyP'){
          run = true
        }


        if (cube2) {
          cube2.position.x = -700 * Math.tan(child.rotation.y) //+ 700*Math.sin(child.rotation.y)*Math.cos(child.rotation.x)
          cube2.position.y = 700 * Math.tan(child.rotation.x) //+ 700 *  Math.sin(child.rotation.x)*Math.cos(child.rotation.y)
        }
      }

      

      

    })

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);
    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 200, 200);
    scene.add(dirLight);
    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(200, 10, 0);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x444444);
    dirLight2.position.set(200, 0, 2000);
    scene.add(dirLight2);
    // const light = new THREE.AmbientLight(0xffffff); // soft white light
    // scene.add(light);

    const geometry = new THREE.PlaneGeometry(2000, 2000,);
    const texture = new THREE.TextureLoader().load("./img/bg.png")
    const material = new THREE.MeshLambertMaterial({ map: texture, transparent: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const geometry2 = new THREE.PlaneGeometry(200, 200);
    const texture2 = new THREE.TextureLoader().load("./img/demo1.png")
    const material2 = new THREE.MeshLambertMaterial({ map: texture2, transparent: true });
    cube2 = new THREE.Mesh(geometry2, material2);
    cube2.position.z = 20
    scene.add(cube2);


    const loader = new GLTFLoader();
    loader.load("./model/demo.glb", function (gltf) {
      child = gltf.scene;
      // console.log(child)

      child.scale.x = 60;
      child.scale.y = 60;
      child.scale.z = 60;
      // child.rotation.z = Math.PI/2;
      // child.rotation.y = -Math.PI/12;
      child.position.z = 700
      scene.add(child);
      // console.log(scene)
    });

    controls = new TrackballControls(camera, renderer.domElement);
    controls.dynamicDampingFactor = 0.1;
    controls.domElement = renderer.domElement;
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN, // make pan the default instead of rotate
      MIDDLE: THREE.MOUSE.ZOOM,
      RIGHT: THREE.MOUSE.ROTATE,
    };
    controls.keys = [
      ALT_KEY, // orbit
      CTRL_KEY, // zoom
      CMD_KEY, // pan
    ];

    camera.position.z = 1500;
    camera.position.x = 100;
    camera.position.y = 100;
    
    animate();

  }, [])
  return (
    <div></div>
  )
}
