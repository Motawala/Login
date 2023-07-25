//Event listener for the create button
const createButton = document.getElementById('create-input')
if(createButton){
    createButton.addEventListener('click', createAccount)
}

/*
    This funciton is used to retriuve the inform,ation from the user.
    It makes a POST request to the server to store the credentials.
    /user/create
*/
async function createAccount(){

    //Get the Required Information from the User
    const firstname = document.getElementById('firstname-input').value;
    const lastname = document.getElementById('lastname-input').value;
    var email = document.getElementById('email-input').value;
    email = email.toLocaleLowerCase().replace('.', '.')
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    const repeatPassword = document.getElementById('repeat-password-input').value;


    //Match The Password to make sure they match
    if(password == repeatPassword){
        //Send the information the the server to store it into the database
        try{
            const response = await fetch("/user/create",{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({firstname,lastname,email,username, password}),
            })

            if(response.ok){
                console.log('success')
                displayMessage();
            }else{
                const error_message = document.getElementById("signup-message");
                error_message.style.color='red'
                error_message.innerHTML = "Incorrect Email Format"
                console.log("Incorrect Email")
            }

        }catch(error){
            console.log(error)
        }
    }else{  
        //If there is an error, display it on the screen
        const error_message = document.getElementById("signup-message");
        error_message.style.color='red'
        error_message.innerHTML = "Password does not Match"
        console.log("Password Does not Match")
    }
}


///Add an event listener on the repeat password input 
const passwordInput = document.getElementById("repeat-password-input");
if(passwordInput){
    passwordInput.addEventListener('keypress', (event) => {
        if(event.key == "Enter"){
            event.preventDefault();
            createAccount();
        }
    });
}


//redirect the user to the home page
async function redirect_to_login(){
    window.location.href="http://localhost:5000/dashboard"
}

//Display the Error message for the user
async function displayMessage(){
    const signUpMessage = document.getElementById('signup-message');

    signUpMessage.innerHTML = "Successfully Created the Account"
    setTimeout(function() {
        // Redirect to the desired page
        redirect_to_login() // Replace with your desired URL
    },800);
}


//Event Listner for the show password icon
const eyeButtonCreate = document.getElementById('eye-button-create');
if(eyeButtonCreate){
    eyeButtonCreate.addEventListener('click',showPasswordCreate);
}

//Enable the user to see the password
async function showPasswordCreate(){
    let newPassword = document.getElementById('password-input');
    if(newPassword.value != undefined){
        if(newPassword.type == "password"){
            eyeButtonCreate.src = "/Images/eye-open.png"
            eyeButtonCreate.style.color = "white"
            eyeButtonCreate.style.height = "20px"
            eyeButtonCreate.style.width = "25px"
            newPassword.type = "text"
        }else{
            eyeButtonCreate.src = "/Images/eye-close.png"
            eyeButtonCreate.style.height = "20px"
            eyeButtonCreate.style.width = "25px"
            newPassword.type = "password"
        }
    }
}

//Event for the repeat password input
const eyeButtonTwo = document.getElementById('repeat-eye-button-create');
if(eyeButtonTwo){
    eyeButtonTwo.addEventListener('click',showPasswordTwo)
}

//Enables the user to see the repeat password inputed
async function showPasswordTwo(){
    let newPasswordTwo = document.getElementById('repeat-password-input');
    if(newPasswordTwo.value != undefined){
        if(newPasswordTwo.type == "password"){
            eyeButtonTwo.src = "/Images/eye-open.png"
            eyeButtonTwo.style.color = "white"
            eyeButtonTwo.style.height = "20px"
            eyeButtonTwo.style.width = "25px"
            newPasswordTwo.type = "text"
        }else{
            eyeButtonTwo.src = "/Images/eye-close.png"
            eyeButtonTwo.style.height = "20px"
            eyeButtonTwo.style.width = "25px"
            newPasswordTwo.type = "password"
        }
    }
}