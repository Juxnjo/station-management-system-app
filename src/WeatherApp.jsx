import { WiDaySunny, WiRain, WiCloud } from "react-icons/wi";
import WeatherCard from "./components/WeatherCard";

const forecast = [
  { day: "Hoy", Icon: WiDaySunny, temp: 25, condition: "Soleado" },
  { day: "Mañana", Icon: WiCloud, temp: 20, condition: "Nublado" },
  { day: "Miércoles", Icon: WiRain, temp: 18, condition: "Lluvioso" },
];

export default function WeatherApp() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-br from-sky-400 to-blue-700 text-white">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-bold">Weather App</h1>
        <p className="text-lg">Pronóstico rápido y claro</p>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        {forecast.map(({ day, Icon, temp, condition }) => (
          <WeatherCard key={day} day={day} Icon={Icon} temp={temp} condition={condition} />
        ))}
      </main>

      <nav className="w-full max-w-4xl mt-10 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
        <a href="#" className="hover:underline">Inicio</a>
        <a href="#" className="hover:underline">Pronóstico</a>
        <a href="#" className="hover:underline">Ajustes</a>
      </nav>
    </div>
  );
}
