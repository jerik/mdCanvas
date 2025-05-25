console.log("script.js geladen.");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded-Ereignis empfangen.");

  // PDF Export Button initialisieren
  const exportBtn = document.getElementById("exportPDF");
  if (exportBtn) {
    console.log("PDF Export Button gefunden.");
    exportBtn.addEventListener("click", () => {
      console.log("PDF Export Button geklickt. Öffne window.print().");
      window.print();
    });
  } else {
    console.warn("PDF Export Button nicht gefunden.");
  }

  // Markdown laden und parsen
  console.log("Starte Fetch für canvas.md...");
  fetch('canvas.md')
    .then(response => {
      console.log("Fetch-Antwort empfangen.");
      if (!response.ok) {
        throw new Error("Fehler beim Laden der Markdown-Datei.");
      }
      return response.text();
    })
    .then(mdText => {
      console.log("Markdown-Inhalt geladen:");
      console.log(mdText);
      parseMarkdown(mdText);
    })
    .catch(error => {
      console.error("Fehler beim Laden/parsen der Markdown-Datei:", error);
    });
});

function parseMarkdown(mdText) {
  console.log("Starte Parsing der Markdown-Datei...");
  const lines = mdText.split('\n');
  let currentSection = null;
  const sectionContent = {};

  lines.forEach((line, index) => {
    line = line.trim();
    console.log(`Zeile ${index + 1}: "${line}"`);
    if (line.startsWith("# ")) {
      // Neue Überschrift gefunden
      const header = line.replace("# ", "").trim();
      console.log(`Überschrift erkannt: "${header}"`);
      if (sectionMapping.hasOwnProperty(header)) {
        currentSection = sectionMapping[header];
        console.log(`Mapping gefunden. currentSection gesetzt auf: "${currentSection}"`);
        sectionContent[currentSection] = (currentSection === "lean-canvas") ? "" : [];
      } else {
        console.log(`Kein Mapping für Überschrift: "${header}". Setze currentSection auf null.`);
        currentSection = null;
      }
    } else if (currentSection) {
      if (line !== "") {
        if (currentSection === "lean-canvas") {
          sectionContent[currentSection] += line + " ";
          console.log(`Anhängen an lean-canvas: "${line}"`);
        } else if (/^[-*]\s+/.test(line)) {
          const item = line.replace(/^[-*]\s+/, "").trim();
          sectionContent[currentSection].push(item);
          console.log(`Listeneintrag erkannt in Section "${currentSection}": "${item}"`);
        } else {
          sectionContent[currentSection] += line + " ";
          console.log(`Anhängen an Section "${currentSection}" (kein Listenpunkt): "${line}"`);
        }
      }
    }
  });

  console.log("Parsing abgeschlossen. Ergebnis:", sectionContent);

  // Inhalte in die entsprechenden Container einfügen
  for (const section in sectionContent) {
    if (section === "lean-canvas") {
      const leanHeader = document.querySelector("#lean-canvas-header h1");
      const leanText = sectionContent[section].trim();
      const newHeaderText = leanText ? `Lean Canvas - ${leanText}` : "Lean Canvas";
      leanHeader.textContent = newHeaderText;
      document.title = newHeaderText;
      console.log(`Lean Canvas Header gesetzt: "${newHeaderText}"`);
    } else if (section === "todo") {
      // Verarbeitung der Todo-Sektion erfolgt später
      continue;
    } else {
      const container = document.querySelector(`#${section} .content`);
      if (container) {
        if (Array.isArray(sectionContent[section]) && sectionContent[section].length) {
          const ul = document.createElement("ul");
          sectionContent[section].forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
            console.log(`Erstelle <li> in Section "${section}": "${item}"`);
          });
          container.innerHTML = ""; // Vorherigen Inhalt löschen
          container.appendChild(ul);
          console.log(`Liste in Container "#${section} .content" eingefügt.`);
        } else {
          container.textContent = sectionContent[section].trim();
          console.log(`Fließtext in Container "#${section} .content" gesetzt: "${sectionContent[section].trim()}"`);
        }
      } else {
        console.warn(`Kein Container gefunden für Section "${section}"`);
      }
    }
  }

  // Todo-Bereich erstellen, falls die Markdown-Sektion vorhanden ist
  if (sectionContent.hasOwnProperty("todo") && sectionContent["todo"]) {
    const todoData = sectionContent["todo"];
    console.log("Todo-Sektion gefunden:", todoData);
    const todoContainer = document.createElement("div");
    todoContainer.id = "todo-container";
    const todoHeader = document.createElement("h2");
    todoHeader.textContent = "Todo";
    todoHeader.addEventListener("click", () => {
      const currentDisplay = todoContent.style.display;
      todoContent.style.display = (currentDisplay === "none") ? "" : "none";
      console.log(`Todo-Bereich umgeschaltet. Neuer Display-Status: "${todoContent.style.display}"`);
    });
    const todoContent = document.createElement("div");
    todoContent.classList.add("todo-content");
    if (Array.isArray(todoData) && todoData.length) {
      const ul = document.createElement("ul");
      todoData.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
        console.log(`Erstelle <li> im Todo-Bereich: "${item}"`);
      });
      todoContent.appendChild(ul);
    } else {
      todoContent.textContent = todoData.trim();
      console.log(`Setze Fließtext im Todo-Bereich: "${todoData.trim()}"`);
    }
    todoContent.style.display = "";
    todoContainer.appendChild(todoHeader);
    todoContainer.appendChild(todoContent);
    const canvas = document.querySelector(".canvas");
    canvas.parentNode.insertBefore(todoContainer, canvas.nextSibling);
    console.log("Todo-Bereich wurde unterhalb des Canvas eingefügt.");
  } else {
    console.log("Keine Todo-Sektion gefunden.");
  }
}

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

