// config.js — Configuración compartida entre index.html y panel.html
// Para actualizar precios: editar AQUÍ. No tocar index.html ni panel.html.

var FRUTAS = ["Zarzamora","Frambuesa","Blueberry"];
var FRUTAS_CHERRY = ["Cherry rojo","Cherry amarillo","Cherry kumato"];

var CAJAS_POR_BOTE = 3;

var CATALOGO = [
  // Frutas sueltas (venta directa = presentación bote, ver NOMBRE_BOTE_DIRECTO en panel.html)
  { id:"zarzamora",         nombre:"Zarzamora",       precio:120, costo:60, slots:0, emoji:"🫐" },
  { id:"frambuesa",         nombre:"Frambuesa",       precio:120, costo:70, slots:0, emoji:"🍓" },
  { id:"blueberry",         nombre:"Blueberry",       precio:120, costo:80, slots:0, emoji:"🫐" },
  { id:"fresa",             nombre:"Fresa",           precio:80,  costo:60, slots:0, emoji:"🍓" },
  { id:"cherry_rojo",       nombre:"Cherry rojo",     precio:50,  costo:30, slots:0, emoji:"🍒" },
  { id:"cherry_amarillo",   nombre:"Cherry amarillo", precio:50,  costo:30, slots:0, emoji:"🍋" },
  { id:"tomate_kumato",     nombre:"Cherry kumato",   precio:50,  costo:30, slots:0, emoji:"🍅" },
  // Paquetes de berries (costo = costo real de 1 bote del proveedor: cubre 1 clamshell
  // suelto o 3 clamshells de la misma fruta, porque el proveedor solo vende bote completo)
  { id:"ludo_select", nombre:"Ludo Berry Select",   precio:55,  costo:60,  slots:1, emoji:"🌟" },
  { id:"ludo_pack",   nombre:"Ludo Berry 3-Pack",   precio:150, costo:60,  slots:1, emoji:"📦" },
  { id:"ludo_mix",    nombre:"Ludo Berry Mix",      precio:160, costo:180, slots:3, emoji:"🌈" },
  { id:"ludo_berry_max", nombre:"Ludo Berry Max",   precio:230, costo:225, slots:3, emoji:"✨" },
  { id:"fam_1",       nombre:"Familiar (bote) 1x",   precio:120, costo:50,  slots:1, emoji:"🪣" },
  { id:"fam_2",       nombre:"Familiar (bote) 2x",   precio:220, costo:100, slots:2, emoji:"🪣" },
  { id:"fam_3",       nombre:"Familiar (bote) 3x",   precio:320, costo:150, slots:3, emoji:"🪣" },
  { id:"ind_1",       nombre:"Individual (clamshell) 1x", precio:50,  costo:15, slots:1, emoji:"📦" },
  { id:"ind_2",       nombre:"Individual (clamshell) 2x", precio:90,  costo:30, slots:2, emoji:"📦" },
  { id:"ind_3",       nombre:"Individual (clamshell) 3x", precio:130, costo:45, slots:3, emoji:"📦" },
  // Paquetes fresa
  { id:"fresa_2", nombre:"Fresa 2-Pack", precio:150, costo:90,  slots:0, emoji:"🍓" },
  { id:"fresa_3", nombre:"Fresa 3-Pack", precio:210, costo:135, slots:0, emoji:"🍓" },
  // Paquetes cherry
  { id:"ludo_tomatizado", nombre:"Cherry 3-Pack", precio:140, costo:60, slots:1, emoji:"🍅", frutasPermitidas: FRUTAS_CHERRY },
  { id:"ludo_fresh",      nombre:"Cherry Mix",    precio:140, costo:60, slots:3, emoji:"🍒", frutasPermitidas: FRUTAS_CHERRY },
  // Elotes — paquetes (slots:0, sin selector de fruta; elotes = piezas por pack)
  { id:"elote_antojo",   nombre:"Elote Select",    precio:100, costo:60,  slots:0, emoji:"🌽", elotes:3  },
  { id:"elote_parrilla", nombre:"Ludo Duo",        precio:190, costo:100, slots:0, emoji:"🌽", elotes:6  },
  { id:"elote_familiar", nombre:"Ludo Elotiza",    precio:280, costo:150, slots:0, emoji:"🌽", elotes:9  },
  { id:"elote_reunion",  nombre:"Ludo Parrillada", precio:360, costo:200, slots:0, emoji:"🌽", elotes:12 },
  { id:"elote_fiesta",   nombre:"Ludo Fiesta",     precio:440, costo:250, slots:0, emoji:"🌽", elotes:15 },
  // Elote Blanco — línea nueva (2026-07-08), empaques por pieza (no charolas de 3 como el amarillo)
  { id:"elote_blanco",      nombre:"Elote Blanco",        precio:60,  costo:40,  slots:0, emoji:"🌽", elotes:1 },
  { id:"elote_blanco_duo",  nombre:"Elote Blanco Duo",    precio:115, costo:70,  slots:0, emoji:"🌽", elotes:2 },
  { id:"elote_blanco_3",    nombre:"Elote Blanco 3-Pack", precio:165, costo:100, slots:0, emoji:"🌽", elotes:3 },
  { id:"elote_blanco_4",    nombre:"Elote Blanco 4-Pack", precio:215, costo:130, slots:0, emoji:"🌽", elotes:4 },
  { id:"elote_blanco_5",    nombre:"Elote Blanco 5-Pack", precio:265, costo:160, slots:0, emoji:"🌽", elotes:5 },
  // Ludo Mercado — frutas y productos directos (desde 2026-06-30)
  // unidad:"kg" → precio/costo son valores POR KG; piezasPorKg permite convertir a gramos o pieza.
  { id:"limon_persa",  nombre:"Limón persa sin semilla", precio:50,  costo:37, unidad:"kg", piezasPorKg:10, slots:0, emoji:"🍋" },
  { id:"tuna",         nombre:"Tuna",                     precio:40,  costo:27, unidad:"kg", piezasPorKg:5,  slots:0, emoji:"🌵" },
  { id:"maracuya",     nombre:"Maracuyá",                 precio:100, costo:60, unidad:"kg", piezasPorKg:10, slots:0, emoji:"🟠" },
  { id:"rambutan",     nombre:"Rambután",                 precio:90,  costo:50, unidad:"kg", piezasPorKg:30, slots:0, emoji:"🔴" },
  { id:"ciruela_roja", nombre:"Ciruela roja",             precio:70,  costo:31, unidad:"kg", piezasPorKg:10, slots:0, emoji:"🟣" },
  // Piezas fijas — el costo ya viene convertido de $/kg a $/pieza (costo familiar ÷ piezas por kg)
  { id:"coco_cafe",    nombre:"Coco (café)", precio:60,  costo:40, slots:0, emoji:"🥥" },
  { id:"pitahaya",     nombre:"Pitahaya",    precio:100, costo:76, slots:0, emoji:"🐉" },
  // Bote / clamshell fijos
  { id:"cereza",       nombre:"Cereza", precio:120, costo:70, slots:0, emoji:"🍒" },
  { id:"higo",         nombre:"Higo",   precio:100, costo:60, slots:0, emoji:"🟤" },
];

