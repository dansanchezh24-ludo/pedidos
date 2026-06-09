# Handoff — Ludo Berries
_Última actualización: 2026-06-08_

## ¿Qué es?
App web de gestión de pedidos para la tienda de berries (Zarzamora, Frambuesa, Blueberry). Dos páginas HTML puras sin framework ni backend — todo corre en el browser.

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
| `index.html` | Equipo de ventas (público) | Captura pedidos, selección de productos, precio familiar |
| `panel.html` | Dan / admin (privado por URL) | Tablero KPIs, resumen de ventas, cálculo de márgenes, historial por proveedor |

---

## Productos activos (catálogo vigente)
| Producto | Precio venta | Costo proveedor (desde 2026-06-08) |
|---|---|---|
| Ludo Select (clamshell 170g) | $55 | $60 (Zarzamora/Frambuesa) / $80 (Blueberry) |
| Bote 500g | $120 | $60/$80 según fruta |
| Ludo Pack (3 clamshells iguales) | $150 | — |
| Ludo Mix (3 clamshells surtidos) | $160 | — |
| Elote amarillo | $100 | $35 |

Frutas disponibles: Zarzamora, Frambuesa, Blueberry chica bote.
**Blueberry grande descontinuada** (sin existencia, el proveedor ya no la porciona para clamshell).

---

## Estado actual (2026-06-08)

### ✅ Cambios recientes publicados
| Commit | Descripción |
|---|---|
| `127e79b` | Relleno de clamshells cambiado a Blueberry chica bote (Blueberry grande sin stock) |
| `5cbfbd6` | Sistema de costos con vigencia por fecha + precios nuevos del proveedor |

### Cómo funciona el historial de costos
En `panel.html` (~línea 192) los costos del proveedor se guardan como historial con fechas:
```js
var HIST_COSTO_PROVEEDOR = {
  "Zarzamora": [ {desde:"2000-01-01", costo:45}, {desde:"2026-06-08", costo:60} ],
  ...
};
```
- Pedidos con fecha **antes del 2026-06-08** → usan costos viejos (reportes históricos correctos)
- Pedidos **desde el 2026-06-08** → usan costos nuevos

**Para registrar un futuro cambio de costo:** agregar una nueva entrada `{desde:"YYYY-MM-DD", costo:N}` al final de la lista. **No editar ni borrar las entradas viejas.**

---

## Pendientes — por prioridad

### 🟠 Alta
- [ ] **El panel.html es accesible públicamente sin contraseña**
  Cualquiera que conozca la URL `https://dansanchezh24-ludo.github.io/pedidos/panel.html` puede ver márgenes, costos y datos del proveedor.
  _Opciones:_
  - _A) Agregar contraseña básica en JS (mínimo, no ideal)_
  - _B) Mover el panel a Netlify con password protection (gratis, recomendado)_
  - _C) Mover a repositorio privado y usar GitHub Pages con autenticación_

- [x] **Los pedidos se guardan en Google Sheets vía Apps Script** _(ya implementado)_
  `index.html` envía cada pedido al Apps Script y `panel.html` los lee desde ahí.
  El script responde correctamente con historial desde abril 2026. No hay riesgo de pérdida por borrar caché.

### 🟡 Media
- [ ] **Sincronización entre `index.html` y `panel.html`**
  Cuando el proveedor suba precios: hay que actualizar el `costo` en `index.html` (precio familiar) **y** agregar la vigencia en `panel.html` (`HIST_COSTO_*`). Hay un comentario de aviso en el código pero es fácil olvidarlo.
  _Acción: documentar el proceso de actualización de precios en un README._

- [ ] **README casi vacío**
  Solo dice "pedidos berries". Documentar: cómo usar la app, cómo actualizar precios, cómo agregar un producto nuevo.

---

## Proceso: actualizar precios del proveedor

Cuando el proveedor suba precios, hacer estos dos pasos:

**1. En `panel.html` (~línea 192):** agregar nueva entrada al historial
```js
{desde:"YYYY-MM-DD", costo:NUEVO_PRECIO}
```

**2. En `index.html` (~línea 100):** actualizar el campo `costo` del catálogo
```js
{ id: "zarzamora", ..., costo: NUEVO_PRECIO }
```

Hacer commit y push → GitHub Pages despliega en ~1 minuto.
