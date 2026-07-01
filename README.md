# Ludo Berries — App de pedidos

App web para capturar y administrar pedidos de la tienda de berries. Sin instalación, sin backend — corre en el navegador y guarda los datos en Google Sheets.

**URLs:**
- 📋 Captura de pedidos (equipo de ventas): https://dansanchezh24-ludo.github.io/pedidos/
- 📊 Panel admin (Dan): https://dansanchezh24-ludo.github.io/pedidos/panel.html

---

## Cómo usar la app

### Capturar un pedido (`index.html`)

1. Seleccionar **precio Normal** (cliente) o **precio Familiar** (a costo del proveedor)
2. Elegir producto del catálogo — si el producto tiene clamshells, elegir qué fruta va adentro
3. Ajustar cantidad con `+` / `-`
4. Agregar más productos si el cliente pide varios
5. Llenar nombre del cliente, fecha de entrega y dirección si aplica
6. Clic en **"Guardar en Google Sheets"** ✅

El pedido queda registrado en la hoja de Google Sheets automáticamente.

### Ver el panel admin (`panel.html`)

El panel tiene tres secciones:

| Sección | Qué muestra |
|---|---|
| **Tablero** | KPIs del día/semana/mes: ventas, ganancia, costo al proveedor |
| **Resumen** | Pedidos por fecha — quién pidió qué y cuánto |
| **Proveedor** | Cuánto se le debe a Gus según los pedidos del período |

---

## Catálogo actual

### Frutas directas (sin clamshell)
| Producto | Precio | Costo proveedor |
|---|---|---|
| Zarzamora | $70 | $60 |
| Frambuesa | $70 | $60 |
| Blueberry chica bote | $70 | $80 |
| Elote amarillo | $100 | $50 |
| Elote blanco | $60 | $30 |

### Presentaciones con clamshell
| Producto | Precio | Frutas |
|---|---|---|
| Ludo Select | $55 | 1 fruta a elegir |
| Individual 1x | $50 | 1 fruta |
| Individual 2x | $90 | 2 frutas |
| Individual 3x | $130 | 3 frutas |
| Ludo Pack | $150 | 1 fruta (x3 clamshells iguales) |
| Ludo Mix | $160 | 3 frutas distintas |

### Familiares (bote)
| Producto | Precio |
|---|---|
| Familiar 1x | $120 |
| Familiar 2x | $220 |
| Familiar 3x | $320 |

### Ludo Mercado (desde 2026-06-30)
Frutas y productos directos, fuera del sistema de bote/clamshell de berries.

**Por kg (con conversor a gramos o pieza):**
| Producto | Precio/kg | Costo familiar/kg | Piezas por kg |
|---|---|---|---|
| Limón persa sin semilla | $50 | $37 | 10 |
| Tuna | $40 | $27 | 5 |
| Maracuyá | $100 | $60 | 10 |
| Rambután | $90 | $50 | 30 |
| Ciruela roja | $70 | $31 | 10 |

En `index.html`, estos productos muestran un selector Kg / Gramos / Pieza — el precio de la línea se recalcula según la unidad elegida (precio o costo por kg ÷1000 para gramos, ÷piezas por kg para pieza).

**Piezas fijas:**
| Producto | Precio | Costo familiar |
|---|---|---|
| Coco (café) | $60 | $40 |
| Pitahaya | $80 | $36.67 |

**Bote / clamshell fijos:**
| Producto | Presentación | Precio | Costo familiar |
|---|---|---|---|
| Cereza | bote | $120 | $70 |
| Higo | clamshell | $100 | $60 |

---

## Cómo actualizar precios del proveedor

Cuando Gus suba precios, hay que tocar **dos archivos**:

### 1. `index.html` — actualizar el costo actual (línea ~109)

Busca el objeto `CATALOGO` y cambia el campo `costo` de cada fruta afectada:

