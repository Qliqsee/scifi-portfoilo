import React from "react";
import cx from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { theme } from "@/settings/theme";

interface Props {
  // theme?: any;
  classes?: any;
  audio?: any;
  sounds?: any;
  href?: any;
  target?: any;
  delay?: any;
  className?: any;
  activeClassName?: any;
  children?: any;
  onClick?: any;
  onLinkStart?: any;
  onLinkEnd?: any;
}

const checkURLExternal = /^https?:\/\//;

let globalLinkTimeout: any = null;

const Component = ({
  classes,
  audio,
  sounds,
  href = "",
  target,
  delay,
  className,
  activeClassName = "link-active",
  children,
  onClick,
  onLinkStart,
  onLinkEnd,
  ...etc
}: Props) => {
  const { push } = useRouter();

  const onLinkTrigger = (event: any) => {
    event.preventDefault();

    if (!href) {
      onClick && onClick(event);
      return;
    }

    sounds.click.play();

    // TODO: Add support to recognize when the URL ends with / is the same
    // URL as the one without it.

    const { pathname, search } = window.location;
    const isSame = pathname + search === href;
    const isExternalURL = checkURLExternal.test(href);
    const isOut = !!target;
    const isInternal = !isOut && !isSame;
    const linkProps = { href, isOut, isExternalURL, isSame, isInternal };

    onClick && onClick(event);
    onLinkStart && onLinkStart(event, linkProps);

    const routeChangeStartEvent = new CustomEvent("route-change-start", { detail: linkProps });
    window.dispatchEvent(routeChangeStartEvent);

    if (isSame) {
      return;
    }

    const timeout = delay || theme.animation.time;

    clearTimeout(globalLinkTimeout);
    globalLinkTimeout = setTimeout(() => {
      if (target) {
        window.open(href);
      } else if (isExternalURL) {
        window.location.href = href;
      } else {
        push(href);
      }

      onLinkEnd && onLinkEnd(event, linkProps);

      const routeChangeEndEvent = new CustomEvent("route-change-end", { detail: linkProps });
      window.dispatchEvent(routeChangeEndEvent);
    }, timeout);
  };

  // FIXME: verify this is working

  const pathname = usePathname();

  const linkMatchesURL = pathname?.includes(href);

  return (
    <a {...etc} className={cx(className, linkMatchesURL && activeClassName)} href={href} target={target} onClick={onLinkTrigger}>
      {children}
    </a>
  );
};
Component.displayName = "Link";

export { Component };
