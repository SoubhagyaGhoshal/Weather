````md
 🌤️ React Weather App

A beautiful, responsive weather forecasting app built with **React**, **Redux Toolkit**, and the **OpenWeatherMap API** — shows real-time weather and 5-day extended forecasts for any location.

---

🚀 Features

- 🌍 Get real-time weather by city name or location
- 📅 5-day extended forecast (OpenWeather `/forecast` endpoint)
- 🌡️ Toggle between Celsius and Fahrenheit
- 🎯 Responsive, mobile-friendly UI
- 🎨 Dynamic weather icons and styling
- ⚡ Lightning-fast with Redux state management

---

 🧑‍💻 Tech Stack

- ⚛️ React (with Hooks)
- 📦 Redux Toolkit
- 🧪 TypeScript
- 🎨 Styled Components
- 🔁 OpenWeatherMap API
- ☁️ Deployed via Netlify

---

 🔧 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/SoubhagyaGhoshal/Weather.git
   cd Weather
````

2. Install dependencies**

   ```bash
   npm install
   ```

3. Create `.env` file**

   Get your API key from [OpenWeatherMap](https://openweathermap.org/api) and add it to `.env`:

   ```env
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

4. Run locally**

   ```bash
   npm start
   ```

---

📦 Build for Production

```bash
npm run build
```

---

📂 Folder Structure

```
src/
├── api/                 # API fetch utilities
├── components/          # UI components
│   ├── CurrentWeather/
│   ├── Forecast/
│   └── ui/
├── store/               # Redux slices and store config
├── utils/               # Helpers: unit conversion, dates
└── assets/              # Icons, SVGs
```

---

🌐 API Used

* [OpenWeatherMap API](https://openweathermap.org/forecast5)

  * `/weather` for current weather
  * `/forecast` for 5-day forecast (free plan)

---
✨ Contributing

Pull requests are welcome! Please follow the existing code style and include tests when relevant.

---

📄 License

This project is open source under the [MIT License](LICENSE).

---

🧑‍🎨 Author

Built with ❤️ by [**Soubhagya Ghoshal**](https://github.com/SoubhagyaGhoshal)

---

```


