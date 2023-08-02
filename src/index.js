import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
let catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

select.hidden = true;
error.hidden = true;

fetchBreeds()
    .then(response => {
        const selectMarkup = response.data.map(elem => `<option value = "${elem.id}">${elem.name}</option>`).join();
        select.insertAdjacentHTML('beforeend',selectMarkup);
        new SlimSelect({
            select: '.breed-select',
            settings: {
                allowDeselect: true
            }
        })
        select.hidden = false;
        loader.hidden = true;
    })
    .catch(err => {
        loader.hidden = true;
        error.hidden = false;
    })

    

select.addEventListener('change', chooseBreed);

function chooseBreed(evt) {
    let breedId = evt.target.value;
    catInfo.innerHTML = '';
    error.hidden = true;
    loader.hidden = false;
    fetchCatByBreed(breedId)
    .then(response => {
        catInfo.innerHTML = `
            <img
            src = ${response.data[0].url}
            alt = ${response.data[0].breeds[0].name}
            width = '400'/>
            <h2>${response.data[0].breeds[0].name}<h2/>
            <p>${response.data[0].breeds[0].description}<p/>
            <p><span>Temperament:<span/> ${response.data[0].breeds[0].temperament}<p/>
            `
            loader.hidden = true;
    })
    .catch(err => {
        loader.hidden = true;
        error.hidden = false;
    })    
}



