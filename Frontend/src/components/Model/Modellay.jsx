import React,{ useState } from 'react';

import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const handleOutsideClick = (e) => {
    if (e.target.classList.contains("m-backscreen")) {
      onClose(); // Close modal if clicked outside
    }
  };

const Modellay = ({handleclose,content,name}) => {
  return (
    <div className="m-backscreen z-50 absolute left-0 top-0 w-full h-screen" onClick={handleOutsideClick} >  
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="m-model !h-[469px] overflow-y-auto"
        // onClick={(e) => e.stopPropagation()}
      >
        <div className="h2 text-white">
          {name}
          <span>
            <CloseIcon onClick={handleclose} />
          </span>
        </div>

       {content}

      </motion.div>
    </div>
  )
}

export default Modellay


