// Display labels (so we don't show raw keys like "stress")
const LABELS = {
  growth: "Growth",
  salary: "Salary",
  interest: "Interest",
  stress: "Stress (negative)",
};

export default function WeightSliders({ weights, setWeights }) {
  const set = (key, value) => {
    setWeights((prev) => ({ ...prev, [key]: Number(value) }));
  };

  return (
    <div className="weights">
      <div className="weightRow">
        <div className="weightTop">
          <span className="weightLabel">Growth</span>
          <span className="weightValue">{weights.growth}</span>
        </div>
        <input
          className="slider"
          type="range"
          min="0"
          max="10"
          value={weights.growth}
          onChange={(e) => set("growth", e.target.value)}
        />
      </div>

      <div className="weightRow">
        <div className="weightTop">
          <span className="weightLabel">Salary</span>
          <span className="weightValue">{weights.salary}</span>
        </div>
        <input
          className="slider"
          type="range"
          min="0"
          max="10"
          value={weights.salary}
          onChange={(e) => set("salary", e.target.value)}
        />
      </div>

      <div className="weightRow">
        <div className="weightTop">
          <span className="weightLabel">Interest</span>
          <span className="weightValue">{weights.interest}</span>
        </div>
        <input
          className="slider"
          type="range"
          min="0"
          max="10"
          value={weights.interest}
          onChange={(e) => set("interest", e.target.value)}
        />
      </div>

      <div className="weightRow">
        <div className="weightTop">
          <span className="weightLabel">Stress</span>
          <span className="weightValue">{weights.stress}</span>
        </div>
        <input
          className="slider sliderNeg"
          type="range"
          min="0"
          max="10"
          value={weights.stress}
          onChange={(e) => set("stress", e.target.value)}
        />
        <div className="weightHint">Counts against the score</div>
      </div>
    </div>
  );
}