const playwright = require('playwright');
import { getExcel } from './modules/getExcel';

const urls = [
   "https://www.cardmarket.com/de/Magic/Products/Singles/Judge-Rewards-Promos/Demonic-Tutor-V-2?sellerCountry=7&language=1,3&isFoil=Y",
   "https://www.cardmarket.com/de/Magic/Products/Singles/Judge-Rewards-Promos/Demonic-Tutor-V-2?language=1",
   "https://www.cardmarket.com/de/Magic/Products/Singles/Judge-Rewards-Promos/Elesh-Norn-Grand-Cenobite?sellerCountry=7&language=1,3&isFoil=Y",
   "https://www.cardmarket.com/de/Magic/Products/Singles/Double-Masters-Extras/Mana-Crypt?sellerCountry=7&language=1&isFoil=Y",
   "https://www.cardmarket.com/de/Magic/Products/Singles/WCD-2000-Jon-Finkel/Grim-Monolith?sellerCountry=7&language=1&minCondition=2",
   "https://www.cardmarket.com/de/Magic/Products/Singles/Mystery-Booster/Lotus-Petal?sellerCountry=7&language=1&minCondition=2",
   "https://www.cardmarket.com/de/Magic/Products/Singles/Double-Masters/Force-of-Will?sellerCountry=7&language=1&isFoil=Y",
   "https://www.cardmarket.com/de/Magic/Products/Singles/WCD-2000-Jon-Finkel/Metalworker?sellerCountry=7&language=1&minCondition=2",
   "https://www.cardmarket.com/de/Magic/Products/Singles/Commander-Legends/Mana-Drain?sellerCountry=7&language=3&minCondition=2&isFoil=Y",
   "https://www.cardmarket.com/de/Magic/Products/Singles/Commander-Legends-Extras/Mana-Drain?sellerCountry=7&language=3&minCondition=2&isFoil=Y",
   "https://www.cardmarket.com/de/Magic/Products/Singles/Commander-Legends-Extras/Hullbreacher?sellerCountry=7&language=3&isFoil=Y",
   "https://www.cardmarket.com/de/Magic/Products/Singles/Eternal-Masters/Mana-Crypt?sellerCountry=7&language=1&isFoil=Y",
   "https://www.cardmarket.com/de/Magic/Products/Singles/Kaldheim-Extras/Birgi-God-of-Storytelling-Harnfel-Horn-of-Bounty?language=1,3&isFoil=Y"
];

(async () => {
   const arr: (string|number)[][] = [];

   for (const url of urls) {
      console.log("Scrap Url: " + url)
      try {
         const browser = await playwright['chromium'].launch();
         const context = await browser.newContext();
         const page = await context.newPage();
         await page.goto(url);
         
         const row = [];
         row[0] = url;

         const dts = await page.$$('dt');
         const dds = await page.$$('dd');

         for (var i = 0; i < dts.length; i++) {
            var dt = await dts[i].textContent();
            var dd = await dds[i].textContent();

            switch(dt) {
               case "1-Tages-Durchschnitt":
                  row[6] = parseFloat(dd.replace(",", ".").replace(/[^0-9.]/g, ''));
                  break;
               case "7-Tages-Durchschnitt":
                  row[5] = parseFloat(dd.replace(",", ".").replace(/[^0-9.]/g, ''));
                  break;
               case "30-Tages-Durchschnitt":
                  row[4] = parseFloat(dd.replace(",", ".").replace(/[^0-9.]/g, ''));
                  break;
               case "Preis-Trend":
                  row[3] = parseFloat(dd.replace(",", ".").replace(/[^0-9.]/g, ''));
                  break;
               case "ab":
                  row[2] = parseFloat(dd.replace(",", ".").replace(/[^0-9.]/g, ''));
                  break;
               case "Verfügbare Artikel":
                  row[1] = parseInt(dd);
                  break;
            }
         }

         const pcs = await page.$$('div.price-container');

         var pcsLength: number = pcs.length < 5 ? pcs.length : 5;
         for (var j: number = 0; j < pcsLength; j++) {
            var pc = await pcs[j].textContent();
            row[7 + j] = parseFloat(pc.replace(",", ".").replace(/[^0-9.]/g, ''));
         }

         arr.push(row);

         await browser.close();
      }
      catch(e) {
         console.error("Could not scrap: " + url);
         continue;
      }      
   }

   const excel = await getExcel(arr);
   console.log("Finished!");

})();