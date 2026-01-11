const formFields = document.getElementsByClassName("form__field");
const formInputs = document.querySelectorAll('textarea, input');
const form = document.getElementById('form');

const inputImage = document.getElementById('poza-colectie');
const previewImage = document.getElementById('preview');

let currentCollection = {};

window.addEventListener('load', () => {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = "/Pagini HTML/colectii.html";
    }
});

form.addEventListener("submit", submit);

inputImage.addEventListener('change', changePreviewPhoto);


function submit(event)
{
    event.preventDefault();
    let canSubmit = true;
    let testSubmit; 
    for(let i = 0; i < formInputs.length; i++)
        {
            let type = formInputs[i].dataset.type;
            switch(type)
            {
                case 'text':
                    testSubmit = regularTextValidator(formInputs[i]);
                    break;
                
                case 'file':
                    testSubmit = imageValidator(formInputs[i]);
                    break;
                
                case 'checkbox':
                    testSubmit = checkboxValidator(formInputs[i]);
            }
            if(testSubmit == false) canSubmit = false
        }
    if(canSubmit)
        {
            localStorage.setItem(localStorage.length, JSON.stringify(currentCollection));
            form.submit();
        }            
}

function regularTextValidator(input)
{
    let string = input.value;
    let textRegex = /[A-Za-z0-9]/i;

    if(!textRegex.test(string)) 
    {
        input.classList.add('invalid');
        input.parentNode.classList.add('invalid');
        return false;
    }
    else
    {
        input.classList.remove('invalid');
        input.parentNode.classList.remove('invalid');            
        
        if(input.id == 'numele-colectiei')
            {
                currentCollection.name = string;
            }
        else currentCollection.descriere = string;
        
        return true;
    }
}

function checkboxValidator(input)
{
    if(!input.checked)
        {
            input.parentNode.classList.add('invalid');
            return false;
        }
    else
        {
            input.parentNode.classList.remove('invalid');
            return true;
        }
}

function imageValidator(input)
{
    if(!input.value)
        {
            input.classList.add('invalid');
            input.parentNode.classList.add('invalid');
            return false;
        }
    else
        {
            input.classList.remove('invalid');
            input.parentNode.classList.remove('invalid');            
            return true;
        }

}

function changePreviewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                const maxWidth = 800; 
                const scale = maxWidth / img.width;
                canvas.width = maxWidth;
                canvas.height = img.height * scale;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                previewImage.src = compressedBase64;
                currentCollection.imageURL = compressedBase64;
            };
        };
        reader.readAsDataURL(file);
    }
}