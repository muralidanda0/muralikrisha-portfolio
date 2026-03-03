import { motion } from "framer-motion";
import { useState } from "react";

export default function AICursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <>
      <motion.div
        animate={{ x: pos.x - 150, y: pos.y - 150 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="pointer-events-none fixed top-0 left-0 w-[300px] h-[300px] rounded-full bg-indigo-500/20 blur-3xl z-0"
      />
      <div
        onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
        className="fixed inset-0 z-0"
      />
    </>
  );
}