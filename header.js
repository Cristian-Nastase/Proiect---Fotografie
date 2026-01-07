const headerHTMLContent = 
`       <nav id="#header" class="container">
                <ul id="meniu-nav">
                    <li><a href="/main.html">Acasa</a></li>
                    <li>
                        <a href="/Pagini HTML/colectii.html">Colectii</a>
                        <ul class="submeniu-nav">
                                <li><a href="/main.html">Cauta</a></li>
                                <li><a href="/Pagini HTML/colectii.html">Vezi colectii</a></li>
                                <li><a href="/Pagini HTML/formular.html">Formular</a></li>
                        </ul>
                    </li>
                    <li><a href="/Pagini HTML/about.html">Despre</a></li>
                </ul>
        </nav>`;

window.addEventListener('load', function()
{
    let headerCSS = document.createElement('link');
    headerCSS.setAttribute('rel', 'stylesheet');
    headerCSS.setAttribute('href', '/header.css');
    document.head.appendChild(headerCSS);

    document.body.innerHTML = headerHTMLContent + document.body.innerHTML;
});