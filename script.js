// script.js completo con memoria + reset actualizado

const data = [
  {
    year: "Primer Año",
    semesters: [
      {
        name: "Primer cuatrimestre",
        courses: [
          { id: "ingles-intermedio", name: "Inglés Nivel Intermedio", unlocks: ["ingles-avanzado"] },
          { id: "ingles-avanzado", name: "Inglés Nivel Avanzado", requires: ["ingles-intermedio"], unlocks: ["discursos-escritos", "gramatica-inglesa-1", "fonetica-1"] },
          { id: "discursos-escritos", name: "Discursos Escritos", requires: ["ingles-avanzado"], unlocks: ["procesos-escritura-1"] },
          { id: "gramatica-inglesa-1", name: "Gramática Inglesa 1", requires: ["ingles-avanzado"], unlocks: ["gramatica-inglesa-2"] },
          { id: "fonetica-1", name: "Fonética 1", requires: ["ingles-avanzado"], unlocks: ["fonetica-2", "discursos-orales"] },
        ]
      },
      {
        name: "Segundo cuatrimestre",
        courses: [
          { id: "procesos-escritura-1", name: "Procesos de Escritura 1", requires: ["discursos-escritos"], unlocks: ["discursos-integrales", "procesos-escritura-2", "teorias-del-sujeto"] },
          { id: "fonetica-2", name: "Fonética 2", requires: ["fonetica-1"], unlocks: ["fonologia-discurso", "historias-cultura"] },
          { id: "discursos-orales", name: "Discursos Orales", requires: ["fonetica-1"], unlocks: ["discursos-integrales", "fonologia-discurso", "historias-cultura"] },
        ]
      }
    ]
  },
  {
    year: "Segundo Año",
    semesters: [
      {
        name: "Primer cuatrimestre",
        courses: [
          { id: "fonologia-discurso", name: "Fonología y Discurso", requires: ["fonetica-2", "discursos-orales"], unlocks: ["practicas-1"] },
          { id: "procesos-escritura-2", name: "Procesos de Escritura 2", requires: ["procesos-escritura-1"], unlocks: ["practicas-1", "literatura-1"] },
          { id: "problematicas", name: "Problemática Educativa", unlocks: ["teorias-del-sujeto"] },
          { id: "teorias-del-sujeto", name: "Teorías del Sujeto y Aprendizaje", requires: ["procesos-escritura-1", "problematicas"], unlocks: ["didactica-curriculo", "metodologia-ensenanza"] },
        ]
      },
      {
        name: "Segundo cuatrimestre",
        courses: [
          { id: "discursos-integrales", name: "Discursos Integrales", requires: ["procesos-escritura-1", "discursos-orales"], unlocks: ["seminario-literatura"] },
          { id: "gramatica-inglesa-2", name: "Gramática Inglesa 2", requires: ["gramatica-inglesa-1"], unlocks: ["residencia-1", "historias-cultura", "didactica-investigacion", "residencia-2"] },
          { id: "historias-cultura", name: "Historias de Cultura de Habla Inglesa", requires: ["fonetica-2", "discursos-orales", "gramatica-inglesa-2"], unlocks: ["historia-contemporanea", "historia-lengua"] },
          { id: "metodologia-ensenanza", name: "Metodología de la Enseñanza", requires: ["teorias-del-sujeto"], unlocks: ["didactica-curriculo"] },
        ]
      }
    ]
  },
  {
    year: "Tercer Año",
    semesters: [
      {
        name: "Primer cuatrimestre",
        courses: [
          { id: "practicas-1", name: "Prácticas Discursivas e Interculturalidad 1", requires: ["procesos-escritura-2", "fonologia-discurso"], unlocks: ["residencia-2", "practicas-2"] },
          { id: "literatura-1", name: "Literatura en Lengua Inglesa 1", requires: ["procesos-escritura-2"], unlocks: ["literatura-2"] },
          { id: "historia-contemporanea", name: "Historia Contemporánea de Culturas de Habla Inglesa", requires: ["historias-cultura"] },
          { id: "didactica-curriculo", name: "Didáctica y Currículo", requires: ["teorias-del-sujeto", "metodologia-ensenanza"], unlocks: ["residencia-1", "linguistica", "metodologia-investigacion", "didactica-investigacion"] },
        ]
      },
      {
        name: "Segundo cuatrimestre",
        courses: [
          { id: "literatura-2", name: "Literatura en Lengua Inglesa 2", requires: ["literatura-1"] },
          { id: "residencia-1", name: "Residencia Docente 1", requires: ["gramatica-inglesa-2", "didactica-curriculo", "italiano", "practicas-sociocomunitarias"], unlocks: ["residencia-2"] },
          { id: "gramatica-castellana", name: "Gramática Castellana (Optativa)" }
        ]
      }
    ]
  },
  {
    year: "Cuarto Año",
    semesters: [
      {
        name: "Primer cuatrimestre",
        courses: [
          { id: "practicas-2", name: "Prácticas Discursivas e Interculturalidad 2", requires: ["practicas-1"], unlocks: ["residencia-2"] },
          { id: "didactica-investigacion", name: "Didáctica e Investigación Educativa", requires: ["gramatica-inglesa-2", "didactica-curriculo"], unlocks: ["residencia-2"] },
          { id: "metodologia-investigacion", name: "Metodología de la Investigación Científica", requires: ["didactica-curriculo"] },
          { id: "linguistica", name: "Lingüística 1 o 2 (Optativa)", requires: ["didactica-curriculo"] },
        ]
      },
      {
        name: "Segundo cuatrimestre",
        courses: [
          { id: "historia-lengua", name: "Historia de la Lengua Inglesa", requires: ["historias-cultura"] },
          { id: "residencia-2", name: "Residencia Docente 2", requires: ["residencia-1", "practicas-1", "practicas-2", "didactica-investigacion"] },
          { id: "seminario-literatura", name: "Seminario de Literatura Comparada", requires: ["discursos-integrales"] },
          { id: "taller", name: "Taller (Optativo)" },
          { id: "italiano", name: "Nivel Idioma: Italiano", unlocks: ["residencia-1"] },
          { id: "practicas-sociocomunitarias", name: "Prácticas Sociocomunitarias" }
        ]
      }
    ]
  }
];
const state = JSON.parse(localStorage.getItem("state")) || {};

