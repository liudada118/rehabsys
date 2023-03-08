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








export default function Canvas() {

  useEffect(() => {
    // 创建场景、相机、渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 创建橙子模型
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshLambertMaterial({ color: 0xffa500 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 创建手柄模型
    const handleGeometry = new THREE.BoxGeometry(1, 1, 1);
    const handleMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const handleMesh = new THREE.Mesh(handleGeometry, handleMaterial);
    scene.add(handleMesh);

    // 捏橙子函数，根据手柄位置和距离计算橙子形变
    function pinchOrange() {
      const handlePos = handleMesh.position.clone();
      const orangePos = mesh.position.clone();
      const distance = handlePos.distanceTo(orangePos);
      const maxDistance = 2; // 最大距离，超过这个距离橙子不再形变
      const amount = (maxDistance - distance) / maxDistance; // 形变程度，距离越近形变越明显
      for (let i = 0; i < geometry.vertices.length; i++) {
        const vertex = geometry.vertices[i].clone();
        const direction = vertex.sub(orangePos).normalize();
        const offset = direction.multiplyScalar(amount);
        geometry.vertices[i].add(offset);
      }
      geometry.computeVertexNormals(); // 计算法线方向
      geometry.verticesNeedUpdate = true; // 更新顶点位置
      geometry.normalsNeedUpdate = true; // 更新法线方向
    }

    // 鼠标事件，拖动手柄时调用捏橙子函数
    let isDragging = false;
    document.addEventListener('mousedown', (event) => {
      isDragging = true;
    });
    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
        const intersects = raycaster.intersectObject(handleMesh);
        if (intersects.length > 0) {
          const point = intersects[0].point;
          handleMesh.position.copy(point);
          pinchOrange();
        }
      }
    });
    document.addEventListener('mouseup', (event) => {
      isDragging = false;
    });

    // 灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // 渲染循环
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

  }, [])
  return (
    <div></div>
  )
}
