window.onload = async () => {
  // キャンバスの要素
  const artCanvas = document.createElement("canvas");
  const frontCanvas = document.querySelector("#artAreaCanvas");

  // キャンバスのサイズ設定
  artCanvas.width = frontCanvas.width;
  artCanvas.height = frontCanvas.height;

  // 共通変数の初期化
  let frameCount = 0; // FPSカウント
  let fpsTimer = 0; // FPS計測用タイマー
  let fps = 0; // FPS
  let showFps = false; // FPS表示フラグ

  // キーボードが押されたときの処理
  document.onkeydown = (e) => {
    switch (e.key) {
      case "f":
        showFps = !showFps;
        break;
      case "s":
        // メイン描画処理開始
        requestAnimationFrame(view);
        break;
    }
  };

  // 素数判定
  const isPrime = (inputNumber) => {
    if (inputNumber < 2) {
      return false;
    }
    for (let i = 2; i < inputNumber; i++) {
      if (inputNumber % i === 0) {
        return false;
      }
    }
    return true;
  };

  // FPS描画処理
  const fpsDraw = (canvas, ctx) => {
    frameCount++;
    ctx.fillStyle = "white";
    ctx.fillRect(canvas.width - 100, 0, canvas.width, 40);
    ctx.textAlign = "end";
    ctx.fillStyle = "green";
    ctx.font = "bold 30px MS Gothic";
    if (fpsTimer < Date.now()) {
      fpsTimer = Date.now() + 1000;
      fps = frameCount;
      frameCount = 0;
    }
    ctx.fillText(fps + "fps", canvas.width, 30);
  };

  // テキスト描画処理
  const drawText = (ctx, text, x, y, size, color) => {
    ctx.textAlign = "center";
    ctx.font = `bold ${size}px MS Gothic`;
    ctx.fillStyle = "lightgray";
    ctx.fillText(text, x + 2, y + 2);
    ctx.fillText(text, x + 2, y - 2);
    ctx.fillText(text, x - 2, y - 2);
    ctx.fillText(text, x - 2, y + 2);
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  };

  // Main描画処理
  let ox = 0,
    oy = 0;
  const mainDraw = (canvas, ctx) => {
    let rgb = 0;
    while (!isPrime(rgb)) {
      rgb = Math.floor(Math.random() * 16581375);
    }

    ctx.strokeStyle = `#${Number(rgb).toString(16)}`;

    let x = 0,
      y = 0;
    while (!isPrime(x) || !isPrime(y)) {
      x = Math.floor(Math.random() * canvas.width);
      y = Math.floor(Math.random() * canvas.height);
    }
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(x, y);
    ctx.stroke();

    ox = x;
    oy = y;

    drawText(
      ctx,
      "Prime Number",
      canvas.width / 2,
      canvas.height / 2,
      70,
      "black"
    );
    drawText(
      ctx,
      "Connect the coordinates of prime numbers and the colors of prime numbers with a line.",
      canvas.width / 2,
      canvas.height / 2 + 30,
      20,
      "black"
    );
    drawText(
      ctx,
      "The source number to be used is random.",
      canvas.width / 2,
      canvas.height / 2 + 60,
      20,
      "black"
    );
  };

  // キャンバスのコンテキスト
  const bctx = artCanvas.getContext("2d");
  const fctx = frontCanvas.getContext("2d");

  bctx.fillStyle = "black";
  bctx.fillRect(0, 0, artCanvas.width, artCanvas.height);

  // メインの描画処理
  const view = async () => {
    /** メインコンテンツの描画 */
    // Main描画
    mainDraw(artCanvas, bctx);

    // フロントキャンバスにコピー
    fctx.drawImage(artCanvas, 0, 0, artCanvas.width, artCanvas.height);

    /** サブコンテンツの描画 */
    // FPS描画
    if (showFps) {
      fpsDraw(frontCanvas, fctx);
    }

    // 再帰処理
    requestAnimationFrame(view);
  };
};
