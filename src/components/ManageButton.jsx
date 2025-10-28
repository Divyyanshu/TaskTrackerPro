// src/components/ManageButton.jsx
export default function ManageButton({ title, description, bg, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${bg} text-white p-8 rounded-lg shadow hover:opacity-90 transition flex flex-col items-center md:items-start`}
    >
      <div className="text-2xl font-bold mb-2">{title}</div>
      <div className="text-sm opacity-90">{description}</div>
    </button>
  );
}
