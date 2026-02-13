/**
 * IMPORTADOR DE PRECIOS WEB (SCRAPER) - V6.0 (Batch / Lotes)
 * ----------------------------------------------------------
 * Recorre una tabla definida en la hoja de cálculo y actualiza
 * todos los activos encontrados fila por fila.
 * * Creado por DrkFeche & Gemini
 */

// --- ⚙️ CONFIGURACIÓN GENERAL ---
const CONFIG = {
  // Nombre EXACTO de la hoja
  NOMBRE_HOJA: '/', 
  
  // Fila donde EMPIEZAN los datos (Cabeceras o primer dato)
  // El script procesará desde esta fila hacia abajo hasta que no encuentre más URLs.
  FILA_INICIO: 32,

  // Definición de Columnas (A=1, B=2, C=3, etc.)
  COL_NOMBRE: 2,  // Col B (Ticket)
  COL_PRECIO: 3,  // Col C (Destino)
  COL_FECHA:  4,  // Col D (Destino)
  COL_URL:    5,  // Col E (URL)
  COL_REGEX:  6   // Col F (REGEX)
};

/**
 * 1. FUNCIÓN NÚCLEO (Helper): Obtiene el valor de la web.
 * Ya no depende de ser llamada desde la celda, es una función interna.
 */
function fetchWebValue(url, regexPattern) {
  if (!url || !regexPattern) return null;

  try {
    const opciones = {
      'muteHttpExceptions': true,
      'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };

    const response = UrlFetchApp.fetch(url, opciones);
    if (response.getResponseCode() !== 200) return `Error HTTP: ${response.getResponseCode()}`;

    const html = response.getContentText();
    const patron = new RegExp(regexPattern, 'i');
    const coincidencia = html.match(patron);

    if (coincidencia && coincidencia[1]) {
      let valorTexto = coincidencia[1];
      
      // Limpieza de formato (1.000,50 -> 1000.50)
      if (valorTexto.includes(',') && valorTexto.includes('.')) {
         valorTexto = valorTexto.replace(/\./g, '').replace(',', '.');
      } else if (valorTexto.includes(',')) {
         valorTexto = valorTexto.replace(',', '.');
      }

      const valorNumerico = parseFloat(valorTexto);
      return isNaN(valorNumerico) ? valorTexto : valorNumerico;
    }
    
    return "Regex sin coincidencia";

  } catch (e) {
    return `Error Excepción: ${e.message}`;
  }
}

/**
 * 2. AUTOMATIZACIÓN (Batch): Actualiza TODA la lista.
 * Conectar esta función al Activador (Trigger).
 */
function actualizarPreciosIOL() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName(CONFIG.NOMBRE_HOJA);
  
  if (!hoja) {
    Logger.log(`❌ Error: No se encontró la hoja "${CONFIG.NOMBRE_HOJA}"`);
    return;
  }

  // 1. Detectar el rango de datos
  const ultimaFila = hoja.getLastRow();
  
  // Validamos que haya datos para procesar
  if (ultimaFila < CONFIG.FILA_INICIO) {
    Logger.log("⚠️ No hay datos en el rango esperado.");
    return;
  }

  Logger.log(`--- 🚀 INICIANDO BATCH (${CONFIG.FILA_INICIO} hasta ${ultimaFila}) ---`);

  // 2. Leer todo el bloque de datos de una sola vez (Es mucho más rápido que leer fila por fila)
  // Calculamos cuántas filas leer
  const numFilas = ultimaFila - CONFIG.FILA_INICIO + 1;
  // Leemos desde la columna B (2) hasta la F (6) -> Total 5 columnas
  const rangoDatos = hoja.getRange(CONFIG.FILA_INICIO, 2, numFilas, 5).getValues();

  // 3. Iterar sobre los datos en memoria
  rangoDatos.forEach((fila, indice) => {
    // Mapeo del array (indices empiezan en 0, relativo a la selección)
    // Fila[0]=Nombre(B), [1]=Precio(C), [2]=Fecha(D), [3]=URL(E), [4]=Regex(F)
    const nombre = fila[0];
    const url = fila[3];
    const regex = fila[4];
    
    // Fila real en la hoja para escribir después
    const filaHoja = CONFIG.FILA_INICIO + indice;

    // Solo procesamos si hay URL y Regex
    if (url && regex && url.toString().startsWith('http')) {
      Logger.log(`[Fila ${filaHoja}] Procesando: ${nombre}...`);
      
      const precio = fetchWebValue(url, regex);
      
      // Escribimos el resultado inmediatamente en la hoja
      // (Podríamos hacerlo en batch al final, pero hacerlo uno a uno es más seguro si falla el script a la mitad)
      hoja.getRange(filaHoja, CONFIG.COL_PRECIO).setValue(precio);
      
      if (typeof precio === 'number') {
        hoja.getRange(filaHoja, CONFIG.COL_FECHA).setValue(new Date());
      }
    }
  });

  Logger.log("--- 🏁 BATCH FINALIZADO ---");
}
