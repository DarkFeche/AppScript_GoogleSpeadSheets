// --- VARIABLES GLOBALES (Datos estáticos) ---
// Guardamos el objeto spreadsheet porque se usa siempre
const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

// Guardamos el TIPO de pegado (solo el ENUM, sin comas ni false extra)
const justValues = SpreadsheetApp.CopyPasteType.PASTE_VALUES;

// Guardamos el ID de la hoja (Esto es seguro y no cambia)
const LOG_SHEET_ID = 1680420155; 

// Guardamos la dirección del rango de backup
const lineaBackup = 'A2:Q2'; 


// --- FUNCIONES AUXILIARES (Acciones reutilizables) ---

/**
 * Función dedicada para activar la hoja de Log.
 * Al ser función, EJECUTA la acción cada vez que la llamamos.
 */
function activarHojaLog() {
  const hoja = spreadsheet.getSheetById(LOG_SHEET_ID);
  if (hoja) {
    spreadsheet.setActiveSheet(hoja, true);
  } else {
    Logger.log("Error: No se encontró la hoja con ID " + LOG_SHEET_ID);
  }
}


// --- FUNCIONES PRINCIPALES ---

function variaciondiariatotal() {
  activarHojaLog(); // Llamamos a la función (con paréntesis)
  
  // Insertamos celdas vacías
  spreadsheet.getRange(lineaBackup).insertCells(SpreadsheetApp.Dimension.ROWS); 
  
  var date = new Date();
  spreadsheet.getRange('A2').setValue(date); 
  
  // Versión Antigua:
  spreadsheet.getRange('registrototaleu').copyTo(spreadsheet.getRange('B2'), justValues, false);
  spreadsheet.getRange('totaldeudores').copyTo(spreadsheet.getRange('C2'), justValues, false);
  spreadsheet.getRange('totalrentavariable').copyTo(spreadsheet.getRange('D2'), justValues, false);
  spreadsheet.getRange('totalrentafija').copyTo(spreadsheet.getRange('E2'), justValues, false);
  spreadsheet.getRange('liquidousd').copyTo(spreadsheet.getRange('F2'), justValues, false);
  spreadsheet.getRange('liquidoeu').copyTo(spreadsheet.getRange('G2'), justValues, false); 
  spreadsheet.getRange('liquidoars').copyTo(spreadsheet.getRange('H2'), justValues, false);
  spreadsheet.getRange('registrototalars').copyTo(spreadsheet.getRange('I2'), justValues, false);
  spreadsheet.getRange('registrototalusd').copyTo(spreadsheet.getRange('J2'), justValues, false); 
  spreadsheet.getRange('bienesdeuso').copyTo(spreadsheet.getRange('K2'), justValues, false); 
  spreadsheet.getRange('totaletoro').copyTo(spreadsheet.getRange('L2'), justValues, false);
 
  // Versión Nueva:
  spreadsheet.getRange('currentassets').copyTo(spreadsheet.getRange('N2'), justValues, false);
  spreadsheet.getRange('noncurrentassets').copyTo(spreadsheet.getRange('O2'), justValues, false);
  spreadsheet.getRange('currentliability').copyTo(spreadsheet.getRange('P2'), justValues, false);
  spreadsheet.getRange('noncurrentliability').copyTo(spreadsheet.getRange('Q2'), justValues, false);
  
  Logger.log('Ejecución finalizada correctamente!');
};

function deshacer() {
   activarHojaLog(); // Llamada a función
   spreadsheet.getRange(lineaBackup).deleteCells(SpreadsheetApp.Dimension.ROWS);
};

function test() {
   activarHojaLog(); // Llamada a función
   Logger.log('TEST EXITOSO: Hoja activada correctamente.');
};
