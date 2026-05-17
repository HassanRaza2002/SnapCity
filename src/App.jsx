const { useEffect, useMemo, useRef, useState } = React;

const flow = {
  HOME: "home",
  CASES: "cases",
  MAP: "map",
  FEED: "feed",
  CAMERA: "camera",
  SCANNING: "scanning",
  TICKET: "ticket",
  REWARD: "reward",
  DASHBOARD: "dashboard"
};

const caseData = {
  title: "Open Manhole Detected",
  dashboardTitle: "Open Manhole + Sewage Overflow",
  id: "SC-204",
  location: "Block 7, Gulshan-e-Iqbal",
  severity: "High",
  confidence: "89%",
  similarReports: "8 nearby",
  strength: "72%",
  rewardStrength: "84%",
  risk: "Public health + road hazard",
  responsible: "Municipal / drainage team"
};

const caseItems = [
  {
    id: "SC-204",
    title: "Open Manhole + Sewage Overflow",
    location: "Block 7, Gulshan-e-Iqbal",
    status: "Verified",
    severity: "High",
    reports: "9",
    strength: 84,
    updated: "12 min ago",
    action: "Waiting for Action",
    tone: "danger",
    image: "assets/Manhole%201.jpg",
    beforeImage: "assets/Manhole%202.jpg",
    detail: "Public health risk near a school route. Municipal notice has been generated.",
    helper: "Municipal / Drainage team",
    tags: ["Verified", "Needs proof"]
  },
  {
    id: "SC-198",
    title: "Broken Road Near School Route",
    location: "University Road service lane",
    status: "Escalated",
    severity: "High",
    reports: "14",
    strength: 91,
    updated: "1h ago",
    action: "Notice Sent",
    tone: "purple",
    image: "assets/Broken%20Road%203.jpg",
    beforeImage: "assets/pothole-camera.png",
    detail: "Road damage was clustered with 14 reports and marked high priority.",
    helper: "Traffic response desk",
    tags: ["Escalated", "Critical"]
  },
  {
    id: "SC-187",
    title: "Garbage Blocking Drain",
    location: "Block 4, near market",
    status: "Needs proof",
    severity: "Medium",
    reports: "5",
    strength: 58,
    updated: "3h ago",
    action: "2 confirmations needed",
    tone: "warning",
    image: "assets/Garbage%201.jpg",
    beforeImage: "assets/Garbage%203.jpg",
    detail: "Drain blockage needs fresh proof before escalation.",
    helper: "Community partner",
    tags: ["Needs proof"]
  },
  {
    id: "SC-162",
    title: "Streetlight Failure",
    location: "Maskan Chowrangi",
    status: "Fixed",
    severity: "Low",
    reports: "7",
    strength: 76,
    updated: "Yesterday",
    action: "Before/after verified",
    tone: "success",
    image: "assets/Manhole%203.jpg",
    beforeImage: "",
    detail: "Streetlight issue was resolved and verified by nearby citizens.",
    helper: "FiC Team",
    tags: ["Fixed", "Verified"]
  }
];

const feedCases = [
  {
    id: "SC-221",
    title: "Drain cleaned near Block 5",
    location: "Block 5, Gulshan",
    status: "Fixed",
    severity: "Medium",
    reports: "9",
    strength: 84,
    updated: "Fixed 1d ago",
    action: "Before/after verified",
    tone: "success",
    image: "assets/Manhole%202.jpg",
    beforeImage: "assets/Garbage%201.jpg",
    detail: "Water is flowing again and the area is cleaner.",
    helper: "Solved by FixIt Karachi",
    tags: ["Fixed", "Before / After", "Verified"]
  },
  {
    id: "SC-218",
    title: "Pothole fixed near Maskan",
    location: "Maskan Chowrangi",
    status: "Fixed",
    severity: "High",
    reports: "12",
    strength: 78,
    updated: "Fixed 2d ago",
    action: "Road repaired",
    tone: "success",
    image: "assets/Broken%20Road%202.webp",
    beforeImage: "assets/pothole-camera.png",
    detail: "Road is now smoother and safer to drive.",
    helper: "Solved by community partner",
    tags: ["Fixed", "Verified"]
  },
  {
    id: "SC-162",
    title: "Street light restored",
    location: "Main Avenue",
    status: "Fixed",
    severity: "Low",
    reports: "6",
    strength: 92,
    updated: "Fixed 3d ago",
    action: "Responder verified",
    tone: "success",
    image: "assets/Manhole%203.jpg",
    beforeImage: "",
    detail: "The streetlight is working again on Main Avenue.",
    helper: "Solved by FiC Team",
    tags: ["Fixed"]
  },
  {
    id: "SC-230",
    title: "Community cleanup at Block 13D",
    location: "Block 13D, Gulshan",
    status: "Community partner",
    severity: "Medium",
    reports: "18",
    strength: 90,
    updated: "Cleanup 4d ago",
    action: "Partner completed",
    tone: "warning",
    image: "assets/Garbage%202.jpeg",
    beforeImage: "",
    detail: "Clean streets, happy neighborhood.",
    helper: "Community partner",
    tags: ["Community partner"]
  }
];

const mapIssues = [
  {
    id: "SC-204",
    title: "Open manhole near Block 7",
    status: "Needs proof",
    severity: "High",
    lat: 24.9179,
    lng: 67.0973,
    distance: "300 m away",
    confirmations: "2 confirmations needed",
    image: "assets/Manhole%201.jpg",
    tone: "purple"
  },
  {
    id: "SC-212",
    title: "Water logging after rain",
    status: "Critical",
    severity: "Critical",
    lat: 24.9148,
    lng: 67.1052,
    distance: "700 m away",
    confirmations: "Traffic risk detected",
    image: "assets/Broken%20Road%203.jpg",
    tone: "danger"
  },
  {
    id: "SC-188",
    title: "Fresh proof needed",
    status: "Needs proof",
    severity: "Medium",
    lat: 24.9212,
    lng: 67.0884,
    distance: "1.1 km away",
    confirmations: "1 confirmation needed",
    image: "assets/pothole-camera.png",
    tone: "yellow"
  },
  {
    id: "SC-162",
    title: "Streetlight issue resolved",
    status: "Fixed",
    severity: "Low",
    lat: 24.9105,
    lng: 67.1012,
    distance: "1.4 km away",
    confirmations: "Before/after verified",
    image: "assets/Manhole%203.jpg",
    tone: "success"
  }
];

