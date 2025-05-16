window.addEventListener('DOMContentLoaded', () => {
  const preferenciasSalvas = JSON.parse(localStorage.getItem('comidas-favoritas')) || []
  document.querySelectorAll('.card').forEach(card => {
    const nome = card.querySelector('span').innerText
    if (preferenciasSalvas.includes(nome)) {
      card.classList.add('card-selected')
    }
  })

  fetch('http://localhost:3001/frase-xiangling')
  .then(res => res.json())
  .then(data => {
    document.getElementById('frase-xiangling').textContent = data.frase
  })
  .catch(err => {
    console.error(err)
    document.getElementById('frase-xiangling').textContent = "Algo deu errado na cozinha..."
  })
})

const information = document.getElementById('info')
information.innerText = `Este aplicativo está usando Node (v.${versions.node()}) e Electron (v. ${versions.electron()}).`

document.querySelectorAll('.card').forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('card-selected');
  });
});

document.getElementById('salvar-preferencias').addEventListener('click', () =>{
  const selecionados = document.querySelectorAll('.card.card-selected')
  const preferencias = []

  selecionados.forEach(card => {
    const nome = card.querySelector('span').innerText
    preferencias.push(nome)
  })

  localStorage.setItem('comidas-favoritas', JSON.stringify(preferencias))
})

