const passwordInput = document.getElementById('password');
if(passwordInput){
    passwordInput.addEventListener('keypress', (event) =>{
        if(event.key == 'Enter'){
            event.preventDefault()
            login()
        }
    })
}

const usernameInput = document.getElementById('username')
if(usernameInput){
    usernameInput.addEventListener('keypress', (event) =>{
        if(event.key == 'Enter'){
            event.preventDefault()
            login()
        }
    })
}

const loginButton = document.getElementById('login-button');
if(loginButton){
    loginButton.addEventListener('click', login)
}

function redirect_to_main(){
    window.location.href = '/user/home';
}



async function login(){
    var email = document.getElementById('username').value;
    //Convert the email to lower case and then store it
    email = email.toLowerCase().replace('.', '.');
    const password = document.getElementById('password').value;
    try{
        const response = await fetch('/user/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
        await response.json().then(data =>{
            console.log(email)
        })

        
        if(response.ok){
            console.log("Login Successful")
            redirect_to_main();
        }else{
            //If the result is successfull Redirect the user to the main Page. Else Prompts the user to Enter
                //the correct Credentials.
                const error_message = document.getElementById("login-error-message");
                error_message.style.display='block';
                error_message.innerHTML = "Incorrect Email/Password"
                setTimeout(function() {
                    // Redirect to the desired page
                    error_message.style.display='none';
                },1000);
                
                console.log("Incorrect Password")
        }
    }catch(error){
        console.log(error)
    }
}