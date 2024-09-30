fetch('express.json') 
.then(response => response.json())
.then(data => {
    const container = document.getElementById('content-container');

    function sanitizeHTML(content) {
        return content.replace(/\n{2,}/g, '\n').trim();
    }

    data.forEach(post => {
        const article = document.createElement('article');

        const title = `<h2>${post.title.rendered}</h2><p><em>${new Date(post.date).toLocaleDateString()}</em></p>`;
        let contentHTML = post.content.rendered;

        contentHTML = sanitizeHTML(contentHTML.replace(/<pre class="wp-block-preformatted">\s*<\/pre>/g, ''));

        article.innerHTML = title + contentHTML + ``;
        container.appendChild(article);
        article.querySelectorAll('pre code').forEach(codeBlock => {
            const pre = codeBlock.closest('pre');
            if (codeBlock.innerText.trim()) { 
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
            }
        });
    });
})
.catch(error => {
    console.error("Error fetching the JSON data: ", error);
});

const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
document.body.classList.toggle('dark-mode');
});