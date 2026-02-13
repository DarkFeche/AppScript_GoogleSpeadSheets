/* ACÁ VOY A COLOCAR FUNCIONES QUE YA NO ESTÁN OPERANDO. Serían funciones que debería borrar aunque a título de registro me sirve tenerlas. 

function macronueva() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A2:L2').activate();
  spreadsheet.getRange('A2:L2').deleteCells(SpreadsheetApp.Dimension.ROWS);
};

function Historialtrading() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Historial de Trading'), true);
  spreadsheet.getRange('a2:e2').insertCells(SpreadsheetApp.Dimension.ROWS);
  spreadsheet.getRange('tenencianeta').copyTo(spreadsheet.getRange('B2'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('tenencianetadesc').copyTo(spreadsheet.getRange('C2'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('A2').activate();
  var date = new Date();
  //date.setHours(0, 0, 0, 0);
  spreadsheet.getActiveRangeList().setValue(date);
  spreadsheet.getRange('D3:E3').copyTo(spreadsheet.getRange('D2:E2'), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
};

function refresh() {
var spreadsheet = SpreadsheetApp.getActive();
spreadsheet.setActiveSheet(spreadsheet.getSheetByName('/'), true);
spreadsheet.getRange('cer').copyTo(spreadsheet.getRange('cer'), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
spreadsheet.getRange('http').setValue('http')
.setValue('https')

}

function Historialtotales() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Historial de Totales'), true);
  spreadsheet.getRange('A2:e2').insertCells(SpreadsheetApp.Dimension.ROWS);
  spreadsheet.getRange('registrototalusd').copyTo(spreadsheet.getRange('b2'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('registrototalars').copyTo(spreadsheet.getRange('c2'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('A2').activate();
  var date = new Date();
      //date.setHours(0, 0, 0, 0);
  spreadsheet.getActiveRangeList().setValue(date);
  spreadsheet.getRange('d3:e3').copyTo(spreadsheet.getRange('d2:e2'), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
      
};



*/
