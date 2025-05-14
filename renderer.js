const information = document.getElementById('info')
information.innerText = `Este aplicativo está usando Node (v.${versions.node()}) e Electron (v. ${versions.electron()}).`

document.querySelectorAll('.card').forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('card-selected');
  });
});