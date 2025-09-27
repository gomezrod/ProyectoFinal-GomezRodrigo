# 🛍️ React E-commerce - Lashee
Este proyecto es una aplicación de **e-commerce** desarrollada con **React** que se centra en la venta de suministros para extensiones de pestañas. Por falta de tiempo, las imágenes son aleatorias, tomadas desde - [fakestoreAPI](https://fakestoreapi.com/)
Cuenta con una **interfaz amigable para los clientes** y un **panel de administración** accesible desde la ruta `/admin` que permite la gestión avanzada de la base de datos de productos.

---

## 🚀 Características

- **Catálogo de productos:**  
  Visualización dinámica de productos, con información detallada como título, descripción, precio y stock disponible.

- **Gestión avanzada de productos (`/admin`):**
  - Crear nuevos productos.
  - Editar información existente.
  - Eliminar productos de la base de datos.
  - Controlar el stock y categorías.

- **Filtrado y búsqueda:**
  - Filtrar productos por categoría. (Próximamente)
  - Buscar productos por nombre.
  - Paginación, elección de cantidad de productos a mostrar por página.

- **Base de datos en Firebase:**
  - Datos en **Firestore**.
  - Uso de funciones como `addDoc`, `updateDoc`, `deleteDoc` y `getDocs`.

- **Ruteo con React Router:**
  - `/` → Página principal.
  - `/productos/` → Lista de productos.
  - `/productos/:id` → Detalle de producto.
  - `/admin` → Panel de administración.

---

## 🗂️ Estructura del Proyecto

```
/src
  /components       -> Componentes reutilizables (Card, Navbar, etc.) y sus estilos 
  /context          -> Context API para carrito y productos
  /db               -> Conexiones a Firebase, lógica de datos y archivos JSON
  /assets           -> Imágenes y archivos estáticos
  App.jsx           -> Configuración principal de rutas
  main.jsx          -> Punto de entrada de la app
  firebase.js       -> Configuración de Firebase
```

---

## ⚙️ Tecnologías utilizadas

- **React** - Librería principal para la construcción de la UI.  
- **Vite** - Herramienta para desarrollo rápido y compilación.  
- **Firebase (Firestore)** - Base de datos en la nube para almacenamiento y consultas.  
- **React Router** - Manejo de rutas dinámicas en la aplicación.  

---

## 📥 Instalación y ejecución

Sigue estos pasos para instalar y correr el proyecto localmente:

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu_usuario/ProyectoFinal-GomezRodrigo.git
cd react-ecommerce-lash
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar Firebase
1. Crea un proyecto en [Firebase](https://firebase.google.com/).
2. Configura **Firestore Database**.
3. Obtén las credenciales de tu app y colócalas en un archivo `.env` en la raíz del proyecto:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 4️⃣ Ejecutar el proyecto
```bash
npm run dev
```

Accede en tu navegador a:
```
http://localhost:5173
```

---

## 🗃️ Datos iniciales (Mock)
Puedes cargar datos iniciales en Firestore usando el archivo `products.json`.  
Ejemplo de campos en cada producto:

```json
{
  "title": "Kit Profesional de Extensiones de Pestañas",
  "price": 109.95,
  "description": "Kit completo para la aplicación profesional de extensiones de pestañas.",
  "category": "kits",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  "stock": 25
}
```

---

## 🔑 Ruta `/admin`

La ruta **`/admin`** permite a los usuarios autorizados realizar:
- **Agregar nuevos productos** a la base de datos.  
- **Editar productos existentes**.  
- **Eliminar productos**.  
- **Controlar el stock** y las categorías.

> ⚠️ **Nota:** En el futuro se implementará autenticación para restringir el acceso a esta sección.

---

## 🧪 Scripts disponibles

| Comando            | Descripción |
|--------------------|-------------|
| `npm run dev`      | Ejecuta el proyecto en modo desarrollo. |
| `npm run build`    | Genera la build para producción. |
| `npm run preview`  | Previsualiza la build generada. |

---

## 🌐 Deploy
Puedes desplegar el proyecto fácilmente en **Vercel**, **Netlify** o **Firebase Hosting**.  
Ejemplo para Vercel:
```bash
npm run build
vercel deploy
```

---

## 🤝 Contribuciones
¡Las contribuciones son bienvenidas!  
Si deseas colaborar, haz un fork del proyecto y envía un **pull request**.

---

## 📜 Licencia
Este proyecto está bajo la licencia MIT.  
Consulta el archivo [LICENSE](LICENSE) para más información.