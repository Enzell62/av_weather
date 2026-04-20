const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
    // headless: true — по умолчанию
  });

  const page = await browser.newPage();

  // Мобильный размер (как у нас страница)
  await page.setViewport({ width: 420, height: 900 });

  // Загружаем локальный HTML файл
  const filePath = 'file://' + path.resolve('./aramil_weather.html');
  await page.goto(filePath, { waitUntil: 'networkidle2' });

  // Скриншот всей страницы
  await page.screenshot({
    path: 'weather.jpg',
    type: 'jpeg',
    quality: 90,
    fullPage: true
  });

  await browser.close();
  console.log('Готово: weather.jpg');
})();
