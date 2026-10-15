import { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  image2?: string;
  images?: string[]; // optional array for slideshow
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [hovered, setHovered] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Build the full images list
  const allImages = props.images
    ? props.images
    : props.image2
    ? [props.image, props.image2]
    : [props.image];

  const handleMouseEnter = async () => {
    setHovered(true);
    if (allImages.length > 1) {
      intervalRef.current = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % allImages.length);
      }, 1200);
    }
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const handleMouseLeave = () => {
    setIsVideo(false);
    setHovered(false);
    setActiveIdx(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        target="_blank"
        data-cursor={"disable"}
        style={{ position: "relative", display: "block" }}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}

        {/* Render all images stacked; only the active one is visible */}
        {allImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={props.alt}
            style={{
              transition: "opacity 0.5s ease",
              opacity: !hovered ? (i === 0 ? 1 : 0) : i === activeIdx ? 1 : 0,
              position: i === 0 ? "relative" : "absolute",
              top: 0,
              left: 0,
              width: i === 0 ? undefined : "100%",
              height: i === 0 ? undefined : "100%",
              objectFit: "cover",
              maxHeight: "350px",
            }}
          />
        ))}

        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>

      {/* Dot indicators for multi-image projects */}
      {allImages.length > 1 && hovered && (
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "8px" }}>
          {allImages.map((_, i) => (
            <span
              key={i}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: i === activeIdx ? "#c481ff" : "rgba(255,255,255,0.3)",
                transition: "background 0.3s",
                display: "inline-block",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkImage;
