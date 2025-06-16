document.addEventListener('DOMContentLoaded', () =>{

    const pensum = document.getElementById('pensum');

    let id = pensum.classList.item(0);

    let carrera = JSON.parse(localStorage.getItem(`pensum${id}`));

    if(carrera !== null){
        pensum.innerHTML = carrera;
    }
});