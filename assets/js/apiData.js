const fetchData = async () => {

  const urlCountriesApi = 'https://restcountries.eu/rest/v2/all';

  try {
    const city = await fetch(urlCountriesApi);
    const dataCountries = await city.json();
    return dataCountries 
  } catch {
    (error) => console.warn(error)
  }
};

export default fetchData;
