import { useMemo, useState } from "react";
import OptionCard from "./OptionCard";
import WeightSliders from "./WeightSliders";
import ResultPanel from "./ResultPanel";
import "./App.css";

// Default weight values (0–10) for each priority slider
const DEFAULT_WEIGHTS = { growth: 5, salary: 5, interest: 5, stress: 5 };

// Starter options so the app has something to show immediately
const STARTER_OPTIONS = [
  { id: "optionA", name: "Option A", growth: 8, salary: 7, interest: 9, stress: 5 },
  { id: "optionB", name: "Option B", growth: 6, salary: 9, interest: 7, stress: 4 },
];

export default function App() {
  // State: the user's current priority weights (sliders)
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);

  // State: the list of decision options + their ratings (0–10)
  const [options, setOptions] = useState(STARTER_OPTIONS);

  // Derived data: compute scores for each option based on weights
  const scoredOptions = useMemo(() => {
    // Scoring function:
    // higher growth/salary/interest = better
    // higher stress = worse (so subtract it)
    const score = (o) =>
      o.growth * weights.growth +
      o.salary * weights.salary +
      o.interest * weights.interest -
      o.stress * weights.stress;

    // Attach score to each option + sort from best to worst
    return options
      .map((o) => ({ ...o, score: score(o) }))
      .sort((a, b) => b.score - a.score);
  }, [options, weights]);

  // The top option after sorting is the recommended option
  const best = scoredOptions[0];

  // Update a rating on a specific option (ex: AI Team interest -> 10)
  const updateOption = (id, field, value) => {
    setOptions((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [field]: Number(value) } : o))
    );
  };

  // Add a new option (prompt() is simplest MVP UI)
  const addOption = () => {
    const name = prompt("Name your option (e.g., 'Lawyer'):");
    if (!name) return;

    const id = `${Date.now()}`; // simple unique id
    setOptions((prev) => [
      ...prev,
      { id, name, growth: 5, salary: 5, interest: 5, stress: 5 },
    ]);
  };

  // Remove an option by id
  const removeOption = (id) => {
    setOptions((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>DecisionLab</h1>
          <p className="sub">
            Compare options with weighted priorities. Stress counts against the score. Adjust how important each factor is to you. 
  Higher numbers mean that factor has more influence on the final score.
          </p>
        </div>

        <button className="btn" onClick={addOption}>
          + Add option
        </button>
      </header>

      <section className="grid">
        <div className="panel">
        <h2>Priorities</h2>

        <div className="prioritiesCard">
        <WeightSliders weights={weights} setWeights={setWeights} />

      <button className="btn secondary" onClick={() => setWeights(DEFAULT_WEIGHTS)}>
      Reset weights
    </button>
  </div>
</div>

        <div className="panel">
          <h2>Options</h2>
          <div className="cards">
            {scoredOptions.map((o, idx) => (
              <OptionCard
                key={o.id}
                option={o}
                rank={idx + 1}
                isBest={o.id === best?.id}
                onChange={updateOption}
                onRemove={removeOption}
              />
            ))}
          </div>
        </div>

        <div className="panel">
          <ResultPanel best={best} weights={weights} />
        </div>
      </section>
    </div>
  );
}