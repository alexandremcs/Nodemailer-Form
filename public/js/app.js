const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

const name = document.getElementById("name");
const birth = document.getElementById("birth");
const tel = document.getElementById("tel");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

let formStepsNum = 0;

nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        formStepsNum++;
        updateFormSteps();
        updateProgressBar();
    })
})

prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
        updateProgressBar();
    })
})

function updateFormSteps(){
    formSteps.forEach((formStep) => {
        formStep.classList.contains("form-step-active") &&
            formStep.classList.remove("form-step-active");
    });

    formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressBar(){
    progressSteps.forEach((progressStep, index) => {
        if(index < formStepsNum + 1) {
            progressStep.classList.add('progress-step-active');
        } else {
            progressStep.classList.remove('progress-step-active');
        }
    });

    const progressActive = document.querySelectorAll(".progress-step-active");

    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let captcha = '';
for (let i = 0; i < 6; i++) {
  captcha += characters[Math.floor(Math.random() * characters.length)];
}

const canvas = document.getElementById('captcha');
const ctx = canvas.getContext('2d');
ctx.font = '20px Arial';
ctx.strokeText(captcha, 0, 25);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userInput = document.getElementById('captcha-input').value;

    if (password.value == confirmPassword.value) {
        if (userInput === captcha) {
    
            let formData = {
                name: name.value,
                birth: birth.value,
                tel: tel.value,
                email: email.value,
                password: password.value,
                confirmPassword: confirmPassword.value
            }
              
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/', true);
            xhr.setRequestHeader('content-type', 'application/json');
            
            xhr.onload = function () {
                alert('Cadastro enviado');
                name.value = '';
                birth.value = '';
                tel.value = '';
                email.value = '';
                password.value = '';
                confirmPassword.value = '';
                document.location.reload(true);
            }
            
            xhr.send(JSON.stringify(formData));
    
        } else {
            alert('CAPTCHA inválido. Tente novamente.');
        }  
      } else {
        alert("As senhas não são iguais.");
        confirmPassword.focus();
    }    

});