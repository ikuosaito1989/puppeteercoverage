const puppeteer = require("puppeteer");
const ptoi = require("puppeteer-to-istanbul");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // カバレッジ収集を開始
  await page.coverage.startCSSCoverage({
    // ページ遷移のたびにカバレッジがリセットされるのを防ぐ
    resetOnNavigation: false
  });

  await page.goto("https://platform.stg.classi.jp/");
  // スクリーンショット
  await page.screenshot({ path: "screenshot.png" });

  // カバレッジ収集を終了
  // startCSSCoverageからstopCSSCoverageまでの間に収集したカバレッジを返す
  const coverage = await page.coverage.stopCSSCoverage();

  // カバレッジをistanbul形式に変換＆.nyc_output以下に出力
  ptoi.write(coverage);

  await browser.close();
})();
