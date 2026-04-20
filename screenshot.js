const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 420, height: 900 });

  const filePath = 'file://' + path.resolve('./aramil_weather.html');
  await page.goto(filePath, { waitUntil: 'networkidle2' });

  // Ждём пока появится хотя бы одна карточка с прогнозом
  await page.waitForSelector('.day-card', { timeout: 15000 });

  // Небольшая пауза чтобы всё отрисовалось
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: 'weather.jpg',
    type: 'jpeg',
    quality: 90,
    fullPage: true
  });

  await browser.close();
  console.log('Готово: weather.jpg');
})();
