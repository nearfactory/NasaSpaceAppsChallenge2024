// import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

// ========================================


// promiseを使用して完了まで待機するシステムにした
function fetchCSV(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(`Failed to fetch CSV: ${xhr.status}`);
        }
      }
    };
    xhr.open('GET', url);
    xhr.send();
  });
}

// 読み込んだCSVファイルを二次元配列に組みなおす
function parseCSV(csvText) {
  const lines = csvText.split(/\r\n|\n/);
  const data = [];

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    if (currentLine.length > 0) {
      data.push(currentLine);
    }
  }

  return data;
}

// CSVファイルから星の3次元座標データを読み込み
// Promiseメソッドを使用して読み込み完了まで待機

function dataLoad() {
  Promise.all([
    fetchCSV(dataCSV[0]),
    fetchCSV(dataCSV[1]),
    fetchCSV(dataCSV[2]),
    fetchCSV(dataCSV[3]),
    fetchCSV(dataCSV[4])
  ]).then(([csvText1, csvText2, csvText3, csvText4, csvText5]) => {

    // CSVを二次元配列化して格納
    stars = parseCSV(csvText1);
    stars.pop(-1);
    stars.concat(parseCSV(csvText2));
    console.log(stars);
    // stars.push(parseCSV(csvText3));
    // stars.push(parseCSV(csvText4));
    // stars.push(parseCSV(csvText5));

    universeInit();

  }).catch(error => console.error(error));
}


// ========================================


// ページ表示の準備が完了したら実行される
$(document).ready(function(){
  dataLoad();
});


// ========================================


