const form = document.querySelector('.dados-box');

form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData);
    console.log(dados)
});