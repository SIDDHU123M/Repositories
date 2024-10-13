async function loadAndRenderContent() {
    try {
        const response = await fetch('express.json');
        if (!response.ok) throw new Error('Failed to fetch JSON');

        const data = await response.json();
        const container = document.getElementById('content-container');
        if (!container) throw new Error('Content container not found');

        data.forEach(post => {
            const article = document.createElement('article');
            const title = `<h2>${post.title.rendered}</h2><p><em>${new Date(post.date).toLocaleDateString()}</em></p>`;
            let contentHTML = post.content.rendered;
            article.innerHTML = title + contentHTML;
            container.appendChild(article);

            article.querySelectorAll('pre code').forEach(codeBlock => {
                codeBlock.classList.add('language-javascript');
                Prism.highlightElement(codeBlock);
                const pre = codeBlock.closest('pre');
                const copyBtn = document.createElement('button');
                copyBtn.innerText = 'Copy';
                copyBtn.classList.add('copy-btn');
                pre.appendChild(copyBtn);
                copyBtn.addEventListener('click', () => {
                    const code = codeBlock.innerText;
                    navigator.clipboard.writeText(code).then(() => {
                        copyBtn.innerText = 'Copied!';
                        setTimeout(() => copyBtn.innerText = 'Copy', 2000);
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error fetching or rendering JSON data:', error);
    }
}

loadAndRenderContent();

const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});