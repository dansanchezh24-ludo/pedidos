// config.js — Configuración compartida entre index.html y panel.html
// Para actualizar precios: editar AQUÍ. No tocar index.html ni panel.html.

var FRUTAS = ["Zarzamora","Frambuesa","Blueberry"];

var CAJAS_POR_BOTE = 3;

var CATALOGO = [
  // Frutas sueltas
  { id:"zarzamora",         nombre:"Zarzamora",            precio:70,  costo:60, slots:0, emoji:"🫐" },
  { id:"frambuesa",         nombre:"Frambuesa",             precio:70,  costo:60, slots:0, emoji:"🍓" },
  { id:"blueberry",         nombre:"Blueberry",            precio:70,  costo:80, slots:0, emoji:"🫐" },
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
  // Elotes — paquetes (slots:0, sin selector de fruta; elotes = piezas por pack)
  { id:"elote_antojo",   nombre:"Ludo Antojo",   precio:100, costo:50,  slots:0, emoji:"🌽", elotes:3  },
  { id:"elote_parrilla", nombre:"Ludo Parrilla", precio:190, costo:100, slots:0, emoji:"🌽", elotes:6  },
  { id:"elote_familiar", nombre:"Ludo Familiar", precio:280, costo:150, slots:0, emoji:"🌽", elotes:9  },
  { id:"elote_reunion",  nombre:"Ludo Reunión",  precio:360, costo:200, slots:0, emoji:"🌽", elotes:12 },
  { id:"elote_fiesta",   nombre:"Ludo Fiesta",   precio:440, costo:250, slots:0, emoji:"🌽", elotes:15 },
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
};
var HIST_COSTO_PROVEEDOR_CLAMSHELL = {};
var HIST_COSTO_PROVEEDOR_KG = {
  "Blueberry chica kg": [ {desde:"2000-01-01", costo:40} ]
};
// Elotes — costo por unidad pedida.
// Elote amarillo/blanco: por pieza individual.
// Ludo Antojo…Fiesta: por pack (costo = N_elotes × $50/3).
var HIST_COSTO_ELOTE = {
  "Elote amarillo": [ {desde:"2000-01-01", costo:50} ],
  "Elote blanco":   [ {desde:"2000-01-01", costo:30} ],
  "Ludo Antojo":    [ {desde:"2026-06-09", costo:50}  ],
  "Ludo Parrilla":  [ {desde:"2026-06-09", costo:100} ],
  "Ludo Familiar":  [ {desde:"2026-06-09", costo:150} ],
  "Ludo Reunión":   [ {desde:"2026-06-09", costo:200} ],
  "Ludo Fiesta":    [ {desde:"2026-06-09", costo:250} ]
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
