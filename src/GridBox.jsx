import React from "react";
import "./GridBox.css";

export default function GridBox({
  fillEmpty =true,
  pattern,
  dotSize = 100,
  gap = 6,
  color = "#5B4DFF",
  offColor = "#E5E5E5",
}) {
  if (!pattern?.length) return null;

  const rows = [];

  let maxCols = 0;

  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i].length > maxCols) {
      maxCols = pattern[i].length;
    }
  }

  for (let r = 0; r < pattern.length; r++) {
    const row = pattern[r];

    const dots = [];

    for (let c = 0; c < maxCols; c++) {
      let cell = row[c];

      if (fillEmpty && cell === undefined) {
        cell = 0;
      }

      dots.push(
        <div
          key={`${r}-${c}`}
            className={cell ? "dot active" : "dot"}
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: cell ? color : offColor,
          }}
        />
      );
    }

    rows.push(
      <div
        key={r}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${maxCols}, ${dotSize}px)`,
          gap: `${gap}px`,
        }}
      >
        {dots}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: `${gap}px`,
      }}
    >
      {rows}
    </div>
  );
}