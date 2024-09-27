// Fetch the JSON data from the uploaded file
fetch('express.json')  // Replace with the correct path to your JSON file
.then(response => response.json())
.then(data => {
    const container = document.getElementById('content-container');

    // Helper function to sanitize and format HTML content
    function sanitizeHTML(content) {
        // Replace unnecessary newlines, especially inside <pre> tags
        return content.replace(/\n{2,}/g, '\n').trim();
    }

    // Loop through each post in the JSON data
    data.forEach(post => {
        const article = document.createElement('article');

        // Add the title, date, content, and link
        const title = `<h2>${post.title.rendered}</h2><p><em>${new Date(post.date).toLocaleDateString()}</em></p>`;
        let contentHTML = post.content.rendered;

        // Filter out the empty <pre> tags, including ones with just whitespace
        contentHTML = sanitizeHTML(contentHTML.replace(/<pre class="wp-block-preformatted">\s*<\/pre>/g, ''));

        // Set the final inner HTML
        article.innerHTML = title + contentHTML + ``;

        // Append the article to the main content container
        container.appendChild(article);

        // Add copy button for code blocks, only if there's actual code
        article.querySelectorAll('pre code').forEach(codeBlock => {
            const pre = codeBlock.closest('pre');
            if (codeBlock.innerText.trim()) { // Only proceed if code block has content
                const copyBtn = document.createElement('button');
                copyBtn.innerText = 'Copy';
                copyBtn.classList.add('copy-btn');
                pre.appendChild(copyBtn);

                // Copy the code to clipboard when button is clicked
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

// Theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
document.body.classList.toggle('dark-mode');
});