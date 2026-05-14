
import { useState, useEffect, useRef } from "react";

// Module-level cache — survives re-renders, shared across all instances
const cache = new Map();

/**
 * @param {string}  svgString   — raw SVG markup (e.g. from lucide-react's toString or inline)
 * @param {object}  options
 * @param {number}  options.gridSize   — number of dot columns AND rows (default 12)
 * @param {number}  options.threshold  — 0–1, how dark a cell must be to count as ON (default 0.35)
 * @param {number}  options.renderSize — internal canvas resolution multiplier (default 8)
 * @returns {{ pattern: number[][]|null, loading: boolean, error: string|null }}
 */
export function useSvgToMatrix(svgString, {
  gridSize   = 12,
  threshold  = 0.35,
  renderSize = 8,
} = {}) {
  const cacheKey = `${svgString}__${gridSize}__${threshold}`;
  const [state, setState] = useState(() => ({
    pattern: cache.has(cacheKey) ? cache.get(cacheKey) : null,
    loading: !cache.has(cacheKey),
    error:   null,
  }));

  // Stable ref so the effect doesn't re-run when setState identity changes
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    if (!svgString) {
      setState({ pattern: null, loading: false, error: "No SVG string provided" });
      return;
    }
    if (cache.has(cacheKey)) {
      if (stateRef.current.loading) {
        setState({ pattern: cache.get(cacheKey), loading: false, error: null });
      }
      return;
    }

    let cancelled = false;

    const convert = async () => {
      try {
        const canvasSize = gridSize * renderSize;
        const canvas     = document.createElement("canvas");
        canvas.width     = canvasSize;
        canvas.height    = canvasSize;
        const ctx        = canvas.getContext("2d");

        // White background so transparent SVGs sample correctly
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        // Rasterise the SVG via an Image element
        await new Promise((resolve, reject) => {
          const img  = new Image();
          const blob = new Blob([svgString], { type: "image/svg+xml" });
          const url  = URL.createObjectURL(blob);
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
            URL.revokeObjectURL(url);
            resolve();
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Failed to load SVG image"));
          };
          img.src = url;
        });

        if (cancelled) return;

        // Sample each grid cell
        const cellSize = renderSize; // pixels per cell
        const pattern  = [];

        for (let row = 0; row < gridSize; row++) {
          const rowArr = [];
          for (let col = 0; col < gridSize; col++) {
            // Sample all pixels in this cell
            const imageData = ctx.getImageData(
              col * cellSize,
              row * cellSize,
              cellSize,
              cellSize
            );
            const data = imageData.data; // [r,g,b,a, r,g,b,a, ...]

            let darkPixels = 0;
            const totalPixels = cellSize * cellSize;

            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              const a = data[i + 3];
              // Brightness 0 (black) → 1 (white), accounting for alpha
              const brightness = (a / 255) * ((r + g + b) / 3 / 255) + (1 - a / 255);
              if (brightness < 1 - threshold) darkPixels++;
            }

            rowArr.push(darkPixels / totalPixels >= threshold ? 1 : 0);
          }
          pattern.push(rowArr);
        }

        cache.set(cacheKey, pattern);
        if (!cancelled) setState({ pattern, loading: false, error: null });
      } catch (err) {
        if (!cancelled) setState({ pattern: null, loading: false, error: err.message });
      }
    };

    convert();
    return () => { cancelled = true; };
  }, [cacheKey, svgString, gridSize, threshold, renderSize]);

  return state;
}