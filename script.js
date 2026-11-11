const CLAVE = "lista-tareas";

const form = document.getElementById("form-tarea");
const input = document.getElementById("nueva-tarea");
const lista = document.getElementById("lista");
const vacio = document.getElementById("vacio");
const contador = document.getElementById("contador");
const borrarCompletadas = document.getElementById("borrar-completadas");
const botonesFiltro = document.querySelectorAll(".filtros button");

let tareas = cargar();
let filtro = "todas";

// --- Guardado en el navegador ---

function cargar() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE));
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function guardar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(tareas));
  } catch {
    // Si el navegador bloquea el almacenamiento, la lista sigue funcionando sin guardarse.
  }
}

// --- Acciones ---

function agregar(texto) {
  tareas.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), texto, hecha: false });
  actualizar();
}

function alternar(id) {
  const tarea = tareas.find((t) => t.id === id);
  if (tarea) tarea.hecha = !tarea.hecha;
  actualizar();
}

function eliminar(id) {
  tareas = tareas.filter((t) => t.id !== id);
  actualizar();
}

function editar(id, texto) {
  const tarea = tareas.find((t) => t.id === id);
  if (!tarea) return;
  if (texto) {
    tarea.texto = texto;
  } else {
    tareas = tareas.filter((t) => t.id !== id);
  }
  actualizar();
}

function actualizar() {
  guardar();
  render();
}

// --- Dibujar la lista ---

function crearItem(tarea) {
  const li = document.createElement("li");
  li.className = "tarea" + (tarea.hecha ? " hecha" : "");

  const check = document.createElement("input");
  check.type = "checkbox";
  check.checked = tarea.hecha;
  check.setAttribute("aria-label", "Marcar como hecha");
  check.addEventListener("change", () => alternar(tarea.id));

  const texto = document.createElement("span");
  texto.className = "texto";
  texto.textContent = tarea.texto;
  texto.addEventListener("dblclick", () => empezarEdicion(li, texto, tarea));

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "eliminar";
  boton.textContent = "×";
  boton.setAttribute("aria-label", "Eliminar tarea");
  boton.addEventListener("click", () => eliminar(tarea.id));

  li.append(check, texto, boton);
  return li;
}

function empezarEdicion(li, span, tarea) {
  const campo = document.createElement("input");
  campo.type = "text";
  campo.className = "editar";
  campo.value = tarea.texto;
  campo.maxLength = 200;
  li.replaceChild(campo, span);
  campo.focus();
  campo.select();

  let terminado = false;
  const terminar = (guardarCambios) => {
    if (terminado) return;
    terminado = true;
    if (guardarCambios) {
      editar(tarea.id, campo.value.trim());
    } else {
      render();
    }
  };

  campo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") terminar(true);
    if (e.key === "Escape") terminar(false);
  });
  campo.addEventListener("blur", () => terminar(true));
}

function render() {
  const visibles = tareas.filter((t) => {
    if (filtro === "pendientes") return !t.hecha;
    if (filtro === "completadas") return t.hecha;
    return true;
  });

  lista.replaceChildren(...visibles.map(crearItem));
  vacio.hidden = visibles.length > 0;

  const pendientes = tareas.filter((t) => !t.hecha).length;
  contador.textContent = `${pendientes} ${pendientes === 1 ? "pendiente" : "pendientes"}`;
  borrarCompletadas.disabled = !tareas.some((t) => t.hecha);
}

// --- Eventos ---

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;
  agregar(texto);
  input.value = "";
  input.focus();
});

botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {
    filtro = boton.dataset.filtro;
    botonesFiltro.forEach((b) => {
      const activo = b === boton;
      b.classList.toggle("activo", activo);
      b.setAttribute("aria-pressed", activo);
    });
    render();
  });
});

borrarCompletadas.addEventListener("click", () => {
  tareas = tareas.filter((t) => !t.hecha);
  actualizar();
});

render();
