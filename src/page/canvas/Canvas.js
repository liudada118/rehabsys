import React, { useEffect } from 'react'
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
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
    const darts = new Darts1({ camera: { x: 1500, y: 100, z: 100 } })
    darts.initScene()
    darts.loadObject()
    darts.loadPlane("./img/bg.png", 2000, 2000)
    darts.cube2 = darts.loadPlane("./img/demo1.png", 200, 200)  //new THREE.Mesh(geometry2, material2);
    darts.cube2.position.z = 20
    darts.addEvent()
    animate(darts)
  }, [])
  return (
    <div></div>
  )
}