const mockUserStart = [67.0915, 24.9138];
const openRouteServiceBrowserKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjkyNDA1ODQzODA4NzQ1MDU4NGJkY2M0NWY0MGU5NDkzIiwiaCI6Im11cm11cjY0In0=";

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.35",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  const paths = {
    home: <><path d="M3 10.5L12 3l9 7.5" /><path d="M5.5 9.5V20h13V9.5" /><path d="M9.5 20v-6h5v6" /></>,
    map: <><path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" /><path d="M9 3v15" /><path d="M15 6v15" /></>,
    case: <><path d="M10 6h4" /><path d="M9 6V4h6v2" /><rect x="3" y="6" width="18" height="14" rx="3" /><path d="M3 12h18" /></>,
    camera: <><path d="M14.5 5l-1.2-2h-4.6L7.5 5H5a3 3 0 00-3 3v9a3 3 0 003 3h14a3 3 0 003-3V8a3 3 0 00-3-3z" /><circle cx="12" cy="13" r="4" /></>,
    alert: <><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" /></>,
    impact: <><path d="M12 21s-7-4.4-7-11a7 7 0 0114 0c0 6.6-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0" /><path d="M12 18v3" /></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M8 10a2 2 0 100-4 2 2 0 000 4z" /><path d="M21 15l-5-5L5 20" /></>,
    check: <path d="M20 6L9 17l-5-5" />,
    sparkle: <><path d="M12 3l1.4 4.5L18 9l-4.6 1.5L12 15l-1.4-4.5L6 9l4.6-1.5L12 3z" /><path d="M19 16l.6 1.8L21.5 19l-1.9.7L19 22l-.6-2.3-1.9-.7 1.9-1.2L19 16z" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4" /><path d="M15.4 6.5l-6.8 4" /></>,
    trophy: <><path d="M8 4h8v5a4 4 0 01-8 0V4z" /><path d="M8 6H5a3 3 0 003 3" /><path d="M16 6h3a3 3 0 01-3 3" /><path d="M12 13v4" /><path d="M9 21h6" /><path d="M10 17h4" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="M16 16l4 4" /></>,
    x: <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function PhoneFrame({ children }) {
  return (
    <main className="phone-shell">
      <section className="phone-frame" aria-label="SnapCity mobile prototype">
        {children}
      </section>
    </main>
  );
}

function CivicScene({ blurred = false }) {
  return (
    <div className={`absolute inset-0 civic-photo ${blurred ? "blur-[4px] scale-105" : ""}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/58" />
    </div>
  );
}

function CameraScreen({ onSnap, onBack }) {
  return (
    <section className="screen screen-enter bg-black">
      <CivicScene />
      <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-transparent to-black/64" />
      <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-8 pt-12 text-white">
        <header className="flex items-center justify-between gap-3">
          <button onClick={onBack} className="camera-top-button" aria-label="Back">
            <Icon name="x" className="h-4 w-4" />
          </button>
          <span className="live-pill">Live capture</span>
        </header>

        <div className="text-center">
          <div className="camera-helper mx-auto mb-5 max-w-[240px] rounded-full px-4 py-2 text-[12px] font-semibold text-white">
            Frame the issue clearly. Move closer only if safe.
          </div>
          <div className="grid place-items-center">
            <button
              className="shutter-button"
              onClick={onSnap}
              aria-label="Snap issue"
              data-testid="snap-button"
            >
              <span />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScanningOverlay({ onComplete }) {
  const [step, setStep] = useState(0);
  const checks = ["Detecting issue", "Checking location", "Finding similar reports", "Building case"];

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 650),
      setTimeout(() => setStep(2), 1250),
      setTimeout(() => setStep(3), 1900),
      setTimeout(onComplete, 2650)
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <section className="screen screen-enter bg-snapInk text-white">
      <CivicScene blurred />
      <div className="absolute inset-0 bg-black/36" />
      <div className="scan-line absolute left-6 right-6 top-40 h-[3px] rounded-full bg-white/90" />
      <div className="relative z-10 flex h-full flex-col justify-end px-0 pb-0">
        <div className="scan-card app-card rounded-b-none p-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-snapMuted">AI scan in progress</p>
              <h2 className="mt-1 text-[21px] font-bold tracking-tight text-snapInk">Building case</h2>
              <p className="mt-1 text-[12px] font-normal text-snapMuted">Photo, location, cluster, severity</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-snapYellow text-snapInk">
              <Icon name="sparkle" className="h-4 w-4" />
            </div>
          </div>
          <div className="divide-y divide-black/8">
            {checks.map((label, index) => {
              const active = index <= step;
              return (
                <div key={label} className="flex items-center gap-3 py-2.5">
                  <span className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold ${active ? "bg-snapPurple text-white" : "bg-[#EFEFEF] text-snapMuted"}`}>
                    {active ? <Icon name="check" className="h-4 w-4" /> : index + 1}
                  </span>
                  <span className={`text-[14px] ${active ? "font-medium text-snapInk" : "font-normal text-snapMuted"}`}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, highlight }) {
  return (
    <button className="field-button min-w-0 text-left" type="button">
      <p className="text-[12px] font-medium text-snapMuted">{label}</p>
      <p className={`mt-1 text-[15px] font-semibold leading-snug ${highlight ? "text-snapDanger" : "text-snapInk"}`}>{value}</p>
    </button>
  );
}

function TicketRow({ icon, label, value, highlight, meter }) {
  return (
    <button className={`ticket-row ${meter ? "ticket-row-wide" : ""}`} type="button">
      <span className="ticket-row-icon"><Icon name={icon} className="h-4 w-4" /></span>
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] font-medium text-snapMuted">{label}</span>
        <span className={`mt-0.5 block text-[15px] font-semibold leading-snug ${highlight ? "text-snapDanger" : "text-snapInk"}`}>{value}</span>
        {meter && (
          <span className="mt-2 block h-1.5 rounded-full bg-[#E9E9E9]">
            <span className="block h-1.5 rounded-full bg-snapPurple" style={{ width: meter }} />
          </span>
        )}
      </span>
    </button>
  );
}

