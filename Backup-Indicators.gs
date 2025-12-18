function variaciondiariaindicadores() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Indicadores'), true);
  spreadsheet.getRange('a2:j2').insertCells(SpreadsheetApp.Dimension.ROWS);
  spreadsheet.getRange('indices').copyTo(spreadsheet.getRange('B2'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('eurodolar').copyTo(spreadsheet.getRange('F2'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('dolareuro').copyTo(spreadsheet.getRange('G2'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('A2').activate();
  var date = new Date();
  //date.setHours(0, 0, 0, 0);
  spreadsheet.getActiveRangeList().setValue(date);
};
