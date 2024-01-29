console.log(`Hello from Grailed`);

let yearElement = document.querySelector(`.year`);
if (yearElement) {
    yearElement.innerHTML = new Date().getFullYear();
}

// let users = [
//     {
//         id: 1,
//         name: `joseph`,
//         status: `online`
//     },
//     {
//         id: 2,
//         name: `rakib`,
//         status: `offline`
//     }
// ]

// console.log(`Users`, users);

// users = users.filter(usr => usr.name == `joseph`);

// console.log(`Updated Users`, users);