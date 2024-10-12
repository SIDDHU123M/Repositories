// let newObj = {};
// // 25 files
// let files = ['1.json', '2.json', '3.json', '4.json', '5.json', '6.json', '7.json', '8.json', '9.json', '10.json', '11.json', '12.json', '13.json', '14.json', '15.json', '16.json', '17.json', '18.json', '19.json', '20.json', '21.json', '22.json', '23.json', '24.json', '25.json'];

// // angular     dart    es6           java        kotlin   machine  php     react        tailwind    typescript
// // blockchain  django  intelligence  javascript  laravel  node     python  reactnative  tensorflow  vue
// let folders = ['angular', 'dart', 'es6', 'java', 'kotlin', 'machine', 'php', 'react', 'tailwind', 'typescript', 'blockchain', 'django', 'intelligence', 'javascript', 'laravel', 'node', 'python', 'reactnative', 'tensorflow', 'vue'];

// async function getData() {
//     const fetchPromises = folders.map(folder => {
//         newObj[folder] = []; // Initialize an empty array for each folder
//         return files.map(async file => {
//             try {
//                 let response = await fetch(`jsonFiles/nested_posts/${folder}/${file}`);
//                 if (!response.ok) {
//                     throw new Error(`File not found: ${folder}/${file}`);
//                 }
//                 let data = await response.json();
//                 data.forEach(item => newObj[folder].push({
//                     title: item.title.rendered,
//                     content: item.content.rendered,
//                 }));
//             } catch (error) {
//                 console.error(error.message);
//             }
//         });
//     }).flat();

//     await Promise.all(fetchPromises);
//     console.log(newObj);
// }

// getData();