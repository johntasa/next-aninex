export default function DetailItem ({ label, value }: {label: string, value: string | number}) {
  return (
    <div>
      <p className="font-semibold text-gray-800">{label}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  );
}