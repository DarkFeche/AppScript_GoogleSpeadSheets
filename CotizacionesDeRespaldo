//ÉSTA FUNCIÓN ES DE LOS PRECIOS DE BACKUP DE VALORES IMPORTADOS. ASÍ CUANDO FALLA PUEDO CARGAR OTRA CELDA EN DOS OCASIONES. EVITANDO UN MENSAJE DE ERROR AL HACER MIS REGISTROS Y/O TENER NÚMEROS VACIOS. 
//Resumen 2.0 - Copia y pega los valores de las celdas de cada cotización actual a una al lado para en caso de falla la formula toma el valor de la celda copiada. 

function Preciosderescate() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('/'), true);
  spreadsheet.getRange('preciosrescate').copyTo(spreadsheet.getRange('preciosrescate48hs'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('Precioscriptos').copyTo(spreadsheet.getRange('preciosrescate'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('dolareuro').copyTo(spreadsheet.getRange('dolareurorescate'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('eurodolar').copyTo(spreadsheet.getRange('eurodolarrescate'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('A2').activate();
};
