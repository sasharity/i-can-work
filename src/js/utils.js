// To fetch the template as text
async function loadTemplate(path) {
    const res = await fetch(path);
    return await res.text();
}

// To insert the template fetched into the page
function renderWithTemplate(template, parent) {
    parent.innerHTML = template;
}

// Load the header and footer
export async function loadHeaderFooter() {
    const header = await loadTemplate("/partials/header.html");
    const footer = await loadTemplate("/partials/footer.html");

    renderWithTemplate(header, document.getElementById("site-header"));
    renderWithTemplate(footer, document.getElementById("site-footer"))
}