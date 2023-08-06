import { Icon } from "../Img"
import CalendarIcon from "../../Assets/icon-calendar.svg"
import { Badge, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material"
import { IUser } from "../../@types/IUser"
import { Dispatch, useState } from "react"
import { ContainerBadgeStyle, GroupFieldStyle } from "./style"
import EyeScaleIcon from '../../Assets/icon_eye_scale.svg'

interface IUsersProps {
  user?: IUser,
  setUserWasManipuled: Dispatch<React.SetStateAction<boolean>>,
  onDelete: (user: IUser) => Promise<void>
}

export const Scale = (usersProps: IUsersProps) => {

  const { user, setUserWasManipuled, onDelete } = usersProps;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [userManipulation, setUserManipulation] = useState<IUser>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
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
            <div>
              <Typography
                variant="h6"
                style={{
                  fontFamily: 'Dosis',
                  fontWeight: '900',
                  fontSize: 'x-large',
                  lineHeight: '1.1'
                }}
              >Dezembro</Typography>
              <Typography
                variant="body2"
                style={{
                  fontFamily: 'Dosis',
                  fontWeight: '600'
                }}
              >
                10 transmissões
              </Typography>
            </div>
            <ContainerBadgeStyle>
              <Badge
                style={{ width: '100%' }}
                badgeContent={'Concluído'}
                color="primary"
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
                setUserManipulation(user)
              }}
            >
              <Icon style={{ width: '25px' }} src={String(EyeScaleIcon)} />
            </IconButton>
          </CardActions>
        </CardContent>
      </Card>
    </>
  )
}
