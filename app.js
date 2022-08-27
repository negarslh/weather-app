const getLoc = async() => {
    const url = "http://ip-api.com/json/?fields=country,city,lat,lon,timezone" ;
    const response = await fetch(url);
    const data = response.json();

    return data;
}

const getWeather = async(lat , lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7116402d9f200a26b44b848a1941a494`;
    const response = await fetch(url);
    const data = response.json();

    return data;
}

function getDayOrNight() {
    let DayOrNight;
    var d = new Date();
    const hour = d.getHours();

    if (hour >= 6 && hour <= 19) {
        DayOrNight = 'Day';
    } else {
        DayOrNight = 'Night';
    }
    return DayOrNight;
}

function getIcon(weMain) {
    let icon;
    switch (weMain) {
        case 'Thunderstorm':
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`;
            break;
        case 'Rain':
            icon = `${weMain}.svg`;
            break;
        case 'Snow':
            icon = `${weMain}.svg`;
            break; 
        case 'Clear':
            const DayOrNight = getDayOrNight();
            icon=`${weMain}-${DayOrNight}.svg`;
            break;
        case 'Clouds':
            icon = `${weMain}.svg`;
            break;
        case 'Atmosphere':
            icon = `${weMain}.png`;
            break;   
    }
    return icon;
}

function getTemp(weTemp){
    const k = weTemp;
    const f = (k - 273.15) * 9/5 + 32;
    const c = k - 273.15;
    return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
}

const loti = document.querySelector('.timezone');
const icon = document.querySelector('.icon');
const dese = document.querySelector('.degree-section');
const deg = document.querySelector('.degree-section h2');
const unit = document.querySelector('.degree-section span');
const tede = document.querySelector('.temperature-description');

window.addEventListener('load', function(){
    getLoc()
        .then(locData => {
            const timeZone = locData.timezone;
            loti.textContent = timeZone;
            console.log(timeZone);
            getWeather(locData.lat, locData.lon)
                .then(weData => {
                    const weTemp = weData.main.temp;
                    const weMain = weData.weather[0].main;
                    const weDes = weData.weather[0].description;

                    const iconName = getIcon(weMain);
                    icon.innerHTML = `<img src='icons/${iconName}'></img>`;

                    deg.textContent = Math.floor(weTemp);
                    unit.textContent = 'K';
                    dese.addEventListener('click', function(e){
                        if(unit.textContent == 'K'){
                            deg.textContent = getTemp(weTemp).far;
                            unit.textContent = 'F';
                        } 
                        else if(unit.textContent == 'F'){
                            deg.textContent = getTemp(weTemp).can;
                            unit.textContent = '°C';
                        }
                        else{
                            deg.textContent = getTemp(weTemp).kel;
                            unit.textContent = 'K';
                        }
                    })
                    tede.textContent = weDes;
                    console.log(weTemp, weMain, weDes);
                })
        })
})   