function TicketSheet({ onSubmit, onClose }) {
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [voicePreview, setVoicePreview] = useState(false);

  const startDrag = (event) => {
    const y = event.clientY ?? event.touches?.[0]?.clientY;
    if (typeof y === "number") setDragStart(y);
  };

  const moveDrag = (event) => {
    if (dragStart === null) return;
    const y = event.clientY ?? event.touches?.[0]?.clientY;
    if (typeof y !== "number") return;
    setDragOffset(Math.max(0, y - dragStart));
  };

  const endDrag = () => {
    if (dragOffset > 95) {
      onClose();
      return;
    }
    setDragStart(null);
    setDragOffset(0);
  };

  return (
    <section className="screen screen-enter">
      <CivicScene blurred />
      <div className="ticket-backdrop absolute inset-0" />
      <div
        className="ticket-sheet absolute inset-x-0 bottom-0 z-10 px-3 pb-0"
        style={{ transform: dragOffset ? `translateY(${dragOffset}px)` : undefined }}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <article className="app-card ticket-card overflow-hidden">
          <button
            className="ticket-handle"
            type="button"
            aria-label="Dismiss ticket"
            onClick={onClose}
            onPointerDown={startDrag}
          />

          <button className="captured-strip" type="button" onClick={() => setShowImagePreview(true)} aria-label="View captured image">
            <div className="captured-pin" />
            <div className="captured-label">Captured image</div>
          </button>

          <div className="flex items-start justify-between gap-4 border-b border-black/8 px-5 py-3">
            <div>
              <p className="text-[12px] font-medium text-snapMuted">AI generated case</p>
              <h2 className="mt-1 text-[22px] font-bold leading-tight tracking-tight text-snapInk">{caseData.title}</h2>
              <p className="mt-1 text-[12px] font-normal text-snapMuted">Case #{caseData.id}</p>
            </div>
            <span className="rounded-full bg-[#FFE8E2] px-3 py-1.5 text-[11px] font-bold text-snapDanger">{caseData.severity}</span>
          </div>

          <div className="mx-5 mt-2 grid grid-cols-3 overflow-hidden rounded-[14px] bg-[#F3F3F3] text-center">
            <div className="px-3 py-2">
              <p className="text-[10px] font-medium text-snapMuted">Status</p>
              <p className="mt-0.5 text-[12px] font-semibold text-snapSuccess">Verified</p>
            </div>
            <div className="border-x border-black/8 px-3 py-2">
              <p className="text-[10px] font-medium text-snapMuted">Cluster</p>
              <p className="mt-0.5 text-[12px] font-semibold text-snapInk">9 reports</p>
            </div>
            <div className="px-3 py-2">
              <p className="text-[10px] font-medium text-snapMuted">Action</p>
              <p className="mt-0.5 text-[12px] font-semibold text-snapPurple">Ready</p>
            </div>
          </div>

          <div className="ticket-field-grid px-5 py-2">
            <TicketRow icon="map" label="Location" value={caseData.location} />
            <TicketRow icon="sparkle" label="Confidence" value={caseData.confidence} />
            <TicketRow icon="case" label="Similar reports" value={caseData.similarReports} />
            <TicketRow icon="impact" label="Case strength" value={caseData.strength} meter="72%" />
            <TicketRow icon="alert" label="Risk" value={caseData.risk} highlight />
            <TicketRow icon="case" label="Responsible" value={caseData.responsible} />
          </div>

          <div className="border-t border-black/8 px-5 py-2">
            <div className="mb-3 flex items-center justify-between">
              <label className="text-[12px] font-medium text-snapMuted">Optional note</label>
              <button className={`voice-chip ${voicePreview ? "active" : ""}`} type="button" onClick={() => setVoicePreview((value) => !value)}>
                <Icon name="mic" className="h-3.5 w-3.5" />
                {voicePreview ? "Voice added" : "Voice note"}
              </button>
            </div>
            <textarea
              className="mt-2 h-11 w-full resize-none rounded-[14px] border border-black/5 bg-[#F7F7F7] px-4 py-3 text-[13px] font-normal text-snapInk outline-none placeholder:text-snapMuted"
              placeholder="Anything else we should know?"
            />
            {voicePreview && (
              <div className="voice-transcript mt-2 text-left">
                <p className="text-[10px] font-semibold text-snapPurple">AI voice translation preview</p>
                <p className="mt-1 text-[12px] font-normal leading-4 text-snapInk">“Open manhole near the school route. Water is collecting around it.”</p>
              </div>
            )}
          </div>

          <div className="border-t border-black/8 bg-white p-3">
            <button onClick={onSubmit} className="primary-button" data-testid="submit-report">
              Submit Report
            </button>
          </div>
        </article>
      </div>
      {showImagePreview && (
        <div className="image-preview-overlay" role="dialog" aria-label="Captured image preview">
          <button className="image-preview-close" type="button" onClick={() => setShowImagePreview(false)} aria-label="Close image preview">
            <Icon name="x" className="h-4 w-4" />
          </button>
          <div className="image-preview-photo" />
        </div>
      )}
    </section>
  );
}

function RewardModal({ onHome, onWatch }) {
  return (
    <section className="screen screen-enter bg-snapBg px-4 pt-12">
      <CivicScene blurred />
      <div className="absolute inset-0 bg-black/32 backdrop-blur-[2px]" />
      <div className="reward-ticket ticket-card absolute inset-x-4 top-1/2 z-20 -translate-y-1/2 overflow-hidden rounded-[18px] border border-black/8 bg-white p-5 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-snapYellow text-snapInk">
          <Icon name="sparkle" className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-[25px] font-bold tracking-tight">Case Strengthened!</h2>
        <p className="mt-2 text-[17px] font-semibold text-snapPurple">+40 Civic Impact Points</p>
        <p className="mx-auto mt-2 max-w-[280px] text-[13px] font-normal leading-5 text-snapMuted">Your snap increased this case by 12%. This issue is now eligible for escalation.</p>

        <div className="mt-5 rounded-[18px] bg-[#F2F2F2] p-4 text-left">
          <div className="mb-3 flex items-center justify-between text-[13px] font-medium">
            <span>Evidence Strength</span>
            <span className="text-snapSuccess">72% -> 84%</span>
          </div>
          <div className="h-3 rounded-full bg-white">
            <div className="progress-shimmer h-3 w-[84%] rounded-full bg-snapSuccess" />
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <button onClick={onHome} className="primary-button" data-testid="back-home">
            Back to Home
          </button>
          <button onClick={onWatch} className="secondary-button inline-flex items-center justify-center gap-2">
            View Case
          </button>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, tone = "default" }) {
  const tones = {
    default: "bg-white text-snapInk",
    danger: "bg-white text-snapDanger",
    success: "bg-white text-snapSuccess",
    purple: "bg-white text-snapPurple"
  };

  return (
    <div className={`flat-cell p-4 ${tones[tone]}`}>
      <p className="text-[12px] font-medium text-snapMuted">{label}</p>
      <p className="mt-1 text-[18px] font-semibold leading-tight">{value}</p>
    </div>
  );
}

function MetricCell({ label, value, tone = "default", className = "" }) {
  const tones = {
    default: "text-snapInk",
    danger: "text-snapDanger",
    success: "text-snapSuccess",
    purple: "text-snapPurple"
  };

  return (
    <div className={`bg-white p-4 ${className}`}>
      <p className="text-[12px] font-medium text-snapMuted">{label}</p>
      <p className={`mt-1 text-[18px] font-semibold leading-tight ${tones[tone]}`}>{value}</p>
    </div>
  );
}

