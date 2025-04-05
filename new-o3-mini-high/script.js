// Mapping von Markdown-Überschriften zu den Container-IDs
const sectionMapping = {
  "Lean Canvas": "lean-canvas",
  "Problem": "problem",
  "Solution": "solution",
  "Key Metrics": "key-metrics",
  "Unique Value Proposition": "unique-value-proposition",
  "Unfair Advantage": "unfair-advantage",
  "Channels": "channels",
  "Customer Segment": "customer-segment",
  "Cost Structure": "cost-structure",
  "Revenue Streams": "revenue-streams",
  "Todo": "todo"
};

document.addEventListener("DOMContentLoaded", () => {
  // PDF Export Button
  const exportBtn = document.getElementById("exportPDF");
  exportBtn.addEventListener("click", () => {
    window.print();
  });

  // Markdown laden und parsen
  fetch('canvas.md')
    .then(response => {
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Markdown-Datei.");
      }
      return response.text();
    })
    .then(parseMarkdown)
    .catch(error => {
      console.error(error);
    });
});

function parseMarkdown(mdText) {
  const lines = mdText.split('\n');
  let currentSection = null;
  const sectionContent = {};

  lines.forEach(line => {
    line = line.trim();
    if (line.startsWith("# ")) {
      // Neue Überschrift
      const header = line.replace("# ", "").trim();
      if (sectionMapping.hasOwnProperty(header)) {
        currentSection = sectionMapping[header];
        // Bei "lean-canvas" als Fließtext, sonst Array für Listeneinträge
        sectionContent[currentSection] = (currentSection === "lean-canvas") ? "" : [];
      } else {
        currentSection = null;
      }
    } else if (currentSection) {
      if (line !== "") {
        if (currentSection === "lean-canvas") {
          sectionContent[currentSection] += line + " ";
        } else if (/^[-*]\s+/.test(line)) {  // geänderte Regex: Erlaubt mehrere Leerzeichen
          const item = line.replace(/^[-*]\s+/, "").trim();
          sectionContent[currentSection].push(item);
        } else {
          // Zeilen, die nicht als Listenpunkt erkannt werden, als Fließtext anhängen
          sectionContent[currentSection] += line + " ";
        }
      }
    }
  });

  // Inhalte in die entsprechenden Container einfügen
  for (const section in sectionContent) {
    if (section === "lean-canvas") {
      // Header aktualisieren: Integriere den Lean Canvas Text in den Überschriftentext
      const leanHeader = document.querySelector("#lean-canvas-header h1");
      const leanText = sectionContent[section].trim();
      const newHeaderText = leanText ? `Lean Canvas - ${leanText}` : "Lean Canvas";
      leanHeader.textContent = newHeaderText;
      document.title = newHeaderText;
    } else if (section === "todo") {
      // Todo wird separat verarbeitet (siehe unten)
      continue;
    } else {
      const container = document.querySelector(`#${section} .content`);
      if (container) {
        // Prüfen, ob der Inhalt als Array (Listeneinträge) vorliegt oder als Fließtext
        if (Array.isArray(sectionContent[section]) && sectionContent[section].length) {
          const ul = document.createElement("ul");
          sectionContent[section].forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
          });
          container.appendChild(ul);
        } else {
          container.textContent = sectionContent[section].trim();
        }
      }
    }
  }

  // Todo-Bereich erstellen, falls die Markdown-Sektion vorhanden ist
  if (sectionContent.hasOwnProperty("todo") && sectionContent["todo"]) {
    const todoData = sectionContent["todo"];
    // Erstelle Container
    const todoContainer = document.createElement("div");
    todoContainer.id = "todo-container";
    // Überschrift mit Toggle-Funktionalität
    const todoHeader = document.createElement("h2");
    todoHeader.textContent = "Todo";
    todoHeader.addEventListener("click", () => {
      // Toggle Anzeige des Inhalts
      const currentDisplay = todoContent.style.display;
      todoContent.style.display = (currentDisplay === "none") ? "" : "none";
    });
    // Inhalt
    const todoContent = document.createElement("div");
    todoContent.classList.add("todo-content");
    // Wenn als Array (Liste) vorliegend, als Liste anzeigen, sonst als Fließtext
    if (Array.isArray(todoData) && todoData.length) {
      const ul = document.createElement("ul");
      todoData.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
      todoContent.appendChild(ul);
    } else {
      todoContent.textContent = todoData.trim();
    }
    // Standardmäßig sichtbar (Default)
    todoContent.style.display = "";
    
    // Zusammenbauen und unterhalb der Canvas einfügen
    todoContainer.appendChild(todoHeader);
    todoContainer.appendChild(todoContent);
    const canvas = document.querySelector(".canvas");
    canvas.parentNode.insertBefore(todoContainer, canvas.nextSibling);
  }
}

