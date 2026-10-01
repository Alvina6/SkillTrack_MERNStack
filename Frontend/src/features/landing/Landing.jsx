import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  BriefcaseBusiness,
  Check,
  CircleCheck,
  Target,
} from "lucide-react";
import "./landing.scss";

const features = [
  {
    icon: BriefcaseBusiness,
    number: "01",
    title: "Applications, in order",
    description:
      "Keep every opportunity, company, and next step together in one clear pipeline.",
  },
  {
    icon: Brain,
    number: "02",
    title: "Skills that move you forward",
    description:
      "Track what you know, spot what to build next, and connect learning to your goals.",
  },
  {
    icon: Target,
    number: "03",
    title: "Goals with real momentum",
    description:
      "Turn the next step in your career into focused goals you can actually complete.",
  },
];

function DashboardPreview() {
  return (
    <div className="landing-preview" aria-label="SkillTrack dashboard preview">
      <div className="landing-preview__topbar">
        <div className="landing-preview__brand">
          <span className="landing-preview__mark">S</span>
          <span>SkillTrack</span>
        </div>
        <div className="landing-preview__topbar-right">
          <span>Career workspace</span>
          <span className="landing-preview__avatar">JD</span>
        </div>
      </div>

      <div className="landing-preview__body">
        <aside className="landing-preview__sidebar" aria-hidden="true">
          <span className="landing-preview__side-item landing-preview__side-item--active">
            <span />
            Overview
          </span>
          <span className="landing-preview__side-item">
            <span />
            Applications
          </span>
          <span className="landing-preview__side-item">
            <span />
            Skills
          </span>
          <span className="landing-preview__side-item">
            <span />
            Goals
          </span>
        </aside>

        <div className="landing-preview__content">
          <div className="landing-preview__greeting">
            <span>MONDAY, OCTOBER 05</span>
            <h2>
              Your next move, <em>in view.</em>
            </h2>
            <p>A little progress adds up.</p>
          </div>

          <div className="landing-preview__stats">
            <div>
              <span>Applications</span>
              <strong>12</strong>
              <small>4 in progress</small>
            </div>
            <div>
              <span>Skills tracked</span>
              <strong>08</strong>
              <small>2 recently added</small>
            </div>
            <div>
              <span>Goals reached</span>
              <strong>03</strong>
              <small>Keep your rhythm</small>
            </div>
          </div>

          <div className="landing-preview__lower">
            <section className="landing-preview__pipeline">
              <div className="landing-preview__section-head">
                <strong>Application pipeline</strong>
                <span>
                  View all <ArrowUpRight size={12} />
                </span>
              </div>
              <div className="landing-preview__pipeline-row">
                <span className="landing-preview__company-mark landing-preview__company-mark--green">
                  N
                </span>
                <div>
                  <strong>Northstar Studio</strong>
                  <small>Product Designer</small>
                </div>
                <span className="landing-preview__status">Interview</span>
              </div>
              <div className="landing-preview__pipeline-row">
                <span className="landing-preview__company-mark landing-preview__company-mark--gold">
                  F
                </span>
                <div>
                  <strong>Fieldwork</strong>
                  <small>UX Researcher</small>
                </div>
                <span className="landing-preview__status landing-preview__status--quiet">
                  Applied
                </span>
              </div>
            </section>
            <section className="landing-preview__goal">
              <div className="landing-preview__section-head">
                <strong>Current goal</strong>
                <Target size={14} />
              </div>
              <span className="landing-preview__goal-label">
                CAREER DEVELOPMENT
              </span>
              <strong className="landing-preview__goal-title">
                Build a stronger portfolio
              </strong>
              <div className="landing-preview__progress">
                <span />
              </div>
              <small>3 of 5 milestones complete</small>
              <div className="landing-preview__goal-check">
                <CircleCheck size={13} /> Case study draft finished
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="landing-preview__note">
        <span>
          <Check size={12} />
        </span>{" "}
        One workspace. A clearer way forward.
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <main className="landing-page">
      <header className="landing-nav">
        <Link className="landing-brand" to="/" aria-label="SkillTrack home">
          <span className="landing-brand__mark">S</span>
          <span>
            SkillTrack<small>CAREER MANAGER</small>
          </span>
        </Link>
        <nav className="landing-nav__links" aria-label="Main navigation">
          <a href="#workspace">Your workspace</a>
          <a href="#features">What you can track</a>
        </nav>
        <div className="landing-nav__actions">
          <Link className="landing-nav__login" to="/login">
            Sign in
          </Link>
          <Link className="landing-button landing-button--small" to="/register">
            Get started <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      <section className="landing-hero" id="workspace">
        <div className="landing-hero__copy">
          <span className="landing-kicker">
            <span /> YOUR CAREER, WITH DIRECTION
          </span>
          <h1>
            Make your next move <em>with purpose.</em>
          </h1>
          <p className="landing-hero__description">
            The job search has a lot of moving parts. Keep your applications,
            skills, and goals in one place, and focus on the progress that gets
            you where you want to go.
          </p>
          <div className="landing-hero__actions">
            <Link className="landing-button" to="/register">
              Create your workspace <ArrowRight size={16} />
            </Link>
            <a className="landing-text-link" href="#features">
              See what you can track <ArrowRight size={15} />
            </a>
          </div>
          <div className="landing-hero__assurance">
            <span>
              <Check size={12} />
            </span>{" "}
            Your career workspace, all in one place
          </div>
        </div>

        <div className="landing-hero__visual">
          <div className="landing-hero__visual-label">
            <span>YOUR CAREER AT A GLANCE</span>
            <span>01 — 03</span>
          </div>
          <DashboardPreview />
        </div>
      </section>

      <section
        className="landing-proof"
        aria-label="SkillTrack workspace highlights"
      >
        <p>LESS SCATTERED. MORE INTENTIONAL.</p>
        <div>
          <span>
            <BriefcaseBusiness size={16} /> Applications
          </span>
          <i />{" "}
          <span>
            <Brain size={16} /> Skills
          </span>
          <i />{" "}
          <span>
            <Target size={16} /> Goals
          </span>
          <i />{" "}
          <span>
            <CircleCheck size={16} /> Progress
          </span>
        </div>
      </section>

      <section className="landing-features" id="features">
        <div className="landing-features__intro">
          <span className="landing-kicker">A WORKSPACE THAT KEEPS UP</span>
          <h2>
            From “what’s next?”
            <br />
            to <em>one step closer.</em>
          </h2>
          <p>
            Build a career rhythm that feels manageable. SkillTrack brings the
            important pieces into focus, so your energy goes into moving
            forward.
          </p>
        </div>
        <div className="landing-feature-list">
          {features.map(({ icon: Icon, number, title, description }) => (
            <article className="landing-feature" key={number}>
              <span className="landing-feature__number">{number}</span>
              <span className="landing-feature__icon">
                <Icon size={19} strokeWidth={1.7} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <ArrowUpRight className="landing-feature__arrow" size={17} />
            </article>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <div>
          <span className="landing-kicker">YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>
            Give your goals a place <em>to grow.</em>
          </h2>
        </div>
        <Link className="landing-button landing-button--light" to="/register">
          Start your workspace <ArrowRight size={16} />
        </Link>
      </section>

      <footer className="landing-footer">
        <Link className="landing-brand" to="/" aria-label="SkillTrack home">
          <span className="landing-brand__mark">S</span>
          <span>
            SkillTrack<small>CAREER MANAGER</small>
          </span>
        </Link>
        <span>One thoughtful step at a time.</span>
        <Link to="/login">
          Already have an account? Sign in <ArrowRight size={13} />
        </Link>
      </footer>
    </main>
  );
}
