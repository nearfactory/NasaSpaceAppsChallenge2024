// ========================================


// ページのヘッダー高さ/横幅/縦幅
const headerHeight = 70;
const width = window.innerWidth;
const height = window.innerHeight - headerHeight;


// ========================================


// マップのアイコンのデータ格納CSVファイルのパス
const dataCSV = "./asset/csv/data1.csv";


// ========================================


// カメラ操作の有効化切り替え
const controlEnRotate = true;
const controlEnPan = false;

// カメラ操作の各スピード
const controlSpRotate = -0.075;
const controlSpZoom = 1;
const controlSpPan = 1;

// カメラの仰角の最大値/最小値
// 仰角＝カメラの視線の線と地球を南北に貫く軸の角度の大きさ
const controlMinAngle = Math.PI / 180 * 0;
const controlMaxAngle = Math.PI / 180 * 180;

// カメラの最大距離/最小距離
const controlMinDistance = 3;
const controlMaxDistance = 9;

// カメラの滑らかな動きの有効化切り替え
const controlEnDamping = true;

// カメラの滑らかな動きの係数
const controlDampingFactor = 0.25;

// カメラのズームの最大値/最小値
const minZoom = 0.001;
const maxZoom = 100;

// カメラの初期位置
posInit = [0, 0, 0];
rotInit = [1, 0, 0];

// グリッドの有効化
const enGrid = false;


// ========================================


// 3Dワールドの設定
const worldColor = 0xffffff;

// 天球の半径
const sphereRadius = 100;

// 天球のセグメント数
const sphereSegment = 64

// 天球の背景画像パス 
var backgroundImgURL = "./asset/image/test1.jpg";


// ========================================


// 画面FPS（≦60）
const fps = 60;


// ========================================