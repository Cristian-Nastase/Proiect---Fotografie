function afiseazaColectii() {
    const container = document.getElementById('lista-colectii');
    container.innerHTML = '';

    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
    }

    const keysRandom = [];
    while (keys.length > 0) {
        const randomIndex = Math.floor(Math.random() * keys.length);
        keysRandom.push(keys.splice(randomIndex, 1)[0]);
    }

    keysRandom.forEach(key => {
        const data = localStorage.getItem(key);
        try {
            const colectie = JSON.parse(data);
            if (!colectie || !colectie.imageURL) return;

            const card = document.createElement('div');
            card.className = 'card-colectie';
            card.style.backgroundColor = 'white';
            card.style.padding = '1rem';
            card.style.border = '1px solid black';

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const imgTemp = new Image();

            imgTemp.onload = function() {
                canvas.width = 600;
                canvas.height = 1066;
                const scale = Math.max(canvas.width / imgTemp.width, canvas.height / imgTemp.height);
                const x = (canvas.width / 2) - (imgTemp.width / 2) * scale;
                const y = (canvas.height / 2) - (imgTemp.height / 2) * scale;
                ctx.drawImage(imgTemp, x, y, imgTemp.width * scale, imgTemp.height * scale);
            };
            imgTemp.src = colectie.imageURL;

            const title = document.createElement('h2');
            title.textContent = colectie.name;

            const desc = document.createElement('p');
            desc.textContent = colectie.descriere;

            card.append(canvas, title, desc);
            container.appendChild(card);
        } catch (e) {}
    });
}

function initializeazaFiltre() {
    const sectiuneFiltre = document.getElementById('filtre');
    const btnContainer = document.createElement('div');
    btnContainer.style.marginTop = "2rem";
    
    const optiuni = [
        { text: 'Alb-negru', filter: 'grayscale(1)' },
        { text: 'Vibrant', filter: 'grayscale(0)' }
    ];

    optiuni.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt.text;
        btn.style.cssText = "display:block; width:100%; margin-bottom:1rem; padding:12px; background:transparent; border:1px solid white; color:white; cursor:pointer; font-family:inherit; letter-spacing:1px; font-size:0.7rem;";

        btn.onclick = function(e) {
            e.stopPropagation();
            
            const stilCalculat = window.getComputedStyle(btn);
            if (stilCalculat.display === 'block') {
                document.querySelectorAll('.card-colectie canvas').forEach(cvs => {
                    cvs.style.filter = opt.filter;
                });
            }
        };

        btnContainer.appendChild(btn);
    });

    sectiuneFiltre.appendChild(btnContainer);
}

window.addEventListener('DOMContentLoaded', () => {
    afiseazaColectii();
    initializeazaFiltre();
});