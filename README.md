# Lista de tareas

Una lista de tareas sencilla hecha con HTML, CSS y JavaScript, sin librerías. La publico con GitHub Pages.

**Demo:** https://&lt;usuario&gt;.github.io/lista-tareas/

## Funciones

- Agregar tareas (con Enter o el botón)
- Marcarlas como hechas y eliminarlas
- Editar una tarea con doble clic
- Filtrar entre todas, pendientes y completadas
- Borrar todas las completadas de una vez
- Las tareas se guardan en el navegador (`localStorage`), así que siguen ahí al recargar la página

## Archivos

| Archivo      | Contenido                          |
|--------------|------------------------------------|
| `index.html` | Estructura de la página            |
| `style.css`  | Estilos                            |
| `script.js`  | Lógica de la lista y del guardado  |
| `.github/workflows/deploy.yml` | Despliegue automático con GitHub Actions |

## Verla en local

Abre `index.html` en el navegador. No hace falta instalar nada.

## Publicarla con GitHub Pages

El despliegue lo hace GitHub Actions con el workflow `.github/workflows/deploy.yml`.

1. Crea el repositorio en GitHub.
2. Ve a **Settings → Pages** y en **Source** elige **GitHub Actions**.
3. Sube el código a la rama `main`. Cada push a `main` vuelve a publicar la página.
4. Puedes ver el progreso en la pestaña **Actions**. Cuando termine, la página estará en `https://<usuario>.github.io/lista-tareas/`.
