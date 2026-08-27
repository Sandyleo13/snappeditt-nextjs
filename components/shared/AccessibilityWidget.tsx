"use client";

import { useEffect, useState } from "react";
import { Accessibility, RotateCcw, X } from "lucide-react";
import styles from "./accessibility-widget.module.css";

const TOOLS = [
  ["contrast", "Contrast"],
  ["biggerText", "Bigger Text"],
  ["lineHeight", "Line Height"],
  ["textAlign", "Text Align"],
  ["textSpacing", "Text Spacing"],
  ["highlightLinks", "Highlight Links"],
  ["cursor", "Cursor"],
  ["saturation", "Saturation"],
  ["dyslexiaFriendly", "Dyslexia Friendly"],
] as const;

const PROFILES = [
  ["colorBlind", "Color Blind"],
  ["motorImpaired", "Motor Impaired"],
  ["dyslexiaFont", "Dyslexia Font"],
] as const;

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTools, setActiveTools] = useState<string[]>([]);

  useEffect(() => {
    const classes = ["accessibility-colorBlind", "accessibility-motorImpaired", "accessibility-dyslexiaFont", ...TOOLS.map(([id]) => `accessibility-${id}`)];
    document.body.classList.remove(...classes);
    document.body.classList.add(...activeTools.map((id) => `accessibility-${id}`));
  }, [activeTools]);

  const toggleTool = (id: string) => {
    setActiveTools((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const resetAll = () => setActiveTools([]);

  return (
    <div className={styles.widget}>
      {isOpen && (
        <div className={styles.panel} role="dialog" aria-label="Accessibility tool">
          <button className={styles.closeButton} type="button" onClick={() => setIsOpen(false)} aria-label="Close accessibility tool">
            <X size={18} />
          </button>
          <h2>Accessibility Tool</h2>
          <button className={styles.resetButton} type="button" onClick={resetAll}>
            <RotateCcw size={15} /> Reset All
          </button>
          <h3>Profiles</h3>
          <div className={styles.optionGrid}>
            {PROFILES.map(([id, label]) => (
              <button key={id} type="button" className={activeTools.includes(id) ? styles.active : ""} onClick={() => toggleTool(id)} aria-pressed={activeTools.includes(id)}>
                {label}
              </button>
            ))}
          </div>
          <h3>Tools</h3>
          <div className={styles.optionGrid}>
            {TOOLS.map(([id, label]) => (
              <button key={id} type="button" className={activeTools.includes(id) ? styles.active : ""} onClick={() => toggleTool(id)} aria-pressed={activeTools.includes(id)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
      <button className={styles.toggleButton} type="button" onClick={() => setIsOpen((open) => !open)} aria-label="Open accessibility tool" aria-expanded={isOpen}>
        <Accessibility size={28} strokeWidth={2.2} />
      </button>
    </div>
  );
}
