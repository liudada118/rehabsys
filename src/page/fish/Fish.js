import React, { useEffect } from 'react'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { animate, ThreeScene } from '../../assets/js/threeBase'
import * as THREE from 'three'


class FishScene extends ThreeScene {
  constructor(camera) {
    super(camera)
  }

  loadObject(name) {

    const loader = new GLTFLoader();
    const that = this
    loader.load("./model/fish.glb", function (gltf) {
      name = gltf.scene;
      name.scale.x = 6;
      name.scale.y = 6;
      name.scale.z = 6;
      name.position.y = 200
      name.rotation.z= -Math.PI/2
      name.rotation.x=  -Math.PI/2
      that.scene.add(name);
    });
  }

  loadRover() {
    const texture = new THREE.TextureLoader().load('./img/350.png')
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 50, 50 );
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const water = new THREE.Mesh(
      waterGeometry,
      new THREE.MeshBasicMaterial({
        // color: 'rgb(40,150,200)',
        opacity: 0.6,
        transparent: true, 
        depthWrite: false,
        map : texture
      })
    );
    water.rotation.x = - Math.PI / 2;
    this.scene.add(water);
    const waterGeometry1 = new THREE.PlaneGeometry(10000, 10000);
   
    // const material = new THREE.MeshPhysicalMaterial({ map: texture, color: '#fff', transparent: true });
    const water1 = new THREE.Mesh(
      waterGeometry1,
      new THREE.MeshBasicMaterial({
        // color: 'rgb(0，55，120)',
        opacity: 0.3,
        transparent: true,
        depthWrite: false,
        
      })
    );
    water1.rotation.x = - Math.PI / 2;
    water1.position.y = -500
    this.scene.add(water1);

    // const waterUniforms = water.material.uniforms;
    return water;

  }
}

export default function Fish() {

  useEffect(() => {
    const fish = new FishScene({ camera: { x: 100, y: 0, z: 500 } })
    fish.initScene()
    // fish.loadPlane("./img/bg.png", 2000, 2000)
    fish.loadObject(fish.fish)
    fish.loadRover()
    animate(fish)
    console.log(fish)
  }, [])

  return (
    <></>
  )
}
