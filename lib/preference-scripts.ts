// Inline <head> scripts that apply saved preferences before first paint.
// Kept out of "use client" modules so the server layout gets the real strings.

// Glass is off unless the visitor has switched it on: <html data-glass="off"> is server-rendered
// (so it also holds without JS) and this only flips it for a saved "on".
export const glassInitScript = `try{if(localStorage.getItem("glass")==="on")document.documentElement.dataset.glass="on"}catch(e){}`

export const accessibilityInitScript = `try{for(var k of["motion","contrast","text"]){var v=localStorage.getItem("a11y-"+k);if(v)document.documentElement.dataset[k]=v}}catch(e){}`
