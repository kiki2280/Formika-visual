import brick1 from "@assets/image_18_1781690507676.png";
import brick2 from "@assets/image_22_1781690507676.png";
import brick3 from "@assets/image_23_1781690507677.png";
import brick4 from "@assets/image_24_1781690507677.png";
import brick5 from "@assets/image_24-1_1781690507677.png";
import brick6 from "@assets/image_24-2_1781690507677.png";

const BRICKS = [
  { src: brick1, top: "6%",  left: "3%",   size: 104, rotate: -12, floatX: 18,  floatY: 22, duration: 13, delay: 0 },
  { src: brick4, top: "4%",  left: "40%",  size: 70,  rotate: 15,  floatX: -14, floatY: 18, duration: 11, delay: 0.6 },
  { src: brick2, top: "3%",  left: "89%",  size: 88,  rotate: -8,  floatX: -20, floatY: 16, duration: 15, delay: 1 },
  { src: brick6, top: "18%", left: "92%",  size: 76,  rotate: 20,  floatX: 16,  floatY: 24, duration: 12, delay: 1.5 },
  { src: brick5, top: "22%", left: "20%",  size: 62,  rotate: 8,   floatX: 12,  floatY: 14, duration: 10, delay: 0.3 },
  { src: brick3, top: "30%", left: "2%",   size: 96,  rotate: -20, floatX: 20,  floatY: 20, duration: 14, delay: 0.9 },
  { src: brick1, top: "34%", left: "70%",  size: 58,  rotate: 12,  floatX: -16, floatY: 18, duration: 11, delay: 2 },
  { src: brick4, top: "44%", left: "95%",  size: 84,  rotate: -15, floatX: -18, floatY: 22, duration: 13, delay: 0.4 },
  { src: brick6, top: "48%", left: "8%",   size: 72,  rotate: 25,  floatX: 14,  floatY: 16, duration: 12, delay: 1.2 },
  { src: brick2, top: "52%", left: "46%",  size: 60,  rotate: -5,  floatX: 18,  floatY: 24, duration: 15, delay: 1.7 },
  { src: brick5, top: "60%", left: "90%",  size: 90,  rotate: 8,   floatX: -20, floatY: 18, duration: 14, delay: 0.7 },
  { src: brick3, top: "64%", left: "26%",  size: 64,  rotate: -18, floatX: 12,  floatY: 14, duration: 10, delay: 2.2 },
  { src: brick1, top: "72%", left: "4%",   size: 98,  rotate: 16,  floatX: 16,  floatY: 22, duration: 13, delay: 0.5 },
  { src: brick4, top: "76%", left: "66%",  size: 66,  rotate: -22, floatX: -14, floatY: 20, duration: 11, delay: 1.4 },
  { src: brick2, top: "82%", left: "94%",  size: 80,  rotate: 10,  floatX: -18, floatY: 16, duration: 15, delay: 0.2 },
  { src: brick6, top: "86%", left: "14%",  size: 70,  rotate: -10, floatX: 18,  floatY: 24, duration: 12, delay: 1.9 },
  { src: brick5, top: "90%", left: "48%",  size: 58,  rotate: 18,  floatX: 14,  floatY: 18, duration: 10, delay: 0.8 },
  { src: brick3, top: "93%", left: "82%",  size: 86,  rotate: -14, floatX: -16, floatY: 22, duration: 14, delay: 1.6 },
];

export default function FloatingBricks() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {BRICKS.map((brick, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: brick.top,
            left: brick.left,
            width: brick.size,
            height: brick.size,
            backgroundImage: `url(${brick.src})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "drop-shadow(0 4px 16px rgba(255, 106, 0, 0.45)) drop-shadow(0 0 32px rgba(255, 106, 0, 0.18))",
            opacity: 0.55,
            contain: "layout size style",
            transform: `rotate(${brick.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}
