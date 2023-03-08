import * as THREE from './lib/three_jsm/three.module.js';
import { OrbitControls } from './lib/three_jsm/OrbitControls.js';
import { Water } from './lib/three_jsm/Water.js';
import { Sky } from './lib/three_jsm/Sky.js';
import { FresnelShader } from './lib/three_jsm/FresnelShader.js';

window.addEventListener('load',function(){
   init();
});
 
