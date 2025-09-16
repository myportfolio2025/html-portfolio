const imagePaths = [
  "assets/images/画像1.png",
  "assets/images/画像2.png",
  "assets/images/画像3.png",
  "assets/images/画像4.png"
];

const img = document.getElementById("slide-image");

function showImage(index) {
  return new Promise((resolve) => {
    // 画像を先にセット
    img.src = imagePaths[index];
    img.style.opacity = "0";
    img.style.left = "100%";
    img.style.transform = "translateY(-50%)";

    // 最初の画像だけ3秒待機、それ以降は1.5秒
    const delay = index === 0 ? 3000 : 1500;

    setTimeout(() => {
      img.style.opacity = "1";

      // 中央に移動（1秒後）
      setTimeout(() => {
        img.style.left = "50%";
        img.style.transform = "translate(-50%, -50%)";
      }, 1000);

      // 左側へ移動（2秒後）
      setTimeout(() => {
        img.style.left = "0%";
        img.style.transform = "translate(0%, -50%)";
      }, 2000);

      // 表示終了（3秒後）
      setTimeout(() => {
        resolve();
      }, 3000);
    }, delay);
  });
}

async function startAnimation() {
  while (true) {
    for (let i = 0; i < imagePaths.length; i++) {
      await showImage(i); // アニメーション実行
      img.style.opacity = "0"; // 非表示
      await new Promise(resolve => setTimeout(resolve, 500)); // 休憩
    }

    // 全ての画像表示後、2秒何も表示しない
    img.style.opacity = "0";
    img.style.left = "100%";
    img.style.transform = "translateY(-50%)";
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

window.onload = () => {
  startAnimation();
};
