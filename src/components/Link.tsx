import type { AnchorHTMLAttributes } from "react";

const CustomLink = ({
  href,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink || isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};

export default CustomLink;
