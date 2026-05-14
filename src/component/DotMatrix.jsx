
// export default function DotMatrix({
//   pattern,
//   dotSize = 6,
//   gap = 4,
//   color = "#4F46E5",
//   offColor = "#E5E3F7",
//   opacity = 1,
//   rx = 2,
//   className = "",
//   style = {},
//   "aria-label": ariaLabel = "Dot matrix graphic",
//   animate = false,
// }) {
//   if (!pattern || pattern.length === 0) return null;

//   const rows = pattern.length;
//   const cols = pattern[0].length;
//   const step = dotSize + gap;
//   const svgW = cols * step - gap;
//   const svgH = rows * step - gap;

//   return (
//     <svg
//       width={svgW}
//       height={svgH}
//       viewBox={`0 0 ${svgW} ${svgH}`}
//       aria-label={ariaLabel}
//       role="img"
//       style={{ opacity, display: "block", ...style }}
//       className={className}
//     >
//       {pattern.map((row, r) =>
//         row.map((on, c) => (
//           <rect
//             key={`${r}-${c}`}
//             x={c * step}
//             y={r * step}
//             width={dotSize}
//             height={dotSize}
//             rx={rx}
//             fill={on ? color : offColor}
//             // Future: animate prop can add className for CSS keyframes
//             className={animate && on ? "dm-dot-active" : ""}
//           />
//         ))
//       )}
//     </svg>
//   );
// }




import { useSvgToMatrix } from "../hooks/Usesvgtomatrix";

function DotMatrixRenderer({
  pattern,
  dotSize = 6, dotWidth, dotHeight,
  gap = 4,
  color = "#4F46E5",
  offColor = "#E5E3F7",
  opacity = 1,
  rx = 2,
  className = "",
  style = {},
  ariaLabel = "Dot matrix graphic",
  animate = false,
}) {
  if (!pattern || pattern.length === 0) return null;
  const rows = pattern.length;
  const cols = pattern[0].length+10;
  const dw = dotWidth  ?? dotSize;
  const dh = dotHeight ?? dotSize;
  const stepX = dw + gap;
  const stepY = dh + gap;
  const svgW = cols * stepX - gap;
  const svgH = rows * stepY - gap;
  return (
    <svg
      width={svgW} height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      aria-label={ariaLabel} role="img"
      style={{ opacity, display: "block", ...style }}
      className={className}
    >
      {pattern.map((row, r) =>
        row.map((on, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * stepX} y={r * stepY}
            width={dw} height={dh} rx={rx}
            fill={on ? color : offColor}
            className={animate && on ? "dm-dot-active" : ""}
          />
        ))
      )}
    </svg>
  );
}

function DefaultSkeleton({ gridSize = 12, dotSize = 6, gap = 4 }) {
  const size = gridSize * (dotSize + gap) - gap;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      {Array.from({ length: gridSize }, (_, r) =>
        Array.from({ length: gridSize }, (_, c) => (
          <rect
            key={`${r}-${c}`}
            x={c * (dotSize + gap)} y={r * (dotSize + gap)}
            width={dotSize} height={dotSize} rx={2}
            fill="#E5E3F7" opacity={0.5}
          />
        ))
      )}
    </svg>
  );
}

export default function DotMatrix({
  pattern: manualPattern,
  svgString,
  gridSize = 12,
  threshold = 0.35,
  dotSize = 6, dotWidth, dotHeight,
  gap = 4,
  color = "#4F46E5",
  offColor = "#E5E3F7",
  opacity = 1,
  rx = 2,
  className = "",
  style = {},
  "aria-label": ariaLabel = "Dot matrix graphic",
  animate = false,
  loading: LoadingNode,
}) {
  if (manualPattern) {
    return (
      <DotMatrixRenderer
        pattern={manualPattern}
        dotSize={dotSize} dotWidth={dotWidth} dotHeight={dotHeight}
        gap={gap} color={color} offColor={offColor}
        opacity={opacity} rx={rx}
        className={className} style={style}
        ariaLabel={ariaLabel} animate={animate}
      />
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pattern, loading, error } = useSvgToMatrix(svgString, { gridSize, threshold });

  if (loading) return LoadingNode ?? <DefaultSkeleton gridSize={gridSize} dotSize={dotSize} gap={gap} />;
  if (error || !pattern) { console.warn("[DotMatrix]", error); return null; }

  return (
    <DotMatrixRenderer
      pattern={pattern}
      dotSize={dotSize} dotWidth={dotWidth} dotHeight={dotHeight}
      gap={gap} color={color} offColor={offColor}
      opacity={opacity} rx={rx}
      className={className} style={style}
      ariaLabel={ariaLabel} animate={animate}
    />
  );
}