import * as THREE from './three_r127/build/three.module.js';
import { OrbitControls } from './three_r127/examples/jsm/controls/OrbitControls.js';

// サイズ------------------
const wrap = document.querySelector(".js-wrap-a");
let wrapWidth = wrap.clientWidth;
let wrapHeight = wrap.clientHeight;

// レンダラー------------------
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".js-canvas")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(wrapWidth, wrapHeight);

// シーン------------------
const scene = new THREE.Scene();

// カメラ------------------
const camera = new THREE.PerspectiveCamera(75, wrapWidth / wrapHeight, 1, 1000);
camera.position.set(0, 0, 1);

// カメラコントローラーを作成
const controls = new OrbitControls( camera, renderer.domElement );
controls.autoRotate = true; // 自動回転をONにする
controls.autoRotateSpeed = 0.5; // 自動回転の速度
controls.enableDamping = true; // 視点操作のイージングをONにする
controls.dampingFactor = 0.2; // 視点操作のイージングの値
controls.rotateSpeed = 0.5; // 視点変更の速さ
controls.enableZoom = false; // ズーム禁止
controls.enablePan = false; //水平垂直移動の禁止

// 光源------------------
const aLight = new THREE.AmbientLight(0xffffff, 1); // 環境光源
scene.add(aLight);

// テクスチャー------------------
const loader = new THREE.TextureLoader();
const texture = loader.load( './img/constellation_figures_16k.jpg' );

// 物体------------------
//球体
const sphere = new THREE.Mesh(
  new THREE.IcosahedronGeometry( 10, 15 ),
  new THREE.MeshPhongMaterial({
    map: texture
  }),
);
sphere.geometry.scale(-1, 1, 1); //表面を内側に向ける
scene.add(sphere);

//リサイズ------------------
const wrapResize = () =>{
  wrapWidth = wrap.clientWidth;
  wrapHeight = wrap.clientHeight;
  renderer.setSize(wrapWidth, wrapHeight);
  // camera.aspect = wrapWidth / wrapHeight;
  // camera.updateProjectionMatrix();
}

//一定時間毎に処理------------------
let tick;
const switching = (e) => {
  if( e[0].isIntersecting ){ //見えてる時
    tick = () => {
      wrapResize(); //リサイズ
      controls.update(); //カメラコントローラー
      renderer.render(scene, camera); //レンダリング
      requestAnimationFrame( tick ); //繰り返し
    }
    requestAnimationFrame( tick );
  }else{ //見えてない時
    tick = () => {
      cancelAnimationFrame( tick )
    }
  }
}

//見えているかどうか（Intersection Observer API）------------------
const createObserver = () => {
  let observer;
  const options = { root: null, rootMargin: "0%", threshold: 0 };
  observer = new IntersectionObserver(switching, options); //コールバック関数とオプションを渡す
  observer.observe(wrap); //要素の監視を開始
}
createObserver();