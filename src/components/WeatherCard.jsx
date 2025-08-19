export default function WeatherCard(props) {
  const { day, Icon: IconComponent, temp, condition } = props;

  return (
    <div className="bg-white/20 rounded-lg p-4 flex flex-col items-center">
      <IconComponent className="text-6xl mb-2" />
      <h2 className="text-xl font-semibold">{day}</h2>
      <p className="text-3xl font-bold">{temp}°</p>
      <p className="text-sm">{condition}</p>
    </div>
  );
}
