const api = {
  key: '2034bcf4108e81b308ea894ce2dd1b57',
  baseURL: 'https://api.openweathermap.org/data/2.5/',
};

const searchbox = document.querySelector('.search-box');

function dateBuilder(d) {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const days = ['Doming', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day}, ${date} de ${month} de ${year}`;
}

function displayResults(weather) {
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>ºC</span>`;

  const weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].description;

  const hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}ºC / ${Math.round(weather.main.temp_max)}ºC`;
}

function getResults(query) {
  fetch(`${api.baseURL}weather?q=${query}&units=metric&lang=pt_br&APPID=${api.key}`)
    .then(weather => weather.json())
    .then(displayResults);
}

function setQuery(e) {
  if (e.keyCode === 13) {
    getResults(searchbox.value);
  }
}

searchbox.addEventListener('keypress', setQuery);
