import type { ReactNode } from "react";
import { profile } from "../data/profile";
import { href } from "../lib/site";
import { Icon } from "./Icon";

export const navItems = [
  { id: "experience", label: "경력" },
  { id: "skills", label: "기술" },
  { id: "projects", label: "개인 프로젝트" },
  { id: "contact", label: "연락처" },
];

export function Header() {
  return (
    <header className="site-header" data-header>
      <div className="container header-inner">
        <a className="brand" href={href("")}>
          <span className="brand-name">{profile.nameKo}</span>
          <span className="brand-role">Full-stack Developer</span>
        </a>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded="false"
          aria-controls="site-nav"
          data-menu-toggle
        >
          <span className="menu-icon-open"><Icon name="menu" size={22} /></span>
          <span className="menu-icon-close"><Icon name="close" size={22} /></span>
          <span className="sr-only">메뉴</span>
        </button>
        <nav id="site-nav" className="site-nav" aria-label="주요 메뉴" data-nav>
          <ul>
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={href(`#${n.id}`)} data-nav-link={n.id}>
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href={href("career/")}>경력기술서</a>
            </li>
          </ul>
          <a className="btn btn-small btn-outline" href={href(profile.resumePdf)} download="">
            <Icon name="download" size={16} />
            이력서 PDF
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ updated }: { updated: string }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {updated.slice(0, 4)} {profile.nameEn}. 최종 수정 {updated}.
        </p>
      </div>
    </footer>
  );
}

export function Page({ children, updated }: { children: ReactNode; updated: string }) {
  return (
    <>
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer updated={updated} />
    </>
  );
}

export function SectionHead({
  no,
  label,
  title,
  lede,
  id,
}: {
  no: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  id: string;
}) {
  return (
    <div className="section-head">
      <p className="eyebrow">
        <span className="eyebrow-no">{no}</span>
        <span aria-hidden="true" className="eyebrow-rule" />
        {label}
      </p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {lede ? <p className="section-lede">{lede}</p> : null}
    </div>
  );
}

export function Tags({ items, label = "사용 기술" }: { items: string[]; label?: string }) {
  return (
    <ul className="tags" aria-label={label}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
