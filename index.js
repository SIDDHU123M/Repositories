let newObj = [];
let div = document.querySelector('#data');

async function getData() {
    try {
        let response = await fetch('ConvertedFiles/united.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        let data = await response.json();

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                data[key].forEach(jsonData => {
                    newObj.push({
                        title: jsonData.title,
                        content: jsonData.content
                    });
                });
            }
        }

        newObj.forEach(element => {
            div.innerHTML += `
            <h1>${element.title}</h1>
            <div>${element.content}</div>
            `;
        });
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        div.innerHTML = '<p>Failed to load data. Please try again later.</p>';
    }
}

getData();
