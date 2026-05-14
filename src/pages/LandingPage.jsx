// src/pages/LandingPage.jsx

import DotMatrix from "../component/DotMatrix";

import {
  searchIcon,
  checkMark,
  crossArrow,
  doubleArrow,
  graphUp,
} from "../icons/icons";

// ─── Design Tokens ──────────────────────────────────────────────────────────

const BRAND = "#4F46E5";
const OFF = "#E5E3F7";

// ─── Section Label ──────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: BRAND,
        margin: "0 0 16px",
      }}
    >
      {children}
    </p>
  );
}

// ─── Consequence Item ───────────────────────────────────────────────────────

function ConsequenceItem({ title, description, last }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        paddingBottom: last ? 0 : 28,
        borderBottom: last ? "none" : "1px dashed #D4D2F5",
        marginBottom: last ? 0 : 28,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          background: BRAND,
          borderRadius: 2,
          marginTop: 5,
          flexShrink: 0,
        }}
      />

      <div>
        <p
          style={{
            fontWeight: 700,
            fontSize: 18,
            margin: "0 0 6px",
            color: "#111",
          }}
        >
          {title}
        </p>

        <p
          style={{
            fontSize: 14,
            color: "#555",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── Process Card ───────────────────────────────────────────────────────────

function ProcessCard({ icon, title, description }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          background: "#F4F3FD",
          borderRadius: 12,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 120,
        }}
      >
        <DotMatrix
          svgString={icon}
          gridSize={14}
          dotSize={8}
          gap={5}
          color={BRAND}
          offColor={OFF}
          animate
        />
      </div>

      <p
        style={{
          fontWeight: 700,
          fontSize: 20,
          margin: 0,
          color: "#111",
        }}
      >
        {title}
      </p>

      <p
        style={{
          fontSize: 14,
          color: "#555",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}

// ─── Main Landing Page ──────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div
      style={{
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        color: "#111",
        background: "#fff",
        maxWidth: 1080,
        margin: "0 auto",
      }}
    >
      {/* ───────────────── SECTION 1 ───────────────── */}

      <section
        style={{
          padding: "72px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
      >
        {/* LEFT */}

        <div>
          <SectionLabel>
            The cost of getting it wrong
          </SectionLabel>

          <h1
            style={{
              fontSize: 40,
              fontWeight: 800,
              lineHeight: 1.15,
              margin: "0 0 28px",
              color: "#0D0D0D",
            }}
          >
            Engineering hiring is one of the most{" "}
            <span style={{ color: BRAND }}>
              consequential
            </span>{" "}
            decisions an enterprise makes.
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "#444",
              lineHeight: 1.75,
              margin: "0 0 16px",
            }}
          >
            Replacing a mis-hired engineer costs up to
            150% of their annual salary.
          </p>

          <p
            style={{
              fontSize: 15,
              color: "#444",
              lineHeight: 1.75,
              margin: "0 0 40px",
            }}
          >
            That is before you account for the downstream
            effect on dependent teams, delayed roadmaps,
            and the leadership time spent managing the gap.
          </p>

          <DotMatrix
            svgString={graphUp}
            gridSize={18}
            dotSize={7}
            gap={4}
            color={BRAND}
            offColor={OFF}
            aria-label="Upward trending graph"
            animate
          />
        </div>

        {/* RIGHT */}

        <div style={{ paddingTop: 60 }}>
          <ConsequenceItem
            title="Delivery Slows"
            description="The wrong hire creates drag across every team that depends on them."
          />

          <ConsequenceItem
            title="Ramp Takes Too Long"
            description="Every week spent getting someone up to speed is a week your roadmap is waiting."
          />

          <ConsequenceItem
            title="The Role Opens Again"
            description="A re-hire costs time, budget, and the confidence of the team that lived through it."
            last
          />
        </div>
      </section>

      {/* Divider */}

      <div
        style={{
          height: 1,
          background: "#EEEDF8",
          margin: "0 48px",
        }}
      />

      {/* ───────────────── SECTION 2 ───────────────── */}

      <section
        style={{
          padding: "72px 48px",
        }}
      >
        <SectionLabel>
          How we work
        </SectionLabel>

        <h2
          style={{
            fontSize: 40,
            fontWeight: 800,
            lineHeight: 1.15,
            margin: "0 0 24px",
            color: "#0D0D0D",
            maxWidth: 520,
          }}
        >
          Every placement starts{" "}
          <span style={{ color: BRAND }}>
            long before
          </span>{" "}
          the interview.
        </h2>

        <p
          style={{
            fontSize: 15,
            color: "#444",
            lineHeight: 1.75,
            margin: "0 0 56px",
            maxWidth: 580,
          }}
        >
          We work exclusively with professionals who bring
          a minimum of five years of hands-on experience.
          When both sides are understood at depth, the
          placement holds.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 40,
          }}
        >
          <ProcessCard
            icon={searchIcon}
            title="Find."
            description="We take time to understand your team, culture, and what success genuinely looks like in the role before we begin."
          />

          <ProcessCard
            icon={doubleArrow}
            title="Evaluate."
            description="Every candidate goes through CODE9 — our nine-dimension evaluation framework."
          />

          <ProcessCard
            icon={checkMark}
            title="Prepare."
            description="Candidates are prepared for long-run performance in your environment."
          />
        </div>
      </section>

      {/* Divider */}

      <div
        style={{
          height: 1,
          background: "#EEEDF8",
          margin: "0 48px",
        }}
      />

      {/* ───────────────── SECTION 3 ───────────────── */}

      <section
        style={{
          padding: "72px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* LEFT */}

        <div>
          <SectionLabel>
            Why it works
          </SectionLabel>

          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              lineHeight: 1.2,
              margin: "0 0 24px",
              color: "#0D0D0D",
            }}
          >
            Precision over{" "}
            <span style={{ color: BRAND }}>
              volume
            </span>.
          </h2>

          <p
            style={{
              fontSize: 15,
              color: "#444",
              lineHeight: 1.75,
              margin: "0 0 16px",
            }}
          >
            We don't send you a stack of resumes.
            We send you the right person — prepared,
            context-loaded, and ready to contribute.
          </p>

          <p
            style={{
              fontSize: 15,
              color: "#444",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Our framework evaluates not just technical
            depth, but communication style, ownership,
            and long-term growth trajectory.
          </p>
        </div>

        {/* RIGHT */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {[
            {
              icon: crossArrow,
              label: "Adaptability",
            },
            {
              icon: checkMark,
              label: "Validation",
            },
            {
              icon: searchIcon,
              label: "Discovery",
            },
            {
              icon: doubleArrow,
              label: "Momentum",
            },
          ].map(({ icon, label }) => (
            <div
              key={label}
              style={{
                background: "#F4F3FD",
                borderRadius: 12,
                padding: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DotMatrix
                svgString={icon}
                gridSize={12}
                dotSize={7}
                gap={4}
                color={BRAND}
                offColor={OFF}
                aria-label={label}
                animate
              />
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── CTA FOOTER ───────────────── */}

      <section
        style={{
          background: "#F4F3FD",
          padding: "64px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              margin: "0 0 10px",
              color: "#0D0D0D",
            }}
          >
            Ready to get the hire right?
          </h2>

          <p
            style={{
              fontSize: 15,
              color: "#555",
              margin: 0,
            }}
          >
            Talk to us before your next opening goes live.
          </p>
        </div>

        <button
          style={{
            background: BRAND,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "14px 32px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
            letterSpacing: "0.01em",
          }}
        >
          Get in touch
        </button>
      </section>
    </div>
  );
}