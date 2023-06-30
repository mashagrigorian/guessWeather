import { API_KEY, API_URL, GEOCODE_API_URL } from "./constants.js";

document.addEventListener("DOMContentLoaded", () => {
  const getCoordinates = async (city) => {
    try {
      const response = await fetch(
        `${GEOCODE_API_URL}?q=${city}&limit=1&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok && data.length > 0) {
        const { lat, lon } = data[0];
        return { lat, lon };
      } else {
        throw new Error("Invalid city name or error in fetching coordinates");
      }
    } catch (error) {
      console.log("Error fetching coordinates:", error);
      throw error;
    }
  };

  const checkTemperature = async () => {
    const city = document.getElementById("cityInput").value;
    const inputTemperature = parseFloat(
      document.getElementById("temperatureInput").value
    );

    if (isNaN(inputTemperature)) {
      alert("Please enter a valid temperature.");
      return;
    }

    try {
      const { lat, lon } = await getCoordinates(city);

      const response = await fetch(
        `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        const apiTemperature = data.current.temp;

        const resultContainer = document.getElementById("resultContainer");
        resultContainer.innerHTML = `<h1>${city}</h1>`;
        resultContainer.innerHTML += `<p>API Temperature: ${apiTemperature}°C</p>`;
        resultContainer.innerHTML += `<p>Input Temperature: ${inputTemperature}°C</p>`;

        if (inputTemperature === apiTemperature) {
          resultContainer.innerHTML += "<p>Temperature matched!</p>";
        } else {
          resultContainer.innerHTML += "<p>Temperature does not match.</p>";
        }
      } else {
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.innerHTML = `<h1>Error</h1>`;
        resultContainer.innerHTML += `<p>${data.message}</p>`;
      }
    } catch (error) {
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.innerHTML = `<h1>Error</h1>`;
      resultContainer.innerHTML +=
        "<p>An error occurred while checking the temperature.</p>";
    }
  };

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", checkTemperature);
});
