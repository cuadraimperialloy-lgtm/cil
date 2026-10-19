# Cuadra Imperial Loy · Sitio Web Oficial con CMS Integrado

Sitio web oficial, catálogo de lujo y panel de administración (CMS) de **Cuadra Imperial Loy**, cuadra privada en Zapotlanejo, Jalisco (a 38 minutos de Guadalajara). Especializada en la venta exclusiva de caballos frisones importados de Holanda, registrados en la Real Asociación KFPS, con pasaporte y documentación que pasa directamente a nombre del comprador.

---

## 1. La Marca y Propuesta de Valor

- **Nombre Oficial:** Siempre completo: `Cuadra Imperial Loy`. (Nunca abreviado).
- **Promesa Única:** *“Recibe su caballo sano y con papeles de origen.”*
- **Sede:** Zapotlanejo, Jalisco, México.
- **WhatsApp Oficial de Ventas:** `+52 33 1702 6066`
- **Los Cuatro Diferenciadores:**
  1. **Cita privada:** Solo usted, su gente y los caballos, sin presión. Su caballerango siempre es bienvenido.
  2. **Selectos uno por uno en Holanda:** No son de lote; revisados y probados en los establos holandeses.
  3. **Padre y abuelo con papeles:** *“Hijo de [padre]”*, *“Nieto de [abuelo]”*, con predicados KFPS tal cual constan en el registro.
  4. **Sin contratos ni palabras de más:** Se dice lo que se ve en la pista y lo que avala el papel oficial.

---

## 2. Arquitectura y Stack Tecnológico

- **Frontend & Server:** Next.js 15 / 16 (App Router) + TypeScript + Tailwind CSS + Framer Motion.
- **CMS / Panel de Administración:** Integrado en `/admin` con roles (Administrador, Editor, Ventas) y autenticación.
- **Base de Datos & Persistencia:** Almacenamiento local JSON estructurado y atómico en `data/database.json`, con compatibilidad directa para PostgreSQL / Supabase vía variable de entorno `DATABASE_URL`.
- **Generación de Fichas PDF:** Motor servidor con `jspdf` y `qrcode`:
  - **Ficha Básica (1 página):** Formato para compartir por WhatsApp con QR y datos clave.
  - **Ficha Completa (2 páginas):** Generada tras registro en el modal de prospectos, con marca de agua personalizada (*Preparado para [Nombre] · [Fecha]*), placas radiológicas, dictamen veterinario y glosario KFPS.
- **Bilingüe:** Rutas `/es` y `/en`, con selector visible en cabecera y pie de página.
- **SEO & Metadatos:** Metadatos dinámicos OpenGraph, Twitter Cards, Schema.org para cada caballo.

---

## 3. Instalación y Ejecución Local

### Prerrequisitos
- Node.js >= 18.x (v20 o v24 recomendado)
- npm o pnpm

### Pasos
```bash
# 1. Instalar dependencias (si es clon nuevo)
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev

# 3. Abrir en el navegador:
# Sitio web público: http://localhost:3000/es
# Panel de administración (CMS): http://localhost:3000/admin
```

---

## 4. Estructura del Proyecto

```
├── public/
│   ├── brand/               # Logotipos oficiales (horizontal, monograma SVG, degradado)
│   └── images/              # Fotografías de alta resolución y video hero de caballos frisones
├── src/
│   ├── app/
│   │   ├── [lang]/          # Rutas bilingües (/es y /en)
│   │   │   ├── page.tsx     # Página de inicio (Hero, Ticker, Carrusel, Diferenciadores, etc.)
│   │   │   ├── ejemplares/  # Catálogo con filtros persistentes en URL
│   │   │   ├── nosotros/    # Quiénes somos y glosario oficial de predicados KFPS
│   │   │   ├── cita-privada/# Qué incluye, mapa y agenda directa por WhatsApp
│   │   │   ├── envios/      # Logística México, EE. UU. y Latinoamérica
│   │   │   └── contacto/    # Datos oficiales y enlace WhatsApp
│   │   ├── admin/           # Panel de administración y CMS
│   │   └── api/             # Endpoints REST (horses, leads, pdf, globals, stats)
│   ├── components/
│   │   ├── home/            # Intro animada, Hero de video, Ticker dorado, etc.
│   │   ├── horses/          # Ficha Shopify luxury, Lead Gate Modal, QuickView
│   │   └── layout/          # Navbar, Footer, WhatsApp flotante
│   ├── lib/
│   │   ├── db.ts            # Capa de persistencia, CRUD y cálculo de edad
│   │   └── pdf.ts           # Motor de generación de fichas PDF
│   └── types/               # Tipos TypeScript de toda la aplicación
└── data/
    └── database.json        # Base de datos persistente (auto-generada al primer inicio)
```

---

## 5. Panel de Administración (`/admin`)

El panel cuenta con tres roles:
1. **Administrador:** Acceso total (Caballos, Leads, Globales, Métricas, Eliminación).
2. **Editor:** Gestión de caballos, textos de portada y contenido editorial.
3. **Ventas:** Acceso enfocado a la lista de prospectos (leads), notas internas, cambio de estatus y apertura de WhatsApp con 1 toque.

### Cómo dar de alta un nuevo caballo paso a paso:
1. Ingrese a `/admin` y seleccione la pestaña **Ejemplares**.
2. Haga clic en **+ Nuevo Ejemplar**.
3. Ingrese el nombre (ej. `[EJEMPLO] Tjerk`) y seleccione el sexo (*Macho Entero*, *Capón* o *Yegua*).
4. Seleccione la fecha de nacimiento (la edad en años y meses se calcula sola).
5. Ingrese la alzada a la cruz en metros (ej. `1.68`).
6. Ingrese el padre y abuelo con sus predicados tal cual el papel (ej. `Alwin 469 Sport AAA`). **Regla de marca:** No incluya las siglas *Stb* ni *Vb*.
7. Ingrese la traducción del linaje en una frase corta y contundente.
8. Si desea mostrar el precio públicamente, active la casilla *Mostrar precio público en el sitio*; de lo contrario, el sitio mostrará automáticamente *“Precio por mensaje”*.
9. Guarde los cambios. El caballo aparecerá de inmediato en el catálogo y en la portada si está marcado como destacado.

---

## 6. Variables de Entorno (Opcionales para Producción)

Para despliegue en Vercel o Railway, cree un archivo `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://cuadraimperialloy.com
WHATSAPP_NUMBER=523317026066
# Opcional: Para conectar base de datos PostgreSQL externa:
# DATABASE_URL=postgresql://usuario:password@host:5432/cuadra_imperial
```
