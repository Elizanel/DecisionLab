// I only need useState for state management
// and useMemo to optimize derived calculations.
import { useMemo, useState } from "react";

import OptionCard from "./OptionCard";
import WeightSliders from "./WeightSliders";
import ResultPanel from "./ResultPanel";

import "./App.css";


// DEFAULT CONFIG


// These are the default slider values.
// Each factor has equal importance initially (0–10 scale).
// This makes the system neutral at startup.
const DEFAULT_WEIGHTS = { growth: 5, salary: 5, interest: 5, stress: 5 };

// These starter options just make the UI usable immediately.
// It prevents an empty screen and helps demonstrate scoring.
const STARTER_OPTIONS = [
  { id: "optionA", name: "Option A", growth: 8, salary: 7, interest: 9, stress: 5 },
  { id: "optionB", name: "Option B", growth: 6, salary: 9, interest: 7, stress: 4 },
];

export default function App() {

  // STATE

  // weights = how important each factor is to ME (user preference)
  // setWeights updates slider importance.
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);

  // options = the list of choices I'm comparing
  // each option has ratings from 0–10 for each factor.
  const [options, setOptions] = useState(STARTER_OPTIONS);

  
  // DERIVED DATA (SCORING ENGINE)

  // useMemo ensures I only recalculate scores
  // when options or weights change.
  // This prevents unnecessary recalculations.
  const scoredOptions = useMemo(() => {

    // Core scoring function.
    // Higher growth/salary/interest increases score.
    // Higher stress DECREASES score.
    const score = (o) =>
      o.growth * weights.growth +
      o.salary * weights.salary +
      o.interest * weights.interest -
      o.stress * weights.stress;

    // Attach score to each option
    // Then sort from highest score to lowest.
    return options
      .map((o) => ({ ...o, score: score(o) }))
      .sort((a, b) => b.score - a.score);

  }, [options, weights]); // Only rerun if these change.


  // The first option after sorting is automatically the best.
  const best = scoredOptions[0];


  // STATE UPDATERS

  // Update a single rating inside one option.
  // Example: user changes interest from 7 to 10.
  const updateOption = (id, field, value) => {

    // I map through all options,
    // find the matching one,
    // and immutably update that field.
    setOptions((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, [field]: Number(value) } : o
      )
    );
  };


  // Add a new decision option.
  // Using prompt() keeps this MVP simple.
  const addOption = () => {
    const name = prompt("Name your option (e.g., 'Lawyer'):");
    if (!name) return;

    // Use timestamp as simple unique ID.
    const id = `${Date.now()}`;

    // Default new options to neutral ratings (5s).
    setOptions((prev) => [
      ...prev,
      { id, name, growth: 5, salary: 5, interest: 5, stress: 5 },
    ]);
  };


  // Remove an option by ID.
  const removeOption = (id) => {
    setOptions((prev) => prev.filter((o) => o.id !== id));
  };


  // UI RENDER

  return (
    <div className="container">

      <header className="header">
        <div>
          <h1>DecisionLab</h1>

          <p className="sub">
            Compare options with weighted priorities.
            Stress counts against the score.
            Adjust how important each factor is to you.
            Higher numbers mean that factor has more influence on the final score.
          </p>
        </div>

        <button className="btn" onClick={addOption}>
          + Add option
        </button>
      </header>


      <section className="grid">

        {/* PRIORITIES PANEL */}
        <div className="panel">
          <h2>Priorities</h2>

          <div className="prioritiesCard">
            {/* Sliders modify the weights state */}
            <WeightSliders weights={weights} setWeights={setWeights} />

            {/* Reset brings weights back to neutral */}
            <button
              className="btn secondary"
              onClick={() => setWeights(DEFAULT_WEIGHTS)}
            >
              Reset weights
            </button>
          </div>
        </div>


        {/* OPTIONS PANEL */}
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


        {/* RESULTS PANEL */}
        <div className="panel">
          <ResultPanel best={best} weights={weights} />
        </div>

      </section>
    </div>
  );
}
