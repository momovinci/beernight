import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useGame } from "../contexts/GameContext";


export default function Theme1Question() {
  const navigate = useNavigate();
  const { currentQuestion, currentRespondents } = useGame();
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // currentQuestion이 없으면 cards 페이지로 리다이렉트
    if (!currentQuestion) {
      navigate("/");
      return;
    }
  }, [currentQuestion, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentQuestion]);

  if (!currentQuestion || !currentRespondents) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-5xl w-full -mt-20">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          목록으로
        </button>

        {/* Card Flip Animation */}
        <div className="perspective-1000 mb-12">
          <motion.div
            className="relative w-full h-[400px]"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front of card */}
            <div
              className="absolute inset-0 rounded-3xl flex items-center justify-center text-9xl shadow-2xl backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                backgroundColor: "#FFFFFF",
                fontFamily: "Poppins",
                fontWeight: 700,
                color: "#000",
                border: "4px solid #22c55e",
              }}
            >
              {currentQuestion.id}
            </div>

            {/* Back of card */}
            <div
              className="absolute inset-0 rounded-3xl p-12 flex items-center justify-center shadow-2xl backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                backgroundColor: "#FFFFFF",
                border: "4px solid #22c55e",
              }}
            >
              <h2
                className="text-4xl text-center leading-tight"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  color: "#000",
                }}
              >
                {currentQuestion.text}
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Respondents */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isFlipped ? 1 : 0,
            y: isFlipped ? 0 : 30,
          }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="text-2xl mb-6 text-gray-900 font-semibold">
            답변자
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {currentRespondents.map((respondent, index) => (
              <motion.div
                key={respondent.id}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
                }}
                initial={{
                  opacity: 0,
                  x: index === 0 ? -30 : 30,
                }}
                animate={{
                  opacity: isFlipped ? 1 : 0,
                  x: isFlipped ? 0 : index === 0 ? -30 : 30,
                }}
                transition={{
                  delay: 1 + index * 0.2,
                  duration: 0.5,
                }}
              >
                <div className="flex items-center gap-4">
                  <ImageWithFallback
                    src={respondent.photo}
                    alt={respondent.name}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-gray-900">
                      {respondent.name}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}