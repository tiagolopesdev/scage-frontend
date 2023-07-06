import { Button, Card, CardContent, Typography } from "@mui/material"
import SelectNewUserIcon from '../../../Assets/render_user.svg'
import CameraIcon from '../../../Assets/camera_icon.svg'
import DeskIcon from '../../../Assets/desk_icon.svg'
import { Icon } from "../../Img"
import { Reorder, useDragControls } from "framer-motion"
import { useState } from "react"
import { IScaleDay } from "../../../@types/IScaleDay"
import { IUser } from "../../../@types/IUser"


interface ICardDay {
  day: IScaleDay
}

export const CardDay = ({ day }: ICardDay) => {

  const controls = useDragControls()

  const [elements, setElements] = useState<IUser[]>(day.peoples);

  const StylePeoplesContent = ({
    display: 'flex',
    margin: '5px 0px',
    padding: '5px 8px 5px 10px',
    alignItems: 'center',
    backgroundColor: 'rgb(217, 217, 217)',
    borderRadius: '10px',
    width: '90%'
  })


  return (
    <Card style={{ width: '280px', height: '280px', margin: '1%' }}>
      <CardContent style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }} >
        <Typography gutterBottom variant="h5" component="div" color='#005AAC'
          style={{
            fontFamily: 'Dosis',
            fontWeight: 'bold'
          }}
        >
          {day?.event.name}
        </Typography>
        <Reorder.Group values={elements}
          onReorder={setElements}
          style={{
            listStyle: "none",
            paddingInlineStart: "0px"
          }}
        >
          {
            elements.map((item, index) => (
              <Reorder.Item
                value={item}
                key={item.id}
              >
                <span>
                  <div style={StylePeoplesContent} onPointerDown={(e) => controls.start(e)}>
                    <div style={{ display: 'flex', width: '100%' }}>
                      <Icon src={index === 2 ? String(DeskIcon) : String(CameraIcon)} style={{ width: '25px' }} />
                      <h2 style={{
                        margin: '0px 40px 0px 10px',
                        fontFamily: 'Dosis',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: '1',
                        WebkitBoxOrient: 'vertical',
                        width: '100%',
                      }}
                      >{item.name}</h2>
                    </div>
                    <div style={{ width: '10%' }}>
                      <Icon src={String(SelectNewUserIcon)} />
                    </div>
                  </div>
                </span>
              </Reorder.Item>
            ))
          }
        </Reorder.Group>
        <Button
          style={{
            backgroundColor: 'rgb(14, 202, 101)',
            borderRadius: '15px',
            fontFamily: 'Dosis',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            padding: '0px',
          }}
          variant="contained"
          size='small'
          onClick={() => { }}
          fullWidth
        >Salvar</Button>
      </CardContent>
    </Card>
  )
}
