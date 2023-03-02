import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
    const cube = this.loadPlane("./img/bg.png", 2000, 2000)
    this.scene.add(cube);
    this.cube2 = this.loadPlane("./img/demo1.png", 200, 200)  //new THREE.Mesh(geometry2, material2);
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

  /**
   * 输入
   * @param {string} img 
   * @param {number} width 
   * @param {number} height 
   * @returns 
   */
  loadPlane(img, width, height) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const texture = new THREE.TextureLoader().load(img)
    const material = new THREE.MeshPhysicalMaterial({ map: texture, color: '#fff', transparent: true });
    const cube = new THREE.Mesh(geometry, material);
    return cube
  }

  // 绑定飞镖移动的事件
  addEvent() {
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
          project2D(this.child, this.cube2, 700)
        }
      }


    })
  }

  // 渲染
}
