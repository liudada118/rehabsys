import Stats from "three/examples/jsm/libs/stats.module.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { TextureLoader } from "three";





const sitInit = 500;
const backInit = 5000;
let switchStatusArr = new Array(11).fill(0);

const Canvas = React.forwardRef((props, refs) => {
    let container, stats;

    let camera, scene, renderer, modelValue = 0;
    let controls;
    let chair, man, child, backpack;
    const clock = new THREE.Clock();
    const ALT_KEY = 18;
    const CTRL_KEY = 17;
    const CMD_KEY = 91;

    const positionY = -30,
        positionX = 135,
        positiosZ = 185;
    function init() {
        container = document.getElementById(`canvas${props.index}`);
        // camera

        camera = new THREE.PerspectiveCamera(
            40,
            window.innerWidth / window.innerHeight,
            1,
            150000
        );



        camera = new THREE.PerspectiveCamera(
            40,
            (window.innerWidth * 0.7) / window.innerHeight,
            1,
            150000
        );
        camera.position.z = 3000;
        camera.position.y = 2000;

        // scene

        scene = new THREE.Scene();

        // model
        const loader = new GLTFLoader();



        loader.load("./model/child.glb", function (gltf) {
            child = gltf.scene;
            console.log(child)

            child.scale.x = 140;
            child.scale.y = 140;
            child.scale.z = 140;

            scene.add(child);
            console.log(scene)
        });





        // points  座椅

        const helper = new THREE.GridHelper(2000, 100);
        helper.position.y = -199;
        helper.material.opacity = 0.25;
        helper.material.transparent = true;
        scene.add(helper);

        // lights
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
        hemiLight.position.set(0, 200, 0);
        scene.add(hemiLight);
        const dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(0, 200, 200);
        scene.add(dirLight);
        const dirLight1 = new THREE.DirectionalLight(0xffffff);
        dirLight1.position.set(200, 10, 0);

        // renderer

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        // renderer.setSize(window.innerWidth, window.innerHeight);
        if (props.body) {
            renderer.setSize(
                document.querySelector(".detailInfoCard").getBoundingClientRect().width,
                document.querySelector(".detailInfoCard").getBoundingClientRect().height
            );
        } else {
            renderer.setSize(window.innerWidth * 0.7, window.innerHeight);
        }
        renderer.outputEncoding = THREE.sRGBEncoding;
        if (container.childNodes.length == 0) {
            container.appendChild(renderer.domElement);
        }

        renderer.setClearColor(0x10152b);

        //FlyControls
        controls = new TrackballControls(camera, renderer.domElement);
        controls.dynamicDampingFactor = 0.1;
        controls.domElement = container;
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

        // window.addEventListener("resize", onWindowResize);
    }
    //   初始化座椅

    // 初始化靠背

    //

    function onWindowResize() {
        if (props.body) {
            renderer.setSize(
                document.querySelector(".detailInfoCard").innerWidth,
                document.querySelector(".detailInfoCard").innerHeight
            );
        } else {
            renderer.setSize(window.innerWidth * 0.7, window.innerHeight);
        }
        if (props.body) {
            camera.aspect =
                document.querySelector(".detailInfoCard").getBoundingClientRect()
                    .width /
                document.querySelector(".detailInfoCard").getBoundingClientRect()
                    .height;
        } else {
            camera.aspect = (window.innerWidth * 0.7) / window.innerHeight;
        }
        // camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

    //模型动画

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        controls.update();


        renderer.render(scene, camera);
    }

    const changeValue = (obj) => { };
    useEffect(() => {
        // 靠垫数据

        init();
        animate();

        return () => { };
    }, []);
    return (
        <div>
            <div
                style={{ width: "100%", height: "100%" }}
                id={`canvas${props.index}`}
            ></div>
        </div>
    );
});




export default function Hand() {
    return (
        <Canvas index={1} />
    )
}

