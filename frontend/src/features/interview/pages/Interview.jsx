import React, { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useParams } from "react-router";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

const scoreRingClass = (score) =>
  score >= 80
    ? "border-severity-low"
    : score >= 60
      ? "border-severity-medium"
      : "border-severity-high";

const skillTagClass = (severity) => {
  const map = {
    high: "text-severity-high bg-severity-high/10 border-severity-high/25",
    medium:
      "text-severity-medium bg-severity-medium/10 border-severity-medium/25",
    low: "text-severity-low bg-severity-low/10 border-severity-low/25",
  };
  return map[severity] ?? map.medium;
};

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-panel transition-colors hover:border-[#354060]">
      <div
        className="flex cursor-pointer items-start gap-3 px-4 py-3.5 select-none"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="mt-0.5 shrink-0 rounded border border-accent/20 bg-accent/10 px-1.5 py-0.5 text-[0.7rem] font-bold text-accent">
          Q{index + 1}
        </span>
        <p className="m-0 flex-1 text-[0.9rem] leading-normal font-medium text-text">
          {item.question}
        </p>
        <span
          className={`mt-0.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-accent" : "text-muted"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {open && (
        <div className="flex flex-col gap-3 border-t border-border px-4 pt-3 pb-4">
          <div className="flex flex-col gap-1.5">
            <span className="w-fit rounded border border-intention/20 bg-intention/10 px-2 py-0.5 text-[0.68rem] font-bold tracking-wider text-intention uppercase">
              Intention
            </span>
            <p className="m-0 text-[0.835rem] leading-relaxed text-[#9ca3af]">
              {item.intention}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="w-fit rounded border border-answer/20 bg-answer/10 px-2 py-0.5 text-[0.68rem] font-bold tracking-wider text-answer uppercase">
              Model Answer
            </span>
            <p className="m-0 text-[0.835rem] leading-relaxed text-[#9ca3af]">
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="roadmap-day">
    <div className="flex items-center gap-2.5">
      <span className="rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[0.7rem] font-bold text-accent">
        Day {day.day}
      </span>
      <h3 className="m-0 text-[0.95rem] font-semibold text-text">{day.focus}</h3>
    </div>
    <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
      {day.tasks.map((task, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-[0.845rem] leading-normal text-[#9aa3ad]"
        >
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-page text-text">
        <h1 className="text-xl font-semibold">Loading your interview plan...</h1>
      </main>
    );
  }

  const ringClass = scoreRingClass(report.matchScore);

  return (
    <div className="box-border flex min-h-screen w-full items-stretch bg-page p-6 font-sans text-text">
      <div className="mx-auto flex w-full max-w-[1280px] justify-between rounded-2xl border border-border bg-card">
        <nav className="flex w-[220px] shrink-0 flex-col justify-between gap-1 p-7 px-4">
          <div>
            <p className="mb-2 px-3 text-[0.7rem] font-semibold tracking-widest text-muted uppercase">
              Sections
            </p>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`mb-0.5 flex w-full cursor-pointer items-center gap-2.5 rounded-lg border-0 px-3 py-2.5 text-left text-sm transition-colors outline-none ${
                  activeNav === item.id
                    ? "bg-accent/10 text-accent"
                    : "bg-transparent text-muted hover:bg-panel hover:text-text"
                }`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="flex shrink-0 items-center">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              getResumePdf(interviewId);
            }}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 bg-accent-dark px-6 py-3 text-white transition-all duration-300 outline-none active:scale-90"
          >
            <svg
              className="mr-1 h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
            </svg>
            Download Resume
          </button>
        </nav>

        <div className="w-px shrink-0 bg-border" />

        <main className="max-h-[calc(100vh-3rem)] min-h-0 flex-1 overflow-y-auto px-8 pt-7 pb-20">
          {activeNav === "technical" && (
            <section className="min-h-full">
              <div className="mb-6 flex items-baseline gap-3 border-b border-border pb-4">
                <h2 className="m-0 text-lg font-bold text-text">
                  Technical Questions
                </h2>
                <span className="rounded-full border border-border bg-panel px-2.5 py-0.5 text-[0.8rem] text-muted">
                  {report.technicalQuestions.length} questions
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section className="min-h-full">
              <div className="mb-6 flex items-baseline gap-3 border-b border-border pb-4">
                <h2 className="m-0 text-lg font-bold text-text">
                  Behavioral Questions
                </h2>
                <span className="rounded-full border border-border bg-panel px-2.5 py-0.5 text-[0.8rem] text-muted">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section className="min-h-full">
              <div className="mb-6 flex items-baseline gap-3 border-b border-border pb-4">
                <h2 className="m-0 text-lg font-bold text-text">
                  Preparation Road Map
                </h2>
                <span className="rounded-full border border-border bg-panel px-2.5 py-0.5 text-[0.8rem] text-muted">
                  {report.preparationPlan.length}-day plan
                </span>
              </div>
              <div className="roadmap-list">
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        <div className="w-px shrink-0 bg-border" />

        <aside className="flex w-60 shrink-0 flex-col gap-5 px-5 py-7">
          <div className="flex flex-col items-center gap-2.5">
            <p className="m-0 self-start text-xs font-semibold tracking-widest text-muted uppercase">
              Match Score
            </p>
            <div
              className={`flex size-[90px] flex-col items-center justify-center rounded-full border-4 ${ringClass}`}
            >
              <span className="text-[1.6rem] leading-none font-extrabold text-text">
                {report.matchScore}
              </span>
              <span className="-mt-0.5 text-xs text-muted">%</span>
            </div>
            <p className="m-0 text-center text-xs text-severity-low">
              Strong match for this role
            </p>
          </div>

          <div className="h-px bg-border" />

          <div className="flex flex-col gap-3">
            <p className="m-0 text-xs font-semibold tracking-widest text-muted uppercase">
              Skill Gaps
            </p>
            <div className="flex flex-wrap gap-2">
              {report.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className={`cursor-default rounded-md border px-2.5 py-1 text-[0.775rem] font-medium ${skillTagClass(gap.severity)}`}
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
