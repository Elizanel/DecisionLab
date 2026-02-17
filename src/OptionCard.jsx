// Which fields we want to edit for each option
const FIELDS = [
  { key: "growth", label: "Growth" },
  { key: "salary", label: "Salary" },
  { key: "interest", label: "Interest" },
  { key: "stress", label: "Stress" },
];

export default function OptionCard({ option, rank, isBest, onChange, onRemove }) {
  return (
    <div className={`card ${isBest ? "best" : ""}`}>
      {/* Top section: rank + name + remove button */}
      <div className="cardTop">
        <div>
          <div className="rank">#{rank}</div>
          <h3 className="cardTitle">{option.name}</h3>
        </div>

        {/* Remove option */}
        <button
          className="iconBtn"
          onClick={() => onRemove(option.id)}
          title="Remove"
        >
          ✕
        </button>
      </div>

      {/* Score display */}
      <div className="scoreRow">
        <span className="scoreLabel">Score:</span>
        <span className="score">{option.score}</span>
      </div>

      {/* Editable ratings for this option */}
      <div className="fieldGrid">
        {FIELDS.map((f) => (
          <label className="field" key={f.key}>
            <span>{f.label}</span>
            <input
              type="number"
              min="0"
              max="10"
              value={option[f.key]} // controlled input
              onChange={(e) => onChange(option.id, f.key, e.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}