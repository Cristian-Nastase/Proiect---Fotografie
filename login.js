async function doLogin() {
    const userInp = document.getElementById('username').value;
    const passInp = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    try {
        const response = await fetch('../users.json');
        
        if (!response.ok) {
            throw new Error("Fișierul JSON nu a putut fi accesat");
        }

        const users = await response.json();
        const authenticatedUser = users.find(u => u.username === userInp && u.password === passInp);

        if (authenticatedUser) {
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = "/Pagini HTML/formular.html";
        } else {
            errorMsg.classList.add('visible');
        }
    } catch (error) {
        console.error("Eroare:", error);
        
        if (userInp === "admin" && passInp === "admin") {
            sessionStorage.setItem('isLoggedIn', 'true');
            window.location.href = "/Pagini HTML/formular.html";
        }
    }
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