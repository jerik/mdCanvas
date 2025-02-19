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
        // Für "lean-canvas" als Text, ansonsten Array für Listen
        sectionContent[currentSection] = (currentSection === "lean-canvas") ? "" : [];
      } else {
        currentSection = null;
      }
    } else if (currentSection) {
      if (currentSection === "lean-canvas") {
        // Bei lean-canvas wird der Fließtext gesammelt
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
      // Fülle den Lean Canvas Header
      const headerContainer = document.querySelector("#lean-canvas-header .lean-content");
      if (headerContainer) {
        headerContainer.textContent = sectionContent[section].trim();
      }
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

