// Storing values for coressponding html elemnts.
let submit = document.getElementById('submit');
let cityDisplay = document.getElementById('city');
let tempDisplay = document.getElementById('temp');
let descriptionDisplay = document.getElementById('description');

// Button for updating weather
submit.addEventListener('click', () => {

    // storing url components for api call defualt city edmonds
    let apiKey = '&units=imperial&appid=d8730e114dc8b472804de4c9ab0ed1da';
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='
    let city = 'edmonds';

    // storing the input value of the text input
    let inputValue = document.getElementById('input').value;
    // If statment to update value for the city if filled out.
    if ( inputValue.length > 1 ) {
        city = inputValue;
        console.log(inputValue)
    }

    // final end point for the api call 
    let endPoint = `${url}${city}${apiKey}`;

    // Api call to get weather for the city in the city submited or the defualt city
    fetch(endPoint)
    // Getting the response in json 
    .then(response => response.json())
    // Then doing logic with corresponding data.

    .then(data => {
        // Taking the data in the api call and storing it for use in html.
        let tempData = data.main.temp;
        let cityData = data.name;
        let descriptionData = data.weather[0].main

        // Setting earlier defined elements with the data from the api call.
        tempDisplay.innerHTML = tempData;
        cityDisplay.innerHTML = cityData;
        descriptionDisplay.innerHTML = descriptionData;


        // just printing to the console for debuggin purpuses.
        console.log(descriptionData );
        console.log(tempData);
        console.log(cityData);
        console.log(data);

        // Function to find out what icon to use.
        const displayIcon = iconDescription => {
            // Setting arg to data used in descriptionData.
            iconDescription = descriptionData;
            console.log('This is a function call' + icon[iconDescription]);

            let iconImage = document.getElementById('iconImage')
            // updating the defualt image src with corresponding data stored
            // in the icon object.
            iconImage.src = icon[iconDescription];
            iconImage.style.display = 'block';
        }
        displayIcon(descriptionData);
        // console.log(`this is the icon object call ${icon.descriptionData}`);
    })
    // Catching an error and alerting it
    .catch(err => alert('City not valid.'))
    // loggin the button was pressed for validation of corresping data 
    console.log('button pressed');
});


// Object to store image src values for the corresponding weather description.
// capitalized to match json api object.
const icon = {
    Thunderstorm: '././icons/png/thunder.png',
    Drizzle: '././icons/png/drizzle.png',
    Rain: '././icons/png/rain.png',
    Snow: '././icons/png/snow.png',
    Clear: '././icons/png/clear.png',
    Clouds: '././icons/png/cloud.png',
    Mist: '././icons/png/cloud.png',
    Smoke: '././icons/png/fog.png',
    Haze: '././icons/png/fog.png',
    Dust: '././icons/png/fog.png',
    Fog: '././icons/png/fog.png',
    Sand: '././icons/png/fog.png',
    Dust: '././icons/png/fog.png',
    Squall: '././icons/png/fog.png',
    Tornado: '././icons/png/tornado.png'
}











// console.log(fullUrl );

//typeof endPoint === 'string' ? console.log('string') : console.log('not string');


// seprate api calls for possible future use
let apiWithoutCountryCode = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}'
let apiWithCountryCode = 'api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={your api key}';
let apiWithCountryStateCode = 'api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={your api key}';