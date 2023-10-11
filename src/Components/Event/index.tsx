import { Icon } from "../Img"
import IconCalendar from "../../Assets/icon_calendar_dark.svg"
import IconClock from "../../Assets/icon_clock_dark.svg"
import { InformationContainerStyle, InformationGroupStyle, InformationStyle, TextStyle } from "./style"
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
      <InformationContainerStyle>
        <TextStyle fontSize={15} isBold={true} >Nome do evento</TextStyle>
        <InformationGroupStyle>
          <InformationStyle>
            <Icon src={String(IconCalendar)} />
            <TextStyle fontSize={12}>Data</TextStyle>
          </InformationStyle>
          <InformationStyle>
            <Icon src={String(IconClock)} />
            <TextStyle fontSize={12}>Horário</TextStyle>
          </InformationStyle>
        </InformationGroupStyle>
      </InformationContainerStyle>
      <Checkbox checked={isChecked} />
    </div>
  </motion.div>
}
