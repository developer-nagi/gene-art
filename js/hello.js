window.onload = async () => {
  const artCanvas = document.querySelector("#artAreaCanvas");
  const bufferCanvas = document.createElement("canvas");
  artCanvas.width = window.innerWidth;
  artCanvas.height = window.innerHeight;
  bufferCanvas.width = artCanvas.width;
  bufferCanvas.height = artCanvas.height;

  let frameCount = 0; // FPSカウント
  let fpsTimer = 0; // FPS計測用タイマー
  let fps = 0; // FPS
  let showFps = true; // FPS表示フラグ

  // FPS描画処理
  const fpsDraw = (canvas, ctx) => {
    frameCount++;
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width - 130, 0, canvas.width, 40);
    ctx.textAlign = "end";
    ctx.fillStyle = "green";
    ctx.font = "bold 30px MS Gothic";
    if (fpsTimer < Date.now()) {
      fpsTimer = Date.now() + 1000;
      fps = frameCount;
      frameCount = 0;
    }
    ctx.fillText(fps + "fps", canvas.width - 30, 30);
  };

  // キーボードが押されたときの処理
  document.onkeydown = async (e) => {
    switch (e.key) {
      case "f":
        showFps = !showFps;
        break;
    }
  };

  // Main描画処理
  let ox = 0,
    oy = 0,
    mx = 0,
    my = 0,
    toggleX = 1,
    toggleY = 1;

  const mainDraw = (canvas, ctx) => {
    const strA = "Hello World!";

    ctx.textAlign = "center";
    ctx.font = "bold 80px Helvetica";
    ctx.fillStyle = "white";
    ctx.fillText(strA, canvas.width / 2 + 2, canvas.height / 2 + 2);
    ctx.fillText(strA, canvas.width / 2 - 2, canvas.height / 2 - 2);
    ctx.fillText(strA, canvas.width / 2 - 2, canvas.height / 2 + 2);
    ctx.fillText(strA, canvas.width / 2 + 2, canvas.height / 2 - 2);
    ctx.fillStyle = "black";
    ctx.fillText(strA, canvas.width / 2, canvas.height / 2);

    const r = Math.floor(Math.random() * (255 - 150)) + 150;
    const g = Math.floor(Math.random() * (255 - 150)) + 150;
    const b = Math.floor(Math.random() * (255 - 150)) + 150;
    ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.beginPath();
    ctx.arc(mx, my, 10, 0, 2 * Math.PI);
    // ctx.moveTo(ox, oy);
    // ctx.lineTo(mx, my);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();

    const strB = strA.replace(/[! ]/g, "");
    ctx.fillStyle = `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
    ctx.font = "bold 15px MS Gothic";
    ctx.fillText(
      strB.split("")[Math.floor(Math.random() * strB.length)],
      mx,
      my + 5
    );

    ox = mx;
    oy = my;

    mx += 20 * toggleX;
    if (mx > canvas.width || mx < 0) {
      my += 20 * toggleY;
      toggleX *= -1;
    }
    if (my > canvas.height) {
      toggleY = -1;
    }
    if (my < 0) {
      toggleY = 1;
    }
  };

  // キャンバスのコンテキスト
  const frontCtx = artCanvas.getContext("2d");
  const bufferCtx = bufferCanvas.getContext("2d");

  // メインの描画処理
  const view = async () => {
    frontCtx.fillStyle = "white";
    frontCtx.fillRect(0, 0, artCanvas.width, artCanvas.height);

    // Main描画
    mainDraw(bufferCanvas, bufferCtx);

    // フロントキャンバスにコピー
    frontCtx.drawImage(
      bufferCanvas,
      0,
      0,
      bufferCanvas.width,
      bufferCanvas.height
    );

    // FPS描画
    if (showFps) {
      fpsDraw(artCanvas, frontCtx);
    }

    // 再帰処理
    requestAnimationFrame(view);
  };

  // メイン描画処理開始
  requestAnimationFrame(view);
};
