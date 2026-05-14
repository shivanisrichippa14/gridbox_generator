import React, { useEffect, useState } from "react";
import "./styles.css";

export default function GridBox2() {

  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");

  const [dotSize, setDotSize] = useState("");
  const [gap, setGap] = useState("");

  const [color, setColor] = useState("#5B4DFF");
  const [offColor, setOffColor] = useState("#E5E5E5");

  const [scale, setScale] = useState(1);
const [borderRadius, setBorderRadius] = useState(0);
//on cells
const [onAnimType, setOnAnimType] = useState("none");
const [onAnimDuration, setOnAnimDuration] = useState("");

//off cells
const [offAnimType, setOffAnimType] = useState("none");
const [offAnimDuration, setOffAnimDuration] = useState("");
 

  const [pattern, setPattern] = useState([]);

  const [savedShapes, setSavedShapes] = useState([]);


  useEffect(() => {

    const saved = localStorage.getItem("shapes");

    if (saved) {
      setSavedShapes(JSON.parse(saved));
    }

  }, []);
  useEffect(() => {
  if (!rows || !cols) return;

  const totalRows = Number(rows);
  const totalCols = Number(cols);

  setPattern((prev) => {
    const newGrid = [];

    for (let r = 0; r < totalRows; r++) {
      const row = [];

      for (let c = 0; c < totalCols; c++) {
        row.push(prev?.[r]?.[c] ?? 0);
      }

      newGrid.push(row);
    }

    return newGrid;
  });
}, [rows, cols]);


  // const createGrid = () => {

  //   const totalRows = Number(rows);
  //   const totalCols = Number(cols);

  //   const newGrid = [];

  //   for (let r = 0; r < totalRows; r++) {

  //     const row = [];

  //     for (let c = 0; c < totalCols; c++) {
  //       row.push(0);
  //     }

  //     newGrid.push(row);
  //   }

  //   setPattern(newGrid);
  // };
  const handleSubmit = (e) => {

    e.preventDefault();
  
    createGrid();
  };


const toggleCell = (r, c) => {
  const updated = [...pattern];

  updated[r][c] = updated[r][c] ? 0 : 1;

  setPattern(updated);

};

  const saveShape = () => {

    const newShape = {
      pattern,
      rows,
      cols,
      dotSize,
      gap,
      color,
      offColor,
      scale,
      borderRadius,
      onAnimType,
      onAnimDuration,
      offAnimType,
      offAnimDuration,
    };

    const updatedShapes = [...savedShapes, newShape];

    setSavedShapes(updatedShapes);

    localStorage.setItem(
      "shapes",
      JSON.stringify(updatedShapes)
    );

    setRows("");
    setCols("");

    setDotSize("");
    setGap("");

    setColor("#5B4DFF");
    setOffColor("#E5E5E5");

    setPattern([]);
    setOnAnimType("none");
    setOffAnimDuration("");
    setOffAnimType("none");
    setOffAnimDuration("");
  };




  return (

    <div className="container">

      <div className="sidebar">

        <h2>Grid Controls</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Rows</label>

            <input
              type="number"
              placeholder="Enter rows"
              value={rows}
              onChange={(e) =>
                setRows(e.target.value)
              }
            />
          </div>

          <div className="form-group">

            <label>Cols</label>

            <input
              type="number"
              placeholder="Enter cols"
              value={cols}
              onChange={(e) =>
                setCols(e.target.value)
              }
            />

          </div>



          <div className="form-group">

            <label>Dot Size</label>

            <input
              type="number"
              placeholder="Enter dot size"
              value={dotSize}
              onChange={(e) =>
                setDotSize(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>Gap</label>

            <input
              type="number"
              placeholder="Enter gap"
              value={gap}
              onChange={(e) =>
                setGap(e.target.value)
              }
            />

          </div>


          <div className="color-row">

            <div className="color-box">

              <label>Active Color</label>

              <input
                type="color"
                value={color}
                onChange={(e) =>
                  setColor(e.target.value)
                }
              />

            </div>



            <div className="color-box">

              <label>Off Color</label>

              <input
                type="color"
                value={offColor}
                onChange={(e) =>
                  setOffColor(e.target.value)
                }
              />

            </div>

           

          </div>

          <div className="form-group">
              <label>Scale (hover/active size)</label>
                  <input
                        type="number"
                       value={scale}
                       onChange={(e) => setScale(e.target.value)}
                  />
          </div>

            <div className="form-group">
                  <label>Border Radius</label>
                    <input
                         type="number"
                          value={borderRadius}
                          onChange={(e) => setBorderRadius(e.target.value)}
                    />
            </div>

<div className="form-group">
  <label>ON Animation Type</label>
  <select
    value={onAnimType}
    onChange={(e) => setOnAnimType(e.target.value)}
  >
    <option value="none">None</option>
    <option value="pulse">Pulse</option>
    <option value="bounce">Bounce</option>
    <option value="fade">Fade</option>
    
  </select>
</div>

<div className="form-group">
  <label>ON Animation Duration (ms)</label>
  <input
    type="number"
    value={onAnimDuration}
    onChange={(e) => setOnAnimDuration(e.target.value)}
  />
</div>

<div className="form-group">
  <label>OFF Animation Type</label>
  <select
    value={offAnimType}
    onChange={(e) => setOffAnimType(e.target.value)}
  >
    <option value="none">None</option>
    <option value="pulse">Pulse</option>
    <option value="shake">Shake</option>
    <option value="fade">Fade</option>
    <option value="bounce">bounce</option>
  </select>
</div>

<div className="form-group">
  <label>OFF Animation Duration (ms)</label>
  <input
    type="number"
    value={offAnimDuration}
    onChange={(e) => setOffAnimDuration(e.target.value)}
  />
</div>

          <button type="submit">
            Create Grid
          </button>

        </form>

      </div>


      <div className="main">

       <h2>Create Shape</h2>

{
  
  (() => {

    const rows= [];

    for (let r = 0; r < pattern.length; r++) {

      const row = pattern[r];

      const dots = [];

      for (let c = 0; c < row.length; c++) {

        const cell = row[c];
   

        dots.push(
  <div
    key={`${r}-${c}`}
    onClick={() => toggleCell(r, c)}
   className={`dot ${
  cell
    ? onAnimType !== "none" ? `anim-on-${onAnimType}` : ""
    : offAnimType !== "none" ? `anim-off-${offAnimType}` : ""
}`}
style={{
  width: `${dotSize}px`,
  height: `${dotSize}px`,
  backgroundColor: cell ? color : offColor,
  borderRadius: `${borderRadius}px`,
  "--scale": scale,
  "--anim-duration": cell
    ? `${onAnimDuration || 600}ms`
    : `${offAnimDuration || 600}ms`,
}}
  />
);
      }

      rows.push(

        <div
          key={r}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${row.length}, ${dotSize}px)`,
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

  })()
}

        {pattern.length > 0 && (

          <button
  type="button"
  onClick={saveShape}
  className="save-btn"
>
  Save Shape
</button>

        )}

        <div className="saved-section">

  <h2>Saved Shapes</h2>

  {
    (() => {

      const cards = [];

      for (let index = 0; index < savedShapes.length; index++) {

        const shape = savedShapes[index];

        const rows = [];

        for (let r = 0; r < shape.pattern.length; r++) {

          const row = shape.pattern[r];

          const dots = [];

          for (let c = 0; c < row.length; c++) {

            const cell = row[c];

           dots.push(
  <div
    key={`${r}-${c}`}
    className={`dot ${
  cell
    ? shape.onAnimType !== "none" ? `anim-on-${shape.onAnimType}` : ""
    : shape.offAnimType !== "none" ? `anim-off-${shape.offAnimType}` : ""
}`}
style={{
  width: `${shape.dotSize}px`,
  height: `${shape.dotSize}px`,
  backgroundColor: cell ? shape.color : shape.offColor,
  borderRadius: `${shape.borderRadius}px`,
  "--scale": shape.scale,
  "--anim-duration": cell
    ? `${shape.onAnimDuration || 600}ms`
    : `${shape.offAnimDuration || 600}ms`,
}}
  />
);
          }

          rows.push(

            <div
              key={r}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${row.length}, ${shape.dotSize}px)`,
                gap: `${shape.gap}px`,
              }}
            >
              {dots}
            </div>

          );
        }

        cards.push(

          <div
            key={index}
            className="card"
          >

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${shape.gap}px`,
              }}
            >
              {rows}
            </div>

          </div>

        );
      }

      return (

        <div className="saved-grid">
          {cards}
        </div>

      );

    })()
  }

</div>

      </div>

    </div>
  );
}