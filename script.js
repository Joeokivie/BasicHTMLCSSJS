console.log(`Hello from Grailed`);

class User {
    constructor(
        id,
        email,
        status,
        password,
    ) {
        this.id = id;
        this.email = email;
        this.status = status;
        this.password = password;
    }
}

let searchForm = document.querySelector(`.searchForm`);
let signUpForm = document.querySelector(`.signUpForm`);
let userscount = document.querySelector(`.userscount`);
let userStatusesSection = document.querySelector(`.usersStatuses`);

// Ternary Statements are just one line if else statements
let users = localStorage.getItem(`users`) ? JSON.parse(localStorage.getItem(`users`)) : [];

console.log(`Initial User(s)`, users);

if (searchForm) {
    searchForm.addEventListener(`submit`, (onFormSubmitEvent) => {
        onFormSubmitEvent.preventDefault();
        // Whatever we put in here will run when the form is submitted
        let searchField = onFormSubmitEvent.target.search;
        let searchterm = searchField.value;
        console.log(`Search Form Submitted, here is the term you're looking up:`, searchterm);
        // We will fill in more later on
    })
}

if (signUpForm) {
    signUpForm.addEventListener(`submit`, (onFormSubmitEvent) => {
        onFormSubmitEvent.preventDefault();

        let form = onFormSubmitEvent.target;
        let { email: emailField, password: passwordField } = form;
        let email = emailField.value;
        let password = passwordField.value;

        let newUser = new User(
            users.length + 1,
            email,
            ``,
            password
        )

        users.push(newUser);
        localStorage.setItem(`users`, JSON.stringify(users));
        console.log(`Updated User(s)`, users);
    })
}

if (users.length > 0) {
    if (userscount) {
        userscount.innerHTML = users.length;
    }
} else {
    // We have no user(s)
    if (userStatusesSection) {
        userStatusesSection.innerHTML = `<h2>${users.length} User(s), go to <a class="contentLink" href="./signup.html">Sign Up</h2>`;
    }
}

const setFooterYear = () => {
    let yearElement = document.querySelector(`.year`);
    if (yearElement) {
        yearElement.innerHTML = new Date().getFullYear();
    }
}

setFooterYear();

// console.log(`Users`, users);

// users = users.filter(usr => usr.name == `joseph`);

// console.log(`Updated Users`, users);