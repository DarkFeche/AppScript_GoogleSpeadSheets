function recordFortnightlyTotals() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Renamed from 'Totales quincenales' to 'Fortnightly Totals'
  const sheet = ss.getSheetByName('Fortnightly Totals'); 

  if (!sheet) {
    Logger.log("Error: Sheet 'Fortnightly Totals' not found.");
    return;
  }

  // 1. Insert new row (A2:E2) shifting existing data down
  // Operates directly on the sheet object (no screen activation needed)
  sheet.getRange('A2:E2').insertCells(SpreadsheetApp.Dimension.ROWS);

  // 2. Snapshot: Copy Values from Named Ranges
  // Renamed ranges for consistency: 'registrototaleu' -> 'total_eur_record'
  const totalEur = ss.getRangeByName('total_eur_record');
  const totalArs = ss.getRangeByName('total_ars_record');

  if (totalEur) {
    totalEur.copyTo(sheet.getRange('B2'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  }
  if (totalArs) {
    totalArs.copyTo(sheet.getRange('C2'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  }

  // 3. Set Date
  sheet.getRange('A2').setValue(new Date());

  // 4. Copy Formulas/Formats
  // Copies from the row below (D3:E3) to the new row (D2:E2) to preserve calculations
  sheet.getRange('D3:E3').copyTo(sheet.getRange('D2:E2'), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);

  Logger.log('✅ Fortnightly totals recorded successfully.');
};
