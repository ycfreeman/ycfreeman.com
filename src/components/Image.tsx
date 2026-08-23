import type { CSSProperties, ImgHTMLAttributes } from "react";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | { src: string };
  fill?: boolean;
};

const fillStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};

const Image = ({ src, fill, style, alt = "", ...rest }: ImageProps) => (
  <img
    alt={alt}
    src={typeof src === "string" ? src : src.src}
    style={fill ? { ...fillStyle, ...style } : style}
    {...rest}
  />
);

export default Image;
