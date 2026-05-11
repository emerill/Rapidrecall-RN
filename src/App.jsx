import React, { useMemo, useState } from "react";

const BASE_QUESTIONS = [
  { category: "Cardiac", question: "Before giving digoxin, what should the nurse assess first?", options: ["Temperature", "Respiratory rate", "Apical pulse", "Pain score"], answer: 2, rationale: "Digoxin can slow the heart rate. Check the apical pulse before giving it." },
  { category: "Cardiac", question: "A BNP greater than 100 pg/mL most strongly suggests what condition?", options: ["Asthma", "Heart failure", "Stroke", "Hypoglycemia"], answer: 1, rationale: "BNP rises when ventricles stretch from fluid overload, which supports heart failure." },
  { category: "Cardiac", question: "Which rhythm has the highest embolic stroke risk?", options: ["PVCs", "Atrial fibrillation", "Sinus bradycardia", "First-degree AV block"], answer: 1, rationale: "Atrial fibrillation causes atrial blood pooling, clot formation, and stroke risk." },
  { category: "Cardiac", question: "Which drug class is used cautiously in asthma?", options: ["ACE inhibitors", "ARBs", "Nonselective beta blockers", "Thiazide diuretics"], answer: 2, rationale: "Nonselective beta blockers block beta-2 receptors and may cause bronchospasm." },
  { category: "Cardiac", question: "Which symptom may indicate digoxin toxicity?", options: ["Yellow-green halos", "Increased appetite", "Hypertension only", "Hair growth"], answer: 0, rationale: "Digoxin toxicity can cause visual halos, nausea, confusion, and dysrhythmias." },
  { category: "Cardiac", question: "Which electrolyte imbalance increases digoxin toxicity risk?", options: ["Hypernatremia", "Hypokalemia", "Hyperchloremia", "Hypophosphatemia"], answer: 1, rationale: "Low potassium increases digoxin toxicity risk." },
  { category: "Cardiac", question: "A patient taking lisinopril reports facial swelling. What is the priority action?", options: ["Give with food", "Hold and seek urgent evaluation", "Increase fluids", "Check glucose"], answer: 1, rationale: "ACE inhibitors can cause angioedema, which can threaten the airway." },
  { category: "Cardiac", question: "Which drug should not be combined with nitroglycerin?", options: ["Sildenafil", "Acetaminophen", "Amoxicillin", "Metformin"], answer: 0, rationale: "PDE-5 inhibitors plus nitrates can cause severe hypotension." },
  { category: "Cardiac", question: "Warfarin therapy is monitored with which lab?", options: ["aPTT", "INR", "BNP", "Troponin"], answer: 1, rationale: "Warfarin is monitored with PT/INR." },
  { category: "Cardiac", question: "Which vitamin reverses warfarin?", options: ["Vitamin C", "Vitamin D", "Vitamin K", "Vitamin B12"], answer: 2, rationale: "Vitamin K reverses warfarin anticoagulation." },
  { category: "Endocrine", question: "Hashimoto thyroiditis usually causes what?", options: ["Hyperthyroidism", "Hypothyroidism", "DKA", "SIADH"], answer: 1, rationale: "Hashimoto is autoimmune thyroid destruction causing hypothyroidism." },
  { category: "Endocrine", question: "Elevated TSH with low free T4 suggests what?", options: ["Primary hypothyroidism", "Graves disease", "Cushing syndrome", "DKA"], answer: 0, rationale: "The pituitary releases more TSH when the thyroid is underactive." },
  { category: "Endocrine", question: "Which medication treats hypothyroidism?", options: ["Methimazole", "Levothyroxine", "Propranolol", "Prednisone"], answer: 1, rationale: "Levothyroxine replaces thyroid hormone." },
  { category: "Endocrine", question: "Which medication blocks thyroid hormone synthesis?", options: ["Methimazole", "Metformin", "Insulin glargine", "Hydrocortisone"], answer: 0, rationale: "Methimazole decreases thyroid hormone production." },
  { category: "Endocrine", question: "DKA is characterized by which finding?", options: ["Hypoglycemia and alkalosis", "Hyperglycemia, ketones, metabolic acidosis", "Low sodium only", "Respiratory alkalosis only"], answer: 1, rationale: "DKA causes hyperglycemia, ketones, and metabolic acidosis." },
  { category: "Endocrine", question: "Priority treatment in DKA usually begins with what?", options: ["Fluid resuscitation", "Oral glucose", "Levothyroxine", "Warfarin"], answer: 0, rationale: "DKA causes dehydration. Isotonic fluids are a priority." },
  { category: "Endocrine", question: "Which insulin provides basal coverage with minimal peak?", options: ["Lispro", "Regular", "Glargine", "NPH"], answer: 2, rationale: "Glargine is long-acting basal insulin." },
  { category: "Endocrine", question: "Metformin is held before iodinated contrast due to risk for what?", options: ["Lactic acidosis", "Tendon rupture", "Serotonin syndrome", "Bleeding"], answer: 0, rationale: "Contrast kidney injury can increase metformin accumulation and lactic acidosis risk." },
  { category: "Endocrine", question: "Which diabetes drug class can reduce heart failure hospitalization?", options: ["SGLT2 inhibitors", "Sulfonylureas", "Thiazolidinediones", "Alpha blockers"], answer: 0, rationale: "SGLT2 inhibitors have heart failure and kidney benefits." },
  { category: "Endocrine", question: "SIADH typically causes which sodium issue?", options: ["Hypernatremia", "Hyponatremia", "Hypercalcemia", "Hyperglycemia"], answer: 1, rationale: "Excess ADH causes water retention and dilutional hyponatremia." },
  { category: "Respiratory", question: "Which inhaler is rescue therapy?", options: ["Fluticasone", "Albuterol", "Tiotropium", "Salmeterol"], answer: 1, rationale: "Albuterol is a short-acting beta agonist for acute bronchospasm." },
  { category: "Respiratory", question: "What should patients do after using inhaled corticosteroids?", options: ["Rinse mouth", "Avoid spacer always", "Use only during attacks", "Stop vaccines"], answer: 0, rationale: "Rinsing reduces oral candidiasis risk." },
  { category: "Respiratory", question: "Which medication is a long-acting anticholinergic for COPD?", options: ["Tiotropium", "Albuterol", "Montelukast", "Prednisone"], answer: 0, rationale: "Tiotropium is a LAMA for COPD maintenance." },
  { category: "Respiratory", question: "Montelukast has a warning for what serious effect?", options: ["Neuropsychiatric effects", "Kidney stones", "Hearing loss", "Hypoglycemia"], answer: 0, rationale: "Montelukast may cause mood and behavior changes." },
  { category: "Respiratory", question: "Which TB medication can turn body fluids orange?", options: ["Rifampin", "Isoniazid", "Ethambutol", "Pyrazinamide"], answer: 0, rationale: "Rifampin can discolor urine, sweat, and tears orange-red." },
  { category: "Respiratory", question: "Which TB medication requires vision monitoring?", options: ["Ethambutol", "Rifampin", "Isoniazid", "Azithromycin"], answer: 0, rationale: "Ethambutol can cause optic neuritis." },
  { category: "Respiratory", question: "Isoniazid neuropathy risk is reduced with what vitamin?", options: ["Vitamin B6", "Vitamin K", "Calcium", "Iron"], answer: 0, rationale: "Pyridoxine reduces INH-related peripheral neuropathy." },
  { category: "Respiratory", question: "Which oxygen device provides the most precise FiO2?", options: ["Venturi mask", "Nasal cannula", "Simple mask", "Nonrebreather"], answer: 0, rationale: "Venturi masks deliver controlled oxygen concentrations." },
  { category: "Respiratory", question: "Which acid-base problem is common in COPD exacerbation?", options: ["Respiratory acidosis", "Metabolic alkalosis", "Respiratory alkalosis", "Normal CO2 always"], answer: 0, rationale: "CO2 retention causes respiratory acidosis." },
  { category: "Respiratory", question: "Which sign indicates severe respiratory distress?", options: ["Silent chest", "Mild cough only", "Normal speech", "Warm hands"], answer: 0, rationale: "A silent chest may mean minimal air movement and impending failure." },
  { category: "GI/Renal", question: "Crohn disease is associated with what pattern?", options: ["Continuous colon-only inflammation", "Skip lesions anywhere in GI tract", "No inflammation", "Only rectal disease"], answer: 1, rationale: "Crohn can affect any GI region and causes skip lesions." },
  { category: "GI/Renal", question: "Ulcerative colitis usually has what pattern?", options: ["Continuous inflammation starting in rectum", "Skip lesions", "Only stomach", "No bleeding"], answer: 0, rationale: "UC usually begins in the rectum and is continuous." },
  { category: "GI/Renal", question: "Which drug class blocks proton pumps?", options: ["PPIs", "Beta blockers", "Loop diuretics", "Statins"], answer: 0, rationale: "PPIs such as omeprazole strongly reduce gastric acid." },
  { category: "GI/Renal", question: "Ondansetron may prolong what interval?", options: ["QT", "PR only", "QRS only", "ST only"], answer: 0, rationale: "Ondansetron can prolong QT and raise dysrhythmia risk." },
  { category: "GI/Renal", question: "Which lab is most associated with pancreatitis?", options: ["Lipase", "Troponin", "TSH", "BNP"], answer: 0, rationale: "Lipase increases with pancreatic inflammation." },
  { category: "GI/Renal", question: "Which renal lab best estimates kidney filtration?", options: ["eGFR", "BNP", "TSH", "Troponin"], answer: 0, rationale: "eGFR estimates glomerular filtration." },
  { category: "GI/Renal", question: "Which drug is nephrotoxic and often needs levels?", options: ["Vancomycin", "Acetaminophen", "Loratadine", "Levothyroxine"], answer: 0, rationale: "Vancomycin can injure kidneys and often needs monitoring." },
  { category: "GI/Renal", question: "Aminoglycosides can cause what serious effects?", options: ["Nephrotoxicity and ototoxicity", "Hypoglycemia only", "Cushing syndrome", "Hypothyroidism"], answer: 0, rationale: "Aminoglycosides can harm kidneys and hearing." },
  { category: "GI/Renal", question: "Which medication turns urine orange and relieves urinary pain?", options: ["Phenazopyridine", "Furosemide", "Warfarin", "Prazosin"], answer: 0, rationale: "Phenazopyridine is a urinary analgesic that turns urine orange." },
  { category: "GI/Renal", question: "Lactulose lowers which substance in cirrhosis?", options: ["Ammonia", "Troponin", "TSH", "A1c"], answer: 0, rationale: "Lactulose helps trap and excrete ammonia." },
  { category: "Heme/Immune", question: "G6PD deficiency patients should avoid what food?", options: ["Fava beans", "Rice", "Apples", "Calcium"], answer: 0, rationale: "Fava beans can trigger oxidative hemolysis." },
  { category: "Heme/Immune", question: "Sickle cell crisis treatment includes what?", options: ["Hydration and pain control", "Fluid restriction", "Warfarin only", "Levothyroxine"], answer: 0, rationale: "Hydration, oxygen if needed, and analgesia are key." },
  { category: "Heme/Immune", question: "Hydroxyurea helps sickle cell disease by increasing what?", options: ["Fetal hemoglobin", "Platelet clumping", "TSH", "Acid production"], answer: 0, rationale: "Hydroxyurea increases fetal hemoglobin and reduces sickling." },
  { category: "Heme/Immune", question: "Iron deficiency anemia usually shows what RBC pattern?", options: ["Microcytic hypochromic", "Macrocytic", "High B12", "Polycythemia"], answer: 0, rationale: "Iron deficiency causes small pale RBCs." },
  { category: "Heme/Immune", question: "B12 deficiency can cause what major problem?", options: ["Neuropathy", "Bronchospasm", "Hypertension only", "Hyperthyroidism"], answer: 0, rationale: "B12 deficiency can cause neurologic injury." },
  { category: "Heme/Immune", question: "First-line treatment for anaphylaxis is what?", options: ["IM epinephrine", "Oral diphenhydramine only", "Acetaminophen", "Furosemide"], answer: 0, rationale: "IM epinephrine treats airway edema and shock." },
  { category: "Heme/Immune", question: "Which antibiotic can cause red man syndrome if infused too fast?", options: ["Vancomycin", "Amoxicillin", "Azithromycin", "Doxycycline"], answer: 0, rationale: "Rapid vancomycin infusion can cause flushing and hypotension." },
  { category: "Heme/Immune", question: "Which vaccine type is avoided in severe immunocompromise?", options: ["Live vaccines", "Inactivated vaccines", "Toxoid vaccines", "Subunit vaccines"], answer: 0, rationale: "Live vaccines can cause infection in severely immunocompromised patients." },
  { category: "Heme/Immune", question: "Clozapine requires monitoring for what?", options: ["Low ANC", "High HDL", "Low BNP", "High TSH"], answer: 0, rationale: "Clozapine can cause severe neutropenia/agranulocytosis." },
  { category: "Heme/Immune", question: "Which medication inhibits factor Xa?", options: ["Apixaban", "Warfarin", "Aspirin", "Clopidogrel"], answer: 0, rationale: "Apixaban is a direct factor Xa inhibitor." },
  { category: "Neuro/Psych/Pain", question: "Haloperidol worsens Parkinson symptoms because it does what?", options: ["Blocks dopamine", "Increases dopamine", "Blocks acetylcholine only", "Increases GABA"], answer: 0, rationale: "Parkinson disease is dopamine deficient, so dopamine blockade worsens symptoms." },
  { category: "Neuro/Psych/Pain", question: "Prazosin is commonly used off-label for what?", options: ["PTSD nightmares", "DKA", "Fluid overload", "Asthma attack"], answer: 0, rationale: "Prazosin can reduce PTSD-related nightmares." },
  { category: "Neuro/Psych/Pain", question: "Fever, rigidity, and autonomic instability with antipsychotics suggests what?", options: ["Neuroleptic malignant syndrome", "Migraine", "Hypothyroidism", "UTI only"], answer: 0, rationale: "NMS is a life-threatening reaction to dopamine blockade." },
  { category: "Neuro/Psych/Pain", question: "SSRI plus MAOI can cause what syndrome?", options: ["Serotonin syndrome", "Cushing syndrome", "DKA", "SIADH only"], answer: 0, rationale: "Combining serotonergic drugs can cause serotonin toxicity." },
  { category: "Neuro/Psych/Pain", question: "Lithium toxicity risk increases with what?", options: ["Dehydration", "High fluid intake only", "Vitamin C", "Albuterol"], answer: 0, rationale: "Lithium is renally cleared. Dehydration can increase levels." },
  { category: "Neuro/Psych/Pain", question: "Valproate requires monitoring for what?", options: ["Liver toxicity", "Hypothyroidism only", "Bronchospasm", "Kidney stones only"], answer: 0, rationale: "Valproate can cause hepatotoxicity and thrombocytopenia." },
  { category: "Neuro/Psych/Pain", question: "Benzodiazepine overdose can be reversed by what?", options: ["Flumazenil", "Naloxone", "Vitamin K", "Protamine"], answer: 0, rationale: "Flumazenil reverses benzodiazepines, but it is used cautiously." },
  { category: "Neuro/Psych/Pain", question: "Opioid overdose commonly presents with what?", options: ["Respiratory depression and pinpoint pupils", "Hypertension and diarrhea", "Exophthalmos", "Polyuria"], answer: 0, rationale: "Opioids depress respirations and cause miosis." },
  { category: "Neuro/Psych/Pain", question: "Acetaminophen overdose is treated with what?", options: ["N-acetylcysteine", "Naloxone", "Vitamin K", "Atropine"], answer: 0, rationale: "NAC prevents acetaminophen-related liver injury." },
  { category: "Neuro/Psych/Pain", question: "NSAIDs increase risk for what?", options: ["GI bleeding and kidney injury", "Hypoglycemia only", "Thyroid storm", "Vision improvement"], answer: 0, rationale: "NSAIDs inhibit prostaglandins, increasing GI and renal risk." },
  { category: "Women/Peds/Safety", question: "Safest common pain medication during pregnancy is generally what?", options: ["Acetaminophen", "Ibuprofen late pregnancy", "High-dose aspirin", "Warfarin"], answer: 0, rationale: "Acetaminophen is generally preferred when used appropriately." },
  { category: "Women/Peds/Safety", question: "Which medication is highly teratogenic?", options: ["Isotretinoin", "Prenatal vitamin", "Acetaminophen", "Insulin"], answer: 0, rationale: "Isotretinoin causes severe birth defects." },
  { category: "Women/Peds/Safety", question: "A child with viral illness should avoid aspirin due to risk for what?", options: ["Reye syndrome", "DKA", "Cushing disease", "Heart failure"], answer: 0, rationale: "Aspirin in children with viral illness is linked to Reye syndrome." },
  { category: "Women/Peds/Safety", question: "Magnesium sulfate in preeclampsia prevents what?", options: ["Seizures", "UTI", "Hypothyroidism", "Asthma"], answer: 0, rationale: "Magnesium sulfate lowers eclampsia seizure risk." },
  { category: "Women/Peds/Safety", question: "Magnesium toxicity may show what?", options: ["Loss of deep tendon reflexes", "Hyperreflexia", "Severe hunger", "Orange urine"], answer: 0, rationale: "Magnesium toxicity depresses reflexes and respirations." },
  { category: "Women/Peds/Safety", question: "Antidote for magnesium toxicity is what?", options: ["Calcium gluconate", "Vitamin K", "Naloxone", "Flumazenil"], answer: 0, rationale: "Calcium gluconate reverses magnesium toxicity." },
  { category: "Women/Peds/Safety", question: "Which medication is high-alert and requires careful double-checking?", options: ["Insulin", "Loratadine", "Saline nasal spray", "Artificial tears"], answer: 0, rationale: "Insulin errors can rapidly cause serious harm." },
  { category: "Women/Peds/Safety", question: "Which abbreviation should be avoided?", options: ["U for units", "mg", "mL", "PO"], answer: 0, rationale: "U can be misread. Write units instead." },
  { category: "Women/Peds/Safety", question: "Medication dosing in children is commonly based on what?", options: ["Weight in kg", "Parent height", "Room number", "Age only always"], answer: 0, rationale: "Pediatric doses are often calculated in mg/kg." },
  { category: "Women/Peds/Safety", question: "Newborn vitamin K prevents what?", options: ["Hemorrhagic disease", "Hypothyroidism", "DKA", "Asthma"], answer: 0, rationale: "Vitamin K supports clotting factor activation." }
];

