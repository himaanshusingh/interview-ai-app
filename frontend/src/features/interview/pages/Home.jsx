import React, { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";

const reportScoreClass = (score) =>
  score >= 80
    ? "text-severity-low"
    : score >= 60
      ? "text-severity-medium"
      : "text-severity-high";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();

  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-page text-text">
        <h1 className="text-xl font-semibold">Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-page px-6 py-12 font-sans text-text">
      <header className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-text">
          Create Your Custom{" "}
          <span className="text-accent">Interview Plan</span>
        </h1>
        <p className="mx-auto max-w-[480px] text-[0.95rem] leading-relaxed text-muted">
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </header>

      <div className="w-full max-w-[900px] overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex min-h-[520px]">
          <div className="relative flex flex-1 flex-col gap-4 p-6">
            <div className="mb-1 flex items-center gap-2">
              <span className="flex items-center text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              <h2 className="flex-1 text-base font-semibold text-text">
                Target Job Description
              </h2>
              <span className="rounded border border-accent/30 bg-accent/15 px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide text-accent uppercase">
                Required
              </span>
            </div>
            <textarea
              onChange={(e) => {
                setJobDescription(e.target.value);
              }}
              className="min-h-0 w-full flex-1 resize-none rounded-lg border border-border bg-input px-4 py-3 text-sm leading-normal text-text outline-none transition-colors placeholder:text-muted focus:border-accent"
              placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
              maxLength={5000}
            />
            <div className="absolute right-8 bottom-9 text-xs text-muted">
              0 / 5000 chars
            </div>
          </div>

          <div className="w-px shrink-0 bg-border" />

          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="mb-1 flex items-center gap-2">
              <span className="flex items-center text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <h2 className="flex-1 text-base font-semibold text-text">
                Your Profile
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              <label className="mb-1 flex items-center gap-2 text-sm font-medium text-text">
                Upload Resume
                <span className="rounded border border-accent/30 bg-accent/15 px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide text-accent uppercase">
                  Best Results
                </span>
              </label>
              <label
                htmlFor="resume"
                className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-border bg-input px-4 py-6 transition-colors hover:border-accent hover:bg-accent/5"
              >
                <span className="mb-1 text-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 16 12 12 8 16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                </span>
                <p className="m-0 text-sm font-medium text-text">
                  Click to upload or drag &amp; drop
                </p>
                <p className="m-0 text-xs text-muted">PDF or DOCX (Max 5MB)</p>
                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx"
                />
              </label>
            </div>

            <div className="or-divider">
              <span>OR</span>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="mb-1 text-sm font-medium text-text"
                htmlFor="selfDescription"
              >
                Quick Self-Description
              </label>
              <textarea
                onChange={(e) => {
                  setSelfDescription(e.target.value);
                }}
                id="selfDescription"
                name="selfDescription"
                className="h-24 w-full resize-none rounded-lg border border-border bg-input px-4 py-3 text-sm leading-normal text-text outline-none transition-colors placeholder:text-muted focus:border-accent"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />
            </div>

            <div className="flex items-start gap-2.5 rounded-lg border border-info-border bg-info-bg px-4 py-3">
              <span className="mt-px shrink-0 text-info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="12"
                    stroke="#1a1f27"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="16"
                    x2="12.01"
                    y2="16"
                    stroke="#1a1f27"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <p className="m-0 text-[0.8rem] leading-normal text-info-text">
                Either a <strong className="text-text">Resume</strong> or a{" "}
                <strong className="text-text">Self Description</strong> is
                required to generate a personalized plan.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <span className="text-[0.8rem] text-muted">
            AI-Powered Strategy Generation &bull; Approx 30s
          </span>
          <button
            onClick={handleGenerateReport}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border-0 bg-linear-to-br from-accent to-[#e6005c] px-6 py-3 text-[0.9rem] font-semibold text-white transition-opacity outline-none hover:opacity-90 active:scale-[0.98]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            Generate My Interview Strategy
          </button>
        </div>
      </div>

      {reports.length > 0 && (
        <section className="flex w-full max-w-[900px] flex-col gap-3">
          <h2 className="text-lg font-semibold text-text">
            My Recent Interview Plans
          </h2>
          <ul className="flex flex-wrap gap-3">
            {reports.map((report) => (
              <li
                key={report._id}
                className="flex min-w-[200px] flex-1 shrink-0 cursor-pointer flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/50"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <h3 className="font-semibold text-text">
                  {report.title || "Untitled Position"}
                </h3>
                <p className="text-sm text-muted">
                  Generated on{" "}
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <p
                  className={`text-[0.8rem] font-semibold ${reportScoreClass(report.matchScore)}`}
                >
                  Match Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="flex gap-6">
        <a
          href="#"
          className="text-[0.8rem] text-muted no-underline transition-colors hover:text-text"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="text-[0.8rem] text-muted no-underline transition-colors hover:text-text"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="text-[0.8rem] text-muted no-underline transition-colors hover:text-text"
        >
          Help Center
        </a>
      </footer>
    </div>
  );
};

export default Home;