function Timeline() {
  const items = ["Detected", "Verified", "Escalated", "Claimed", "Fixed"];
  return (
    <div className="app-card p-5">
      <div className="flex items-start justify-between">
        {items.map((item, index) => {
          const done = index < 3;
          return (
            <div key={item} className="flex flex-1 flex-col items-center gap-2">
              <div className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-medium ${done ? "bg-snapPurple text-white" : "bg-[#ECECEC] text-snapMuted"}`}>
                {done ? <Icon name="check" className="h-3.5 w-3.5" /> : index + 1}
              </div>
              <span className="max-w-[58px] text-center text-[10px] font-medium text-snapMuted">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BottomNav({ active = "Home", onSnap, onHome, onCases, onMap, onFeed }) {
  const nav = [
    ["home", "Home"],
    ["case", "Cases"],
    ["camera", "Snap"],
    ["map", "Map"],
    ["impact", "Feed"]
  ];

  return (
    <nav className="bottom-nav-safe absolute inset-x-0 bottom-0 z-30 border-t border-black/10 bg-white px-4 pt-2">
      <div className="grid grid-cols-5 items-end gap-1">
        {nav.map(([icon, label]) => {
          const isActive = label === active;
          const handleClick = () => {
            if (label === "Snap") onSnap?.();
            if (label === "Home") onHome?.();
            if (label === "Cases") onCases?.();
            if (label === "Map") onMap?.();
            if (label === "Feed") onFeed?.();
          };
          return (
            <button key={label} onClick={handleClick} className={`flex flex-col items-center gap-1 text-[10px] font-medium ${isActive ? "text-snapPurple" : "text-snapMuted"}`}>
              <span className={`grid place-items-center rounded-full ${label === "Snap" ? "-mt-5 h-12 w-12 bg-snapYellow text-snapInk" : "h-8 w-8"}`}>
                <Icon name={icon} className={label === "Snap" ? "h-5 w-5" : "h-4 w-4"} />
              </span>
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function ImpactStat({ label, value, tone = "default" }) {
  const tones = {
    default: "text-snapInk",
    purple: "text-snapPurple",
    success: "text-snapSuccess",
    danger: "text-snapDanger"
  };

  return (
    <div className="impact-stat">
      <p className={`text-[20px] font-bold leading-none ${tones[tone]}`}>{value}</p>
      <p className="mt-1 text-[10px] font-medium text-snapMuted">{label}</p>
    </div>
  );
}

function HomeImpactMini({ icon, value, label, note, tone = "purple" }) {
  const toneClass = {
    purple: "bg-[#F1EBFA] text-snapPurple",
    yellow: "bg-[#FFF3CC] text-[#AA7400]",
    success: "bg-[#E4F6EB] text-snapSuccess",
    danger: "bg-[#FFE8E2] text-snapDanger"
  }[tone];

  return (
    <div className="home-impact-mini">
      <span className={`mx-auto grid h-8 w-8 place-items-center rounded-full ${toneClass}`}>
        <Icon name={icon} className="h-3.5 w-3.5" />
      </span>
      <p className="mt-1 text-[14px] font-bold leading-none text-snapInk">{value}</p>
      <p className="mt-0.5 text-[9px] font-semibold leading-tight text-snapInk">{label}</p>
      <p className="mt-0.5 text-[8px] font-normal leading-tight text-snapMuted">{note}</p>
    </div>
  );
}

function UpdateCard({ tag, title, detail, tone = "success" }) {
  const toneClass = tone === "danger" ? "bg-[#FFE8E2] text-snapDanger" : tone === "purple" ? "bg-[#F3F0F7] text-snapPurple" : "bg-[#E4F6EB] text-snapSuccess";
  return (
    <article className="update-card">
      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-[14px] ${toneClass}`}>
        <Icon name={tone === "danger" ? "alert" : tone === "purple" ? "sparkle" : "check"} className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${toneClass}`}>{tag}</span>
        </div>
        <h3 className="mt-1 text-[15px] font-semibold leading-tight text-snapInk">{title}</h3>
        <p className="mt-0.5 text-[12px] font-normal leading-5 text-snapMuted">{detail}</p>
      </div>
      <span className="text-lg font-light text-snapMuted">&gt;</span>
    </article>
  );
}

function CaseStackCard({ item, onOpen }) {
  const toneClass = {
    danger: "bg-[#FFE8E2] text-snapDanger",
    purple: "bg-[#F3F0F7] text-snapPurple",
    warning: "bg-[#FFF2CE] text-[#9A6500]",
    success: "bg-[#E4F6EB] text-snapSuccess"
  }[item.tone];

  return (
    <button onClick={onOpen} className="case-stack-card app-card dashboard-section mx-3 mt-px overflow-hidden text-left">
      <div className="flex items-start gap-3 p-4">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[15px] ${toneClass}`}>
          <Icon name={item.tone === "success" ? "check" : item.tone === "warning" ? "alert" : "case"} className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-3">
            <span>
              <span className="block text-[12px] font-normal text-snapMuted">Case #{item.id}</span>
              <span className="mt-1 block text-[17px] font-semibold leading-tight text-snapInk">{item.title}</span>
            </span>
            <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${toneClass}`}>{item.status}</span>
          </span>
          <span className="mt-2 block text-[13px] font-normal leading-5 text-snapMuted">{item.location}</span>
        </span>
      </div>

      <div className="grid grid-cols-3 border-y border-black/8 bg-[#FAFAFA] text-center">
        <div className="border-r border-black/8 px-3 py-3">
          <p className="text-[10px] font-medium text-snapMuted">Severity</p>
          <p className={`mt-0.5 text-[13px] font-semibold ${item.tone === "danger" || item.tone === "purple" ? "text-snapDanger" : "text-snapInk"}`}>{item.severity}</p>
        </div>
        <div className="border-r border-black/8 px-3 py-3">
          <p className="text-[10px] font-medium text-snapMuted">Reports</p>
          <p className="mt-0.5 text-[13px] font-semibold text-snapInk">{item.reports}</p>
        </div>
        <div className="px-3 py-3">
          <p className="text-[10px] font-medium text-snapMuted">Strength</p>
          <p className="mt-0.5 text-[13px] font-semibold text-snapPurple">{item.strength}%</p>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between text-[12px] font-normal text-snapMuted">
          <span>{item.action}</span>
          <span>{item.updated}</span>
        </div>
        <div className="h-2 rounded-full bg-[#ECECEC]">
          <div className="h-2 rounded-full bg-snapPurple" style={{ width: `${item.strength}%` }} />
        </div>
      </div>
    </button>
  );
}

function CompactCaseRow({ item, onOpen }) {
  const toneClass = {
    danger: "bg-[#FFE8E2] text-snapDanger",
    purple: "bg-[#F3F0F7] text-snapPurple",
    warning: "bg-[#FFF2CE] text-[#9A6500]",
    success: "bg-[#E4F6EB] text-snapSuccess"
  }[item.tone];

  return (
    <button onClick={() => onOpen(item)} className="compact-case-row">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[13px] ${toneClass}`}>
        <Icon name={item.tone === "success" ? "check" : item.tone === "warning" ? "alert" : "case"} className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-3">
          <span className="truncate text-[14px] font-semibold text-snapInk">{item.title}</span>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${toneClass}`}>{item.status}</span>
        </span>
        <span className="mt-1 block text-[11px] font-normal text-snapMuted">#{item.id} - {item.location}</span>
        <span className="mt-2 flex items-center gap-2">
          <span className="h-1.5 flex-1 rounded-full bg-[#ECECEC]">
            <span className="block h-1.5 rounded-full bg-snapPurple" style={{ width: `${item.strength}%` }} />
          </span>
          <span className="text-[10px] font-medium text-snapMuted">{item.strength}%</span>
          <span className="text-[10px] font-medium text-snapMuted">{item.reports} reports</span>
        </span>
        <span className="mt-1 block text-[10px] font-normal text-snapMuted">{item.action} - {item.updated}</span>
      </span>
    </button>
  );
}

function CasesScreen({ onHome, onSnap, onCase, onMap, onFeed }) {
  const [filter, setFilter] = useState("All");
  const visibleCases = caseItems.filter((item) => {
    if (filter === "Active") return item.status !== "Fixed";
    if (filter === "Needs proof") return item.status === "Needs proof" || item.action.toLowerCase().includes("confirmation");
    if (filter === "Fixed") return item.status === "Fixed";
    return true;
  });

  return (
    <section className="screen screen-enter bg-snapBg">
      <div className="dashboard-scroll h-full overflow-y-auto pb-24 pt-9">
        <header className="px-5 pb-3">
          <p className="text-[12px] font-normal text-snapMuted">Your reports and watched cases</p>
          <h1 className="mt-1 text-[25px] font-bold leading-tight tracking-tight text-snapInk">Cases</h1>
        </header>

        <section className="feed-filter-row px-3">
          {["All", "Active", "Needs proof", "Fixed"].map((label) => (
            <button key={label} onClick={() => setFilter(label)} className={`feed-filter ${filter === label ? "active" : ""}`}>
              {label}
            </button>
          ))}
        </section>

        <section className="case-list mt-2">
          {visibleCases.map((item) => (
            <CompactCaseRow key={item.id} item={item} onOpen={onCase} />
          ))}
        </section>
      </div>
      <BottomNav active="Cases" onHome={onHome} onSnap={onSnap} onCases={() => {}} onMap={onMap} onFeed={onFeed} />
    </section>
  );
}

function HomeNearbyItem({ tag, title, detail, tone = "success", image, onOpen }) {
  const toneClass = tone === "danger" ? "bg-[#FFE8E2] text-snapDanger" : tone === "purple" ? "bg-[#F3F0F7] text-snapPurple" : "bg-[#E4F6EB] text-snapSuccess";
  return (
    <button onClick={onOpen} className="home-nearby-item text-left">
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-[12px] ${toneClass}`}>
        <Icon name={tone === "danger" ? "alert" : tone === "purple" ? "sparkle" : "check"} className="h-3.5 w-3.5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${toneClass}`}>{tag}</span>
        <span className="mt-1 block text-[13px] font-semibold leading-tight text-snapInk">{title}</span>
        <span className="mt-0.5 block text-[11px] font-normal leading-4 text-snapMuted">{detail}</span>
      </span>
      <span className="home-update-thumb" style={{ backgroundImage: `url("${image}")` }} />
    </button>
  );
}

