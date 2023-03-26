const registrationForm = document.querySelector('#registration-form');

const userName = document.querySelector('#user-name');
const userSurname = document.querySelector('#user-surname');
const userGenderMale = document.querySelector('#user-gender-male');
const userGenderFemale = document.querySelector('#user-gender-female');
const userBirthday = document.querySelector('#user-birthday');
const userEmail = document.querySelector('#user-email');
const userPassword = document.querySelector('#user-password');
const userPasswordConfirmation = document.querySelector('#user-password-confirmation');
const termsAndConditions = document.querySelector('#terms');

const registrationPreview = document.querySelector('#registration-preview');

registrationForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    validateRegistrationForm();
});

function validateRegistrationForm(){
    const userNameValue = userName.value.trim();
    const userSurnameValue = userSurname.value.trim();
    const userBirthdayValue = userBirthday.value;
    const userGenderMaleChecked = userGenderMale.checked;
    const userGenderFemaleChecked = userGenderFemale.checked;
    const userEmailValue = userEmail.value.trim();
    const userPasswordValue = userPassword.value.trim();
    const userPasswordConfirmationValue = userPasswordConfirmation.value.trim();
    const termsAndConditionsChecked = termsAndConditions.checked;
    validateInputForm(userNameValue, userSurnameValue, userBirthdayValue, userEmailValue, userPasswordValue, userPasswordConfirmationValue);
    validatePasswordSecurity(userPasswordValue);
}

function renderPreview(uName, surname, bday, male, email, pw, confirmPw){
    registrationPreview.innerHTML = `
                <p>Name : ${uName}</p>
                <p>Surname : ${surname}</p>
                <p>Birthday : ${bday}</p>
                <p>Sex : ${male ? 'Male' : 'Female'}</p>
                <p>Email : ${email}</p>
                <p>Password : ${pw}</p>
                <p>PasswordConfirmation : ${confirmPw}</p>
                `
}

function validateInputForm(uName, surname, bday, email, pw, confirmPw){
    registrationPreview.style.color = 'red';
    if(!validateTextInput(uName)){
        console.log("Please enter a valid name");
        registrationPreview.innerHTML = "Please enter a valid name!";
        return;
    } else if(!validateTextInput(surname)){
        console.log("Please enter a valid surname!");
        registrationPreview.innerHTML = "Please enter a valid surname!";
        return;
    } else if(!checkAge(bday)){
        console.log('You must be at least 18 years old');
        registrationPreview.innerHTML = "You must be at least 18 years old!";
        return;
    } else if(!validateEmail(email)){
        console.log("Please enter a valid email");
        registrationPreview.innerHTML = "Please enter a valid email!";
        return;
    } else if(!validatePasswordSecurity(pw)){
        console.log("Please enter a valid Password. Password must be at least 8 character")
        registrationPreview.innerHTML = `Please enter a valid Password! Password:
        <ul>
        <li>Must contain at least one uppercase letter;</li>
        <li>Must contain at least one lowercase letter;</li>
        <li>Must contain at least one digit;</li>
        <li>Must contain at least one special character;</li>
        <li>Must be between 8 and 20 characters long.</li>
        </ul>`;
        return;
    } else if(!checkConfirmationPassword(pw, confirmPw)){
        console.log("Your password is different from your confirmation password")
        registrationPreview.innerHTML = "Your password is different from your confirmation password!";
        return;
    }
    registrationPreview.style.color = '#0E8388';
    renderPreview(uName, surname, userBirthday.value, userGenderMale.checked, userEmail.value, userPassword.value, userPasswordConfirmation.value);
}

function validateTextInput(text){
    const TEXT_REGEX = /^[a-zA-Z]+$/;
    return TEXT_REGEX.test(text);
}

function validatePasswordSecurity(pw){
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[\w@$!%*?&.]{8,}$/;
    return PASSWORD_REGEX.test(pw);
}

function validateEmail(email){
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return EMAIL_REGEX.test(email);
}

function checkConfirmationPassword(pw, confirmPw){
    return (pw === confirmPw) ? true : false;
}

function checkAge(birthday){
    const bday = new Date(birthday);
    const age = new Date().getFullYear() - bday.getFullYear();
    return (age >= 18) ? true : false;
}

//Qwe123!@