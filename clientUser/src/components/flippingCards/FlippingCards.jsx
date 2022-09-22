import "./FlippingCards.css"
import { motion } from "framer-motion"
import { useState } from "react"
import { WarningAmber, PushPin, NotificationsActive, LocationOn, DocumentScanner } from '@mui/icons-material';

    const FlippingCards = () => {

        const [isOpen1, setIsOpen1] = useState(false);
        const [isOpen2, setIsOpen2] = useState(false);
        const [isOpen3, setIsOpen3] = useState(false);
        const [isOpen4, setIsOpen4] = useState(false);

      return (
        <div className="cardContainer">
            <motion.div 
            transition={{layout:{duration: 1, type: "spring"}}}
            layout 
            onClick={()=> 
            setIsOpen1(!isOpen1)} 
            className="card">
                <motion.h2 layout="position"> Advisory <PushPin/></motion.h2>
                {isOpen1 && (<motion.div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
                </motion.div>)}
            </motion.div>

            <motion.div 
            transition={{layout:{duration: 1, type: "spring"}}}
            layout 
            onClick={()=> 
            setIsOpen2(!isOpen2)} 
            className="card">
                <motion.h2> Important Reminder <NotificationsActive/></motion.h2>
                {isOpen2 && (<motion.div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
                </motion.div>)}
            </motion.div>

            <motion.div 
            transition={{layout:{duration: 1, type: "spring"}}}
            layout 
            onClick={()=> 
            setIsOpen4(!isOpen4)} 
            className="card">
                <motion.h2> Rules and Regulation <DocumentScanner/></motion.h2>
                {isOpen4 && (<motion.div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the </p>
                </motion.div>)}
            </motion.div>
        </div>
      )
    }
    
    export default FlippingCards