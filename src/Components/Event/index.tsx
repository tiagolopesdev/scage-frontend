import { Icon } from "../Img"
import IconCalendar from "../../Assets/icon_calendar_dark.svg"
import IconClock from "../../Assets/icon_clock_dark.svg"
import { TextStyle } from "./style"
import { motion } from "framer-motion"
import { Checkbox } from "@mui/material"
import { useState } from "react"

export const EventSerf = () => {

  const [isChecked, setIsChecked] = useState(false);

  return <motion.div
    className="box"
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 1.0 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    onClick={() => { setIsChecked(!isChecked) }}
  >
    <div style={{ display: 'flex' }}>
      <div style={{
        backgroundColor: '#4dac79',
        borderRadius: '8px',
        padding: '1px 8px',
        width: '50%',
        margin: '5px 10px'
      }}>
        <TextStyle fontSize={15} isBold={true} >Nome do evento</TextStyle>
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '60%' }}>
          <div style={{ display: 'flex' }}>
            <Icon src={String(IconCalendar)} />
            <TextStyle fontSize={12}>Data</TextStyle>
          </div>
          <div style={{ display: 'flex' }}>
            <Icon src={String(IconClock)} />
            <TextStyle fontSize={12}>Horário</TextStyle>
          </div>
        </div>
      </div>
      <Checkbox checked={isChecked} />
    </div>
  </motion.div>
}
