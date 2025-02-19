// Mapping von Markdown-Überschriften zu den Container-IDs
const sectionMapping = {
  "Key Partners": "key-part",
  "Key Activities": "key-activities",
  "Key Resources": "key-resources",
  "Value Proposition": "value-proposition",
  "Customer Relationships": "customer-relationships",
  "Channels": "channels",
  "Customer Segments": "customer-segments",
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
  // Aufteilen in Zeilen
  const lines = mdText.split('\n');
  let currentSection = null;
  const sectionContent = {};

  lines.forEach(line => {
    line = line.trim();
    if (line.startsWith("# ")) {
      // Neue Überschrift
      const header = line.replace("# ", "").trim();
      // Prüfen, ob Header in der Mapping vorhanden ist
      if (sectionMapping.hasOwnProperty(header)) {
        currentSection = sectionMapping[header];
        // Initialisiere Inhalt als Array
        sectionContent[currentSection] = [];
      } else {
        currentSection = null;
      }
    } else if (line.startsWith("- ") && currentSection) {
      // Listeneintrag, als HTML <li> umwandeln
      const item = line.replace("- ", "").trim();
      sectionContent[currentSection].push(item);
    }
  });

  // Inhalte in die entsprechenden Container einfügen
  for (const section in sectionContent) {
    const container = document.querySelector(`#${section} .content`);
    if (container) {
      // Erstelle eine Liste
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

