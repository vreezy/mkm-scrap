const excel = require('excel4node');

export const getExcel = (arr: string[][]) => {
    // Create a new instance of a Workbook class
    var workbook = new excel.Workbook();

    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Sheet 1');
    // var worksheet2 = workbook.addWorksheet('Sheet 2');

    // Create a reusable style
    var style = workbook.createStyle({
    font: {
        color: '#000000',
        size: 12
    },
    
    numberFormat: ' 0.00 €;-0.00 €'
    });

    var styleInt = workbook.createStyle({
    font: {
        color: '#000000',
        size: 12
    },
    numberFormat: '#'
    });
    

    arr.forEach((row, rindex) => {
    row.forEach((cell, cindex) => {
        if(rindex === 0) {
            worksheet.cell(rindex + 1, cindex + 1).string(cell).style(style);
        }
        else {
            if(cindex === 0 || cindex === 2 || cindex === 3) {
                worksheet.cell(rindex + 1, cindex + 1).string(cell).style(style);
            }
            else if (cindex === 1 || cindex === 4) {
                worksheet.cell(rindex + 1, cindex + 1).number(parseInt(cell)).style(styleInt);
            }
            else {
                const cellFloat = parseFloat(cell.replace(",", ".").replace(/[^0-9.]/g, ''))
                worksheet.cell(rindex + 1, cindex + 1).number(cellFloat).style(style);
            }
        }

    })
    })
    // // Set value of cell A1 to 100 as a number type styled with paramaters of style
    // worksheet.cell(1,1).number(100).style(style);

    // // Set value of cell B1 to 300 as a number type styled with paramaters of style
    // worksheet.cell(1,2).number(200).style(style);

    // // Set value of cell C1 to a formula styled with paramaters of style
    // worksheet.cell(1,3).formula('A1 + B1').style(style);

    // // Set value of cell A2 to 'string' styled with paramaters of style
    // worksheet.cell(2,1).string('string').style(style);

    // // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
    // worksheet.cell(3,1).bool(true).style(style).style({font: {size: 14}});

    workbook.write('Excel.xlsx');
}