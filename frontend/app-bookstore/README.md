# 📚 App Bookstore

Aplicación web de gestión de librería construida con **Angular 19** usando arquitectura standalone y patrones modernos del framework. Permite gestionar libros y autores con operaciones CRUD completas, conectándose a una API REST externa.

---

## 🚀 Tecnologías

- **Angular 19** — Framework principal (componentes standalone, signals, inject)
- **Angular Material** — Biblioteca de componentes UI (Cards, Dialogs, SnackBar, Icons, etc.)
- **RxJS** — Manejo de peticiones HTTP mediante `Observable`
- **SCSS** — Estilos con preprocesador CSS
- **TypeScript** — Tipado estático en todo el proyecto
- **MockAPI** — API REST simulada para desarrollo

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── app.config.ts          # Configuración global de la app
│   ├── app.routes.ts          # Rutas raíz con lazy loading
│   ├── app.ts / app.html      # Componente raíz
│   │
│   ├── env/
│   │   └── enviroments.ts     # Variables de entorno (API URL, modo producción)
│   │
│   ├── features/
│   │   ├── interfaces/        # Contratos de datos TypeScript
│   │   │   ├── IAuthor.ts
│   │   │   └── IBook.ts
│   │   │
│   │   ├── services/          # Capa de acceso a la API
│   │   │   ├── authors-service/
│   │   │   └── books-service/
│   │   │
│   │   ├── pages/             # Componentes de página por feature
│   │   │   ├── home/
│   │   │   ├── authors/
│   │   │   │   ├── author-list/
│   │   │   │   ├── author-detail/
│   │   │   │   ├── author-form/
│   │   │   │   └── confirm-elimination/
│   │   │   └── books/
│   │   │       ├── book-list/
│   │   │       ├── book-detail/
│   │   │       ├── book-form/
│   │   │       └── confirm-elimination/
│   │   │
│   │   └── routes/            # Rutas por feature (lazy loading)
│   │       ├── home.route.ts
│   │       ├── author.route.ts
│   │       └── book.route.ts
│   │
│   └── shared/
│       ├── constants/         # Datos estáticos (países, meses)
│       └── pages/             # Componentes compartidos
│           ├── header/
│           ├── navbar/
│           └── footer/
```

---

## 🔌 Interfaces

Las interfaces TypeScript son el **contrato de datos** que define la forma de los objetos que viajan entre la API y los componentes. Están en `src/app/features/interfaces/`.

### `IAuthor`

```typescript
export interface IAuthor {
    id:          string;
    name:        string;
    country:     string;
    phoneNumber: string;
    createdAt:   Date;
}
```

Representa un autor en el sistema. El campo `country` se usa junto con el archivo de constantes `countries.ts` para mostrar el nombre del país completo en la UI.

### `IBook`

```typescript
export interface IBook {
    id:          string;
    name:        string;
    author:      string;
    publishedAt: string;
    createdAt:   string;
}
```

Representa un libro. El campo `author` guarda el nombre del autor como string (referencia denormalizada hacia `IAuthor`).

> **¿Por qué usar interfaces?** Permiten que TypeScript valide en tiempo de compilación que los datos recibidos de la API y enviados a los componentes tienen la estructura correcta. Si el backend cambia un campo, el compilador inmediatamente señala dónde hay que actualizar el código.

---

## ⚙️ Servicios

Los servicios encapsulan toda la lógica de comunicación con la API REST. Se ubican en `src/app/features/services/` y usan el decorador `@Injectable({ providedIn: 'root' })`, lo que los registra como **singleton** a nivel de aplicación.

Ambos servicios utilizan la función moderna `inject()` de Angular en lugar del constructor para obtener el `HttpClient`, alineándose con las prácticas de Angular 17+.

### `AuthorsService`

```typescript
@Injectable({ providedIn: 'root' })
export class AuthorsService {
  private apiUrl = enviroment.apiUrl;
  private http = inject(HttpClient);

  getAll(): Observable<IAuthor[]>                              // GET /authors
  getByID(id: string): Observable<IAuthor>                    // GET /authors/:id
  create(payload: Partial<IAuthor>): Observable<IAuthor>      // POST /authors
  update(id: string, payload: Partial<IAuthor>): Observable<IAuthor> // PUT /authors/:id
  delete(id: string): Observable<void>                        // DELETE /authors/:id
}
```

### `BooksService`

```typescript
@Injectable({ providedIn: 'root' })
export class BooksService {
  private apiUrl = enviroment.apiUrl;
  private http = inject(HttpClient);

