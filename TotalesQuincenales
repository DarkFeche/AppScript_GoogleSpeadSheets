function Totalesquincenales() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Totales quincenales'), true);
  spreadsheet.getRange('A2:e2').insertCells(SpreadsheetApp.Dimension.ROWS);
  spreadsheet.getRange('registrototaleu').copyTo(spreadsheet.getRange('b2'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('registrototalars').copyTo(spreadsheet.getRange('c2'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('A2').activate();
  var date = new Date();
      //date.setHours(0, 0, 0, 0);
  spreadsheet.getActiveRangeList().setValue(date);
  spreadsheet.getRange('d3:e3').copyTo(spreadsheet.getRange('d2:e2'), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
      
};
