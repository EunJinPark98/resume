import "../styles/main.css";

/**
 * 정적 HTML 위에 얹는 최소한의 상호작용.
 * JS가 없어도 모든 콘텐츠와 링크는 그대로 동작한다.
 */

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── 모바일 메뉴 ─────────────────────────────── */
const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
const nav = document.querySelector<HTMLElement>("[data-nav]");

function setMenu(open: boolean) {
  if (!toggle || !nav) return;
  toggle.setAttribute("aria-expanded", String(open));
  root.classList.toggle("menu-open", open);
}

toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
nav?.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).closest("a")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && root.classList.contains("menu-open")) {
    setMenu(false);
    toggle?.focus();
  }
});
window.matchMedia("(min-width: 960px)").addEventListener("change", () => setMenu(false));

/* ── 스크롤 등장 효과 (모션 최소화 설정 존중) ───── */
const revealTargets = document.querySelectorAll<HTMLElement>("[data-reveal]");
if (!reduceMotion && "IntersectionObserver" in window) {
  // 레이아웃을 먼저 읽고(강제 리플로 방지) 그다음 클래스를 바꾼다
  const vh = window.innerHeight;
  const inView = [...revealTargets].map((el) => el.getBoundingClientRect().top < vh);
  root.classList.add("can-reveal");
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  revealTargets.forEach((el, i) => {
    // 이미 화면 위쪽에 있는 요소(앵커 이동 등)는 바로 보여 준다
    if (inView[i]) el.classList.add("is-visible");
    else io.observe(el);
  });
}

/* ── 현재 섹션 메뉴 표시 ─────────────────────── */
const navLinks = new Map<string, HTMLAnchorElement>();
document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]").forEach((a) => navLinks.set(a.dataset.navLink!, a));
const sections = [...navLinks.keys()]
  .map((id) => document.getElementById(id)?.closest("section"))
  .filter((s): s is HTMLElement => !!s);

if (sections.length && "IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.getAttribute("aria-labelledby");
        navLinks.forEach((a, key) => {
          if (key === id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((s) => spy.observe(s));
}

/* ── 헤더 구분선 ─────────────────────────────── */
const header = document.querySelector<HTMLElement>("[data-header]");
const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ── 이메일 복사 ─────────────────────────────── */
document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const label = btn.querySelector<HTMLElement>("[data-copy-label]");
    try {
      await navigator.clipboard.writeText(btn.dataset.copy!);
      if (label) label.textContent = "복사됨";
    } catch {
      if (label) label.textContent = "복사 실패";
    }
    window.setTimeout(() => label && (label.textContent = "복사"), 2000);
  });
});

/* ── 인쇄 ────────────────────────────────────── */
document.querySelector("[data-print]")?.addEventListener("click", () => window.print());
window.addEventListener("beforeprint", () => {
  document.querySelectorAll("details").forEach((d) => d.setAttribute("open", ""));
});

/* ── 경력 기간: 빌드 이후에도 오늘 기준으로 갱신 ─── */
document.querySelectorAll<HTMLElement>("[data-tenure-since]").forEach((el) => {
  const [y, m] = el.dataset.tenureSince!.split("-").map(Number);
  const now = new Date();
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  el.textContent = years === 0 ? `${rest}개월` : rest === 0 ? `${years}년` : `${years}년 ${rest}개월`;
});
