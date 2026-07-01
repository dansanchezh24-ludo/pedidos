// config.js — Configuración compartida entre index.html y panel.html
// Para actualizar precios: editar AQUÍ. No tocar index.html ni panel.html.

var FRUTAS = ["Zarzamora","Frambuesa","Blueberry"];
var FRUTAS_CHERRY = ["Cherry rojo","Cherry amarillo","Tomate cherry kumato"];

var CAJAS_POR_BOTE = 3;

var CATALOGO = [
  // Frutas sueltas
  { id:"zarzamora",         nombre:"Zarzamora",            precio:70,  costo:60, slots:0, emoji:"🫐" },
  { id:"frambuesa",         nombre:"Frambuesa",             precio:70,  costo:60, slots:0, emoji:"🍓" },
  { id:"blueberry",         nombre:"Blueberry",            precio:70,  costo:80, slots:0, emoji:"🫐" },
  { id:"fresa",             nombre:"Fresa",                precio:80,  costo:50, slots:0, emoji:"🍓" },
  { id:"cherry_rojo",       nombre:"Cherry rojo",          precio:50,  costo:20, slots:0, emoji:"🍒" },
  { id:"cherry_amarillo",   nombre:"Cherry amarillo",      precio:50,  costo:20, slots:0, emoji:"🍋" },
  { id:"tomate_kumato",     nombre:"Tomate cherry kumato", precio:50,  costo:20, slots:0, emoji:"🍅" },
  // Paquetes de berries
  { id:"ludo_select", nombre:"Ludo Select",          precio:55,  costo:15,  slots:1, emoji:"🌟" },
  { id:"ludo_pack",   nombre:"Ludo Pack",             precio:150, costo:45,  slots:1, emoji:"📦" },
  { id:"ludo_mix",    nombre:"Ludo Mix",              precio:160, costo:45,  slots:3, emoji:"🌈" },
  { id:"fam_1",       nombre:"Familiar (bote) 1x",   precio:120, costo:50,  slots:1, emoji:"🪣" },
  { id:"fam_2",       nombre:"Familiar (bote) 2x",   precio:220, costo:100, slots:2, emoji:"🪣" },
  { id:"fam_3",       nombre:"Familiar (bote) 3x",   precio:320, costo:150, slots:3, emoji:"🪣" },
  { id:"ind_1",       nombre:"Individual (clamshell) 1x", precio:50,  costo:15, slots:1, emoji:"📦" },
  { id:"ind_2",       nombre:"Individual (clamshell) 2x", precio:90,  costo:30, slots:2, emoji:"📦" },
  { id:"ind_3",       nombre:"Individual (clamshell) 3x", precio:130, costo:45, slots:3, emoji:"📦" },
  // Paquetes fresa
  { id:"fresa_2", nombre:"Fresa 2 paquetes", precio:150, costo:100, slots:0, emoji:"🍓" },
  { id:"fresa_3", nombre:"Fresa 3 paquetes", precio:210, costo:150, slots:0, emoji:"🍓" },
  // Paquetes cherry
  { id:"ludo_tomatizado", nombre:"Ludo Tomatizado", precio:140, costo:60, slots:1, emoji:"🍅", frutasPermitidas: FRUTAS_CHERRY },
  { id:"ludo_fresh",      nombre:"Ludo Fresh",      precio:140, costo:60, slots:3, emoji:"🍒", frutasPermitidas: FRUTAS_CHERRY },
  // Elotes — paquetes (slots:0, sin selector de fruta; elotes = piezas por pack)
  { id:"elote_antojo",   nombre:"Elote Select",    precio:100, costo:50,  slots:0, emoji:"🌽", elotes:3  },
  { id:"elote_parrilla", nombre:"Ludo Duo",        precio:190, costo:100, slots:0, emoji:"🌽", elotes:6  },
  { id:"elote_familiar", nombre:"Ludo Elotiza",    precio:280, costo:150, slots:0, emoji:"🌽", elotes:9  },
  { id:"elote_reunion",  nombre:"Ludo Parrillada", precio:360, costo:200, slots:0, emoji:"🌽", elotes:12 },
  { id:"elote_fiesta",   nombre:"Ludo Fiesta",     precio:440, costo:250, slots:0, emoji:"🌽", elotes:15 },
  // Ludo Mercado — frutas y productos directos (desde 2026-06-30)
  // unidad:"kg" → precio/costo son valores POR KG; piezasPorKg permite convertir a gramos o pieza.
  { id:"limon_persa",  nombre:"Limón persa sin semilla", precio:50,  costo:37, unidad:"kg", piezasPorKg:10, slots:0, emoji:"🍋" },
  { id:"tuna",         nombre:"Tuna",                     precio:40,  costo:27, unidad:"kg", piezasPorKg:5,  slots:0, emoji:"🌵" },
  { id:"maracuya",     nombre:"Maracuyá",                 precio:100, costo:60, unidad:"kg", piezasPorKg:10, slots:0, emoji:"🟠" },
  { id:"rambutan",     nombre:"Rambután",                 precio:90,  costo:50, unidad:"kg", piezasPorKg:30, slots:0, emoji:"🔴" },
  { id:"ciruela_roja", nombre:"Ciruela roja",             precio:70,  costo:31, unidad:"kg", piezasPorKg:10, slots:0, emoji:"🟣" },
  // Piezas fijas — el costo ya viene convertido de $/kg a $/pieza (costo familiar ÷ piezas por kg)
  { id:"coco_cafe",    nombre:"Coco (café)", precio:60,  costo:40,    slots:0, emoji:"🥥" },
  { id:"pitahaya",     nombre:"Pitahaya",    precio:80,  costo:36.67, slots:0, emoji:"🐉" },
  // Bote / clamshell fijos
  { id:"cereza",       nombre:"Cereza", precio:120, costo:70, slots:0, emoji:"🍒" },
  { id:"higo",         nombre:"Higo",   precio:100, costo:60, slots:0, emoji:"🟤" },
];

