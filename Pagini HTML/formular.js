const formFields = document.getElementsByClassName("form__field");
const formInputs = document.querySelectorAll('textarea, input');
const form = document.getElementById('form');

const inputImage = document.getElementById('poza-colectie');
const previewImage = document.getElementById('preview');

form.addEventListener("submit", submit);

inputImage.addEventListener('change', changePreviewPhoto);

function submit(event)
{
    event.preventDefault();
    let canSubmit;
    for(let i = 0; i < formInputs.length; i++)
        {
            let type = formInputs[i].dataset.type;
            switch(type)
            {
                case 'text':
                    regularTextValidator(formInputs[i]);
                    break;
                
                case 'file':
                    break;
                
                case 'checkbox':
                    checkboxValidator(formInputs[i]);
            }
        }
    if(canSubmit)form.submit();
}

function regularTextValidator(input)
{
    let string = input.value;
    let textRegex = /^[A-Za-z]{5,}$/;

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

function changePreviewPhoto(event)
{
    const file = event.target.files[0];
    let url = window.URL.createObjectURL(file);
    previewImage.src = url;
    
}