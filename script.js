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

let logInForm = document.querySelector(`.logInForm`);
let searchForm = document.querySelector(`.searchForm`);
let signUpForm = document.querySelector(`.signUpForm`);
let usersCountElements = document.querySelectorAll(`.userscount`);
let userStatusesSection = document.querySelector(`.usersStatuses`);
let logInErrorMessage = document.querySelector(`.logInErrorMessage`);

// Ternary Statements are just one line if else statements
let users = localStorage.getItem(`users`) ? JSON.parse(localStorage.getItem(`users`)) : [];

let currentLoggedInUser = localStorage.getItem(`user`) ? JSON.parse(localStorage.getItem(`user`)) : null;

// console.log(`Initial User(s)`, users);
// console.log(`Current Logged In User`, currentLoggedInUser);

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

        // Sign Up Logic
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

        form.reset();
        users.push(newUser);
        localStorage.setItem(`users`, JSON.stringify(users));
        console.log(`Updated User(s)`, users);
        // window.location.reload();
        window.location.href = `./login.html`;
    })
}

const showErrorMessage = (elementToShowErrorIn, messageToShowToUser) => {
    elementToShowErrorIn.innerHTML = messageToShowToUser;
    if (!elementToShowErrorIn.classList.contains(`hasErrors`)) {
        elementToShowErrorIn.classList.add(`hasErrors`);
    }
}

if (logInForm) {
    logInForm.addEventListener(`submit`, (onFormSubmitEvent) => {
        onFormSubmitEvent.preventDefault();

        // Log In Logic
        let form = onFormSubmitEvent.target;
        let { email: emailField, password: passwordField } = form;
        let email = emailField.value;
        let password = passwordField.value;

        let usersThatMatchesEmail = users.filter(usr => usr.email.toLowerCase() == email.toLowerCase());

        if (usersThatMatchesEmail.length > 0) {
            // We have users that match
            if (logInErrorMessage.classList.contains(`hasErrors`)) {
                logInErrorMessage.classList.remove(`hasErrors`);
            }

            if (usersThatMatchesEmail[0].password == password) {
                let userThatMatchesEmailAndPassword = usersThatMatchesEmail[0];
                form.reset();
                console.log(`Correct Password, Log User In`, userThatMatchesEmailAndPassword);
                localStorage.setItem(`user`, JSON.stringify(userThatMatchesEmailAndPassword));
                // window.location.reload();
                window.location.href = `./`;
            } else {
                showErrorMessage(logInErrorMessage, `Incorrect Email or Password`);
            }
        } else {
            // We dont have users that match
            showErrorMessage(logInErrorMessage, `No User(s) Match`);
        }
    })
}

const setUserCounts = () => {
    if (usersCountElements) {
        if (usersCountElements.length > 0) {
            // Any logic in here will run for each item in the array
            usersCountElements.forEach((usercountelem, usercountelemIndex) => {
                usercountelem.innerHTML = users.length;
            })
        }
    }
}

if (users.length > 0) {
    setUserCounts();
} else {
    // We have no user(s)
    setUserCounts();
    if (userStatusesSection) {
        userStatusesSection.innerHTML = `<h2>${users.length} User(s), go to <a class="contentLink" href="./signup.html">Sign Up</h2>`;
    }
}

if (currentLoggedInUser != null) {
    console.log(`User is Logged In As`, currentLoggedInUser);
    let signOutLinks = document.querySelectorAll(`.signedOutLink`);
    if (signOutLinks) {
        if (signOutLinks.length > 0) {
            signOutLinks.forEach(signoutLink => signoutLink.remove());
        }
    }
    let logOutButtonLink = document.querySelector(`.logOutButtonLink`);
    let username = currentLoggedInUser.email.split(`@`)[0];
    logOutButtonLink.innerHTML = `${username}, Log Out?`;

    logOutButtonLink.addEventListener(`click`, onClickEvent => {
        localStorage.removeItem(`user`);
        window.location.href = `./`;
    })
} else {
    console.log(`No Current Logged In User`);
    let signInLinks = document.querySelectorAll(`.signedInLink`);
    if (signInLinks) {
        if (signInLinks.length > 0) {
            signInLinks.forEach(signInLink => signInLink.remove());
        }
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