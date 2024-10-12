let newObj = []
let div = document.querySelector('#data')

async function getData() {
    let response = await fetch('ConvertedFiles/united.json')
    let data = await response.json()

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            // console.log(data[key])
            data[key].forEach(jsonData => {
                newObj.push({
                    title: jsonData.title,
                    content: jsonData.content
                })
            })
        }
    }

    newObj.forEach(element => {
        div.innerHTML += `
        <h1>${element.title}</h1>
        <div>${element.content}</div>
        `
    });
}

getData()