```js
var CATALOGO = [
  { id:"zarzamora", nombre:"Zarzamora", precio:70, costo:60, ... },
  //                                               ↑ cambiar este valor
```

### 2. `panel.html` — agregar vigencia al historial (línea ~192)

Busca `HIST_COSTO_PROVEEDOR` y **agrega una nueva entrada al final** de cada lista afectada. **No borrar las entradas viejas** — sirven para calcular márgenes de pedidos históricos correctamente.

```js
var HIST_COSTO_PROVEEDOR = {
  "Zarzamora": [
    {desde:"2000-01-01", costo:45},
    {desde:"2026-06-08", costo:60},
    {desde:"YYYY-MM-DD", costo:NUEVO}  // ← agregar aquí
  ],
```

La fecha `desde` es el día a partir del cual aplica el nuevo costo.

### Publicar el cambio

```bash
git add index.html panel.html
git commit -m "precio: actualizar costo proveedor YYYY-MM-DD"
git push
```

GitHub Pages despliega en ~1 minuto.

---

## Cómo agregar un producto nuevo

### Producto de fruta directa (sin clamshell)

Agregar en `CATALOGO` dentro de `index.html`:

```js
{ id:"nuevo_id", nombre:"Nombre", precio:XX, costo:XX, slots:0, emoji:"🍓" },
```

- `slots:0` = no tiene clamshell, se vende directamente
- `id` debe ser único, sin espacios

### Producto de Ludo Mercado por kg (con conversor gramos/pieza)

Agregar en `CATALOGO` dentro de `config.js`:

```js
{ id:"nuevo_id", nombre:"Nombre", precio:XX, costo:XX, unidad:"kg", piezasPorKg:N, slots:0, emoji:"🍋" },
```

- `precio`/`costo` son valores **por kg**; el conversor los divide entre 1000 (gramos) o entre `piezasPorKg` (pieza).
- Agregar también su historial en `HIST_COSTO_PROVEEDOR_KG` (config.js) para que `panel.html` calcule bien el pago a proveedor.
- El nombre se guarda en Sheets con sufijo de unidad, ej. `"Nombre (1.5 kg)"` — necesario para que `panel.html` lo reconozca.

### Producto con clamshell (el cliente elige fruta)

```js
{ id:"nuevo_pack", nombre:"Nuevo Pack", precio:XX, costo:XX, slots:2, emoji:"📦" },
```

- `slots:2` = el cliente elige 2 frutas para llenar los clamshells
- El panel calcula el costo usando el historial de la fruta elegida

### Agregar al historial de costos en `panel.html`

Si el producto nuevo tiene un costo fijo propio (no depende de la fruta), agregar en `HIST_COSTO_PROVEEDOR`:

```js
"Nuevo producto": [ {desde:"YYYY-MM-DD", costo:XX} ],
```

---

## Stack técnico

- HTML + JavaScript vanilla — sin npm, sin frameworks, sin instalación
- Google Apps Script como backend (guarda y lee pedidos)
- Deploy: GitHub Pages — automático al hacer push a `main`

### Google Apps Script
- URL del script: `https://script.google.com/macros/s/AKfycbwI.../exec`
- `?data=...` → escribe filas en la hoja
- `?action=read` → devuelve todos los pedidos en JSON
- La hoja de Google Sheets es el "backend" — todos los pedidos históricos están ahí

---

## Estructura de la hoja de Google Sheets

Cada fila es un producto de un pedido:

| Columna | Contenido |
|---|---|
| Producto | Nombre del producto + frutas elegidas |
| Cantidad | Número de unidades |
| Nombre y casa | Cliente + referencia |
| Precio unitario | Precio de venta |
| Total venta | Precio × cantidad |
| Pagado | Estado del pago |
| Entrega | Fecha de entrega |
| Subtotal costo | Costo al proveedor |
| Pagar a Gus | Total a pagar al proveedor |
| Ganancia | Venta − costo |
| Ubicación | Normal / Familiar |
| Dirección | Dirección de entrega si aplica |
