import ExcelJS from 'exceljs';

export const getExcel = async (arr: (string|number)[][]): Promise<boolean> => {
   console.log("Starting Excel Work...");
   const workbook = new ExcelJS.Workbook();

   const worksheet = workbook.addWorksheet('Cards');

   worksheet.columns = [
      { header: 'Name', key: 'name', width: 50 },
      { header: 'Sprache', key: 'language', width: 8 },
      { header: 'Foil', key: 'foil', width: 4 },
      { header: 'Verfügbare Artikel', key: 'articel', width: 16 },
      { header: 'ab', key: 'price', width: 5 },
      { header: 'Preis-Trend', key: 'pricetrend', width: 10 },
      { header: '1-Tages-Durchschnitt', key: '1dayavg', width: 10 },
      { header: '7-Tages-Durchschnitt', key: 'sevendayavg', width: 10 },
      { header: '30-Tages-Durchschnitt', key: 'thirtydayavg', width: 10 },
      { header: '1. Angebot', key: 'u1', width: 10 },
      { header: '2. Angebot', key: 'u2', width: 10 },
      { header: '3. Angebot', key: 'u3', width: 10 },
      { header: '4. Angebot', key: 'u4', width: 10 },
      { header: '5. Angebot', key: 'u5', width: 10 },
      { header: 'Url', key: 'url', width: 100 },
   ];
  
   arr.forEach((row, rindex: number) => {
      worksheet.addRow(row);
   });

   try {
      await workbook.xlsx.writeFile("excel.xlsx");
      return Promise.resolve(true);
   }
   catch (e) {
      console.log(e)
   }
   return Promise.resolve(false)
}