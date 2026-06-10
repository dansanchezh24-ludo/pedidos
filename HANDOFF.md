# Handoff — Ludo Berries
_Última actualización: 2026-06-09 (rev 3)_

## ¿Qué es?
App web de gestión de pedidos para la tienda de berries y elotes. Dos páginas HTML puras sin framework ni backend — todo corre en el browser.

## URLs y accesos
| Dato | Valor |
|---|---|
| App pública (captura) | https://dansanchezh24-ludo.github.io/pedidos/ |
| Panel privado (admin) | https://dansanchezh24-ludo.github.io/pedidos/panel.html |
| Repo | https://github.com/dansanchezh24-ludo/pedidos |
| Deploy | GitHub Pages — automático al hacer push a `main` |

> ⚠️ **El panel.html es público por URL directa — no tiene contraseña ni autenticación.**

## Stack
- HTML + JavaScript vanilla (sin framework, sin backend, sin npm)
- Datos guardados en **Google Sheets** vía Google Apps Script (no localStorage)
- Deploy: GitHub Pages (gratis, automático)

## Archivos
| Archivo | Quién lo usa | Qué hace |
|---|---|---|
| `config.js` | Ambos HTML | Catálogo, costos e historial de precios — **editar solo aquí** |
| `index.html` | Equipo de ventas (público) | Captura pedidos, selección de productos, precio familiar |
| `panel.html` | Dan / admin (privado por URL) | Tablero KPIs, resumen de ventas, cálculo de márgenes, historial por proveedor |

---

## Productos activos (catálogo vigente)

### Berries
Frutas disponibles: **Zarzamora, Frambuesa, Blueberry** (nombre único desde 2026-06-09).

| Producto | Precio venta | Costo proveedor (desde 2026-06-08) |
|---|---|---|
| Ludo Select (clamshell 170g) | $55 | $60 (Zarzamora/Frambuesa) / $80 (Blueberry) |
| Familiar (bote 500g) | $120 | $60/$80 según fruta |
| Ludo Pack (3 clamshells iguales) | $150 | — |
| Ludo Mix (3 clamshells surtidos) | $160 | — |

### Elotes (paquetes, desde 2026-06-09)
Costo base del proveedor: $50 por cada 3 elotes.

| Producto | Elotes | Precio venta | Costo |
|---|---|---|---|
| Ludo Antojo | 3 | $100 | $50 |
| Ludo Parrilla | 6 | $190 | $100 |
| Ludo Familiar | 9 | $280 | $150 |
| Ludo Reunión | 12 | $360 | $200 |
| Ludo Fiesta | 15 | $440 | $250 |

---

## Estado actual

### ✅ Commits publicados
| Commit | Descripción |
|---|---|
| `127e79b` | Blueberry grande sin stock — relleno de clamshells cambiado a Blueberry chica bote |
| `5cbfbd6` | Sistema de costos con vigencia por fecha + precios nuevos del proveedor |
| `8812496` | `config.js` — fuente única de catálogo y costos; elotes → paquetes Ludo; ventas por fruta en Tablero |
| `1d2be4a` | Blueberry homologado a nombre único; Blueberry grande y chica bote unificados |

### Cómo funciona el historial de costos
Los costos del proveedor viven en `config.js` con historial por fecha de vigencia:
```js
var HIST_COSTO_PROVEEDOR = {
  "Zarzamora": [ {desde:"2000-01-01", costo:45}, {desde:"2026-06-08", costo:60} ],
  ...
};
```
- Pedidos con fecha **antes del 2026-06-08** → usan costos viejos (reportes históricos correctos)
- Pedidos **desde el 2026-06-08** → usan costos nuevos

Los nombres viejos de Sheets ("Blueberry chica bote", "Blueberry grande") se normalizan automáticamente a "Blueberry" vía `normalizarFruta()` en `panel.html`.

---

## Pendientes — por prioridad

### 🟠 Alta
- [ ] **El panel.html es accesible públicamente sin contraseña**
  Cualquiera con la URL puede ver márgenes, costos y datos del proveedor.
  _Opciones:_
  - _A) Agregar contraseña básica en JS (mínimo, no ideal)_
  - _B) Mover el panel a Netlify con password protection (gratis, recomendado)_
  - _C) Mover a repositorio privado y usar GitHub Pages con autenticación_

- [x] **Los pedidos se guardan en Google Sheets vía Apps Script** _(ya implementado)_

### 🟡 Media
- [x] **Sincronización entre `index.html` y `panel.html`** _(resuelto 2026-06-09, commit `8812496`)_
  Todo el catálogo y costos viven en `config.js`. Para actualizar precios: **solo editar `config.js`**.

- [x] **README escrito** _(2026-06-09, commit `373877d`)_

---

## Proceso: actualizar precios del proveedor

Cuando el proveedor suba precios, **solo editar `config.js`** — dos pasos:

**1. En `HIST_COSTO_PROVEEDOR`:** agregar nueva entrada al final de la fruta
```js
{ desde:"YYYY-MM-DD", costo:NUEVO_PRECIO }
```

**2. En `CATALOGO`:** actualizar el campo `costo` de la fruta (usado en modo "Precio familiar")
```js
{ id:"zarzamora", ..., costo: NUEVO_PRECIO }
```

Hacer commit y push → GitHub Pages despliega en ~1 minuto.

## Proceso: agregar un producto nuevo

1. Agregar entrada en `CATALOGO` dentro de `config.js`
2. Si tiene costo de proveedor variable, agregar su historial en `HIST_COSTO_PROVEEDOR` o `HIST_COSTO_ELOTE`
3. Agregarlo a `ACTIVOS` (catálogo normal) o `IDS` (precio familiar) en `getCatalogoDisponible()` dentro de `index.html`
4. Si puede aparecer en pedidos históricos de Sheets con nombre diferente, agregar alias en `ALIAS_FRUTAS` de `config.js`
