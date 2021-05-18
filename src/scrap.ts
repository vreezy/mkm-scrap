const playwright = require('playwright');
import { URLSearchParams } from 'url';
import { getExcel } from './modules/getExcel';
import { urls } from './urls';
import { mkmlanguages } from './modules/mkmlanguages';


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

         const h1s = await page.$$('h1');
         const title = await h1s[0]?.innerText() || "unknown";
         row[0] = title.split("\n")[0];

         const urlParams = new URLSearchParams(url.split("?")[1]);
         if(urlParams.has('language')) {
            var mkmCodes = urlParams.get('language')?.split(',') || [];
            row[1] = mkmCodes.map(c => {
               return mkmlanguages.find(x => x.code === c)?.lang || "??"
            }).join(',');    
         }

         if(urlParams.has('isFoil') && urlParams.get('isFoil') === "Y") {
            row[2] = "x";
         }

         const dts = await page.$$('dt');
         const dds = await page.$$('dd');

         for (var i = 0; i < dts.length; i++) {
            var dt = await dts[i].textContent();
            var dd = await dds[i].textContent();

            switch(dt) {
               case "Verfügbare Artikel":
                  row[3] = parseInt(dd);
                  break;
               case "ab":
                  row[4] = parseFloat(dd.replace(",", ".").replace(/[^0-9.]/g, ''));
                  break;
               case "Preis-Trend":
                  row[5] = parseFloat(dd.replace(",", ".").replace(/[^0-9.]/g, ''));
                  break;
               case "1-Tages-Durchschnitt":
                  row[6] = parseFloat(dd.replace(",", ".").replace(/[^0-9.]/g, ''));
                  break;
               case "7-Tages-Durchschnitt":
                  row[7] = parseFloat(dd.replace(",", ".").replace(/[^0-9.]/g, ''));
                  break;
               case "30-Tages-Durchschnitt":
                  row[8] = parseFloat(dd.replace(",", ".").replace(/[^0-9.]/g, ''));
                  break;
            }
         }

         const pcs = await page.$$('div.price-container');

         var pcsLength: number = pcs.length < 5 ? pcs.length : 5;
         for (var j: number = 0; j < pcsLength; j++) {
            var pc = await pcs[j].textContent();
            row[9 + j] = parseFloat(pc.replace(",", ".").replace(/[^0-9.]/g, ''));
         }


         row[14] = url;

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