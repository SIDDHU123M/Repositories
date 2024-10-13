let div = document.querySelector("#data");
let buttons = document.querySelector("#buttons");
let paginationControls = document.querySelector("#pagination-controls");
let currentPage = 1;
const itemsPerPage = 5;

async function getData(item, page = 1) {
  try {
    let newObj = [];
    let response = await fetch("ConvertedFiles/united.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    let data = await response.json();

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedData = data[item].slice(start, end);

    paginatedData.forEach((jsonData) => {
      newObj.push({
        title: jsonData.title,
        content: jsonData.content,
        code: jsonData.code || "", // Assuming code is part of the JSON data
      });
    });

    div.innerHTML = "";
    newObj.forEach((element) => {
      div.innerHTML += `
              <h1>${element.title}</h1>
              <div>${element.content}</div>
              ${element.code ? `<code>${element.code}</code>` : ""}
            `;
    });

    updatePaginationControls(item, page, data[item].length);
    addCopyButtons(); // Add copy buttons to new code blocks
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    div.innerHTML = "<p>Failed to load data. Please try again later.</p>";
  }
}

function updatePaginationControls(item, page, totalItems) {
  paginationControls.innerHTML = "";

  if (page > 1) {
    let prevButton = document.createElement("button");
    prevButton.innerText = "Previous";
    prevButton.onclick = () => getData(item, page - 1);
    paginationControls.appendChild(prevButton);
  }

  if (page * itemsPerPage < totalItems) {
    let nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.onclick = () => getData(item, page + 1);
    paginationControls.appendChild(nextButton);
  }
}

function addCopyButtons() {
  document.querySelectorAll("code").forEach((codeBlock) => {
    if (!codeBlock.querySelector(".copy-button")) {
      let copyButton = document.createElement("button");
      copyButton.className = "copy-button";
      copyButton.innerText = "Copy";
      copyButton.onclick = () => {
        let codeText = codeBlock.childNodes[0].nodeValue; // Get only the code text
        navigator.clipboard.writeText(codeText).then(() => {
          copyButton.innerText = "Copied!";
          setTimeout(() => {
            copyButton.innerText = "Copy";
          }, 2000);
        });
      };
      codeBlock.appendChild(copyButton);
    }
  });
}

let folders = [
  "angular",
  "dart",
  "es6",
  "java",
  "kotlin",
  "machine",
  "php",
  "react",
  "tailwind",
  "typescript",
  "blockchain",
  "django",
  "intelligence",
  "javascript",
  "laravel",
  "node",
  "python",
  "reactnative",
  "tensorflow",
  "vue",
];

folders.forEach((element) => {
  buttons.innerHTML += `<button class="button" onclick="getData('${element}')">
          <img src="images/${element}.svg" alt="${element}" class="icon">
          <p class="text">${element.replace(
            element[0],
            element[0].toUpperCase()
          )}</p>
        </button>`;
});

// Add event listener to document to detect changes and add copy buttons
const observer = new MutationObserver(addCopyButtons);
observer.observe(document.body, { childList: true, subtree: true });