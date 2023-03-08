import React, { useEffect } from 'react'
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ThreeScene } from '../../assets/js/threeBase';
import { moveTrack3D, project2D } from '../../assets/js/threeUtil';




function animate(darts) {
  requestAnimationFrame(animate.bind(this, darts));
  darts.controls.update();
  if (darts.run) {

    if (darts.child.position.z < 0) {
      darts.run = false
      darts.end = true
      return
    }
    darts.cube2.visible = false
    moveTrack3D(darts, 200)

  }
  darts.renderer.render(darts.scene, darts.camera);
}

class Darts1 extends ThreeScene {
  constructor() {
    super()
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
  /**
   * 输入
   * @param {string} img 
   * @param {number} width 
   * @param {number} height 
   * @returns 
   */


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
}

export default function Canvas() {

  useEffect(() => {
    const darts = new Darts1()
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
