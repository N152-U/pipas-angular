import { Injectable } from "@angular/core";
import { Workbook } from "exceljs";
import * as fs from "file-saver";
import * as logoFile from "./sacmex_logo.js";
import { DatePipe } from "@angular/common";
import { forEach } from "jszip";

@Injectable({
  providedIn: "root",
})
export class ExcelService {
  constructor() {}

  generateExcel(filename: string = "sample", sheets: any) {
    console.log(filename);
    let title = filename;
    switch (filename) {
      
      default:
        //Excel Title
        console.log(sheets);
        if (sheets != null) {
          //Create workbook and worksheet
          let workbook = new Workbook();
          for (let sheet of sheets) {
           /*  console.log(sheet);
            console.log(sheets); */
            //Excel Headers, Data
            let header = sheet.headers;
            
            let dataTrips = sheet.dataTrips;
             let headersSettlements = sheet.headersSettlements;
let dataSettlements = sheet.dataSettlements;
            let worksheet = workbook.addWorksheet(sheet.name);
            //Add Row and formatting
            let titleRow = worksheet.addRow([
              "Sistema de Aguas de la Ciudad de México",
            ]);
            titleRow.font = {
              name: "Comic Sans MS",
              family: 4,
              size: 16,
              underline: "double",
              bold: true,
            };
            worksheet.addRow([]);
            let subTitleRow = worksheet.addRow(["Fecha : " + new Date().toLocaleString()]);
            //Add Image
            let logo = workbook.addImage({
              base64: logoFile.logoBase64,
              extension: "png",
            });
            worksheet.addImage(logo, "E1:I3");
            worksheet.mergeCells("A1:D2");
            //Blank Row
            worksheet.addRow([]);
            //Add Header Row
            let headerRow = worksheet.addRow(header);

            // Cell Style : Fill and Border
            let startFilters;
            let endFilters;
            headerRow.eachCell((cell, number) => {
              console.log(cell);
              console.log(number);
              if (number == 1) {
                startFilters = cell;
              }
              if (header.length == number) {
                endFilters = cell;
              }
              cell.font = {
                color: { argb: "FFFFFFFF" },
              };
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "00000000" },
                bgColor: { argb: "FFFFFFFF" },
              };
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
            });

            //console.log(headerRow);
            //Auto Filtros para encabezados
            worksheet.autoFilter = {
              from: startFilters._address,
              to: {
                row: startFilters._row._number,
                column: endFilters._column._number,
              },
            };

            

            // worksheet.addRows(dataTrips);
            // Add Data and Conditional Formatting
            dataTrips.forEach((d) => {
              console.log("data_excel",d)
              let row = worksheet.addRow(d);
         
            });

           
            worksheet.getColumn(3).width = 30;
            worksheet.getColumn(4).width = 30;
            worksheet.addRow([]);

             worksheet.addRow(headersSettlements);
            console.log("settlements",dataSettlements )
            dataSettlements.forEach((d) => {
              console.log("data_excel",d)
              let row = worksheet.addRow(d);
         
            });


      

            //Generate Excel File with given name
          }
          workbook.xlsx.writeBuffer().then((dataTrips) => {
            let blob = new Blob([dataTrips], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            fs.saveAs(blob, `${title}.xlsx`);
          });
        }

        break;
    }
  }
}