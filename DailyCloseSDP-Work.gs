function fecharcaixa() {
  //Esta funcion es para limpiar (de mis cuentas personales)
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Caixa'), true);
  spreadsheet.getRange('d1:f23').copyTo(spreadsheet.getRange('m1'), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  //spreadsheet.getRange('b12:b14').copyTo(spreadsheet.getRange('c12:c14'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
   
  //Establece dos objetos basados en dos rangos existentes
  var rango6 = spreadsheet.getRange('mismba');
  var rango7 = spreadsheet.getRange('mismbb');

  //Ejecuta una funcion 
  actualizarCaixa()

  //Selecciona los rangos anteriores y los limpia
  rango6.clearContent();
  rango7.clearContent();

  //CELDAS A SER LIMPIADAS
  spreadsheet.getRange('b12').setValue('0');
  spreadsheet.getRange('b16').setValue('0');
  spreadsheet.getRange('b17').setValue('0');
  spreadsheet.getRange('a19').setValue('Operando');
  spreadsheet.getRange('b26').activate();

}

//Con ésta función dejo la caja en cero para otro día de trabajo después de cerrar la caja de mis cuentas personales
function caixaemzero() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Caixa'), true);
  spreadsheet.getRange('b11').copyTo(spreadsheet.getRange('b20'), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false);
  spreadsheet.getRange('b3').setValue('0,5');
  spreadsheet.getRange('b4').setValue('1');
  spreadsheet.getRange('b5').setValue('2');
  spreadsheet.getRange('b6').setValue('2,5');
  spreadsheet.getRange('b7').setValue('8');
  spreadsheet.getRange('b8').setValue('6');
  spreadsheet.getRange('b9').setValue('80');
  spreadsheet.getRange('b19').activate();


}

//Esta funcion es para actualizar los nuevos valores de mi caja grande. 
function actualizarCaixa() {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Lista de valores C correspondientes a cada fila (fila 3 a 9)
  var valoresC = [0.5,1,2,2.5,8,6,80];  // Por ejemplo, los valores C para cada fila
  
  // Definir el rango de filas que quieres actualizar (de la fila 3 a la 9)
  for (var i = 3; i <= 9; i++) {
    // Obtén el índice de la lista de valoresC basado en la fila (3 => índice 0, 4 => índice 1, etc.)
    var indice = i - 3;
    
    // Obtén el valor actual de la celda A (columna I) en la fila i
    var valorA = hoja.getRange("I" + i).getValue();
    
    // Obtén el valor de la celda B (columna B) en la fila i
    var valorB = hoja.getRange("B" + i).getValue();
    
    // Obtén el valor de C desde la lista de valoresC para la fila actual
    var valorC = valoresC[indice];
    
    // Realiza la operación: Nuevo A = A + (B - C)
    var nuevoValorA = valorA + (valorB - valorC);
    
    // Actualiza la celda A (columna I) en la fila i con el nuevo valor
    hoja.getRange("I" + i).setValue(nuevoValorA);
  }
}



//ESTA FUNCION ES EL ACTIVADOR DE LA FUNCION FECHARCAIXA (mis cuentas personales)
function fechadorCaixa() { 
  var activa=SpreadsheetApp.getActiveRange();
  var dir=activa.getA1Notation();
  var nombreHoja=activa.getSheet().getName();
  var valor=activa.getValue();
  if (nombreHoja=="Caixa" && dir=='B25' && valor==true) {
    activa.setValue(false);
    fecharcaixa();
    
    // Aquí volvemos a evaluar el rango activo y sus propiedades
    var nuevaActiva = SpreadsheetApp.getActiveRange();
    dir = nuevaActiva.getA1Notation(); // Actualizamos 'dir'
    valor = nuevaActiva.getValue();    // Actualizamos 'valor'
    
    Logger.log("nombreHoja: " + nombreHoja);
    Logger.log("dir después de actualizar: " + dir);
    Logger.log("valor después de actualizar: " + valor);

    // Segunda condición para la celda B26
    if(nombreHoja=="Caixa" && dir=='B26' && valor==true) {
        caixaemzero()
    }
  }
  
};


//A partir de acá comienza la función LIMPARCAIXA ----------------------------------(que es de la caja general de SdP)
function limparcaixa() {
  var hoja = SpreadsheetApp.getActive();
  hoja.setActiveSheet(hoja.getSheetByName('Caixa'), true);
  hoja.getRange('a30:h54').copyTo(hoja.getRange('k30'), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);

  var rango1 = hoja.getRange('qantidadegral1');
  var rango2 = hoja.getRange('qantidadegral2');
  var rango3 = hoja.getRange('mbancos');
  var rango4 = hoja.getRange('consumointerno');
  var rango5 = hoja.getRange('uber');
  var rango6 = hoja.getRange('fechododia');
  var rango7 = hoja.getRange('tareas');
  var rango8 = hoja.getRange('adicionais1');
  var rango9 = hoja.getRange('adicionais2');
  
  
  rango1.clearContent();
  rango2.clearContent();
  rango3.clearContent();
  rango4.clearContent();
  rango5.clearContent();
  rango6.clearContent();
  rango7.clearContent();
  rango8.clearContent();
  rango9.clearContent();
  hoja.getRange('g43').setValue('=F43*20')
  hoja.getRange('f43').setValue('0')
   
}


function limpadorCaixa() { 
  var activa=SpreadsheetApp.getActiveRange();
  var dir=activa.getA1Notation();
  var nombreHoja=activa.getSheet().getName();
  var valor=activa.getValue();

  if(nombreHoja=="Caixa" && dir=='A29' && valor==true) {
    activa.setValue(false)
    limparcaixa()
  }
  
}


function onEdit () {
  limpadorCaixa();
  fechadorCaixa();
}
