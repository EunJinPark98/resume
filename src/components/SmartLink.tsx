import type { ReactNode } from "react";
import { href, isExternal } from "../lib/site";
import { Icon } from "./Icon";

interface Props {
  to: string;
  children: ReactNode;
  className?: string;
  /** 외부 링크 화살표 표시 여부 */
  arrow?: boolean;
  download?: boolean;
  ariaLabel?: string;
}

/** base 경로 처리 + 외부 링크는 새 탭(스크린리더 안내 포함). */
export function SmartLink({ to, children, className, arrow = true, download, ariaLabel }: Props) {
  const external = isExternal(to);
  return (
    <a
      href={href(to)}
      className={className}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: "" } : {})}
    >
      {children}
      {external && arrow ? <Icon name="arrow-up-right" size={14} /> : null}
      {external ? <span className="sr-only"> (새 탭에서 열림)</span> : null}
    </a>
  );
}