function QuickAction({ icon, label, hint, onClick, active = false }) {
  return (
    <button onClick={onClick} className="quick-action">
      <span className={`mx-auto grid h-9 w-9 place-items-center rounded-[13px] ${active ? "bg-snapYellow text-snapInk" : "bg-[#F1EBFA] text-snapPurple"}`}>
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span className="mt-2 block text-[12px] font-semibold leading-none text-snapInk">{label}</span>
      <span className="mt-1 block text-[10px] font-normal leading-none text-snapMuted">{hint}</span>
    </button>
  );
}

function ActiveCaseRow({ item, title, detail, image, tone = "purple", strength, onOpen }) {
  const color = tone === "danger" ? "bg-snapDanger" : "bg-snapPurple";
  return (
    <button onClick={() => onOpen(item)} className="active-case-row px-2.5 py-2">
      <span className="active-thumb" style={{ backgroundImage: `url("${image}")` }} />
      <span className="min-w-0">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${tone === "danger" ? "bg-[#FFE8E2] text-snapDanger" : "bg-[#F3F0F7] text-snapPurple"}`}>{tone === "danger" ? "Action needed" : "Verifying"}</span>
        <span className="mt-1 block text-[13px] font-semibold leading-tight text-snapInk">{title}</span>
        <span className="mt-0.5 block text-[11px] font-normal leading-4 text-snapMuted">{detail}</span>
        <span className="mt-2 flex items-center gap-2">
          <span className="h-1.5 flex-1 rounded-full bg-[#ECECEC]">
            <span className={`block h-1.5 rounded-full ${color}`} style={{ width: strength }} />
          </span>
          <span className="text-[10px] font-medium text-snapMuted">{strength}</span>
        </span>
      </span>
      <span className="rounded-[12px] border border-snapPurple/25 px-3 py-1.5 text-[11px] font-semibold text-snapPurple">Watch</span>
    </button>
  );
}

function LiveUpdateRow({ icon, title, detail, time, tone = "success" }) {
  const toneClass = tone === "danger" ? "bg-[#FFE8E2] text-snapDanger" : tone === "purple" ? "bg-[#F3F0F7] text-snapPurple" : "bg-[#E4F6EB] text-snapSuccess";
  return (
    <div className="live-row px-4 py-2.5">
      <span className={`grid h-8 w-8 place-items-center rounded-[12px] ${toneClass}`}>
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[12px] font-semibold leading-tight text-snapInk">{title}</span>
        <span className="mt-0.5 block text-[11px] font-normal leading-4 text-snapMuted">{detail}</span>
      </span>
      <span className="text-[10px] font-normal text-snapMuted">{time}</span>
    </div>
  );
}

function ActiveCaseMini({ title, place, status, image, tone = "purple", meta }) {
  const toneClass = tone === "success" ? "bg-[#E4F6EB] text-snapSuccess" : "bg-[#F3F0F7] text-snapPurple";
  return (
    <button className="active-mini-card text-left">
      <span className="min-w-0 flex-1">
        <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${toneClass}`}>{status}</span>
        <span className="mt-1.5 block text-[12px] font-semibold leading-tight text-snapInk">{title}</span>
        <span className="mt-1 block text-[10px] font-normal leading-3 text-snapMuted">{place}</span>
        <span className="mt-3 block text-[9px] font-normal text-snapMuted">{meta}</span>
      </span>
      <span className="active-mini-thumb" style={{ backgroundImage: `url("${image}")` }} />
    </button>
  );
}

