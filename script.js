// script.js completo con memoria + reset

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
          { id: "historia-lengua", name: "Historia de la Lengua Inglesa", requires: ["historias-cultura"] }, // <-- corrección aquí
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

const content = document.getElementById('content');
const passedCourses = new Set(JSON.parse(localStorage.getItem("passedCourses") || "[]"));
const courseNotes = JSON.parse(localStorage.getItem("courseNotes") || "{}");
const courseElements = new Map();

// Crear barra de progreso
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

// Crear promedio
const avgDisplay = document.createElement('div');
avgDisplay.id = "average-display";
avgDisplay.style.textAlign = "center";
avgDisplay.style.marginTop = "10px";
avgDisplay.style.fontWeight = "bold";
avgDisplay.style.color = "#3a2161";
document.body.insertBefore(avgDisplay, content);

// Crear botón de reinicio
const resetButton = document.createElement('button');
resetButton.textContent = "Reiniciar malla";
resetButton.style.padding = "10px 20px";
resetButton.style.margin = "20px auto";
resetButton.style.display = "block";
resetButton.style.backgroundColor = "#ffb3d9";
resetButton.style.border = "none";
resetButton.style.borderRadius = "8px";
resetButton.style.color = "#3a2161";
resetButton.style.fontWeight = "600";
resetButton.style.cursor = "pointer";
resetButton.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
resetButton.addEventListener("click", () => {
  if (confirm("¿Estás seguro de que querés reiniciar tu progreso y notas?")) {
    localStorage.removeItem("passedCourses");
    localStorage.removeItem("courseNotes");
    passedCourses.clear();
    for (const input of document.querySelectorAll(".nota-input")) {
      input.remove();
    }
    updateCourses();
  }
});
document.body.insertBefore(resetButton, content);

function canUnlock(course) {
  if (!course.requires) return true;
  return course.requires.every(reqId => passedCourses.has(reqId));
}

function updateCourses() {
  for (const course of courseElements.values()) {
    const { id, element, data } = course;

    element.querySelector(".nota-input")?.remove();

    if (passedCourses.has(id)) {
      element.classList.add('passed');
      element.classList.remove('active');
      element.style.cursor = 'default';

      // Agregar input de nota
      const notaInput = document.createElement("input");
      notaInput.type = "number";
      notaInput.className = "nota-input";
      notaInput.placeholder = "Nota (1-10)";
      notaInput.min = 1;
      notaInput.max = 10;
      notaInput.value = courseNotes[id] || "";
      notaInput.addEventListener("change", () => {
        const nota = parseFloat(notaInput.value);
        if (!isNaN(nota) && nota >= 1 && nota <= 10) {
          courseNotes[id] = nota;
        } else {
          delete courseNotes[id];
        }
        localStorage.setItem("courseNotes", JSON.stringify(courseNotes));
        updateAverage();
      });
      element.appendChild(notaInput);

    } else if (canUnlock(data)) {
      element.classList.add('active');
      element.classList.remove('passed');
      element.style.cursor = 'pointer';
    } else {
      element.classList.remove('active', 'passed');
      element.style.cursor = 'not-allowed';
    }
  }
  updateProgressBar();
  updateAverage();
}

function updateProgressBar() {
  const total = courseElements.size;
  const passed = passedCourses.size;
  const percent = Math.round((passed / total) * 100);
  progressBar.style.width = percent + '%';
  progressText.textContent = `${percent}% completado`;
}

function updateAverage() {
  const notas = Object.entries(courseNotes)
    .filter(([id]) => passedCourses.has(id))
    .map(([_, nota]) => parseFloat(nota))
    .filter(n => !isNaN(n));

  if (notas.length > 0) {
    const promedio = notas.reduce((a, b) => a + b, 0) / notas.length;
    avgDisplay.textContent = `Promedio general: ${promedio.toFixed(2)}`;
  } else {
    avgDisplay.textContent = `Promedio general: -`;
  }
}

function buildUI() {
  for (const yearData of data) {
    const yearDiv = document.createElement('div');
    yearDiv.className = 'year-group';

    const yearTitle = document.createElement('h2');
    yearTitle.textContent = yearData.year;
    yearDiv.appendChild(yearTitle);

    for (const semData of yearData.semesters) {
      const semDiv = document.createElement('div');
      semDiv.className = 'semester-group';

      const semTitle = document.createElement('h3');
      semTitle.textContent = semData.name;
      semDiv.appendChild(semTitle);

      const coursesGrid = document.createElement('div');
      coursesGrid.className = 'courses-grid';

      for (const course of semData.courses) {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course';
        courseDiv.id = course.id;
        courseDiv.textContent = course.name;

        courseDiv.addEventListener('click', () => {
          if (!canUnlock(course)) return;
          if (passedCourses.has(course.id)) return;
          passedCourses.add(course.id);
          localStorage.setItem("passedCourses", JSON.stringify([...passedCourses]));
          updateCourses();
        });

        coursesGrid.appendChild(courseDiv);
        courseElements.set(course.id, { id: course.id, element: courseDiv, data: course });
      }

      semDiv.appendChild(coursesGrid);
      yearDiv.appendChild(semDiv);
    }

    content.appendChild(yearDiv);
  }
  updateCourses();
}

buildUI();
