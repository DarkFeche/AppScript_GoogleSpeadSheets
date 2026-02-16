/**
 * DAILY FINANCIAL INDICATORS BACKUP
 * ----------------------------------------------------------
 * Creates a historical snapshot of key financial indicators 
 * (Indices, Exchange Rates) in the 'Indicadores' sheet.
 * * Functionality:
 * 1. Inserts a new row at the top to push old data down.
 * 2. Stamps the current date and time.
 * 3. Copies values (snapshot) from Named Ranges to the new row.
 * * * Created by DrkFeche & Gemini
 */

function backupDailyIndicators() {
  const ss = SpreadsheetApp.getActiveSpreadsheet(); // Gets the active workbook
  const targetSheet = ss.getSheetByName('Indicadores'); // Gets the specific sheet

  // Security Check: If the sheet was deleted, stop the script.
  if (!targetSheet) {
    Logger.log("Error: Sheet 'Indicadores' not found.");
    return;
  }

  /**
   * Helper function to copy values from a Named Range to a specific cell.
   * @param {string} originName - The Name of the Range to copy from.
   * @param {string} destinyRange - The cell reference (e.g., 'B2') to paste into.
   */
  function backup(originName, destinyRange) {
    const originRange = ss.getRangeByName(originName);
    
    if (originRange) {
      // Copy only values (Paste Type: VALUES) to avoid carrying over formulas
      originRange.copyTo(targetSheet.getRange(destinyRange), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
    } else {
      Logger.log("Error: Named Range '" + originName + "' does not exist.");
    }
  }
  
  // 1. Create space for new data (Push A2:H2 downwards)
  targetSheet.getRange('A2:H2').insertCells(SpreadsheetApp.Dimension.ROWS);
  
  // 2. Log current Date and Time
  const date = new Date();
  targetSheet.getRange('A2').setValue(date); 

  // 3. Execute Backups
  // Assumes Named Ranges: 'indices' (4 cells), 'eurodolar' (1 cell), 'dolareuro' (1 cell)
  backup('indices', 'B2');   // Fills B2, C2, D2, E2
  backup('eurodolar', 'F2'); // Fills F2
  backup('dolareuro', 'G2'); // Fills G2

  Logger.log('✅ Indicators backup completed successfully.');
};
