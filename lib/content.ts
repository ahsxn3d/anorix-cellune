export type Model = { slug: string; no: string; el: string; name: string; short: string; tag: string; shape: number; does: string; inputs: string[]; outputs: string[]; workflow: [string, string][]; uses: string[] };
export const models: Model[] = [
  { slug: "bio-molecular-discovery-engine", no: "01", el: "Bm", name: "Bio-Molecular Discovery Engine", short: "Proposes candidate molecules for a target and ranks them by predicted properties.", tag: "Chemistry", shape: 1,
    does: "Give it a target and the rules a molecule has to follow. It generates candidate structures, predicts the properties you care about and hands back a ranked shortlist you can open in 3D.",
    inputs: ["A target: protein structure, binding site or property profile", "Constraints: size, scaffolds to keep or avoid, synthesis limits", "Optional seed molecules (SMILES or SDF)"],
    outputs: ["Ranked candidate molecules (SMILES, SDF)", "Predicted properties per candidate, with confidence", "3D conformers ready for the Biophysics Simulator"],
    workflow: [["Frame", "Pick the target and write the constraints in plain language or as filters."], ["Generate", "The engine proposes a few thousand candidates and drops the ones that break your rules."], ["Rank", "Each survivor is scored on the properties you chose; you see why it ranked where it did."], ["Hand off", "Send the top of the list straight to docking, or export it for your own tools."]],
    uses: ["Hit finding", "Lead optimisation", "Scaffold hopping"] },
  { slug: "biophysics-simulator", no: "02", el: "Bp", name: "Biophysics Simulator", short: "Docks molecules into proteins and scores how mutations change binding.", tag: "Biology · physics", shape: 5,
    does: "Takes a protein and a ligand and works out how they fit together. It produces binding poses and scores, then sweeps point mutations across the pocket to show which residues matter.",
    inputs: ["Protein structure (PDB or mmCIF)", "Ligand or candidate set (SDF, SMILES)", "Optional: residues or a pocket to focus on"],
    outputs: ["Binding poses with scores", "Per-mutation effect on binding", "Interaction maps you can rotate and share"],
    workflow: [["Load", "Drop in a structure and the molecules you want to test."], ["Dock", "Poses are generated and scored against the pocket."], ["Mutate", "Residues around the ligand are swapped one at a time and re-scored."], ["Read", "Compare poses and mutation effects side by side in 3D."]],
    uses: ["Docking triage", "Resistance mutations", "Protein engineering"] },
  { slug: "crystal-battery-designer", no: "03", el: "Cb", name: "3D Crystal & Battery Material Designer", short: "Builds candidate crystal lattices for a set of elements and target properties.", tag: "Materials", shape: 3,
    does: "Choose the elements you can use and the properties a material needs. The designer builds periodic structures atom by atom, checks they hold together and screens them for battery-relevant behaviour.",
    inputs: ["Allowed elements and ratios", "Target properties: voltage window, stability, ion pathways", "Optional parent structures (CIF)"],
    outputs: ["Candidate lattices (CIF)", "Predicted stability and property estimates", "Interactive 3D cells to rotate, slice and export"],
    workflow: [["Choose", "Set the element palette and what the material has to do."], ["Build", "Lattices are assembled and relaxed into plausible structures."], ["Screen", "Each structure is scored for stability and the target properties."], ["Inspect", "Rotate the unit cell, check the layers and export what is worth making."]],
    uses: ["Cathode materials", "Solid electrolytes", "Layered oxides"] },
];
export const getModel = (s: string) => models.find((m) => m.slug === s);
export type Plan = { id: string; el: string; name: string; price: string; note: string; for: string; gets: string[] };
export const plans: Plan[] = [
  { id: "academic", el: "Ac", name: "Academic", price: "$0", note: "pilot, verified groups", for: "University and public research groups.", gets: ["One model of your choice", "Shared compute queue", "Community support", "Publish freely with a citation"] },
  { id: "lab", el: "Lb", name: "Lab", price: "$1,200", note: "per month, indicative", for: "Small teams running real projects.", gets: ["All three models", "Priority compute", "Five seats", "Email support from the model team"] },
  { id: "enterprise", el: "En", name: "Enterprise", price: "Custom", note: "annual agreement", for: "Companies with private data and pipelines.", gets: ["Private deployment options", "Unlimited seats and SSO", "API and pipeline integration", "Named technical contact"] },
  { id: "collaboration", el: "Rc", name: "Research collaboration", price: "By proposal", note: "joint projects", for: "A shared problem worth working on together.", gets: ["Joint project plan", "Model tuning on your problem", "Shared results and authorship by agreement", "Regular working sessions"] },
];
export const notes = [
  ["Method", "How the three models share one loop", "Soon"], ["Model card", "Bio-Molecular Discovery Engine", "Soon"], ["Model card", "Biophysics Simulator", "Soon"],
  ["Model card", "3D Crystal & Battery Material Designer", "Soon"], ["Benchmark plan", "What we will measure, and against what", "Soon"], ["Data note", "Public datasets we start from (PubChem, PDB, computed lattices)", "Soon"],
];
export const faq: [string, string][] = [
  ["Are the models available today?", "Not publicly. Access is by request while model cards and benchmarks are written up. Request access and we will tell you what can run for your problem now."],
  ["Do I need to write code?", "No. Every model runs in the browser with a 3D viewer. An API is there for teams that want to wire it into a pipeline."],
  ["What file formats do you take?", "SMILES and SDF for molecules, PDB and mmCIF for proteins, CIF for crystals. Results come back in the same formats."],
  ["Who owns the results?", "You do. Your inputs and outputs are not used to train shared models unless you opt in."],
  ["Can I run it on my own hardware?", "On the Enterprise plan we can discuss private deployments. Talk to us about your setup."],
  ["Are the prices final?", "No. Prices on this site are indicative while the service is in early access."],
  ["How accurate are the predictions?", "We will publish that with each model card. Until then treat every result as a ranked hypothesis to test, not an answer."],
];
export const nav: [string, string, string, string][] = [["Mo", "Models", "/models", "01"], ["Re", "Research", "/research", "02"], ["Pr", "Pricing", "/pricing", "03"], ["Ab", "About", "/about", "04"], ["Fq", "FAQ", "/faq", "05"], ["Ct", "Contact", "/contact", "06"]];
