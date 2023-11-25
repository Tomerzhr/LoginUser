const signUp = document.getElementById("signUp");
const signIn = document.getElementById("signIn");
const container = document.getElementById("container");

const signInForm = document.querySelector(".signInForm");
const signInPassword = document.forms["signInForm"]["password"];
const signInEmail = document.forms["signInForm"]["email"];

const signUpForm = document.querySelector(".signUpForm");
const signUpEmail = document.forms["signUpForm"]["email"];
const signUpPassword = document.forms["signUpForm"]["password"];
const userName = document.forms["signUpForm"]["name"];

// Animation of form

signUp.addEventListener("click", function () {
  container.classList.add("right-panel-active");
});
signIn.addEventListener("click", function () {
  container.classList.remove("right-panel-active");
});

// users details

function User(userName, email, fullname, password, lastLoginDate) {
  this.userName = userName;
  this.email = email;
  this.fullname = fullname;
  this.password = password;
  this.lastLoginDate = lastLoginDate;
}

const user1 = new User("admin1", "admin1@gmail.com", "admin 1", "Aa123456", null);
const user2 = new User("admin2", "admin2@gmail.com", "admin 2", "Aa123456", null);
const user3 = new User("admin3", "admin3@gmail.com", "admin 3", "Aa123456", null);
const user4 = new User("admin4", "admin4@gmail.com", "admin 4", "Aa123456", null);
const user5 = new User("admin5", "admin5@gmail.com", "admin 5", "Aa123456", null);

const users = new Map([
  [user1.email, user1],
  [user2.email, user2],
  [user3.email, user3],
  [user4.email, user4],
  [user5.email, user5],
]);

// forgot Password
const forgotPasswordPopUp = document.querySelector(".forgetPassword-popUp");
const forgotPassword = document.querySelector(".forgotPassword");
const RecoveryBtn = document.querySelector(".RecoveryBtn");
const closePopUp = document.querySelector(".close-popup");
const popUpContent = document.querySelector(".popup-content");
const emailMessage = document.querySelector(".recovery-message");
const emailRecoveryValidation = document.getElementById("recoveryEmail");

emailRecoveryValidation.addEventListener("input", emailRecovery);

RecoveryBtn.disabled = true;

function emailRecovery() {
  if (emailValidation(emailRecoveryValidation)) {
    RecoveryBtn.disabled = false;
  }
}

closePopUp.addEventListener("click", () => {
  popUpArea.style.display = "none";
  container.style.filter = "none";
  container.style.pointerEvents = "auto";
});

forgotPassword.addEventListener("click", () => {
  popUpArea.style.display = "block";
  forgotPasswordPopUp.style.display = "block";
  container.style.filter = "blur(3px)";
  container.style.pointerEvents = "none";
});

RecoveryBtn.addEventListener("click", () => {
  emailMessage.style.display = "block";
  popUpContent.style.display = "none";
});

let popUpArea = document.querySelector(".popUp-area");
popUpArea.style.display = "none";

window.onclick = function (event) {
  if (event.target == popUpArea) {
    popUpArea.style.display = "none";
    container.style.filter = "none";
    container.style.pointerEvents = "auto";
    emailMessage.style.display = "none";
    popUpContent.style.display = "flex";
    emailRecoveryValidation.value = "";
  }
};

// sign in section

const error = document.querySelector(".error-message");
const signInBtn = document.querySelector(".SignInBtn");

signInEmail.addEventListener("input", signInValidation);
signInPassword.addEventListener("input", signInValidation);

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!isUserExist(signInEmail.value, signInPassword.value)) {
    error.style.display = "block";
    return;
  } else {
    window.location.href = "https://tomerzhr.github.io/Portfolio/index.html";
  }
});

signInBtn.disabled = true;

function signInValidation() {
  if (emailValidation(signInEmail) && passValidation(signInPassword)) {
    signInBtn.disabled = false;
  }
}

function userNameValidation(userName) {
  const userNameRegex = /^[A-Za-z]{3,15}$/;
  if (userNameRegex.test(userName.value) == false || userName.value == "" || userName.value == null) {
    userName.style.border = "1px solid #078669";
  } else {
    userName.style.border = "unset";
    return true;
  }
}

function emailValidation(email) {
  const emailRegex = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (emailRegex.test(email.value) == false || email.value == "" || email.value == null) {
    email.style.border = "1px solid #078669";
  } else {
    email.style.border = "unset";
    return true;
  }
}

function passValidation(password) {
  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (passRegex.test(password.value) == false || password.value == "" || password.value == null || password.value.length < 6) {
    password.style.border = "1px solid #078669";
  } else {
    password.style.border = "unset";
    return true;
  }
}

function isUserExist(email, password) {
  if (users.has(email)) {
    return users.get(email).password === password;
  }
}

// Sign up validation

userName.addEventListener("input", signUpValidation);
signUpEmail.addEventListener("input", signUpValidation);
signUpPassword.addEventListener("input", signUpValidation);
const confirmMessage = document.querySelector(".confirm-message");

const signUpBtn = document.querySelector(".SignUpBtn");
signUpBtn.disabled = true;

function signUpValidation() {
  if (userNameValidation(userName) && emailValidation(signUpEmail) && passValidation(signUpPassword)) {
    signUpBtn.disabled = false;
  }
}

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  confirmMessage.style.display = "block";
  userName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
});
