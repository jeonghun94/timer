import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Card = ({ chirdren }: any) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prevVisible) => !prevVisible);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {chirdren}
    </motion.div>
  );
};

export default Card;
