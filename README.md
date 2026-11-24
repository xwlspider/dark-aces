# Dark Aces 🏐

Sitio web de voleibol inspirado en Haikyuu!!, en blanco y negro y responsive.

## Arquitectura
```
index.html              Estructura de la página (3 secciones + diálogos)
css/
  tokens.css            Colores, tipografías y variables (modo claro/oscuro)
  base.css              Reset, botones, formularios, diálogos
  layout.css            Header, secciones, hero, grid, footer
  components.css        Splash, tarjetas, radar, novedades
js/
  main.js               Punto de entrada: conecta servicios, estado y vistas
  config/               constants.js (stats, escala) · firebase.config.js (tus claves + UID admin)
  services/             firebase · auth.service · repository (CRUD genérico) · players/news.service
  state/store.js        Estado global reactivo (players, news, isAdmin)
  components/           radar · playerCard · newsCard · splash · diálogos
  views/                statsView · newsView (pintan el estado en el DOM)
  utils/                dom.js · image.js
firestore.rules         Reglas de seguridad (solo el admin escribe)
```
Flujo: `services → store → views → components`. La UI nunca habla directo con Firebase.

## Puesta en marcha
1. Crea un proyecto en Firebase. Activa **Authentication → Correo/contraseña** y crea tu usuario admin; copia su UID.
2. Crea **Firestore Database** y pega `firestore.rules` en la pestaña Reglas (cambia el UID).
3. Copia tu `firebaseConfig` y el UID en `js/config/firebase.config.js`.
4. Publica la carpeta en cualquier hosting estático (Netlify, GitHub Pages, Firebase Hosting).
   Los módulos ES necesitan servidor: en local usa Live Server o `npx serve`; no abras con doble clic.
5. En Firebase → Authentication → Configuración → Dominios autorizados, agrega tu dominio.

## Cambiar estadísticas o escala
Edita `js/config/constants.js`: el radar y el Overall se ajustan solos.

## Iniciar sesión como admin
Pulsa **🔒 Iniciar sesión** (arriba a la derecha) e ingresa el correo y la contraseña del usuario creado en Firebase → Authentication.
Si su UID coincide con `ADMIN_UID`, aparece la etiqueta ADMIN y los botones para agregar/editar jugadores y novedades.