// ── Historial de costos del proveedor ─────────────────────────────────────────
// Para registrar un alza: agregar { desde:"YYYY-MM-DD", costo:N } al FINAL de la lista.
// NUNCA editar ni borrar entradas viejas — son necesarias para calcular márgenes históricos.

var HIST_COSTO_PROVEEDOR = {
  "Zarzamora": [ {desde:"2000-01-01", costo:45}, {desde:"2026-06-08", costo:60} ],
  "Frambuesa": [ {desde:"2000-01-01", costo:45}, {desde:"2026-06-08", costo:60}, {desde:"2026-07-08", costo:70} ],
  "Blueberry": [ {desde:"2000-01-01", costo:50}, {desde:"2026-06-08", costo:80} ],
  // Aliases para compatibilidad con pedidos históricos en Sheets
  "Blueberry chica bote": [ {desde:"2000-01-01", costo:50}, {desde:"2026-06-08", costo:80} ],
  "Blueberry grande":     [ {desde:"2000-01-01", costo:50}, {desde:"2026-06-08", costo:80} ],
  "Cereza":               [ {desde:"2026-06-30", costo:70} ],
};
// Se compran por clamshell individual, sin conversión a botes de 3 — cada clamshell
// cuesta lo mismo sin importar si se vende suelto o dentro de Ludo Tomatizado/Ludo Fresh
// (que empaquetan 3 clamshells de cherry cada uno).
var HIST_COSTO_PROVEEDOR_CLAMSHELL = {
  "Higo":                 [ {desde:"2026-06-30", costo:60} ],
  "Fresa":                [ {desde:"2026-06-29", costo:50}, {desde:"2026-07-08", costo:60} ],
  "Cherry rojo":          [ {desde:"2026-06-29", costo:20}, {desde:"2026-07-08", costo:30} ],
  "Cherry amarillo":      [ {desde:"2026-06-29", costo:20}, {desde:"2026-07-08", costo:30} ],
  // "Tomate cherry kumato" es el nombre viejo del mismo producto — se deja congelado
  // (nunca se le agregan entradas nuevas) solo para que pedidos históricos con ese
  // texto exacto sigan reconociéndose; ver ALIAS_FRUTAS para el mapeo a "Cherry kumato".
  "Tomate cherry kumato": [ {desde:"2026-06-29", costo:20} ],
  "Cherry kumato":        [ {desde:"2026-06-29", costo:20}, {desde:"2026-07-08", costo:30} ],
};
var HIST_COSTO_PROVEEDOR_KG = {
  "Blueberry chica kg": [ {desde:"2000-01-01", costo:40} ],
  "Limón persa sin semilla": [ {desde:"2026-06-30", costo:37} ],
  "Tuna":                     [ {desde:"2026-06-30", costo:27} ],
  "Maracuyá":                 [ {desde:"2026-06-30", costo:60} ],
  "Rambután":                 [ {desde:"2026-06-30", costo:50} ],
  "Ciruela roja":             [ {desde:"2026-06-30", costo:31} ],
};
// Productos vendidos por pieza individual, fuera de la familia de elotes.
var HIST_COSTO_PIEZA = {
  "Coco (café)": [ {desde:"2026-06-30", costo:40} ],
  "Pitahaya":    [ {desde:"2026-06-30", costo:36.67}, {desde:"2026-07-08", costo:76} ],
};
// Elotes — costo por unidad pedida.
// Elote amarillo/blanco (nombres viejos, ya no orderables): por pieza individual, congelados.
// Elote Select…Fiesta / Elote Blanco*: por pack (costo total del pack, no por elote).
var HIST_COSTO_ELOTE = {
  "Elote amarillo": [ {desde:"2000-01-01", costo:50} ],
  "Elote blanco":   [ {desde:"2000-01-01", costo:30} ],
  "Elote Select":    [ {desde:"2026-06-09", costo:50}, {desde:"2026-07-08", costo:60} ],
  "Ludo Duo":        [ {desde:"2026-06-09", costo:100} ],
  "Ludo Elotiza":    [ {desde:"2026-06-09", costo:150} ],
  "Ludo Parrillada": [ {desde:"2026-06-09", costo:200} ],
  "Ludo Fiesta":     [ {desde:"2026-06-09", costo:250} ],
  // Elote Blanco — línea nueva (2026-07-08)
  "Elote Blanco":         [ {desde:"2026-07-08", costo:40}  ],
  "Elote Blanco Duo":     [ {desde:"2026-07-08", costo:70}  ],
  "Elote Blanco 3-Pack":  [ {desde:"2026-07-08", costo:100} ],
  "Elote Blanco 4-Pack":  [ {desde:"2026-07-08", costo:130} ],
  "Elote Blanco 5-Pack":  [ {desde:"2026-07-08", costo:160} ]
};

