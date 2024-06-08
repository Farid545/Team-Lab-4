const { JSDOM } = require("jsdom");


describe("Weather App", () => {
  let dom;
  let document;
  let wrapper, inputPart, infoTxt, inputField, locationBtn, wIcon, arrowBack;

  beforeAll(() => {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weather App</title>
      </head>
      <body>
        <div class="wrapper">
          <div class="input-part">
            <p class="info-txt"></p>
            <input type="text" />
            <button>Get Location</button>
          </div>
          <div class="weather-part">
            <img src="" alt="Weather Icon">
            <div class="details">
              <p class="temp"><span class="numb"></span>°C</p>
              <p class="weather"></p>
              <p class="location"></p>
              <p class="temp"><span class="numb-2"></span>°C</p>
              <p class="humidity"><span></span>%</p>
            </div>
          </div>
        </div>
        <header>
          <i class="arrow-back"></i>
        </header>
      </body>
      </html>
    `;
    dom = new JSDOM(html, { runScripts: "dangerously" });
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;

    // Load the script
    const scriptContent = require("fs").readFileSync("./script.js", "utf-8");
    const scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);

    wrapper = document.querySelector(".wrapper");
    inputPart = wrapper.querySelector(".input-part");
    infoTxt = inputPart.querySelector(".info-txt");
    inputField = inputPart.querySelector("input");
    locationBtn = inputPart.querySelector("button");
    wIcon = document.querySelector(".weather-part img");
    arrowBack = document.querySelector("header i");
  });

  test("arrow back click event", () => {
    wrapper.classList.add("active");
    arrowBack.click();
    expect(wrapper.classList.contains("active")).toBe(false);
  });
});
