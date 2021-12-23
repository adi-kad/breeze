function unixToHours(timestamp) {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    return hours;
}

function kelvinToCelsius(kelvin) {
    const value = kelvin - 273.15;
    return Number(Math.round(value+'e'+1)+'e-'+1);
}

function kelvinToFahrenheit(kelvin) {
    const value = (kelvin - 273.15) * 1.8 + 32;
    return Number(Math.round(value+'e'+1)+'e-'+1);
}

export {unixToHours, kelvinToCelsius, kelvinToFahrenheit}

