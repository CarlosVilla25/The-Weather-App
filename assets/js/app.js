import fetchData from "./apiData.js";

const cardImg = document.querySelector('#cardImg');
const countryName = document.querySelector('#countryName');
const countryTemp = document.querySelector('#countryTemp');
const countryTempMaxMin = document.querySelector('#countryTempMaxMin').querySelectorAll('span');
const countryDescription = document.querySelector('#countryDescription');
const inputCountries = document.querySelector('#inputCountries');
const fragment = document.createDocumentFragment();

const renderData = async () => {
  const data = await fetchData();
  const datalist = document.createElement('datalist');
  datalist.setAttribute('id', 'countries');
  let arrCountries = {};

  data.forEach((country) => {
    let option = document.createElement('option');
    option.value = country.name;
    fragment.appendChild(option);
    arrCountries[country.name] = { alpha3Code: country.alpha3Code, img: country.flag };
  });

  inputCountries.appendChild(datalist).appendChild(fragment);
  inputCountries.addEventListener(('change'), (e) => {
    if (e.target.value === Object.keys(arrCountries).find((elem) => elem === e.target.value)) {
      const fetchWeatherData = async () => {

        const apiKey = '365f16d82ecd32e10da52f201fcccee1';
        const cityName = e.target.value;
        const urlWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        try {
          const weather = await fetch(urlWeatherApi);
          const dataWeather = await weather.json();

          if (dataWeather.cod === 200) {
            countryTemp.textContent = `${(dataWeather.main.temp - 273.15).toPrecision(4)} °C`;
            countryTempMaxMin[0].textContent = `Max ${(dataWeather.main.temp_max - 273.15).toPrecision(4)} °C`;
            countryTempMaxMin[1].textContent = `Min ${(dataWeather.main.temp_min - 273.15).toPrecision(4)} °C`;
            countryDescription.textContent = dataWeather.weather[0].description;
          } else {
            countryTemp.textContent = 'No data found';
            countryTempMaxMin[0].textContent = 'No data found';
            countryTempMaxMin[1].textContent = 'No data found';
            countryDescription.textContent = 'No data found';
          }
        } catch {
          (error) => console.warn('Error: ', error);
        }
      }
      fetchWeatherData();
      cardImg.setAttribute('src', arrCountries[e.target.value].img);
      countryName.textContent = e.target.value;
    }
  });
}

renderData();
