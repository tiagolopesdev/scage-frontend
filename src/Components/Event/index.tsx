import { Icon } from "../Img"
import IconCalendar from "../../Assets/icon_calendar_dark.svg"
import IconClock from "../../Assets/icon_clock_dark.svg"
import { TextStyle } from "./style"

export const EventSerf = () => {

  return <div style={{
    backgroundColor: '#5DC58D',
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
}