function isUnlocked(course) {
  if (!course.requires) return true;
  return course.requires.every(req => state[req]);
}

function updateProgressBar() {
  const allCourses = document.querySelectorAll('.course');
  const approvedCourses = document.querySelectorAll('.course.approved');
  const percentage = Math.round((approvedCourses.length / allCourses.length) * 100);
  const bar = document.querySelector('.progress-fill');
  bar.style.width = percentage + "%";
  bar.textContent = percentage + "%";
}

function createCourse(course) {
  const button = document.createElement("button");
  button.textContent = course.name;
  button.id = course.id;
  button.className = "course";
  if (!isUnlocked(course)) {
    button.disabled = true;
  }
  if (state[course.id]) {
    button.classList.add("approved");
  }

  button.addEventListener("click", () => {
    state[course.id] = !state[course.id];
    localStorage.setItem("state", JSON.stringify(state));
    render();
  });

  return button;
}

function render() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  data.forEach(year => {
    const yearDiv = document.createElement("div");
    yearDiv.className = "year";
    const yearTitle = document.createElement("h2");
    yearTitle.textContent = year.year;
    yearDiv.appendChild(yearTitle);

    year.semesters.forEach(sem => {
      const semDiv = document.createElement("div");
      semDiv.className = "semester";
      const semTitle = document.createElement("h3");
      semTitle.textContent = sem.name;
      semDiv.appendChild(semTitle);

      const courseContainer = document.createElement("div");
      courseContainer.className = "courses";

      sem.courses.forEach(course => {
        const btn = createCourse(course);
        courseContainer.appendChild(btn);
      });

      semDiv.appendChild(courseContainer);
      yearDiv.appendChild(semDiv);
    });

    container.appendChild(yearDiv);
  });

  updateProgressBar();
}

document.getElementById("reset").addEventListener("click", () => {
  localStorage.removeItem("state");
  Object.keys(state).forEach(key => delete state[key]);
  render();
});

render();