function RecentlyFixedCard({ onFeed, onCase }) {
  const items = feedCases.slice(0, 2);
  return (
    <section className="mt-2">
      <div className="mb-2 flex items-center justify-between px-1">
        <h2 className="text-[16px] font-semibold text-snapInk">Recently Fixed</h2>
        <button onClick={onFeed} className="text-[12px] font-semibold text-snapPurple">See all</button>
      </div>
      <div className="feed-list">
        {items.map((item) => (
          <button key={item.id} className="feed-row" onClick={() => onCase(item)}>
            <span className="feed-thumb-wrap">
              <span className="feed-before-after">
                <span className="feed-half" style={{ backgroundImage: `url("${item.beforeImage}")` }} />
                <span className="feed-half" style={{ backgroundImage: `url("${item.image}")` }} />
              </span>
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block text-[13px] font-semibold leading-tight text-snapInk">{item.title}</span>
              <span className="mt-1 block text-[10px] font-normal leading-4 text-snapMuted">{item.helper}</span>
              <span className="mt-2 block text-[10px] font-normal text-snapMuted">{item.reports} reports - fixed</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function distanceMeters(from, to) {
  const [lng1, lat1] = from;
  const [lng2, lat2] = to;
  const radius = 6371000;
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function routeBounds(coordinates) {
  return coordinates.reduce(
    (bounds, coordinate) => bounds.extend(coordinate),
    new maplibregl.LngLatBounds(coordinates[0], coordinates[0])
  );
}

function MapScreen({ onHome, onSnap, onCases, onFeed, onCase }) {
  const mapNode = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);
  const [selectedIssue, setSelectedIssue] = useState(mapIssues[0]);
  const [mapFilter, setMapFilter] = useState("Needs proof");
  const [routeState, setRouteState] = useState("idle");
  const [arrivalReady, setArrivalReady] = useState(false);
  const [routeDistance, setRouteDistance] = useState(null);

  useEffect(() => {
    if (!mapNode.current || !window.maplibregl || mapInstance.current) return;

    const map = new maplibregl.Map({
      container: mapNode.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [67.0973, 24.9179],
      zoom: 13.2,
      attributionControl: false
    });

    mapInstance.current = map;
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");

    mapIssues.forEach((issue) => {
      const markerNode = document.createElement("button");
      markerNode.type = "button";
      markerNode.className = `real-map-marker real-map-marker-${issue.tone}`;
      markerNode.dataset.status = issue.status;
      markerNode.innerHTML = `<span>${issue.tone === "danger" ? "!" : issue.tone === "success" ? "OK" : issue.tone === "yellow" ? "S" : "P"}</span>`;
      markerNode.addEventListener("click", () => {
        setSelectedIssue(issue);
        setRouteState("idle");
        setArrivalReady(false);
        setRouteDistance(null);
        map.flyTo({ center: [issue.lng, issue.lat], zoom: 14.2, essential: true });
      });
      const marker = new maplibregl.Marker({ element: markerNode, anchor: "bottom" })
        .setLngLat([issue.lng, issue.lat])
        .addTo(map);
      markers.current.push(marker);
    });

    const userNode = document.createElement("span");
    userNode.className = "real-map-user";
    new maplibregl.Marker({ element: userNode, anchor: "center" }).setLngLat(mockUserStart).addTo(map);

    return () => {
      markers.current.forEach((marker) => marker.remove());
      markers.current = [];
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    markers.current.forEach((marker) => {
      const element = marker.getElement();
      const status = element.dataset.status || "";
      const visible =
        mapFilter === "My area" ||
        (mapFilter === "Needs proof" && status === "Needs proof") ||
        (mapFilter === "Critical" && status === "Critical") ||
        (mapFilter === "Fixed" && status === "Fixed");
      element.style.display = visible ? "grid" : "none";
    });
  }, [mapFilter]);

  const drawRoute = (geojson) => {
    const map = mapInstance.current;
    if (!map || !geojson?.features?.[0]) return;

    if (map.getSource("snapcity-route")) {
      map.getSource("snapcity-route").setData(geojson);
    } else {
      map.addSource("snapcity-route", { type: "geojson", data: geojson });
      map.addLayer({
        id: "snapcity-route-line",
        type: "line",
        source: "snapcity-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#4c1482", "line-width": 5, "line-opacity": 0.9 }
      });
    }

    const coordinates = geojson.features[0].geometry.coordinates;
    if (coordinates.length > 1) {
      map.fitBounds(routeBounds(coordinates), { padding: 74, duration: 700 });
    }
  };

  const handleGoConfirm = async () => {
    const target = [selectedIssue.lng, selectedIssue.lat];
    setRouteState("routing");
    setArrivalReady(false);

    const start = await new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(mockUserStart);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve([position.coords.longitude, position.coords.latitude]),
        () => resolve(mockUserStart),
        { enableHighAccuracy: true, timeout: 3500, maximumAge: 15000 }
      );
    });

    const meters = Math.round(distanceMeters(start, target));
    setRouteDistance(meters < 1000 ? `${meters} m` : `${(meters / 1000).toFixed(1)} km`);

    try {
      let response = await fetch("/api/directions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start, end: target, profile: "foot-walking" })
      });

      if (!response.ok) {
        response = await fetch("https://api.openrouteservice.org/v2/directions/foot-walking/geojson", {
          method: "POST",
          headers: {
            "Authorization": openRouteServiceBrowserKey,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ coordinates: [start, target] })
        });
      }

      if (!response.ok) throw new Error("Route failed");
      const geojson = await response.json();
      drawRoute(geojson);
      setRouteState("ready");
      setArrivalReady(meters <= 70);
    } catch {
      const fallbackRoute = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: { type: "LineString", coordinates: [start, target] },
            properties: {}
          }
        ]
      };
      drawRoute(fallbackRoute);
      setRouteState("fallback");
    }
  };

  const selectMapFilter = (label) => {
    setMapFilter(label);
    const nextIssue =
      label === "My area"
        ? mapIssues[0]
        : mapIssues.find((issue) => issue.status === label) || selectedIssue;
    setSelectedIssue(nextIssue);
    setRouteState("idle");
    setArrivalReady(false);
    setRouteDistance(null);
    mapInstance.current?.flyTo({ center: [nextIssue.lng, nextIssue.lat], zoom: 14.1, essential: true });
  };

  return (
    <section className="screen screen-enter bg-white">
      <div className="map-screen real-map-screen h-full">
        <div ref={mapNode} className="real-map-canvas" />

        <header className="map-floating-header">
          <div>
            <h1 className="text-[34px] font-bold leading-none tracking-tight text-snapInk">Map</h1>
            <p className="mt-2 text-[13px] font-medium text-snapMuted">Gulshan-e-Iqbal, Karachi</p>
          </div>
          <div className="flex gap-2">
            <button className="map-round-button" aria-label="Search" onClick={() => mapInstance.current?.flyTo({ center: [selectedIssue.lng, selectedIssue.lat], zoom: 14.2, essential: true })}>
              <Icon name="search" className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="map-filter-row">
          {["Needs proof", "Critical", "Fixed", "My area"].map((label) => (
            <button key={label} onClick={() => selectMapFilter(label)} className={`map-filter-pill ${mapFilter === label ? "active" : ""}`}>
              {label === "Critical" && <span className="h-2 w-2 rounded-full bg-snapDanger" />}
              {label === "Fixed" && <span className="h-2 w-2 rounded-full bg-snapSuccess" />}
              {label === "My area" && <Icon name="impact" className="h-3.5 w-3.5" />}
              {label}
            </button>
          ))}
        </div>

        <section className="map-action-sheet">
          <span className="mx-auto mb-2 block h-1 w-10 rounded-full bg-black/14" />
          <div className="flex gap-3">
            <span className="map-sheet-thumb" style={{ backgroundImage: `url("${selectedIssue.image}")` }} />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-[17px] font-bold leading-tight tracking-tight text-snapInk">{selectedIssue.title}</h2>
                <span className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-semibold ${selectedIssue.tone === "danger" ? "bg-[#FFE8E2] text-snapDanger" : selectedIssue.tone === "success" ? "bg-[#E4F6EB] text-snapSuccess" : "bg-[#F3F0F7] text-snapPurple"}`}>{selectedIssue.status}</span>
              </div>
              <p className="mt-1 text-[11px] font-medium text-snapMuted">{routeDistance || selectedIssue.distance}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span>
                  <span className="block text-[11px] font-semibold text-snapInk">{selectedIssue.confirmations}</span>
                  <span className="block text-[9px] font-normal leading-3 text-snapMuted">{routeState === "ready" ? "Route ready. Open camera when you reach it." : "Fresh proof can strengthen this case."}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-[1.35fr_1fr] gap-2">
            <button
              onClick={arrivalReady ? onSnap : routeState === "ready" || routeState === "fallback" ? onSnap : handleGoConfirm}
              className="h-10 rounded-[13px] bg-snapPurple text-[12px] font-semibold text-white"
            >
              {routeState === "routing" ? "Building route..." : arrivalReady ? "Open camera" : routeState === "ready" || routeState === "fallback" ? "Start proof flow" : "Go confirm"}
            </button>
            <button onClick={() => onCase(caseItems.find((item) => item.id === selectedIssue.id) || caseItems[0])} className="h-10 rounded-[13px] border border-black/10 bg-white text-[12px] font-semibold text-snapInk">View case</button>
          </div>
        </section>
      </div>
      <BottomNav active="Map" onHome={onHome} onSnap={onSnap} onCases={onCases} onMap={() => {}} onFeed={onFeed} />
    </section>
  );
}

function FeedItem({ item, onCase }) {
  return (
    <button className="feed-row" onClick={() => onCase(item)}>
      <span className="feed-thumb-wrap">
        {item.beforeImage ? (
          <span className="feed-before-after">
            <span className="feed-half" style={{ backgroundImage: `url("${item.beforeImage}")` }} />
            <span className="feed-half" style={{ backgroundImage: `url("${item.image}")` }} />
          </span>
        ) : (
          <span className="feed-thumb" style={{ backgroundImage: `url("${item.image}")` }} />
        )}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[14px] font-semibold leading-tight text-snapInk">{item.title}</span>
        <span className="mt-1 block text-[11px] font-normal leading-4 text-snapMuted">{item.detail}</span>
        <span className="mt-1.5 block text-[10px] font-medium text-snapMuted">{item.helper}</span>
        <span className="mt-2 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#F3F0F7] px-2 py-0.5 text-[9px] font-semibold text-snapPurple">{tag}</span>
          ))}
        </span>
        <span className="mt-2 block text-[10px] font-normal text-snapMuted">{item.reports} reports - {item.strength}% evidence - {item.updated.toLowerCase()}</span>
      </span>
    </button>
  );
}

function FeedScreen({ onHome, onSnap, onCases, onMap, onCase }) {
  const [filter, setFilter] = useState("All");
  const visibleFeed = feedCases.filter((item) => {
    if (filter === "Fixed") return item.status === "Fixed";
    if (filter === "Before / After") return Boolean(item.beforeImage);
    if (filter === "Partners") return item.tags.includes("Community partner") || item.helper.toLowerCase().includes("partner");
    return true;
  });

  return (
    <section className="screen screen-enter bg-snapBg">
      <div className="feed-scroll h-full overflow-y-auto px-3 pb-24 pt-9">
        <header className="px-2 pb-3">
          <p className="text-[12px] font-normal text-snapMuted">Hey Hassan</p>
          <h1 className="mt-1 text-[30px] font-bold leading-tight tracking-tight text-snapInk">Feed</h1>
          <p className="mt-1 text-[12px] font-normal text-snapMuted">Proof that reports are turning into action.</p>
        </header>

        <section className="feed-filter-row">
          {["All", "Fixed", "Before / After", "Partners"].map((item) => (
            <button key={item} onClick={() => setFilter(item)} className={`feed-filter ${filter === item ? "active" : ""}`}>{item}</button>
          ))}
        </section>

        <section className="feed-list mt-2">
          {visibleFeed.map((item) => (
            <FeedItem key={item.id} item={item} onCase={onCase} />
          ))}
        </section>
      </div>
      <BottomNav active="Feed" onHome={onHome} onSnap={onSnap} onCases={onCases} onMap={onMap} onFeed={() => {}} />
    </section>
  );
}

function HomeDashboard({ onSnap, onCase, onCases, onMap, onFeed }) {
  return (
    <section className="screen screen-enter home-screen">
      <div className="home-scroll h-full overflow-y-auto px-3 pb-24 pt-8">
        <header className="home-hero px-2 pb-3 pt-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-normal text-white/70">Hey Hassan</p>
              <h1 className="mt-1 max-w-[245px] text-[27px] font-bold leading-[1.02] tracking-tight text-white">Making Gulshan better</h1>
            </div>
            <button onClick={onFeed} className="relative grid h-10 w-10 place-items-center rounded-full bg-white text-snapInk shadow-[0_8px_20px_rgba(32,16,53,0.08)]" aria-label="Open civic notifications">
              <Icon name="alert" className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-snapDanger ring-2 ring-white" />
            </button>
          </div>
        </header>

        <button onClick={onFeed} className="home-fix-banner mt-1 block w-full overflow-hidden rounded-[18px] text-left">
          <div className="relative z-10 p-4">
            <span className="rounded-full bg-snapYellow px-3 py-1 text-[10px] font-bold text-snapInk">This week</span>
            <h2 className="mt-2 max-w-[190px] text-[28px] font-bold leading-[1.02] text-white">
              <span className="text-snapYellow">5</span> issues fixed near you
            </h2>
            <p className="mt-2 max-w-[200px] text-[12px] font-medium leading-4 text-white">Thanks to <span className="font-bold text-snapYellow">128</span> neighbors who spoke up.</p>
          </div>
          <button className="absolute right-4 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white text-[18px] font-light text-snapInk">&gt;</button>
        </button>

        <section className="home-impact-strip mt-2 overflow-hidden rounded-[16px] bg-white">
          <div className="px-3 pb-1.5 pt-2">
            <p className="text-[11px] font-semibold text-snapInk">Your Civic Impact</p>
          </div>
          <div className="grid grid-cols-4 divide-x divide-black/8 px-1 pb-2">
            <HomeImpactMini icon="sparkle" value="4,250" label="Impact score" note="+320 this week" tone="purple" />
            <HomeImpactMini icon="trophy" value="Top 8%" label="Local rank" note="In Gulshan" tone="yellow" />
            <HomeImpactMini icon="check" value="23" label="Verified" note="This week" tone="success" />
            <HomeImpactMini icon="impact" value="5" label="Fixed nearby" note="Within 1 km" tone="danger" />
          </div>
        </section>

        <section className="mt-2">
          <button onClick={onMap} className="snap-cta compact-task-cta">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-white text-snapInk">
              <Icon name="case" className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block text-[13px] font-bold leading-tight text-snapInk">Confirm nearby issue</span>
              <span className="mt-0.5 block text-[10px] font-normal text-snapInk/70">Block 7 - 300 m away</span>
            </span>
            <span className="shrink-0 rounded-full bg-snapPurple px-3 py-2 text-[11px] font-semibold text-white">Confirm now</span>
          </button>
        </section>

        <section className="mt-2">
          <div className="mb-2 flex items-center justify-between px-1">
            <h2 className="text-[15px] font-semibold text-snapInk">Your Active Cases</h2>
            <button onClick={onCases} className="text-[12px] font-semibold text-snapPurple">See all</button>
          </div>
          <div className="home-section overflow-hidden divide-y divide-black/8">
            <ActiveCaseRow item={caseItems[0]} onOpen={onCase} title="Manhole open on Main Avenue" detail="Block 12, Gulshan-e-Iqbal" image="assets/Manhole%202.jpg" strength="72%" />
            <ActiveCaseRow item={caseItems[1]} onOpen={onCase} title="Water logging after rain" detail="Block 7, Gulshan-e-Iqbal" image="assets/Broken%20Road%203.jpg" tone="danger" strength="48%" />
          </div>
        </section>

        <section className="mt-2">
          <div className="mb-2 flex items-center justify-between px-1">
            <h2 className="text-[15px] font-semibold text-snapInk">What's happening nearby</h2>
            <button onClick={onMap} className="text-[12px] font-semibold text-snapPurple">See all</button>
          </div>
          <div className="home-section overflow-hidden divide-y divide-black/8">
            <HomeNearbyItem onOpen={() => onCase(caseItems[0])} tag="Verified" title="Manhole report strengthened" detail="Case SC-204 moved to escalation queue." tone="purple" image="assets/Manhole%201.jpg" />
            <HomeNearbyItem onOpen={() => onCase(feedCases[1])} tag="Fixed" title="Road fixed by community partner" detail="Block 7, Gulshan-e-Iqbal - 2h ago" image="assets/Broken%20Road%202.webp" />
            <HomeNearbyItem onOpen={() => onCase(caseItems[2])} tag="Action needed" title="Rain patrol needs confirmations" detail="3 flooding reports near your route." tone="danger" image="assets/Broken%20Road%203.jpg" />
          </div>
        </section>

        <RecentlyFixedCard onFeed={onFeed} onCase={onCase} />
      </div>
      <BottomNav active="Home" onHome={() => {}} onSnap={onSnap} onCases={onCases} onMap={onMap} onFeed={onFeed} />
    </section>
  );
}

function CaseDashboard({ preview = false, caseItem = caseItems[0], onBack, onHome, onSnap, onCases, onMap, onFeed }) {
  const feed = [
    "9 people confirmed this issue",
    "2 more citizens confirmed this issue",
    "Notice draft generated",
    "Nearby responder invited",
    "Similar case fixed in Nazimabad"
  ];

  return (
    <section className={`screen screen-enter bg-snapBg ${preview ? "pointer-events-none scale-[0.96] opacity-90" : ""}`}>
      <div className="dashboard-scroll h-full overflow-y-auto px-0 pb-24 pt-8">
        <header className="app-card dashboard-section p-4">
          <button onClick={onBack} className="mb-3 grid h-9 w-9 place-items-center rounded-full bg-[#F3F0F7] text-snapPurple" aria-label="Back">
            <span className="text-[19px] leading-none">&lt;</span>
          </button>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-normal text-snapMuted">Case #{caseItem.id}</p>
              <h1 className="mt-1 text-[22px] font-bold leading-tight tracking-tight text-snapInk">{caseItem.title}</h1>
            </div>
            <span className="rounded-full bg-[#E4F6EB] px-3 py-1.5 text-xs font-bold text-snapSuccess">{caseItem.status}</span>
          </div>
          {caseItem.beforeImage ? (
            <div className="case-proof-grid mt-3">
              <div className="case-proof-img" style={{ backgroundImage: `url("${caseItem.beforeImage}")` }}>
                <span>Before</span>
              </div>
              <div className="case-proof-img" style={{ backgroundImage: `url("${caseItem.image}")` }}>
                <span>After</span>
              </div>
            </div>
          ) : (
            <div className="case-proof-single mt-3" style={{ backgroundImage: `url("${caseItem.image}")` }} />
          )}
          <div className="mt-3 rounded-[14px] border border-black/5 bg-[#F7F7F7] p-3">
            <p className="text-[12px] font-medium text-snapMuted">Location</p>
            <p className="mt-1 text-[15px] font-medium text-snapInk">{caseItem.location}</p>
          </div>
        </header>

        <div className="app-card dashboard-section mt-px grid grid-cols-2 overflow-hidden">
          <MetricCell label="Severity" value={caseItem.severity} tone={caseItem.severity === "High" || caseItem.severity === "Critical" ? "danger" : "default"} className="border-b border-r border-black/10" />
          <MetricCell label="Reports" value={caseItem.reports} className="border-b border-black/10" />
          <MetricCell label="Evidence Strength" value={`${caseItem.strength}%`} tone="success" className="border-r border-black/10" />
          <MetricCell label="Responsible Body" value={caseItem.helper || caseData.responsible} tone="purple" />
        </div>

        <div className="mt-px">
          <StatCard label="Status" value="Waiting for Action" />
        </div>

        <div className="mt-px">
          <Timeline />
        </div>

        <section className="app-card dashboard-section mt-px p-5">
          <p className="text-[13px] font-semibold text-snapPurple">AI reasoning</p>
          <p className="mt-2 text-[15px] font-normal leading-6 text-snapInk">{caseItem.detail || "AI marked this case high severity because it is near a school route, has similar reports nearby, and may worsen during rain."}</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {["Vision match", "Geo cluster", "Rain risk"].map((item) => (
              <div key={item} className="rounded-[14px] border border-black/5 bg-[#F7F7F7] px-2 py-3">
                <p className="text-[11px] font-medium text-snapMuted">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="app-card dashboard-section mt-px p-5">
          <p className="text-[13px] font-semibold text-snapPurple">Action simulation</p>
          <div className="mt-3 divide-y divide-black/8">
            {["Notice generated", "Nearby users alerted", "Responder suggested", "Social impact card ready", "Map/status updated"].map((item) => (
              <div key={item} className="flex items-center gap-3 py-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F0F0F0] text-snapPurple"><Icon name="check" className="h-4 w-4" /></span>
                <span className="text-[14px] font-normal text-snapInk">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="app-card dashboard-section mt-px p-5">
          <p className="text-[13px] font-semibold text-snapPurple">Community feed</p>
          <div className="mt-3 divide-y divide-black/8">
            {feed.map((item) => (
              <div key={item} className="flex items-center justify-between gap-3 py-3">
                <p className="text-[14px] font-normal text-snapInk">{item}</p>
                <span className="h-2 w-2 shrink-0 rounded-full bg-snapYellow" />
              </div>
            ))}
          </div>
        </section>
      </div>
      {!preview && <BottomNav active="Cases" onHome={onHome} onSnap={onSnap} onCases={onCases} onMap={onMap} onFeed={onFeed} />}
    </section>
  );
}

function App() {
  const [screen, setScreen] = useState(flow.HOME);
  const [selectedCase, setSelectedCase] = useState(caseItems[0]);
  const [previousScreen, setPreviousScreen] = useState(flow.HOME);
  const goHome = () => setScreen(flow.HOME);
  const goCases = () => setScreen(flow.CASES);
  const goMap = () => setScreen(flow.MAP);
  const goFeed = () => setScreen(flow.FEED);
  const goCamera = () => setScreen(flow.CAMERA);
  const goCase = (item = caseItems[0]) => {
    setSelectedCase(item);
    setPreviousScreen(screen);
    setScreen(flow.DASHBOARD);
  };
  const goBack = () => setScreen(previousScreen || flow.HOME);

  const appScreen = useMemo(() => {
    if (screen === flow.HOME) return <HomeDashboard onSnap={goCamera} onCase={goCase} onCases={goCases} onMap={goMap} onFeed={goFeed} />;
    if (screen === flow.CASES) return <CasesScreen onHome={goHome} onSnap={goCamera} onCase={goCase} onMap={goMap} onFeed={goFeed} />;
    if (screen === flow.MAP) return <MapScreen onHome={goHome} onSnap={goCamera} onCases={goCases} onFeed={goFeed} onCase={goCase} />;
    if (screen === flow.FEED) return <FeedScreen onHome={goHome} onSnap={goCamera} onCases={goCases} onMap={goMap} onCase={goCase} />;
    if (screen === flow.CAMERA) return <CameraScreen onBack={goHome} onSnap={() => setScreen(flow.SCANNING)} />;
    if (screen === flow.SCANNING) return <ScanningOverlay onComplete={() => setScreen(flow.TICKET)} />;
    if (screen === flow.TICKET) return <TicketSheet onClose={() => setScreen(flow.CAMERA)} onSubmit={() => setScreen(flow.REWARD)} />;
    if (screen === flow.REWARD) return <RewardModal onHome={goHome} onWatch={goCase} />;
    return <CaseDashboard caseItem={selectedCase} onBack={goBack} onHome={goHome} onSnap={goCamera} onCases={goCases} onMap={goMap} onFeed={goFeed} />;
  }, [screen, selectedCase, previousScreen]);

  return <PhoneFrame>{appScreen}</PhoneFrame>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
