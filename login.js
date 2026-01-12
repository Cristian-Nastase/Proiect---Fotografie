function doLogin() {
    const userInp = document.getElementById('username').value;
    const passInp = document.getElementById('password').value;

    const response = fetch('http://localhost:5500/useri.json');
    
    console.log(response);
    response.then(function (response)
    {
        if(response.status=='200')
            return response.text();
        else
            throw "eroare";
    })
    .then(function(text)
    {
        const users = JSON.parse(text);
        console.log(users); 
        users.forEach(user => {
            if(userInp == user[username] && passInp == user[password])
                console.log('de aici a iesit')
                sessionStorage.setItem('isLoggedIn', 'true');
                window.location.href = "/Pagini HTML/formular.html";
        });
    })
    .catch( function(err)
        {
            console.log(err)
            if (userInp === "admin" && passInp === "admin") {
                sessionStorage.setItem('isLoggedIn', 'true');
                window.location.href = "/Pagini HTML/formular.html";
            }
        });
    
}

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', doLogin);
    }

    setTimeout(() => {
        window.location.href = "/main.html";
    }, 300000);
});