// Devuelve el costo vigente en una fecha (YYYY-MM-DD) dado el historial.
// Mapea nombres históricos al nombre canónico actual.
var ALIAS_FRUTAS = {
  "Blueberry chica bote": "Blueberry",
  "Blueberry grande":     "Blueberry",
  "Blueberry chica kg":   "Blueberry",
  "Tomate cherry kumato": "Cherry kumato",
};
function normalizarFruta(nombre) {
  return ALIAS_FRUTAS[nombre] || nombre;
}

// Nombres viejos de productos (no frutas) que cambiaron de nombre pero siguen
// costeándose igual — ej. "Ludo Antojo" es el nombre viejo de "Elote Select".
var ALIAS_PRODUCTOS = {
  "Ludo Antojo": "Elote Select",
};
function normalizarProducto(nombre) {
  return ALIAS_PRODUCTOS[nombre] || nombre;
}

// Fruta/ingrediente base de cada producto de elote — todos los paquetes Ludo
// se hacen con elote amarillo; "Elote amarillo"/"Elote blanco" son ellos mismos.
var ELOTE_FRUTA = {
  "Elote amarillo":  "Elote amarillo",
  "Elote blanco":    "Elote blanco",
  "Elote Select":    "Elote amarillo",
  "Ludo Duo":        "Elote amarillo",
  "Ludo Elotiza":    "Elote amarillo",
  "Ludo Parrillada": "Elote amarillo",
  "Ludo Fiesta":     "Elote amarillo",
  // Elote Blanco — mismos paquetes de siempre, solo subió de costo el 2026-07-08
  // (ver HIST_COSTO_ELOTE); se agrupan con "Elote blanco" para que el reporte
  // de ventas no los parta en dos productos distintos.
  "Elote Blanco":        "Elote blanco",
  "Elote Blanco Duo":    "Elote blanco",
  "Elote Blanco 3-Pack": "Elote blanco",
  "Elote Blanco 4-Pack": "Elote blanco",
  "Elote Blanco 5-Pack": "Elote blanco",
};

