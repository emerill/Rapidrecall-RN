import React, { useMemo, useState } from "react";

const ACCESS_CODE = "123";

// Full combined question bank: old + new questions from your pasted code.
// Total unique questions included: 168
const QUESTIONS = [
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
  { category: "Women/Peds/Safety", question: "Newborn vitamin K prevents what?", options: ["Hemorrhagic disease", "Hypothyroidism", "DKA", "Asthma"], answer: 0, rationale: "Vitamin K supports clotting factor activation." },
  { category: 'Cardiac', question: 'What is the normal ejection fraction?', options: ['25–35%', '40–45%', '55–60%', '70–80%'], answer: 2, explanation: 'Normal EF is approximately 55–60%.' },
  { category: 'Cardiac', question: 'Is an EF of 50% reduced or preserved?', options: ['Severely reduced', 'Mildly reduced', 'Preserved', 'Cardiogenic shock'], answer: 2, explanation: 'An EF of 50% is generally considered preserved or borderline preserved.' },
  { category: 'Cardiac', question: 'What are symptoms of left-sided heart failure?', options: ['Peripheral edema', 'Pulmonary congestion/crackles', 'Calf pain', 'Ascites'], answer: 1, explanation: 'Left-sided HF causes pulmonary congestion and dyspnea.' },
  { category: 'Cardiac', question: 'What are symptoms of right-sided heart failure?', options: ['Pulmonary edema', 'Peripheral edema/ascites', 'Hemoptysis', 'Wheezing'], answer: 1, explanation: 'Right-sided HF causes systemic venous congestion.' },
  { category: 'Cardiac', question: 'What lab supports heart failure diagnosis?', options: ['Troponin', 'BNP', 'TSH', 'CRP'], answer: 1, explanation: 'BNP rises with ventricular stretch.' },
  { category: 'Cardiac', question: 'BNP greater than what value suggests HF?', options: ['10', '50', '100', '5000'], answer: 2, explanation: 'BNP >100 supports HF diagnosis.' },
  { category: 'Cardiac', question: 'What heart disease worsens with exertion?', options: ['Ischemic heart disease', 'Crohn disease', 'Asthma', 'Celiac disease'], answer: 0, explanation: 'Exertion increases myocardial oxygen demand.' },
  { category: 'Cardiac', question: 'What should be checked before digoxin?', options: ['Temperature', 'Apical pulse', 'Bowel sounds', 'Weight'], answer: 1, explanation: 'Digoxin may cause bradycardia.' },
  { category: 'Cardiac', question: 'How should warfarin be started?', options: ['Max dose immediately', 'Careful INR-monitored dosing', 'No monitoring needed', 'With potassium'], answer: 1, explanation: 'Warfarin requires INR monitoring.' },
  { category: 'Cardiac', question: 'What medication class is given after MI?', options: ['Beta blockers', 'Antihistamines', 'Steroids', 'Antifungals'], answer: 0, explanation: 'Beta blockers reduce mortality after MI.' },
  { category: 'Cardiac', question: 'Best medication for diabetic HTN?', options: ['ACE inhibitor', 'Antihistamine', 'Insulin', 'Statin'], answer: 0, explanation: 'ACE inhibitors protect kidneys.' },
  { category: 'Cardiac', question: 'Do not combine ACE inhibitors with?', options: ['ARBs', 'SSRIs', 'Antihistamines', 'Insulin'], answer: 0, explanation: 'Combination increases renal injury/hyperkalemia risk.' },
  { category: 'Cardiac', question: 'First-line uncomplicated HTN treatment?', options: ['Hydrochlorothiazide', 'Digoxin', 'Warfarin', 'Morphine'], answer: 0, explanation: 'Thiazides are common first-line agents.' },
  { category: 'Cardiac', question: 'When should first antihypertensive dose be taken?', options: ['Morning', 'Noon', 'Night', 'During exercise'], answer: 2, explanation: 'Night dosing may reduce orthostatic injury risk.' },
  { category: 'Cardiac', question: 'Which antihypertensive should asthma patients avoid?', options: ['ARB', 'ACE inhibitor', 'Nonselective beta blocker', 'CCB'], answer: 2, explanation: 'They can cause bronchoconstriction.' },
  { category: 'Cardiac', question: 'First-choice calcium channel blocker from study bank?', options: ['Verapamil', 'Digoxin', 'Warfarin', 'Prednisone'], answer: 0, explanation: 'Verapamil is a non-dihydropyridine CCB.' },
  { category: 'Cardiac', question: 'What medication class helps HTN with CKD?', options: ['ACE/ARB', 'Antihistamines', 'Opioids', 'SSRIs'], answer: 0, explanation: 'ACE/ARBs may slow kidney disease progression.' },
  { category: 'Cardiac', question: 'What medication may be added to uncontrolled HTN on ACE inhibitor?', options: ['Another ACE inhibitor', 'Amlodipine', 'Digoxin', 'Meperidine'], answer: 1, explanation: 'Amlodipine is commonly added.' },
  { category: 'Cardiac', question: 'ACE inhibitor side effects?', options: ['Dry cough/hyperkalemia', 'Hair loss', 'Hypoglycemia', 'Hearing loss'], answer: 0, explanation: 'ACE inhibitors increase bradykinin and potassium.' },
  { category: 'Cardiac', question: 'What side effect occurs with statins?', options: ['Muscle pain', 'Dry mouth', 'Bradycardia', 'Hypercalcemia'], answer: 0, explanation: 'Statins can cause rhabdomyolysis.' },
  { category: 'Cardiac', question: 'What type of diuretic is spironolactone?', options: ['Loop', 'Potassium-sparing', 'Osmotic', 'Carbonic anhydrase inhibitor'], answer: 1, explanation: 'Spironolactone retains potassium.' },
  { category: 'Cardiac', question: 'Which diuretic is less effective in renal failure?', options: ['Thiazide', 'SSRI', 'Antihistamine', 'Antipsychotic'], answer: 0, explanation: 'Thiazides are less effective with severe renal impairment.' },
  { category: 'Endocrine', question: 'Normal TSH range?', options: ['0.4–4.0', '10–20', '20–30', '50–100'], answer: 0, explanation: 'Normal TSH is about 0.4–4.0.' },
  { category: 'Endocrine', question: 'Elevated TSH usually indicates?', options: ['Hyperthyroidism', 'Hypothyroidism', 'DKA', 'Cushing syndrome'], answer: 1, explanation: 'High TSH usually indicates hypothyroidism.' },
  { category: 'Endocrine', question: 'What antibody is linked with Hashimoto disease?', options: ['TPO antibody', 'Troponin', 'BNP', 'D-dimer'], answer: 0, explanation: 'TPO antibodies are associated with Hashimoto thyroiditis.' },
  { category: 'Endocrine', question: 'Symptoms of hypothyroidism?', options: ['Cold intolerance/bradycardia', 'Heat intolerance/tachycardia', 'Fruity breath', 'Stridor'], answer: 0, explanation: 'Hypothyroidism slows metabolism.' },
  { category: 'Endocrine', question: 'Symptoms of hyperthyroidism?', options: ['Bradycardia', 'Tachycardia/anxiety', 'Weight gain', 'Constipation'], answer: 1, explanation: 'Hyperthyroidism speeds metabolism.' },
  { category: 'Endocrine', question: 'What causes Graves disease?', options: ['Autoimmune hyperthyroidism', 'Low cortisol', 'Low insulin', 'Beta-globin mutation'], answer: 0, explanation: 'Graves disease causes excess thyroid hormone production.' },
  { category: 'Endocrine', question: 'How is Graves disease treated?', options: ['Methimazole/PTU', 'Iron only', 'Insulin only', 'HCTZ only'], answer: 0, explanation: 'Methimazole/PTU suppress thyroid hormone production.' },
  { category: 'Endocrine', question: 'What causes Addison disease?', options: ['Low glucocorticoids', 'High cortisol', 'High insulin', 'High thyroid hormone'], answer: 0, explanation: 'Addison disease is adrenal insufficiency.' },
  { category: 'Endocrine', question: 'What causes Cushing syndrome?', options: ['Low cortisol', 'High cortisol', 'Low insulin', 'Low thyroid hormone'], answer: 1, explanation: 'Cushing syndrome is caused by excess cortisol.' },
  { category: 'Endocrine', question: 'Why is HgbA1c tested?', options: ['3-month glucose average', 'HF diagnosis', 'Thyroid function', 'Cancer marker'], answer: 0, explanation: 'HgbA1c reflects long-term glucose control.' },
  { category: 'Endocrine', question: 'Which insulin is most painful during injection?', options: ['Lantus', 'Lispro', 'Regular', 'NPH'], answer: 0, explanation: 'Lantus may sting because of its acidic formulation.' },
  { category: 'Endocrine', question: 'Signs of DKA?', options: ['Fruity breath/Kussmaul respirations', 'Dry eyes', 'Stridor', 'Peripheral edema'], answer: 0, explanation: 'DKA causes ketosis and metabolic acidosis.' },
  { category: 'Respiratory', question: 'What destroys alveolar walls?', options: ['Asthma', 'Bronchitis', 'Emphysema', 'Pleural effusion'], answer: 2, explanation: 'Emphysema destroys alveoli causing air trapping.' },
  { category: 'Respiratory', question: 'What causes mucus hypersecretion and smooth muscle hypertrophy?', options: ['Bronchitis', 'Crohn disease', 'Hashimoto disease', 'Turner syndrome'], answer: 0, explanation: 'Chronic bronchitis increases mucus production.' },
  { category: 'Respiratory', question: 'What disease causes reversible bronchial obstruction?', options: ['Asthma', 'Crohn disease', 'Addison disease', 'Turner syndrome'], answer: 0, explanation: 'Asthma causes reversible bronchoconstriction.' },
  { category: 'Respiratory', question: 'Most common major lung cancer type?', options: ['NSCLC', 'Small cell', 'Sarcoma', 'Lymphoma'], answer: 0, explanation: 'Non-small cell lung cancer is the most common major category.' },
  { category: 'Respiratory', question: 'What mutations are commonly tested in NSCLC?', options: ['EGFR and ALK', 'BNP and TSH', 'IgA only', 'HgbA1c'], answer: 0, explanation: 'These mutations guide targeted therapy.' },
  { category: 'Respiratory', question: 'What pediatric condition causes barking cough and stridor?', options: ['Croup', 'Asthma', 'DKA', 'Pneumonia'], answer: 0, explanation: 'Croup classically causes barking cough and stridor.' },
  { category: 'Respiratory', question: 'What treatment is used for croup?', options: ['Dexamethasone/epinephrine', 'Warfarin', 'Methimazole', 'Ferrous sulfate'], answer: 0, explanation: 'Steroids reduce airway swelling.' },
  { category: 'Respiratory', question: 'What causes fluid accumulation in pleural space?', options: ['Pleural effusion', 'Croup', 'Graves disease', 'G6PD deficiency'], answer: 0, explanation: 'Pleural effusion is fluid in the pleural space.' },
  { category: 'Pharmacology', question: 'Which antibiotics should be avoided in pregnancy?', options: ['Fluoroquinolones/tetracyclines', 'Cephalosporins', 'Fosfomycin', 'Penicillins'], answer: 0, explanation: 'They may affect fetal cartilage and bone/teeth development.' },
  { category: 'Pharmacology', question: 'What medication may treat UTI in pregnancy?', options: ['Fosfomycin', 'Ciprofloxacin', 'Tetracycline', 'Levofloxacin'], answer: 0, explanation: 'Fosfomycin is commonly used in pregnancy.' },
  { category: 'Pharmacology', question: 'What medications are commonly used for pediatric UTI?', options: ['TMP-SMX/Augmentin/cephalosporins', 'Warfarin', 'Methimazole', 'Meperidine'], answer: 0, explanation: 'These are common pediatric UTI treatments.' },
  { category: 'Pharmacology', question: 'Combined oral contraceptives are avoided during?', options: ['Breastfeeding', 'Croup', 'Otitis media', 'G6PD deficiency'], answer: 0, explanation: 'Estrogen may reduce milk supply.' },
  { category: 'Pharmacology', question: 'Common antihistamine side effects?', options: ['Sedation/dry mouth', 'Hemolysis', 'Hyperthyroidism', 'DKA'], answer: 0, explanation: 'First-generation antihistamines have anticholinergic effects.' },
  { category: 'Pharmacology', question: 'What receptor is involved in allergic symptoms and bronchoconstriction?', options: ['H1 receptor', 'TSH receptor', 'Dopamine receptor', 'Insulin receptor'], answer: 0, explanation: 'H1 receptors mediate allergic responses.' },
  { category: 'Pharmacology', question: 'What is Florinef used for?', options: ['Adrenal insufficiency', 'Hyperthyroidism', 'Lung cancer', 'Celiac disease'], answer: 0, explanation: 'Fludrocortisone replaces mineralocorticoid effects.' },
  { category: 'Pharmacology', question: 'Florinef side effects?', options: ['Edema/hypertension/hypokalemia', 'Hyperthyroidism', 'Hemolytic anemia', 'Dry eyes'], answer: 0, explanation: 'Florinef causes sodium and water retention.' },
  { category: 'Pharmacology', question: 'What are corticosteroid side effects?', options: ['Osteoporosis/immunosuppression', 'Permanent cure of autoimmune disease', 'Hypoglycemia only', 'No infection risk'], answer: 0, explanation: 'Long-term steroids cause many systemic effects.' },
  { category: 'Pharmacology', question: 'What treats myasthenia gravis?', options: ['Cholinesterase inhibitors', 'ACE inhibitors', 'Antihistamines', 'Statins'], answer: 0, explanation: 'They increase acetylcholine at the neuromuscular junction.' },
  { category: 'Pharmacology', question: 'What do cholinesterase inhibitors do?', options: ['Increase acetylcholine', 'Destroy acetylcholine', 'Lower BNP', 'Destroy thyroid hormone'], answer: 0, explanation: 'They inhibit acetylcholinesterase.' },
  { category: 'Pharmacology', question: 'Cholinesterase inhibitor side effects?', options: ['Bradycardia/salivation/diarrhea', 'Hyperkalemia', 'Dry mouth', 'Hyperthyroidism'], answer: 0, explanation: 'They increase parasympathetic activity.' },
  { category: 'Pharmacology', question: 'Medication used for infusion rigors?', options: ['Meperidine', 'Levothyroxine', 'Methimazole', 'HCTZ'], answer: 0, explanation: 'Meperidine treats rigors during infusions.' },
  { category: 'Psych', question: 'First-line medication class for depression?', options: ['SSRIs', 'Opioids', 'Antihistamines', 'Diuretics'], answer: 0, explanation: 'SSRIs are effective with favorable safety profiles.' },
  { category: 'Psych', question: 'What medications are given PRN for acute anxiety?', options: ['Benzodiazepines', 'Statins', 'ACE inhibitors', 'Insulin'], answer: 0, explanation: 'Benzodiazepines work rapidly for anxiety.' },
  { category: 'Psych', question: 'What medication treats schizophrenia?', options: ['Chlorpromazine', 'HCTZ', 'Levothyroxine', 'Ferrous sulfate'], answer: 0, explanation: 'Chlorpromazine is a first-generation antipsychotic.' },
  { category: 'Psych', question: 'What medications treat neuropathic pain?', options: ['Duloxetine/pregabalin', 'Warfarin/digoxin', 'Methimazole/PTU', 'Fosfomycin'], answer: 0, explanation: 'Neuropathic pain responds to nerve-modulating drugs.' },
  { category: 'Psych', question: 'What medication treats PTSD nightmares?', options: ['Prazosin', 'Digoxin', 'Warfarin', 'Levothyroxine'], answer: 0, explanation: 'Prazosin reduces trauma-related nightmares.' },
  { category: 'Neuro', question: 'How is POTS diagnosed?', options: ['Tilt-table test', 'BNP', 'TSH', 'Colonoscopy'], answer: 0, explanation: 'Tilt-table testing evaluates orthostatic tachycardia.' },
  { category: 'Neuro', question: 'Crescent-shaped bleed on CT?', options: ['Subdural hematoma', 'Epidural hematoma', 'Croup', 'Pleural effusion'], answer: 0, explanation: 'Subdural hematomas are crescent-shaped.' },
  { category: 'Neuro', question: 'Lens-shaped bleed on CT?', options: ['Epidural hematoma', 'Subdural hematoma', 'Crohn disease', 'Sjögren syndrome'], answer: 0, explanation: 'Epidural hematomas are lens-shaped.' },
  { category: 'GI', question: 'What GI tract areas does Crohn disease affect?', options: ['Mouth to anus', 'Colon only', 'Stomach only', 'Esophagus only'], answer: 0, explanation: 'Crohn disease can affect any GI segment.' },
  { category: 'GI', question: 'What finding is associated with Crohn disease?', options: ['Cobblestoning', 'Smooth mucosa', 'Lens bleed', 'Pleural fluid'], answer: 0, explanation: 'Crohn disease causes cobblestoning and skip lesions.' },
  { category: 'GI', question: 'What immunoglobulin is associated with celiac disease?', options: ['IgA', 'IgM', 'IgE', 'IgD'], answer: 0, explanation: 'Celiac screening uses IgA tissue transglutaminase antibodies.' },
  { category: 'GI', question: 'What glands are affected in Sjögren syndrome?', options: ['Tear/salivary glands', 'Adrenal glands', 'Pancreas', 'Pituitary'], answer: 0, explanation: 'Sjögren syndrome causes dry eyes and dry mouth.' },
  { category: 'Hematology', question: 'What is beta thalassemia?', options: ['Decreased beta-globin synthesis', 'High thyroid hormone', 'Pleural fluid', 'Airway swelling'], answer: 0, explanation: 'Beta thalassemia reduces hemoglobin production.' },
  { category: 'Hematology', question: 'What medication may be dangerous in beta thalassemia?', options: ['Ferrous sulfate', 'Acetaminophen', 'Methimazole', 'Prazosin'], answer: 0, explanation: 'Iron overload may occur in thalassemia.' },
  { category: 'Hematology', question: 'First-line treatment in sickle cell crisis?', options: ['Hydration', 'Iron', 'Methimazole', 'Digoxin'], answer: 0, explanation: 'Hydration reduces blood viscosity.' },
  { category: 'Hematology', question: 'Important parental teaching in sickle cell disease?', options: ['Hydration/vaccines/infection prevention', 'Avoid vaccines', 'Restrict fluids', 'Iron for all'], answer: 0, explanation: 'Children are at increased risk for infection and pain crises.' },
  { category: 'Hematology', question: 'What should be avoided in G6PD deficiency?', options: ['Fava beans', 'Rice', 'Calcium', 'Water'], answer: 0, explanation: 'Oxidative stress triggers hemolysis.' },
  { category: 'Hematology', question: 'What does G6PD deficiency cause?', options: ['Hemolytic anemia', 'Hyperthyroidism', 'Heart failure', 'Crohn disease'], answer: 0, explanation: 'Oxidative injury destroys RBCs.' },
  { category: 'Genetics', question: 'What is Klinefelter syndrome?', options: ['XXY male', 'XO female', 'Trisomy 21', 'Beta-globin defect'], answer: 0, explanation: 'Klinefelter syndrome involves an extra X chromosome.' },
  { category: 'Genetics', question: 'What is Turner syndrome?', options: ['Missing X chromosome in female', 'XXY male', 'RET mutation', 'Beta-globin defect'], answer: 0, explanation: 'Turner syndrome involves monosomy X.' },
  { category: 'Genetics', question: 'Who passes X-linked color blindness to sons?', options: ['Mother', 'Father only', 'Both parents', 'Neither parent'], answer: 0, explanation: 'Sons inherit their X chromosome from the mother.' },
  { category: 'Genetics', question: 'What syndrome may cause pediatric ataxia?', options: ['Fragile X/Prader-Willi', 'HF', 'Croup', 'Celiac disease'], answer: 0, explanation: 'Certain genetic syndromes may cause neurologic findings.' },
  { category: 'Genetics', question: 'What condition causes waddling gait and toe walking?', options: ['Becker muscular dystrophy', 'Croup', 'Graves disease', 'Pleural effusion'], answer: 0, explanation: 'Muscular dystrophy causes progressive proximal weakness.' },
  { category: 'Pediatrics', question: 'First-line pediatric otitis media treatment?', options: ['Amoxicillin', 'Ciprofloxacin', 'Methimazole', 'Warfarin'], answer: 0, explanation: 'Amoxicillin is standard first-line therapy.' },
  { category: 'Pediatrics', question: 'Priority treatment in congenital hypothyroidism?', options: ['Early thyroid replacement', 'Wait several years', 'Beta blocker only', 'Iron only'], answer: 0, explanation: 'Early treatment prevents developmental delay.' },
  { category: 'Pediatrics', question: 'What should parents monitor in newborn sickle cell disease?', options: ['Fever/swelling/pain/jaundice', 'Hair loss', 'Dry mouth', 'Only thyroid symptoms'], answer: 0, explanation: 'Children are vulnerable to infection and vaso-occlusion.' },
  { category: 'Oncology', question: 'What drug class is used in some leukemia regimens?', options: ['Glucocorticoids', 'Thiazides', 'Antihistamines', 'ACE inhibitors'], answer: 0, explanation: 'Glucocorticoids can destroy lymphoid cells.' },
  { category: 'Oncology', question: 'RET oncogene is associated with?', options: ['Medullary thyroid carcinoma', 'Down syndrome', 'Color blindness', 'Prader-Willi'], answer: 0, explanation: 'RET mutations are associated with MEN2 and medullary thyroid carcinoma.' },
  { category: 'Rapid Review', question: 'What medication requires checking an apical pulse before administration?', options: ['Digoxin', 'Amoxicillin', 'Methimazole', 'Fosfomycin'], answer: 0, explanation: 'Digoxin can cause bradycardia and dysrhythmias.' },
  { category: 'Rapid Review', question: 'What endocrine disorder causes buffalo hump?', options: ['Cushing syndrome', 'Addison disease', 'Hypothyroidism', 'DKA'], answer: 0, explanation: 'Buffalo hump is associated with cortisol excess.' },
  { category: 'Rapid Review', question: 'What disease causes dry eyes and dry mouth?', options: ['Sjögren syndrome', 'Crohn disease', 'Asthma', 'DKA'], answer: 0, explanation: 'Sjögren syndrome attacks tear and salivary glands.' },
  { category: 'Rapid Review', question: 'What condition causes cobblestoning?', options: ['Crohn disease', 'UC', 'Celiac disease', 'GERD'], answer: 0, explanation: 'Crohn disease commonly causes cobblestone mucosa.' },
  { category: 'Rapid Review', question: 'Which medication class causes dry cough?', options: ['ACE inhibitors', 'SSRIs', 'Statins', 'CCBs'], answer: 0, explanation: 'ACE inhibitors increase bradykinin.' },
  { category: 'Rapid Review', question: 'Which medication class may cause rhabdomyolysis?', options: ['Statins', 'Antihistamines', 'SSRIs', 'Diuretics'], answer: 0, explanation: 'Statins may cause severe muscle injury.' },
  { category: 'Rapid Review', question: 'Which disease affects the entire GI tract?', options: ['Crohn disease', 'Ulcerative colitis', 'Celiac disease', 'GERD'], answer: 0, explanation: 'Crohn disease may affect mouth to anus.' },
  { category: 'Rapid Review', question: 'Which disease is associated with TSH receptor antibodies?', options: ['Graves disease', 'Hashimoto disease', 'DKA', 'Addison disease'], answer: 0, explanation: 'TSH receptor antibodies stimulate the thyroid gland.' },
  { category: 'Rapid Review', question: 'What is first-line treatment in sickle cell crisis?', options: ['Hydration', 'Iron', 'Digoxin', 'Methimazole'], answer: 0, explanation: 'Hydration reduces blood viscosity.' },
  { category: 'Rapid Review', question: 'What imaging finding is seen in epidural hematoma?', options: ['Lens-shaped bleed', 'Crescent-shaped bleed', 'Cobblestoning', 'Pleural fluid'], answer: 0, explanation: 'Epidural hematomas are lens-shaped.' },
  { category: 'Rapid Review', question: 'What imaging finding is seen in subdural hematoma?', options: ['Crescent-shaped bleed', 'Lens-shaped bleed', 'Cobblestoning', 'Pleural fluid'], answer: 0, explanation: 'Subdural hematomas are crescent-shaped.' },
  { category: 'Rapid Review', question: 'What lab reflects 3-month glucose control?', options: ['HgbA1c', 'BNP', 'TSH', 'Troponin'], answer: 0, explanation: 'HgbA1c estimates average glucose over 3 months.' },
  { category: 'Rapid Review', question: 'Which disease is associated with TPO antibodies?', options: ['Hashimoto thyroiditis', 'Graves disease', 'Celiac disease', 'HF'], answer: 0, explanation: 'TPO antibodies are linked with Hashimoto disease.' },
  { category: 'Rapid Review', question: 'What condition causes destruction of alveolar walls?', options: ['Emphysema', 'Bronchitis', 'Asthma', 'Pleural effusion'], answer: 0, explanation: 'Emphysema destroys alveoli.' },
  { category: 'Rapid Review', question: 'Which medication class is first-line for depression?', options: ['SSRIs', 'Antipsychotics', 'Statins', 'Diuretics'], answer: 0, explanation: 'SSRIs are common first-line antidepressants.' }
];

