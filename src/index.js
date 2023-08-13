import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const select = document.querySelector('.breed-select');
let catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

select.hidden = true;

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
        loader.classList.add("is-hidden");
    })
    .catch(err => {
        loader.classList.add("is-hidden");
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })

    

select.addEventListener('change', chooseBreed);

function chooseBreed(evt) {
    let breedId = evt.target.value;
    catInfo.innerHTML = '';
    loader.classList.remove("is-hidden");
    fetchCatByBreed(breedId)
    .then(response => {
        catInfo.innerHTML = `
            <div class="cat-picture">
                <img
                src = ${response.data[0].url}
                alt = ${response.data[0].breeds[0].name}
                width = '400'/>
            </div>
            <div class="cat-text">
                <h2 class="cat-name">${response.data[0].breeds[0].name}<h2/>
                <p class="cat-description">${response.data[0].breeds[0].description}<p/>
                <p class="cat-character"><span class="temperament">Temperament:</span> ${response.data[0].breeds[0].temperament}<p/>
            </div>
            `
            loader.classList.add("is-hidden");
    })
    .catch(err => {
        loader.classList.add("is-hidden");
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })    
}



