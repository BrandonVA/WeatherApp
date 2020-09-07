// Storing values for coressponding html elemnts.
let submit = document.getElementById('submit');
let cityDisplay = document.getElementById('city');
let tempDisplay = document.getElementById('temp');
let descriptionDisplay = document.getElementById('description');
let apiCallTempF = 0;

// Button for updating weather
submit.addEventListener('click', () => {

    // storing url components for api call defualt city edmonds
    let apiKey = '&units=imperial&appid=d8730e114dc8b472804de4c9ab0ed1da';
    let url = 'https://api.openweathermap.org/data/2.5/weather?q='
    let country = ',us';
    let city = 'Seattle';

    // final end point for the api call 
    let endPoint;

    // storing the input value of the text input
    let inputValue = document.getElementById('input').value;

    // If statment to update value for the city if filled out.
    if ( inputValue.length > 1 ) {

        // Sets new value for the city.
        city = inputValue;

        // Creating a var for an array with the input value split at a comma
        let splitInput = inputValue.split(',');
        //setting city equal to the first index of the array
        city = splitInput[0]
        // creating a var for the second value stored in the array.
        let state = `,${splitInput[1]}`;
        
        // looping through the input and checking for a ,
        for (let i = 0; i < inputValue.length; i++) {
            
            // if a comma is found ...
            if (inputValue.charAt(i) === ',') {
                // Updates the edpoint for the api call
                endPoint = `${url}${city}${state}${country}${apiKey}`;
            }
        }
        
    }




    // Sets input for the defualt city Stored Seattle 
    endPoint = `${url}${city}${apiKey}`


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

        tempData = Math.round(tempData);
        apiCallTempF = tempData;

        // Setting earlier defined elements with the data from the api call.
        tempDisplay.innerHTML = `${tempData} &#8457;`
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
            let iconImage = document.getElementById('iconImage')

            // updating the defualt image src with corresponding data stored
            // in the icon object.
            iconImage.src = `././icons/png/${icon[iconDescription]}`;
            iconImage.style.display = 'block';
        }
        displayIcon(descriptionData);
        // console.log(`this is the icon object call ${icon.descriptionData}`);
    })
    // Catching an error and alerting it
    .catch(err => alert(`City not valid. Reason: ${err}`))

    // loggin the button was pressed for validation of corresping data 
    console.log('button pressed');
});


// Object to store image src values for the corresponding weather description.
// capitalized to match json api object.
const icon = {
    Thunderstorm: 'thunder.png',
    Drizzle: 'drizzle.png',
    Rain: 'rain.png',
    Snow: 'snow.png',
    Clear: 'clear.png',
    Clouds: 'cloud.png',
    Mist: 'cloud.png',
    Smoke: 'fog.png',
    Haze: 'fog.png',
    Dust: 'fog.png',
    Fog: 'fog.png',
    Sand: 'fog.png',
    Dust: 'fog.png',
    Squall: 'fog.png',
    Tornado: 'tornado.png'
}






// Delaring new vars for the two buttons that will control 
// the display of the current temp.
let btnTempF = document.getElementById('btnTempF');
let btnTempC = document.getElementById('btnTempC');

// When btnTempF is clicked ...
btnTempF.addEventListener('click', ()=> {

    // Declarying defualt display for the temp in F
    let defaultTempDisplay = ` ${apiCallTempF} &#8457;`;

    // Setting the temp display back to defualt 
        tempDisplay.innerHTML = defaultTempDisplay;
   
});

// When btnTempC is clicked ...
btnTempC.addEventListener('click', ()=> {

    // Declaring a var for the temp converted to celcius 
    // then ... rounding that number 
    let convertedTempC = ( apiCallTempF - 32 ) / 1.8;
    convertedTempC = Math.round(convertedTempC);

    // Declarying a var for the new value to store the converted temp display
    // then ... updated the html to show the new temp.
    let convertedTempDisplay = `${convertedTempC} &#8451;`;
    tempDisplay.innerHTML = convertedTempDisplay;

})











// console.log(fullUrl );

//typeof endPoint === 'string' ? console.log('string') : console.log('not string');


// seprate api calls for possible future use
let apiWithoutCountryCode = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}'
let apiWithCountryCode = 'api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={your api key}';
let apiWithCountryStateCode = 'api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={your api key}';