function getRationale(q) {
  return q.rationale || q.explanation || "Review the related concept and medication safety point.";
}

function getLetter(index) {
  return String.fromCharCode(65 + index);
}

export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const [accessInput, setAccessInput] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showRationale, setShowRationale] = useState({});
  const [mode, setMode] = useState("practice");
  const [category, setCategory] = useState("All");
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const [search, setSearch] = useState("");

  const categories = useMemo(() => ["All", ...Array.from(new Set(QUESTIONS.map(q => q.category)))], []);

  const activeQuestions = useMemo(() => {
    let list = category === "All" ? QUESTIONS : QUESTIONS.filter(q => q.category === category);
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      list = list.filter(q =>
        q.question.toLowerCase().includes(term) ||
        q.category.toLowerCase().includes(term) ||
        q.options.some(opt => opt.toLowerCase().includes(term)) ||
        getRationale(q).toLowerCase().includes(term)
      );
    }
    return list;
  }, [category, search]);

  const q = activeQuestions[current];

  const score = activeQuestions.reduce((total, item, idx) => {
    return total + (answers[idx] === item.answer ? 1 : 0);
  }, 0);

  const answeredCount = Object.keys(answers).length;
  const percent = activeQuestions.length ? Math.round((score / activeQuestions.length) * 100) : 0;

  const categoryStats = useMemo(() => {
    const stats = {};
    activeQuestions.forEach((item, idx) => {
      if (!stats[item.category]) stats[item.category] = { total: 0, correct: 0 };
      stats[item.category].total += 1;
      if (answers[idx] === item.answer) stats[item.category].correct += 1;
    });
    return stats;
  }, [activeQuestions, answers]);

  const startQuiz = () => {
    setStarted(true);
    setSubmitted(false);
    setAnswers({});
    setShowRationale({});
    setCurrent(0);
  };

  const resetQuiz = () => {
    setStarted(false);
    setSubmitted(false);
    setAnswers({});
    setShowRationale({});
    setCurrent(0);
  };

  const selectAnswer = (idx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [current]: idx }));
    if (mode === "practice") {
      setShowRationale(prev => ({ ...prev, [current]: true }));
    }
  };

  const next = () => setCurrent(c => Math.min(activeQuestions.length - 1, c + 1));
  const previous = () => setCurrent(c => Math.max(0, c - 1));

  if (!authorized) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 420, background: "white", padding: 28, borderRadius: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.12)", textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: 32 }}>RapidRecall RN</h1>
          <p style={{ color: "#475569" }}>Enter your access code to continue.</p>
          <input
            type="password"
            value={accessInput}
            onChange={e => setAccessInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && accessInput === ACCESS_CODE) setAuthorized(true); }}
            placeholder="Enter Access Code"
            style={{ width: "100%", padding: 14, borderRadius: 12, border: "1px solid #cbd5e1", textAlign: "center", fontSize: 18, boxSizing: "border-box" }}
          />
          <button
            onClick={() => setAuthorized(accessInput === ACCESS_CODE)}
            style={{ marginTop: 14, width: "100%", padding: 14, borderRadius: 12, border: 0, background: "#0f172a", color: "white", fontWeight: 700 }}
          >
            Enter
          </button>
          <p style={{ color: "#94a3b8", fontSize: 12 }}>Access code: 123</p>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div style={{ minHeight: "100vh", background: "#f1f5f9", padding: 20 }}>
        <div style={{ maxWidth: 980, margin: "0 auto", background: "white", padding: 28, borderRadius: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.10)" }}>
          <h1 style={{ marginTop: 0, fontSize: 36 }}>Advanced Pharmacology RN Quiz App</h1>
          <p style={{ color: "#475569", fontSize: 18 }}>Includes all combined old + new questions found in your pasted code.</p>
          <h2>Total questions included: {QUESTIONS.length}</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginTop: 22 }}>
            <div style={{ background: "#f8fafc", padding: 16, borderRadius: 16, border: "1px solid #e2e8f0" }}>
              <label style={{ fontWeight: 700 }}>Mode</label>
              <select value={mode} onChange={e => setMode(e.target.value)} style={{ width: "100%", padding: 12, marginTop: 8, borderRadius: 12 }}>
                <option value="practice">Practice: show rationale right away</option>
                <option value="exam">Exam: hide rationale until submit</option>
                <option value="flashcard">Flashcard mode</option>
              </select>
            </div>

            <div style={{ background: "#f8fafc", padding: 16, borderRadius: 16, border: "1px solid #e2e8f0" }}>
              <label style={{ fontWeight: 700 }}>Category</label>
              <select value={category} onChange={e => { setCategory(e.target.value); setCurrent(0); }} style={{ width: "100%", padding: 12, marginTop: 8, borderRadius: 12 }}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ background: "#f8fafc", padding: 16, borderRadius: 16, border: "1px solid #e2e8f0" }}>
              <label style={{ fontWeight: 700 }}>Search</label>
              <input value={search} onChange={e => { setSearch(e.target.value); setCurrent(0); }} placeholder="Search questions" style={{ width: "100%", padding: 12, marginTop: 8, borderRadius: 12, border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ marginTop: 22, background: "#eff6ff", border: "1px solid #bfdbfe", padding: 16, borderRadius: 16 }}>
            <strong>Study tip:</strong> Use Practice mode first. Then switch to Exam mode once you can explain why each wrong answer is wrong.
          </div>

          <button onClick={startQuiz} style={{ marginTop: 24, padding: "16px 24px", borderRadius: 14, border: 0, background: "#0f172a", color: "white", fontWeight: 800, fontSize: 16 }}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (!q) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No questions found.</h2>
        <button onClick={resetQuiz}>Back</button>
      </div>
    );
  }

  const reveal = submitted || showRationale[current] || mode === "flashcard";

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", padding: 20 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", background: "white", padding: 24, borderRadius: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.10)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", borderBottom: "1px solid #e2e8f0", paddingBottom: 16 }}>
          <div>
            <h1 style={{ margin: 0 }}>RapidRecall RN</h1>
            <p style={{ margin: "6px 0", color: "#475569" }}>Question {current + 1} of {activeQuestions.length} · {q.category}</p>
            <p style={{ margin: 0, color: "#64748b" }}>Answered {answeredCount} / {activeQuestions.length}</p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={() => setSubmitted(true)} style={{ padding: "12px 14px", borderRadius: 12, border: 0, background: "#15803d", color: "white", fontWeight: 700 }}>Submit / Review</button>
            <button onClick={resetQuiz} style={{ padding: "12px 14px", borderRadius: 12, border: 0, background: "#e2e8f0", fontWeight: 700 }}>Reset</button>
          </div>
        </div>

        <div style={{ height: 12, background: "#e2e8f0", borderRadius: 999, marginTop: 16, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(answeredCount / activeQuestions.length) * 100}%`, background: "#0f172a" }} />
        </div>

        {submitted && (
          <div style={{ marginTop: 18, background: "#ecfdf5", border: "1px solid #bbf7d0", padding: 16, borderRadius: 16 }}>
            <h2 style={{ margin: 0 }}>Score: {score} / {activeQuestions.length} — {percent}%</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10, marginTop: 12 }}>
              {Object.entries(categoryStats).map(([cat, s]) => (
                <div key={cat} style={{ background: "white", border: "1px solid #d1fae5", borderRadius: 12, padding: 12 }}>
                  <strong>{cat}</strong>
                  <p style={{ margin: "4px 0" }}>{s.correct} / {s.total} correct — {Math.round((s.correct / s.total) * 100)}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 22, background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 20, padding: 20 }}>
          <p style={{ color: "#64748b", fontWeight: 700 }}>{q.category}</p>
          <h2 style={{ fontSize: 24 }}>{q.question}</h2>

          {mode === "flashcard" ? (
            <div style={{ background: "#1d4ed8", color: "white", padding: 24, borderRadius: 18, marginTop: 16 }}>
              <h3>Answer: {getLetter(q.answer)}. {q.options[q.answer]}</h3>
              <p>{getRationale(q)}</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
              {q.options.map((option, idx) => {
                const isSelected = answers[current] === idx;
                const isCorrect = q.answer === idx;
                let bg = "white";
                let border = "#cbd5e1";
                if (reveal && isCorrect) { bg = "#dcfce7"; border = "#22c55e"; }
                if (reveal && isSelected && !isCorrect) { bg = "#fee2e2"; border = "#ef4444"; }
                if (!reveal && isSelected) { bg = "#dbeafe"; border = "#3b82f6"; }
                return (
                  <button key={idx} onClick={() => selectAnswer(idx)} style={{ textAlign: "left", padding: 16, borderRadius: 14, border: `2px solid ${border}`, background: bg, fontSize: 16 }}>
                    <strong>{getLetter(idx)}.</strong> {option}
                  </button>
                );
              })}
            </div>
          )}

          {reveal && mode !== "flashcard" && (
            <div style={{ marginTop: 18, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 16, padding: 16 }}>
              <strong>
                Correct Answer: {getLetter(q.answer)}. {q.options[q.answer]}
              </strong>
              <p>{getRationale(q)}</p>
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", marginTop: 18, flexWrap: "wrap" }}>
          <button disabled={current === 0} onClick={previous} style={{ padding: "12px 16px", borderRadius: 12, border: 0, background: "#e2e8f0", fontWeight: 700, opacity: current === 0 ? 0.5 : 1 }}>Previous</button>
          <select value={current} onChange={e => setCurrent(Number(e.target.value))} style={{ padding: 12, borderRadius: 12, maxWidth: 220 }}>
            {activeQuestions.map((_, idx) => <option key={idx} value={idx}>Question {idx + 1}</option>)}
          </select>
          <button disabled={current === activeQuestions.length - 1} onClick={next} style={{ padding: "12px 16px", borderRadius: 12, border: 0, background: "#0f172a", color: "white", fontWeight: 700, opacity: current === activeQuestions.length - 1 ? 0.5 : 1 }}>Next</button>
        </div>
      </div>
    </div>
  );
}