  getAllBooks(): Observable<IBook[]>                           // GET /books
  getBookById(id: string): Observable<IBook>                  // GET /books/:id
  AddBook(payload: Partial<IBook>): Observable<IBook>         // POST /books
  UpdateBook(id: string, payload: Partial<IBook>): Observable<IBook> // PUT /books/:id
  DeleteBook(id: string): Observable<void>                    // DELETE /books/:id
}
```

> **Nota:** Todos los métodos devuelven `Observable<T>`. Los componentes se suscriben a estos observables mediante `.subscribe({ next, error })` para manejar tanto la respuesta exitosa como los errores de red.

> **`Partial<IAuthor>`** en los métodos `create` y `update` permite enviar solo los campos que van a ser guardados, sin necesidad de construir el objeto completo (por ejemplo, sin el `id` al crear).

---

## 🛣️ Routing

La aplicación implementa **lazy loading** en todos sus módulos de rutas, lo que significa que el código de cada sección solo se descarga cuando el usuario navega a ella, mejorando el tiempo de carga inicial.

### Rutas raíz (`app.routes.ts`)

| Path | Comportamiento |
|---|---|
| `/` | Redirige a `/home` |
| `/home` | Carga `home.route` |
| `/authors` | Carga `author.route` |
| `/books` | Carga `book.route` |
| `/**` | Redirige a `/home` |

### Rutas de Authors (`author.route.ts`)

| Path | Componente |
|---|---|
| `/authors` | `Authors` (listado) |
| `/authors/:id` | `AuthorDetail` (detalle) |

Los formularios de creación/edición y la confirmación de eliminación **no son rutas**, sino **diálogos de Angular Material** que se abren programáticamente desde el listado.

---

## ⚡ Signals

Los componentes usan **Signals** de Angular (disponibles desde Angular 16) para el manejo de estado reactivo local, en lugar de propiedades simples o `BehaviorSubject`:

```typescript
loading     = signal(false);
error       = signal<string | null>(null);
authorList  = signal<IAuthor[]>([]);
```

Los signals se actualizan con `.set()` y Angular detecta los cambios automáticamente para re-renderizar solo lo necesario, sin necesidad de `ChangeDetectionStrategy.OnPush` manual.

---

## 🏗️ Configuración de la App (`app.config.ts`)

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es' },
  ],
};
```

- `provideHttpClient()` — Habilita el cliente HTTP en toda la app (reemplaza `HttpClientModule`)
- `provideRouter(routes)` — Registra las rutas principales
- `LOCALE_ID: 'es'` — Configura el locale en español para pipes de fecha y número

---

## 🌐 Variables de Entorno

```typescript
// src/app/env/enviroments.ts
export const enviroment = {
    production: false,
    apiUrl: 'https://6a05cb38aa826ca75c0a9bc7.mockapi.io/bookstore-api/v1/'
};
```

La `apiUrl` apunta a **MockAPI**, un servicio que simula una API REST real durante el desarrollo. Ambos servicios importan este objeto para construir las URLs de sus peticiones.

---

## 🧩 Componentes Destacados

### Flujo CRUD de Authors/Books

Cada entidad sigue el mismo patrón:

1. **List** — Muestra tarjetas (MatCard) con los registros. Incluye búsqueda local y botones de acción.
2. **Form (Dialog)** — Se abre como modal de Angular Material. Sirve tanto para crear como para editar (recibe `data` con el autor/libro si es edición, o `null` si es creación).
3. **Confirm Elimination (Dialog)** — Modal de confirmación antes de eliminar. Recibe el objeto a eliminar vía `MAT_DIALOG_DATA`.
4. **Detail** — Vista de detalle accesible por ruta (`/authors/:id`), carga el registro por ID desde la API.

### Componentes Compartidos (`shared/`)

- **Header** — Encabezado visual de la aplicación
- **Navbar** — Barra de navegación con links a las secciones principales
- **Footer** — Pie de página

### Constantes (`shared/constants/`)

- `countries.ts` — Lista de países para el formulario de autores
- `months.ts` — Lista de meses para selects de fecha

---

## 🔧 Instalación y Ejecución

```bash
# Clonar el repositorio
git clone https://github.com/imnider/app-bookstore.git
cd app-bookstore

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
ng serve

# La app estará disponible en http://localhost:4200
```

---

## 📝 Notas adicionales

- El proyecto usa **componentes standalone** (sin NgModules), el enfoque moderno de Angular desde la v17.
- La inyección de dependencias se realiza con `inject()` en lugar del constructor, siguiendo las guías actuales del framework.
- Los formularios de Angular Material usan **Reactive Forms** para validación y control del estado del form.