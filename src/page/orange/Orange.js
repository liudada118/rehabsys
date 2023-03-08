import React, { useEffect } from 'react'
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { animate, ThreeScene } from '../../assets/js/threeBase';
import { moveTrack3D, project2D } from '../../assets/js/threeUtil';
const ALT_KEY = 18;
const CTRL_KEY = 17;
const CMD_KEY = 91;





class Darts1 extends ThreeScene {
  constructor(camera) {

    super(camera)
    this.run = false
    this.end = false
  }
  loadObject() {

    const loader = new GLTFLoader();
    const that = this
    loader.load("./model/orange1.glb", function (gltf) {
      that.child = gltf.scene;
      that.child.scale.x = 60;
      that.child.scale.y = 60;
      that.child.scale.z = 60;
      that.child.position.z = 200
      that.child.rotation.x = -Math.PI/2
      that.child.scale.x = 60
      that.scene.add(that.child);
    });

    const fbxloader = new FBXLoader()

    loader.load("./model/cup.glb", function (gltf) {
        that.cup = gltf.scene;
        that.cup.scale.x = 100;
        that.cup.scale.y = 100;
        that.cup.scale.z = 100;
        that.cup.position.z = 200
        that.cup.position.y = -600
        that.scene.add(that.cup);
      });
  }

  // 绑定飞镖移动的事件
  addEvent() {
    console.log(this)
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

  move() {
    if (this.run) {

      if (this.child.position.z < 0) {
        this.run = false
        this.end = true
        return
      }
      this.cube2.visible = false
      moveTrack3D(this, 200)

    }
  }
}



export default function Canvas() {

  useEffect(() => {
    const darts = new Darts1({ camera: { x: 1500, y: 0, z: 0 } })
    darts.initScene()
    darts.loadObject()
    darts.loadPlane("./img/orangeBg.jpg", 2000, 2000)
    // darts.cube2 = darts.loadPlane("./img/demo1.png", 200, 200)  //new THREE.Mesh(geometry2, material2);
    // darts.cube2.position.z = 20
    darts.addEvent()
    animate(darts)
  }, [])
  return (
    <div></div>
  )
}
