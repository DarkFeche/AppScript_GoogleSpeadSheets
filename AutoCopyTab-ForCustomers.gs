/**
 * GESTOR DE COPIADO PARA PLANTILLAS DISTRIBUIBLES
 * -----------------------------------------------
 * Este script utiliza 'Nombres de Rango' en lugar de IDs fijos.
 * Esto asegura que cuando un usuario haga "Archivo > Hacer una copia",
 * el script siga funcionando sin necesidad de configurar nada.
 * 
 * Gracias por utilizar nuestros servicios 
 * 
 * - VendeMasSoluciones
 */

// --- ⚙️ CONFIGURACIÓN ---
const CONFIG = {
  // Usamos los Nombres de Rango definidos en la hoja (Datos > Rangos con nombre)
  RANGO_ORIGEN: 'dest.origen',   // Apunta a C3:D1002 en 'Constructor lista'
  RANGO_DESTINO: 'dest.destino', // Apunta a A2 en 'Destinatarios'
  
  // Nombre de la hoja destino para limpieza profunda (Undo)
  HOJA_DESTINO_NOMBRE: 'Destinatarios' 
};

/**
 * Función Principal: Copia los valores del origen al destino.
 * Asignar esta función al botón "COPIAR / PROCESAR".
 */
function copiarDatos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Obtener rangos por su nombre (Funciona en copias)
  const sourceRange = ss.getRangeByName(CONFIG.RANGO_ORIGEN);
  const destRange = ss.getRangeByName(CONFIG.RANGO_DESTINO);
  
  if (!sourceRange || !destRange) {
    SpreadsheetApp.getUi().alert('❌ Error: No se encontraron los Rangos con Nombre.\nAsegurate de que "dest.origen" y "dest.destino" existan.');
    return;
  }

  // 2. Leer los datos (Solo valores, sin fórmulas)
  // Optimizamos: filtramos filas vacías para no copiar 1000 filas en blanco
  const valoresRaw = sourceRange.getValues();
  const valoresLimpios = valoresRaw.filter(fila => fila[0] !== "" || fila[1] !== "");
  
  if (valoresLimpios.length === 0) {
    SpreadsheetApp.getUi().alert('⚠️ El rango de origen está vacío.');
    return;
  }

  // 3. Preparar el destino
  // El rango destino "dest.destino" suele ser solo una celda (A2).
  // Necesitamos expandirlo al tamaño de los datos que vamos a pegar.
  const hojaDestino = destRange.getSheet();
  const filaInicio = destRange.getRow();
  const colInicio = destRange.getColumn();
  
  // Limpiamos primero para evitar mezclar datos viejos con nuevos
  // Limpiamos desde A2 hasta el final de la hoja para asegurar pureza
  const ultimaFila = hojaDestino.getLastRow();
  if (ultimaFila >= filaInicio) {
    hojaDestino.getRange(filaInicio, colInicio, ultimaFila - filaInicio + 1, valoresRaw[0].length).clearContent();
  }

  // 4. Pegar Valores
  hojaDestino.getRange(filaInicio, colInicio, valoresLimpios.length, valoresLimpios[0].length)
             .setValues(valoresLimpios);
  
  // Feedback visual (Toast es menos invasivo que Alert)
  ss.toast(`Se copiaron ${valoresLimpios.length} registros correctamente.`, '✅ Éxito');
}

/**
 * Función Deshacer: Borra el contenido de la hoja de destino.
 * Asignar esta función al botón "DESHACER / LIMPIAR".
 */
function deshacerCopia() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const destRange = ss.getRangeByName(CONFIG.RANGO_DESTINO);
  
  if (!destRange) {
    // Fallback: Si se borró el nombre, intentamos buscar la hoja por nombre
    const hoja = ss.getSheetByName(CONFIG.HOJA_DESTINO_NOMBRE);
    if (hoja) {
       // Asumimos que los datos empiezan en fila 2 (A2)
       const ultimaFila = hoja.getLastRow();
       if (ultimaFila >= 2) {
         hoja.getRange(2, 1, ultimaFila - 1, 25).clearContent(); // Limpia ancho generoso
         ss.toast('Datos eliminados (Método Hoja).', '🗑️ Limpieza');
       }
    }
    return;
  }

  // Método preferido (Rango Nombrado)
  const hojaDestino = destRange.getSheet();
  const filaInicio = destRange.getRow(); // Debería ser 2
  const ultimaFila = hojaDestino.getLastRow();
  
  // Solo borramos si hay datos después de la fila de inicio
  if (ultimaFila >= filaInicio) {
    // clearContent() borra datos pero deja formatos. Usar clear() para borrar todo.
    // Borramos desde filaInicio hasta el fondo de la hoja.
    hojaDestino.getRange(filaInicio, 1, ultimaFila - filaInicio + 1, 20).clearContent();
    ss.toast('Los datos han sido borrados.', '🗑️ Deshacer');
  } else {
    ss.toast('No hay datos para borrar.', 'ℹ️ Info');
  }
}

/**
 * Función Opcional: Crea un menú por si borran los botones
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🛠️ VendeMasSoluciones')
      .addItem('✅ Copiar Nombres a Hoja "Destinatarios"', 'copiarDatos')
      .addItem('🧹 Limpiar Hoja Destinatarios', 'deshacerCopia')
      .addToUi();
}