// 初期化用関数
function universeInit(){

  // DOM要素を取得
  const canvasElement = document.querySelector('#universeCanvas');

  // ========================================

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(new THREE.Color(worldColor));

  // ========================================

  // // CSSレンダラーを作成
  // const cssrenderer = new CSS3DRenderer();
	// cssrenderer.setSize(width, height);
  // cssrenderer.antialias = true;
	// cssrenderer.domElement.style.position = 'absolute';
	// cssrenderer.domElement.style.top = 0;
	// cssrenderer.domElement.style.left = 0;
  // cssrenderer.domElement.setAttribute("id", "cssCanvas");
	// document.getElementById("viewer").prepend(cssrenderer.domElement);

  // ========================================

  // シーンを作成
  scene = new THREE.Scene();
  // scene2 = new THREE.Scene();

  // ========================================
  
  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 0, 0);
  scene.add(directionalLight);
  
  // ========================================

  // カメラを作成
  {
    // PerspectiveCamera(画角, アスペクト比＝縦横比, 描画開始距離, 描画終了距離);
    // TIPS: 描画開始距離を小さくしすぎると3Dワールドじたいの描画が不安定になりやすい
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    
    // カメラコントローラーを作成
    controls = new THREE.OrbitControls(camera, canvasElement);
    
    // 各種カメラ設定（詳細はscript_2dmap_const.jsを参照）
    controls.enableRotate = controlEnRotate;
    controls.enablePan = controlEnPan;
    controls.rotateSpeed = controlSpRotate;
    controls.zoomSpeed = controlSpZoom;
    controls.panSpeed = controlSpPan;
    controls.minPolarAngle = controlMinAngle;
    controls.maxPolarAngle = controlMaxAngle;
    controls.minDistance = minZoom;
    controls.maxDistance = maxZoom;
    controls.enableDamping = controlEnDamping;
    controls.dampingFactor = controlDampingFactor;
    
    // カメラの初期位置を設定
    camera.position.set(posInit[0], posInit[1], posInit[2]);
    controls.target.set(rotInit[0], rotInit[1], rotInit[2]);
  }

  // ========================================

  // グリッドヘルパーを追加
  if(enGrid){
    var gridHelper = new THREE.GridHelper(sphereRadius*2, sphereRadius*2, 0xff0000, 0xaaaaaa);
    scene.add(gridHelper);
  }
  
  // ========================================
  
  // 天球表示用の球面を作成
  const sphereGeometry = new THREE.SphereGeometry(sphereRadius, sphereSegment, sphereSegment);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(backgroundImgURL),
    side: THREE.DoubleSide
  });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0, 0, 0);
  sphere.rotation.set(0, 0, 0);
  sphere.name = "天球"
  scene.add(sphere);

  // ========================================
  
  // 天球上の星々を作成
  for(var i=0; i<stars.length-1; i++){
    const starGeometry = new THREE.SphereGeometry((starRadius)**4/(stars[i+1][7])**4, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({
      // map: new THREE.TextureLoader().load("URL"),
      color: "#ffffcc",
      side: THREE.DoubleSide
    });
    console.log("created");
    starObj.push(new THREE.Mesh(starGeometry, starMaterial));
    starObj[i].position.set(100*Math.sin(stars[i+1][1])*Math.cos(stars[i+1][3]), 100*Math.sin(stars[i+1][1])*Math.sin(stars[i+1][3]), 100*Math.cos(stars[i+1][1]));
    starObj[i].rotation.set(0, 0, 0);
    scene.add(starObj[i]);
  }

  // ========================================
  
  // // マップコンテンツ選択用ボタンのコンテナをCSS3DObjectから追加（DOM要素を3Dワールドに追加）
  // var cssobj = document.getElementById("mapContentBtnContainer");
  // var css3Dobj = new CSS3DObject(cssobj);
  // scene2.add(css3Dobj);
  // css3Dobj.rotation.set(0, 0, 0);
  // css3Dobj.position.set(0, 0, 0);
  // css3Dobj.updateMatrixWorld();

  // ========================================

  // raycasterを使用してマウスカーソルとの交差オブジェクトを取得
  // canvas 要素の参照を取得する
  const canvas = document.querySelector('#universeCanvas');
  // マウス座標管理用のベクトルを作成
  const mouse = new THREE.Vector2();
  // マウスイベントを登録
  canvas.addEventListener('mousemove', handleMouseMove);

  // マウスを動かしたときのイベント
  function handleMouseMove(event) {
    const element = event.currentTarget;
    // canvas要素上のXY座標
    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
    // canvas要素の幅・高さ
    const w = element.offsetWidth;
    const h = element.offsetHeight;

    // -1〜+1の範囲で現在のマウス座標を登録する
    mouse.x = ( x / w ) * 2 - 1;
    mouse.y = -( y / h ) * 2 + 1;
  }
  
  // レイキャストを作成
  const raycaster = new THREE.Raycaster();
  
  // ========================================
  
  var count = 0;
  // 毎フレーム時に実行されるループイベント
  const tick = () => {


    // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
    raycaster.setFromCamera(mouse, camera);

    // その光線とぶつかったオブジェクトを得る
    const intersects = raycaster.intersectObjects(scene.children);

    if(intersects.length > 0){
      if(intersects[0].object.name != "天球"){
        console.log(intersects[0].object);
      }
    }

    count = (count+1)%(60/fps);
    
    if(count == 0){
      controls.update();

      // レンダリング
      renderer.render(scene, camera);
      // cssrenderer.render(scene2, camera);
    }

    requestAnimationFrame(tick);
 
    var azimuthalAngle = controls.getAzimuthalAngle(); // 水平角度（ラジアン）
    var polarAngle = controls.getPolarAngle();         // 垂直角度（ラジアン）
    // 角度を度数に変換
    var azimuthalDeg = THREE.Math.radToDeg(azimuthalAngle);
    var polarDeg = THREE.Math.radToDeg(polarAngle);

    $("#angleMeterHorizontal>div").css("transform", "translateX(" + String(azimuthalDeg + 22.5) + "rem)")
    $("#angleMeterVertical>div").css("transform", "translateY(" + String(polarDeg + 127.5) + "rem)")
  }

  tick();

  // ========================================

  // リサイズの処理
  onResize();

  // リサイズを反映するようにイベントリスナを追加
  window.addEventListener('resize', onResize);

  // ウィンドウリサイズ時に実行する関数
  function onResize() {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight - headerHeight;

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    // cssrenderer.setSize(width, height);

    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}


// ========================================