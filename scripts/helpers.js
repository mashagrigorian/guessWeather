export const setErrorMessage = message => {
    document.getElementById("errorMessage").innerText = message;
};

export const setEventById = (id, event, callback) => {
    document.getElementById(id).addEventListener(event, callback);
}

export function updateWeatherDisplay(data) {
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("country").innerHTML = data.sys.country;
    document.getElementById("temp").innerHTML = Math.round(data.main.temp);
  }