const STEM_PREFIXES = ["", "High-yield: ", "Case review: ", "Safety check: ", "Exam focus: ", "Medication safety: ", "Clinical judgment: ", "Priority concept: "];

function shuffleOptions(base, id) {
  const mapped = base.options.map((text, index) => ({ text, original: index }));
  const shuffled = [...mapped].sort((a, b) => ((a.text.length * 31 + id * 17) % 97) - ((b.text.length * 31 + id * 17) % 97));
  return {
    options: shuffled.map(x => x.text),
    answer: shuffled.findIndex(x => x.original === base.answer)
  };
}

const QUESTION_BANK = Array.from({ length: 500 }, (_, i) => {
  const base = BASE_QUESTIONS[i % BASE_QUESTIONS.length];
  const prefix = STEM_PREFIXES[Math.floor(i / BASE_QUESTIONS.length) % STEM_PREFIXES.length];
  const shuffled = shuffleOptions(base, i + 1);
  return {
    id: i + 1,
    category: base.category,
    question: `${prefix}${base.question}`,
    options: shuffled.options,
    answer: shuffled.answer,
    rationale: base.rationale
  };
});

export default function WGU500ExamSimulator() {
  const [mode, setMode] = useState("practice");
  const [category, setCategory] = useState("All");
  const [examSize, setExamSize] = useState(75);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [showRationale, setShowRationale] = useState({});
  const [seed, setSeed] = useState(1);

  const categories = useMemo(() => ["All", ...Array.from(new Set(QUESTION_BANK.map(q => q.category)))], []);

  const activeQuestions = useMemo(() => {
    const filtered = category === "All" ? QUESTION_BANK : QUESTION_BANK.filter(q => q.category === category);
    const shuffled = [...filtered].sort((a, b) => ((a.id * 9301 + seed * 49297) % 233280) - ((b.id * 9301 + seed * 49297) % 233280));
    return mode === "full" ? QUESTION_BANK : shuffled.slice(0, Math.min(examSize, shuffled.length));
  }, [category, examSize, mode, seed]);

  const score = activeQuestions.reduce((total, q, idx) => total + (answers[idx] === q.answer ? 1 : 0), 0);
  const percent = activeQuestions.length ? Math.round((score / activeQuestions.length) * 100) : 0;
  const answeredCount = Object.keys(answers).length;
  const q = activeQuestions[current];

  const startExam = () => {
    setStarted(true);
    setSubmitted(false);
    setAnswers({});
    setShowRationale({});
    setCurrent(0);
    setSeed(s => s + 1);
  };

  const selectAnswer = (optionIndex) => {
    setAnswers(prev => ({ ...prev, [current]: optionIndex }));
    if (mode === "practice") setShowRationale(prev => ({ ...prev, [current]: true }));
  };

  const reset = () => {
    setStarted(false);
    setSubmitted(false);
    setAnswers({});
    setShowRationale({});
    setCurrent(0);
  };

  const categoryStats = useMemo(() => {
    const stats = {};
    activeQuestions.forEach((item, idx) => {
      if (!stats[item.category]) stats[item.category] = { total: 0, correct: 0 };
      stats[item.category].total += 1;
      if (answers[idx] === item.answer) stats[item.category].correct += 1;
    });
    return stats;
  }, [activeQuestions, answers]);

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900">Advanced Pharmacology RN Exam Simulator</h1>
          <p className="mt-3 text-slate-600 text-lg">Practice mode shows rationales right away. Exam mode hides rationales until you submit.</p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="p-5 rounded-2xl bg-slate-50 border">
              <label className="font-semibold text-slate-800">Mode</label>
              <select className="mt-2 w-full p-3 rounded-xl border" value={mode} onChange={e => setMode(e.target.value)}>
                <option value="practice">Practice with instant rationale</option>
                <option value="exam">Exam mode</option>
                <option value="full">Full 500-question bank</option>
              </select>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border">
              <label className="font-semibold text-slate-800">Category</label>
              <select className="mt-2 w-full p-3 rounded-xl border" value={category} onChange={e => setCategory(e.target.value)} disabled={mode === "full"}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border">
              <label className="font-semibold text-slate-800">Question Set Size</label>
              <select className="mt-2 w-full p-3 rounded-xl border" value={examSize} onChange={e => setExamSize(Number(e.target.value))} disabled={mode === "full"}>
                <option value={25}>25 questions</option>
                <option value={50}>50 questions</option>
                <option value={75}>75 questions</option>
                <option value={100}>100 questions</option>
                <option value={125}>125 questions</option>
              </select>
            </div>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-blue-50 border border-blue-200">
            <h2 className="font-bold text-blue-950 text-xl">Study strategy</h2>
            <p className="mt-2 text-blue-900">Aim for 80% or higher. Retake weak categories until you can explain why each wrong answer is wrong.</p>
          </div>

          <button onClick={startExam} className="mt-8 px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-700">Start Simulator</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-5 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-5">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-slate-900">Advanced Pharmacology RN Exam Simulator</h1>
<p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
  This educational tool is independently created for study purposes and is not affiliated with or endorsed by WGU, NCLEX, ATI, or any official testing organization.
</p>
<p className="text-xs text-slate-400 mt-1">
  Designed to support advanced pharmacology nursing coursework and independent RN exam preparation, including topics commonly associated with courses such as WGU D027.
</p>
            <p className="text-slate-600 mt-1">Answered {answeredCount} / {activeQuestions.length}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setSubmitted(true)} className="px-4 py-3 rounded-xl bg-green-700 text-white font-semibold">Submit / Review</button>
            <button onClick={reset} className="px-4 py-3 rounded-xl bg-slate-200 text-slate-900 font-semibold">Reset</button>
          </div>
        </div>

        <div className="mt-5 h-3 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-slate-800" style={{ width: `${(answeredCount / activeQuestions.length) * 100}%` }} />
        </div>

        {submitted && (
          <div className="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-950">Score: {score} / {activeQuestions.length} — {percent}%</h2>
            <p className="mt-1 text-emerald-900">{percent >= 80 ? "Strong pass-range performance. Keep reviewing rationales." : "Keep practicing. Focus on weak categories below."}</p>
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              {Object.entries(categoryStats).map(([cat, s]) => (
                <div key={cat} className="bg-white rounded-xl border p-3">
                  <p className="font-semibold text-slate-800">{cat}</p>
                  <p className="text-slate-600">{s.correct} / {s.total} correct — {Math.round((s.correct / s.total) * 100)}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {q && (
          <div className="mt-8 border rounded-3xl p-5 md:p-8 bg-slate-50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">Question {current + 1} of {activeQuestions.length} · {q.category}</p>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">{q.question}</h2>
              </div>
              <span className="text-xs rounded-full bg-white border px-3 py-1 text-slate-600">ID {q.id}</span>
            </div>

            <div className="mt-6 space-y-3">
              {q.options.map((option, idx) => {
                const isSelected = answers[current] === idx;
                const reveal = submitted || showRationale[current];
                const isCorrect = q.answer === idx;
                let classes = "w-full text-left p-4 rounded-2xl border bg-white hover:bg-slate-100 transition";
                if (reveal && isCorrect) classes = "w-full text-left p-4 rounded-2xl border bg-green-100 border-green-500";
                if (reveal && isSelected && !isCorrect) classes = "w-full text-left p-4 rounded-2xl border bg-red-100 border-red-500";
                if (!reveal && isSelected) classes = "w-full text-left p-4 rounded-2xl border bg-blue-100 border-blue-500";
                return <button key={idx} onClick={() => selectAnswer(idx)} className={classes}>{String.fromCharCode(65 + idx)}. {option}</button>;
              })}
            </div>

            {(submitted || showRationale[current]) && (
              <div className="mt-6 p-5 rounded-2xl bg-blue-50 border border-blue-200">
{answers[current] === q.answer ? (
  <p className="font-bold text-green-800">
    Correct! You selected {String.fromCharCode(65 + answers[current])}. {q.options[answers[current]]}
  </p>
) : (
  <p className="font-bold text-red-800">
    Incorrect. You selected {String.fromCharCode(65 + answers[current])}. {q.options[answers[current]]}
    <br />
    Correct Answer: {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}
  </p>
)}
                <p className="mt-2 text-slate-700">{q.rationale}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-between items-center gap-3">
          <button disabled={current === 0} onClick={() => setCurrent(c => Math.max(0, c - 1))} className="px-5 py-3 rounded-xl bg-slate-200 disabled:opacity-40 font-semibold">Previous</button>
          <select className="p-3 rounded-xl border" value={current} onChange={e => setCurrent(Number(e.target.value))}>
            {activeQuestions.map((_, idx) => <option key={idx} value={idx}>Question {idx + 1}</option>)}
          </select>
          <button disabled={current === activeQuestions.length - 1} onClick={() => setCurrent(c => Math.min(activeQuestions.length - 1, c + 1))} className="px-5 py-3 rounded-xl bg-slate-900 text-white disabled:opacity-40 font-semibold">Next</button>
        </div>
      </div>
    </div>
  );
}
