import { Icon } from "../Img"
import CalendarIcon from "../../Assets/icon-calendar.svg"
import { Badge, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import { ContainerBadgeStyle, GroupFieldStyle } from "./style"
import EyeScaleIcon from '../../Assets/icon_eye_scale.svg'
import { ISingleScale } from "../../@types/ISingleScale"

interface IUsersProps {
  scale?: ISingleScale
}

export const Scale = (scalesProps: IUsersProps) => {

  const { scale } = scalesProps;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div id={id}>
      <Card
        style={{
          borderRadius: '15px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(0, 0, 0, 0.1) 0px 2px 4px',
          marginTop: '10px'
        }}
      >
        <CardContent
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.2rem'
          }}
        >
          <Icon src={String(CalendarIcon)} style={{ margin: '0px 20px 0px 10px', width: '2rem' }} />
          <GroupFieldStyle>
            <div style={{ width: '100%' }}>
              <Typography
                variant="h6"
                style={{
                  fontFamily: 'Dosis',
                  fontWeight: '900',
                  fontSize: 'x-large',
                  lineHeight: '1.1'
                }}
              >{scale?.name}</Typography>
              <Typography
                variant="body2"
                style={{
                  fontFamily: 'Dosis',
                  fontWeight: '600',
                }}
              >
                {`${scale?.transmissions} transmissões`}
              </Typography>
            </div>
            <ContainerBadgeStyle>
              <Badge
                style={{ width: '100%' }}
                badgeContent={scale?.status === 'IN_PROGRESS' ? 'Em progresso' : 'Concluído'}
                color={scale?.status === 'IN_PROGRESS' ? 'primary' : 'success'}
              />
            </ContainerBadgeStyle>
          </GroupFieldStyle>
          <CardActions style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <IconButton
              aria-describedby={id}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                handleClick(event)
                // setUserManipulation(user)
              }}
            >
              <Icon style={{ width: '25px' }} src={String(EyeScaleIcon)} />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  )
}
