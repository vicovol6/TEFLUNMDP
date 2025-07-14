// script.js

const courses = [
  {
    id: "ingles-intermedio",
    name: "Inglés Nivel Intermedio",
    unlocks: ["ingles-avanzado"]
  },
  {
    id: "ingles-avanzado",
    name: "Inglés Nivel Avanzado",
    requires: ["ingles-intermedio"],
    unlocks: ["discursos-escritos", "gramatica-inglesa-1", "fonetica-1"]
  },
  {
    id: "discursos-escritos",
    name: "Discursos Escritos",
    requires: ["ingles-avanzado"],
    unlocks: ["procesos-escritura-1"]
  },
  {
    id: "gramatica-inglesa-1",
    name: "Gramática Inglesa 1",
    requires: ["ingles-avanzado"],
    unlocks: ["gramatica-inglesa-2"]
  },
  {
    id: "fonetica-1",
    name: "Fonética 1",
    requires: ["ingles-avanzado"],
    unlocks: ["fonetica-2", "discursos-orales"]
  },
  {
    id: "procesos-escritura-1",
    name: "Procesos de Escritura 1",
    requires: ["discursos-escritos"],
    unlocks: ["discursos-integrales", "procesos-escritura-2", "teorias-del-sujeto"]
  },
  {
    id: "fonetica-2",
    name: "Fonética 2",
    requires: ["fonetica-1"],
    unlocks: ["fonologia-discurso", "historias-cultura"]
  },
  {
    id: "discursos-orales",
    name: "Discursos Orales",
    requires: ["fonetica-1"],
    unlocks: ["discursos-integrales", "fonologia-discurso", "historias-cultura"]
  },
  {
    id: "discursos-integrales",
    name: "Discursos Integrales",
    requires: ["procesos-escritura-1", "discursos-orales"],
    unlocks: ["seminario-literatura"]
  },
  {
    id: "procesos-escritura-2",
    name: "Procesos de Escritura 2",
    requires: ["procesos-escritura-1"],
    unlocks: ["practicas-1", "literatura-1"]
  },
  {
    id: "gramatica-inglesa-2",
    name: "Gramática Inglesa 2",
    requires: ["gramatica-inglesa-1"],
    unlocks: ["residencia-1", "historias-cultura", "didactica-investigacion", "residencia-2"]
  },
  {
    id: "fonologia-discurso",
    name: "Fonología y Discurso",
    requires: ["fonetica-2", "discursos-orales"],
    unlocks: ["practicas-1"]
  },
  {
    id: "historias-cultura",
    name: "Historias de Cultura de Habla Inglesa",
    requires: ["fonetica-2", "discursos-orales", "gramatica-inglesa-2"],
    unlocks: ["historia-contemporanea"]
  },
  {
    id: "problematicas",
    name: "Problemática Educativa",
    unlocks: ["teorias-del-sujeto"]
  },
  {
    id: "teorias-del-sujeto",
    name: "Teorías del Sujeto y Aprendizaje",
    requires: ["procesos-escritura-1", "problematicas"],
    unlocks: ["didactica-curriculo", "metodologia-ensenanza"]
  },
  {
    id: "didactica-curriculo",
    name: "Didáctica y Currículo",
    requires: ["teorias-del-sujeto", "metodologia-ensenanza"],
    unlocks: ["residencia-1", "linguistica", "metodologia-investigacion", "didactica-investigacion"]
  },
  {
    id: "metodologia-ensenanza",
    name: "Metodología de la Enseñanza",
    requires: ["teorias-del-sujeto"],
    unlocks: ["didactica-curriculo"]
  },
  {
    id: "residencia-1",
    name: "Residencia Docente 1",
    requires: ["gramatica-inglesa-2", "didactica-curriculo", "italiano", "practicas-sociocomunitarias"],
    unlocks: ["residencia-2"]
  },
  {
    id: "residencia-2",
    name: "Residencia Docente 2",
    requires: ["residencia-1", "practicas-1", "practicas-2", "didactica-investigacion"]
  },
  {
    id: "practicas-1",
    name: "Prácticas Discursivas e Interculturalidad 1",
    requires: ["procesos-escritura-2", "fonologia-discurso"],
    unlocks: ["residencia-2", "practicas-2"]
  },
  {
    id: "practicas-2",
    name: "Prácticas Discursivas e Interculturalidad 2",
    requires: ["practicas-1"],
    unlocks: ["residencia-2"]
  },
  {
    id: "didactica-investigacion",
    name: "Didáctica e Investigación Educativa",
    requires: ["gramatica-inglesa-2", "didactica-curriculo"],
    unlocks: ["residencia-2"]
  },
  {
    id: "italiano",
    name: "Nivel Idioma: Italiano",
    unlocks: ["residencia-1"]
  },
  {
    id: "practicas-sociocomunitarias",
    name: "Prácticas Sociocomunitarias",
    unlocks: ["residencia-1"]
  },
  {
    id: "literatura-1",
    name: "Literatura en Lengua Inglesa 1",
    requires: ["procesos-escritura-2"],
    unlocks: ["literatura-2"]
  },
  {
    id: "literatura-2",
    name: "Literatura en Lengua Inglesa 2",
    requires: ["literatura-1"]
  },
  {
    id: "historia-contemporanea",
    name: "Historia Contemporánea de Culturas de Habla Inglesa",
    requires: ["historias-cultura"]
  },
  {
    id: "seminario-literatura",
    name: "Seminario de Literatura Comparada",
    requires: ["discursos-integrales"]
  },
  {
    id: "linguistica",
    name: "Lingüística 1 o 2 (Optativa)",
    requires: ["didactica-curriculo"]
  },
  {
    id: "metodologia-investigacion",
    name: "Metodología de la Investigación Científica",
    requires: ["didactica-curriculo"]
  },
  {
    id: "gramatica-castellana",
    name: "Gramática Castellana (Optativa)"
  },
  {
    id: "taller",
    name: "Taller (Optativo)"
  }
];

const grid = document.getElementById("grid");
const courseElements = {};
const passedCourses = new Set();

function checkUnlock(course) {
  if (!course.requires) return true;
  return course.requires.every(req => passedCourses.has(req));
}

function updateCourses() {
  courses.forEach(course => {
    const el = courseElements[course.id];
    if (passedCourses.has(course.id)) {
      el.classList.add("passed");
      el.classList.remove("active");
    } else if (checkUnlock(course)) {
      el.classList.add("active");
      el.classList.remove("passed");
      el.style.cursor = "pointer";
    } else {
      el.classList.remove("active", "passed");
      el.style.cursor = "not-allowed";
    }
  });
}

courses.forEach(course => {
  const div = document.createElement("div");
  div.className = "course";
  div.id = course.id;
  div.innerHTML = `<h3>${course.name}</h3>`;
  div.addEventListener("click", () => {
    if (!checkUnlock(course)) return;
    passedCourses.add(course.id);
    updateCourses();
  });
  courseElements[course.id] = div;
  grid.appendChild(div);
});

updateCourses();
