const logoutButton = document.getElementById('logout-button')
if(logoutButton){
    logoutButton.addEventListener('click', logout)
}

async function printer(){
    console.log("Button pressed")
}

async function logout(){
    const response = await fetch("http://localhost:5000/user/logout",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    if(response.ok){
        window.location.href = "/dashboard"
    }else{
        console.log("error in logout")
    }
}