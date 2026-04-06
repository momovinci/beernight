import { useNavigate } from "react-router";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "motion/react";
import { useState } from "react";
import { useGame } from "../contexts/GameContext";

const colors = [
  "#F0A9D1",
  "#CAE64D",
  "#FFB404",
  "#FFFFFF",
];

interface CardProps {
  num: number;
  index: number;
  totalCards: number;
  smoothRotation: MotionValue<number>;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function Card({ num, index, totalCards, smoothRotation, isHovered, onMouseEnter, onMouseLeave, onClick }: CardProps) {
  // Ellipse parameters
  const radiusX = 450; // horizontal radius
  const radiusY = 180; // vertical radius
  
  const cardX = useTransform(smoothRotation, (rot) => {
    const angle = (index / totalCards) * 360 + rot;
    const angleRad = (angle * Math.PI) / 180;
    return Math.cos(angleRad) * radiusX;
  });

  const cardY = useTransform(smoothRotation, (rot) => {
    const angle = (index / totalCards) * 360 + rot;
    const angleRad = (angle * Math.PI) / 180;
    return Math.sin(angleRad) * radiusY;
  });

  const cardScale = useTransform(cardY, (y) => {
    return 0.6 + (y + radiusY) / (radiusY * 3);
  });

  const cardOpacity = useTransform(cardY, (y) => {
    return 0.4 + (y + radiusY) / (radiusY * 2);
  });

  const cardZIndex = useTransform(cardY, (y) => {
    return Math.round(y + 200);
  });

  const finalScale = useTransform(cardScale, (s) => isHovered ? s * 1.2 : s);
  const finalOpacity = isHovered ? 1 : cardOpacity;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        x: cardX,
        y: cardY,
        zIndex: isHovered ? 1000 : cardZIndex,
        scale: finalScale,
        opacity: finalOpacity,
      }}
      transition={{ duration: 0.3 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={onClick}
        className="block w-32 h-48 rounded-2xl flex items-center justify-center text-5xl shadow-xl hover:shadow-2xl transition-all cursor-pointer"
        style={{
          backgroundColor: "#FFFFFF",
          fontFamily: 'Poppins',
          fontWeight: 700,
          color: "#000",
          transform: 'translate(-50%, -50%)',
          border: isHovered ? '4px solid #22c55e' : '2px solid rgba(0,0,0,0.1)',
        }}
      >
        {num}
      </button>
    </motion.div>
  );
}

export default function Theme1Cards() {
  const cards = Array.from({ length: 28 }, (_, i) => i + 1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const dragX = useMotionValue(0);
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 50, damping: 20 });
  const navigate = useNavigate();
  const { selectQuestion, isGameOver, remainingQuestionsCount } = useGame();

  const handleCardClick = () => {
    selectQuestion();
    navigate("/question");
  };

  const handleWheel = (e: React.WheelEvent) => {
    rotation.set(rotation.get() + e.deltaY * 0.05);
  };

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    rotation.set(rotation.get() - offset * 0.3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center overflow-hidden">
      <div className="text-center mb-12 px-4">
        {isGameOver ? (
          <>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-normal">
              🎉 게임 종료!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              모든 28개의 질문을 다 사용했습니다.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              다시 시작하기
            </button>
          </>
        ) : (
          <>
            <div className="inline-block px-4 py-2 border-2 border-gray-400 rounded-full text-gray-600 font-semibold mb-2">
              남은 질문: {remainingQuestionsCount} / 28
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-normal">
              랜덤 질문에 사용될
              <br />
              한 장의 카드를 선택해주세요
            </h1>
          </>
        )}
      </div>

      <div className="relative w-full max-w-6xl h-[600px] flex items-center justify-center">
        {/* Scroll indicator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center z-10">
          <p className="text-green-500 font-bold text-2xl mb-1" style={{ fontFamily: 'cursive' }}>
            Scroll!
          </p>
          <svg
            width="120"
            height="60"
            viewBox="0 0 120 60"
            className="mx-auto"
          >
            <path
              d="M 10 30 Q 60 10, 110 30"
              stroke="#22c55e"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 10 30 L 5 20 M 10 30 L 5 40"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 110 30 L 115 20 M 110 30 L 115 40"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Carousel container */}
        <motion.div
          className="relative w-full h-full cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
        >
          {!isGameOver && cards.map((num, index) => (
            <Card
              key={num}
              num={num}
              index={index}
              totalCards={cards.length}
              smoothRotation={smoothRotation}
              isHovered={hoveredCard === num}
              onMouseEnter={() => setHoveredCard(num)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={handleCardClick}
            />
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-8 text-gray-600">
        <p className="text-sm">마우스 휠이나 드래그로 카드를 돌려보세요</p>
      </div>
    </div>
  );
}
