const playwright = require('playwright');
import { getExcel } from './modules/getExcel';

const urls = [
   "https://www.cardmarket.com/de/Magic/Products/Singles/Time-Spiral-Remastered/Ancestral-Vision",
   "https://www.cardmarket.com/de/Magic/Products/Singles/War-of-the-Spark/Finale-of-Promise",
   "https://www.cardmarket.com/de/Magic/Products/Singles/Strixhaven-School-of-Mages/Sedgemoor-Witch"
];

(async () => {
   const arr: string[][] = [];
   const header: string[] = [
      "url",
      "Karten Nummer",
      "Edition",
      "Blödsinn",
      "Verfügbare Artikel",
      "ab",
      "Preis-Trend",
      "30-Tages-Durchschnitt",
      "7-Tages-Durchschnitt",
      "1-Tages-Durchschnitt"
   ];
   
   arr.push(header);

   for (const url of urls) {
      const browser = await playwright['chromium'].launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(url);
      
      //const content = await page.content();
      const dds = await page.$$('dd');

      const resolvedDds = [];
      for (const dd of dds) {
         resolvedDds.push(await dd.textContent());
      }

      resolvedDds[0] = url
      arr.push(resolvedDds);

      await browser.close();
   }

   getExcel(arr);

})();