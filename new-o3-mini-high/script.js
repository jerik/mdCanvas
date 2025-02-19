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
  "Revenue Streams": "revenue-streams"
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
        // Lean Canvas als Fließtext, ansonsten Array für Listeneinträge
        sectionContent[currentSection] = (currentSection === "lean-canvas") ? "" : [];
      } else {
        currentSection = null;
      }
    } else if (currentSection) {
      if (currentSection === "lean-canvas") {
        // Fließtext sammeln
        if (line !== "") {
          sectionContent[currentSection] += line + " ";
        }
      } else if (line.startsWith("- ")) {
        const item = line.replace("- ", "").trim();
        sectionContent[currentSection].push(item);
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
      // Auch als Seitentitel setzen
      document.title = newHeaderText;
    } else {
      const container = document.querySelector(`#${section} .content`);
      if (container) {
        const ul = document.createElement("ul");
        sectionContent[section].forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          ul.appendChild(li);
        });
        container.appendChild(ul);
      }
    }
  }
}