// ── Historial de costos del proveedor ─────────────────────────────────────────
// Para registrar un alza: agregar { desde:"YYYY-MM-DD", costo:N } al FINAL de la lista.
// NUNCA editar ni borrar entradas viejas — son necesarias para calcular márgenes históricos.

var HIST_COSTO_PROVEEDOR = {
  "Zarzamora": [ {desde:"2000-01-01", costo:45}, {desde:"2026-06-08", costo:60} ],
  "Frambuesa": [ {desde:"2000-01-01", costo:45}, {desde:"2026-06-08", costo:60} ],
  "Blueberry": [ {desde:"2000-01-01", costo:50}, {desde:"2026-06-08", costo:80} ],
  // Aliases para compatibilidad con pedidos históricos en Sheets
  "Blueberry chica bote": [ {desde:"2000-01-01", costo:50}, {desde:"2026-06-08", costo:80} ],
  "Blueberry grande":     [ {desde:"2000-01-01", costo:50}, {desde:"2026-06-08", costo:80} ],
  "Fresa":                [ {desde:"2026-06-29", costo:50} ],
  "Cherry rojo":          [ {desde:"2026-06-29", costo:20} ],
  "Cherry amarillo":      [ {desde:"2026-06-29", costo:20} ],
  "Tomate cherry kumato": [ {desde:"2026-06-29", costo:20} ],
  "Cereza":               [ {desde:"2026-06-30", costo:70} ],
};
// Higo se compra por clamshell (sin conversión a botes, como los cherries lo harían si vinieran así).
var HIST_COSTO_PROVEEDOR_CLAMSHELL = {
  "Higo": [ {desde:"2026-06-30", costo:60} ],
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
  "Pitahaya":    [ {desde:"2026-06-30", costo:36.67} ],
};
// Elotes — costo por unidad pedida.
// Elote amarillo/blanco: por pieza individual.
// Ludo Antojo…Fiesta: por pack (costo = N_elotes × $50/3).
var HIST_COSTO_ELOTE = {
  "Elote amarillo": [ {desde:"2000-01-01", costo:50} ],
  "Elote blanco":   [ {desde:"2000-01-01", costo:30} ],
  "Elote Select":    [ {desde:"2026-06-09", costo:50}  ],
  "Ludo Duo":        [ {desde:"2026-06-09", costo:100} ],
  "Ludo Elotiza":    [ {desde:"2026-06-09", costo:150} ],
  "Ludo Parrillada": [ {desde:"2026-06-09", costo:200} ],
  "Ludo Fiesta":     [ {desde:"2026-06-09", costo:250} ]
};

// Devuelve el costo vigente en una fecha (YYYY-MM-DD) dado el historial.
// Mapea nombres históricos al nombre canónico actual.
var ALIAS_FRUTAS = {
  "Blueberry chica bote": "Blueberry",
  "Blueberry grande":     "Blueberry",
  "Blueberry chica kg":   "Blueberry",
};
function normalizarFruta(nombre) {
  return ALIAS_FRUTAS[nombre] || nombre;
}

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