function costoVigente(historial, fecha) {
  if (!historial || !historial.length) return { costo:0, desde:null };
  var activo = historial[0];
  for (var i = 0; i < historial.length; i++) {
    if (historial[i].desde <= fecha) activo = historial[i]; else break;
  }
  return { costo: activo.costo, desde: activo.desde };
}

function isBerry(nombre) {
  return HIST_COSTO_PROVEEDOR.hasOwnProperty(nombre) ||
         HIST_COSTO_PROVEEDOR_CLAMSHELL.hasOwnProperty(nombre) ||
         HIST_COSTO_PROVEEDOR_KG.hasOwnProperty(nombre);
}

// ── Conversión kg / gramos / pieza (Ludo Mercado) ──────────────────────────

// Convierte un valor "por kg" (precio o costo) a la unidad de venta elegida.
// Si el producto no es unidad:"kg", regresa el valor sin cambios.
function precioBaseUnidad(cat, base, unidad) {
  if (cat.unidad !== "kg") return base;
  if (unidad === "gramos") return base / 1000;
  if (unidad === "pieza")  return base / cat.piezasPorKg;
  return base; // kg
}

// Convierte una cantidad capturada en la unidad elegida a su equivalente en kg.
function cantidadAKg(cat, cantidad, unidad) {
  if (unidad === "gramos") return cantidad / 1000;
  if (unidad === "pieza")  return cantidad / cat.piezasPorKg;
  return cantidad; // kg
}

// Extrae {base, cantidad, unidad} de un nombre guardado como "Nombre (1.5 kg)".
// Regresa null si el nombre no tiene ese sufijo.
function parseSufijoUnidad(nombreRaw) {
  var m = /^(.+) \(([\d.]+)\s*(kg|g|pza)\)$/.exec(nombreRaw);
  if (!m) return null;
  var unidad = m[3] === "g" ? "gramos" : m[3] === "pza" ? "pieza" : "kg";
  return { base: m[1], cantidad: parseFloat(m[2]), unidad: unidad };
}
