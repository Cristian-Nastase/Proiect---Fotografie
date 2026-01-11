const headerHTMLContent = `
<nav id="header-nav" class="container">
    <ul id="meniu-nav">
        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="32" height="32" viewBox="0 0 511.999 511.999">
            <path d="M460.728 104.864V93.948c0-19.975-16.251-36.227-36.227-36.227h-43.823c-19.975 0-36.226 16.251-36.226 36.227v9.53H215.806V76.267c0-26.762-21.772-48.534-48.534-48.534H97.047c-26.762 0-48.534 21.772-48.534 48.534v30.604c0 .606.036 1.201.091 1.792C20.193 119.738 0 147.374 0 179.655v240.026c0 35.613 28.972 64.585 64.585 64.585h382.83c35.613 0 64.585-28.972 64.585-64.585V168.063c0-31.05-22.025-57.046-51.272-63.199m-77.367-8.234h38.458v6.847h-38.458zM87.422 76.266c0-5.218 4.407-9.625 9.625-9.625h70.227c5.216 0 9.625 4.407 9.625 9.625v27.211H87.422zm359.993 369.09H64.585c-14.158.001-25.675-11.516-25.675-25.675V179.655c0-20.549 16.719-37.269 37.269-37.269h371.236c14.158 0 25.675 11.517 25.675 25.675v251.62h.001c0 14.158-11.518 25.675-25.676 25.675"/>
            <path d="M256 184.377c-61.092 0-110.792 49.7-110.792 110.792S194.908 405.962 256 405.962s110.792-49.7 110.792-110.792S317.091 184.377 256 184.377m0 182.674c-39.636 0-71.883-32.247-71.883-71.883s32.247-71.883 71.883-71.883 71.883 32.247 71.883 71.883-32.247 71.883-71.883 71.883M420.36 168.692c-12.656 0-22.953 10.297-22.953 22.954s10.297 22.953 22.953 22.953c12.657 0 22.954-10.297 22.954-22.953 0-12.658-10.296-22.954-22.954-22.954"/>
        </svg>
        <li><a href="/main.html">Acasa</a></li>
        <li>
            <a href="/Pagini HTML/colectii.html">Colectii</a>
            <ul class="submeniu-nav">
                <li><a href="/Pagini HTML/colectii.html">Vezi colectii</a></li>
                <li id="li-formular" style="display:none;"><a href="/Pagini HTML/formular.html">Formular</a></li>
            </ul>
        </li>
        <li><a href="/Pagini HTML/about.html">Despre</a></li>
        <li id="auth-link"></li>
    </ul>
</nav>`;

function checkSession() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const liFormular = document.getElementById('li-formular');
    const authLink = document.getElementById('auth-link');

    if (isLoggedIn) {
        liFormular.style.display = 'block';
        authLink.innerHTML = `<a href="#" onclick="handleLogout()">Logout</a>`;
    } else {
        liFormular.style.display = 'none';
        authLink.innerHTML = `<a href="/login.html">Login</a>`;
    }

    if (window.location.pathname.includes('formular.html') && !isLoggedIn) {
        window.location.href = '/login.html';
    }
}

function handleLogout() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = '/main.html';
}

window.addEventListener('load', function() {
    let headerCSS = document.createElement('link');
    headerCSS.setAttribute('rel', 'stylesheet');
    headerCSS.setAttribute('href', '/header.css');
    document.head.appendChild(headerCSS);

    document.body.insertAdjacentHTML('afterbegin', headerHTMLContent);
    checkSession();
});