import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const ALT_KEY = 18;
const CTRL_KEY = 17;
const CMD_KEY = 91;

/**
 * 将新建的场景作为形参，动画执行渲染
 * @param {object} darts 
 */
export function animate(darts) {
  requestAnimationFrame(animate.bind(this, darts));
  darts.controls.update();
  darts.renderer.render(darts.scene, darts.camera);
  if (darts.move) {
    darts.move()
  }
}

export class ThreeScene {

  constructor({ camera }) {
    this.cameraPosition = camera
  }

  // 初始化场景
  initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.camera.position.z = this.cameraPosition.x;
    this.camera.position.x = this.cameraPosition.y;
    this.camera.position.y = this.cameraPosition.z;
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

  /**
   * 加载带贴图的平面
   * @param {string} img 
   * @param {number} width 
   * @param {number} height 
   * @returns 
   */
  loadPlane(img, width, height) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const texture = new THREE.TextureLoader().load(img)
    const material = new THREE.MeshBasicMaterial({ map: texture, color: '#fff', transparent: true });
    const cube = new THREE.Mesh(geometry, material);
    console.log(cube)
    this.scene.add(cube)
    return cube
  }
  // 渲染
}
