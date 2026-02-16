export default function ResultPanel({ best, weights }) {
  // If there are no options yet, don't render anything
  if (!best) return null;

  return (
    <div>
      <h2>Recommendation</h2>

      {/* Highlight the winning option */}
      <div className="recommend">
        <div className="recommendTitle">{best.name}</div>
        <div className="recommendSub">
          Highest weighted score based on your priorities.
        </div>

        {/* Show how the score was built (transparency) */}
        <div className="breakdown">
          <div className="row">
            <span>Growth</span>
            <span>
              {best.growth} × {weights.growth}
            </span>
          </div>

          <div className="row">
            <span>Salary</span>
            <span>
              {best.salary} × {weights.salary}
            </span>
          </div>

          <div className="row">
            <span>Interest</span>
            <span>
              {best.interest} × {weights.interest}
            </span>
          </div>

          {/* Stress is negative in the score */}
          <div className="row neg">
            <span>Stress</span>
            <span>
              {best.stress} × {weights.stress}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}