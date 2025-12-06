// To fetch the template as text
export async function loadTemplate(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load template: ${path}`);
    return await res.text();
}

// To insert the template fetched into the page
export function renderWithTemplate(template, target) {
    target.innerHTML = template;
}


// Load the header and footer
const headerTemplate = `
<div class="container header-inner">
 <div class="container header-inner">
    <a class="brand" href="/index.html" aria-label="I Can Work Hub home">
        <img src="../assets/logo-full.svg" alt="I Can Work Hub Log" width="220" height="70">
    </a>

    <nav class="nav" role="navigation" aria-label="Main navigation">
        <a href="/pages/jobs.html">Jobs</a>
        <a href="/pages/post_jobs.html">Post a Job</a>
        <a href="/pages/users.html">Dashboard</a>
        <a href="/pages/users_directory.html">Users' Directory</a>
        <a href="/pages/join.html">Join</a>
    </nav>
</div>
</div>
`;

const footerTemplate = `
<div class="container">
  <p>&copy; <span id="year"></span> I Can Work Hub — All rights reserved.</p>
</div>
`;

export function loadHeaderFooter() {
    document.querySelector("#site-header").innerHTML = headerTemplate;
    document.querySelector("#site-footer").innerHTML = footerTemplate;
}
