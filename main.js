const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const weather = document.querySelector('.weather');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.error');

search.addEventListener('click', () => {
    const APIKey = 'beb438d043f8e6bc17db3accfa5ac7b5';
    const city = document.querySelector('.search input').value;

    if (city == '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if(json.cod == '404'){
            container.style.height = '600';
            weather.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        };

        container.style.height = '600';
        weather.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather img'); 
        const temperature = document.querySelector('.weather .temp'); 
        const description = document.querySelector('.weather .description'); 
        const humidity = document.querySelector('.weather-details .humidity'); 
        const wind = document.querySelector('.weather-details .wind'); 

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png'
                break;
            case 'Rain':
                image.src = 'images/rain.png'
                break;
            case 'Snow':
                image.src = 'images/snow.png'
                break;
            case 'Clouds':
                image.src = 'images/clouds.png'
                break;
            case 'Mist':
                image.src = 'images/mist.png'
                break;
            case 'Drizzle':
                image.src = 'images/drizzle.png'
                break;
        
            default:
                image.src = '/images/rain.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed} Km/h`;
    });

});
