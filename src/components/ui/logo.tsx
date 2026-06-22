import Image from "next/image";

interface Props {
  width?: number;
  height?: number;
  inverted?: boolean;
  className?: string;
  priority?: boolean;
}

export default function Logo({
  width = 80,
  height = 40,
  inverted = false,
  className = "",
  priority = false,
}: Props) {
  return (
    <Image
      src="/images/logo/logo_red.png"
      alt="WiseTrip"
      width={width}
      height={height}
      style={{ width: "auto", height: "auto", display: "block" }}
      className={`object-contain ${inverted ? "brightness-0 invert" : ""} ${className}`}
      priority={priority}
    />
  );
}
