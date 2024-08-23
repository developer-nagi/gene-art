window.onload = async () => {
  const artCanvas = document.querySelector("#artAreaCanvas");

  let frameCount = 0; // FPSカウント
  let fpsTimer = 0; // FPS計測用タイマー
  let fps = 0; // FPS

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

  // Main描画処理
  const mainDraw = (canvas, ctx) => {
    ctx.textAlign = "center";
    ctx.font = "bold 80px MS Gothic";

    const strA = "Hello World";

    ctx.fillStyle = "white";
    ctx.fillText(strA, canvas.width / 2 + 1, canvas.height / 2 + 1);
    ctx.fillText(strA, canvas.width / 2 - 1, canvas.height / 2 - 1);
    ctx.fillStyle = "black";
    ctx.fillText(strA, canvas.width / 2, canvas.height / 2);

    ctx.fillStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;
    ctx.font = "bold 30px MS Gothic";
    ctx.fillText(
      strA.split("")[Math.floor(Math.random() * strA.length)],
      Math.random() * canvas.width,
      Math.random() * canvas.height
    );
  };

  // キャンバスのコンテキスト
  const ctx = artCanvas.getContext("2d");

  artCanvas.style.backgroundColor = "white";

  // メインの描画処理
  const view = async () => {
    // 描画の初期化
    // ctx.textAlign = "start";
    // ctx.fillStyle = "white";
    // ctx.fillRect(0, 0, artCanvas.width, artCanvas.height);

    // Main描画
    mainDraw(artCanvas, ctx);

    // FPS描画
    // fpsDraw(artCanvas, ctx);

    // 再帰処理
    requestAnimationFrame(view);
  };

  // メイン描画処理開始
  requestAnimationFrame(view);
};
