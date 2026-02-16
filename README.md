# DecisionLab

A clean, interactive weighted decision-making tool built with React.

DecisionLab helps you compare multiple options using adjustable priorities.  
It calculates a weighted score and highlights the strongest option based on what matters most to you.

---

## Why I Built This

When comparing career paths, projects, or life decisions, it’s easy to rely on emotion alone.  
DecisionLab turns subjective preferences into structured, weighted comparisons.

It demonstrates:
- State management in React
- Derived data computation with `useMemo`
- Controlled form inputs
- Component composition
- Clean UI styling with modern CSS

---

## Features

- Add and remove custom options
- Adjust priority weights (0–10)
- Stress counts negatively in scoring
- Real-time score updates
- Transparent score breakdown
- Clean, modern UI

---

## Scoring Formula

For each option:
score =
(growth × weight_growth) +
(salary × weight_salary) +
(interest × weight_interest) -
(stress × weight_stress)

Higher score = better match based on your priorities.

---

## Tech Stack

- React
- Vite
- JavaScript
- Modern CSS
- useState / useMemo hooks

---

## Run Locally

```bash
npm install
npm run dev

Future Improvements
	•	Persist data to local storage
	•	Save / load decision sets
	•	Visual score breakdown chart
	•	Mobile polish

___

## Photo
<img width="1247" height="693" alt="Screenshot 2026-02-16 at 4 41 28 PM" src="https://github.com/user-attachments/assets/5875ab56-d134-402b-a853-b7a3814ce245" />

<img width="1200" height="787" alt="Screenshot 2026-02-16 at 4 41 36 PM" src="https://github.com/user-attachments/assets/62e96d28-0ab7-4606-a2b3-d46546f25c88" />

<img width="1163" height="332" alt="Screenshot 2026-02-16 at 4 41 43 PM" src="https://github.com/user-attachments/assets/d11c2310-9544-4421-bc5c-24ebeb010231" />

