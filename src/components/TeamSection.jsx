// src/components/TeamSection.jsx
export default function TeamSection({ members }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Team Members</h2>
      {members.length === 0 ? (
        <p className="text-gray-500">No members yet.</p>
      ) : (
        <ul className="space-y-2">
          {members.map((m) => (
            <li key={m.id} className="flex justify-between p-2 border rounded">
              <span>{m.name}</span>
              <span className="text-sm text-gray-600">{m.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
