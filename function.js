window.addEventListener("keypress", onKeyPress);

var originForm = document.getElementById("originPath");
var windows = document.getElementById("windows");
var mac = document.getElementById("mac");

originForm.addEventListener("input", createPath);
windows.addEventListener("click", copyValue);
mac.addEventListener("click", copyValue);

function onKeyPress(e) {
  if (e.keyCode == "13") {
    createPath();
  }
}

function createPath() {
  var originPath = document.getElementById("originPath").value;
  var windowsPath = originPath.replace("smb://", "\\\\").replace(/\//g, "\\");
  var macPath = originPath.replace("\\\\", "smb://").replace(/\\/g, "/");
  document.getElementById("windows").value = windowsPath;
  document.getElementById("mac").value = macPath;
}

function copyValue(event) {
  var value = event.target.value;
  if (copyTextToClipboard(value)) {
    console.log("copyしたがね");
  } else {
    console.log("copyできん");
  }
}

function copyTextToClipboard(textVal) {
  // テキストエリアを用意する
  var copyFrom = document.createElement("textarea");
  // テキストエリアへ値をセット
  copyFrom.textContent = textVal;

  // bodyタグの要素を取得
  var bodyElm = document.getElementsByTagName("body")[0];
  // 子要素にテキストエリアを配置
  bodyElm.appendChild(copyFrom);

  // テキストエリアの値を選択
  copyFrom.select();
  // コピーコマンド発行
  var retVal = document.execCommand("copy");
  // 追加テキストエリアを削除
  bodyElm.removeChild(copyFrom);
  // 処理結果を返却
  return retVal;
}
