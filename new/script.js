document.addEventListener("DOMContentLoaded", () => {
    fetch("canvas.md")
        .then(response => response.text())
        .then(text => parseMarkdown(text));
});

function parseMarkdown(markdown) {
    const sections = markdown.split(/\n#/).map(section => section.trim());
    
    sections.forEach(section => {
        const lines = section.split("\n");
        const title = lines[0].replace("#", "").trim();
        const content = lines.slice(1).join("<br>").trim();

        const id = title.toLowerCase().replace(/\s+/g, "-");
        const element = document.getElementById(id);
        
        if (element) {
            element.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
        }
    });
}

