import ExcelJS from 'exceljs';

export const getExcel = async (arr: (string|number)[][]): Promise<boolean> => {
   console.log("Starting Excel Work...");
   const workbook = new ExcelJS.Workbook();

   const worksheet = workbook.addWorksheet('Cards');

   worksheet.columns = [
      { header: 'Url', key: 'url', width: 20 },
      { header: 'Verfügbare Artikel', key: 'articel', width: 16 },
      { header: 'ab', key: 'price', width: 5 },
      { header: 'Preis-Trend', key: 'pricetrend', width: 10 },
      { header: '30-Tages-Durchschnitt', key: 'thirtydayavg', width: 10 },
      { header: '7-Tages-Durchschnitt', key: 'sevendayavg', width: 10 },
      { header: '1-Tages-Durchschnitt', key: '1dayavg', width: 10 },
      { header: '1.', key: 'u1', width: 5 },
      { header: '2.', key: 'u2', width: 5 },
      { header: '3.', key: 'u3', width: 5 },
      { header: '4.', key: 'u4', width: 5 },
      { header: '5.', key: 'u5', width: 5 },
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