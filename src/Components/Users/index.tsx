import { Icon } from "../Img"
import IconUser from "../../Assets/icon_user.svg"
import IconUserEdit from "../../Assets/icon_user_edit.svg"
import IconUserDelete from "../../Assets/icon_user_delete.svg"
import { Card, CardActions, CardContent, IconButton, Typography } from "@mui/material"
import { IUser } from "../../@types/IUser"
import { ManipulationUser } from "./Popover"
import { useState } from "react"

interface IUsersProps {
  users: IUser[];
}

export const User = (usersProps: IUsersProps) => {

  const { users } = usersProps;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const renderUsers = () => {
    return (
      users.map((user, index) => {
        return (
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
                <Icon src={String(IconUser)} style={{ margin: '0px 20px 0px 10px', width: '3rem' }} />
                <div style={{ width: '100%' }} >
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'Dosis',
                      fontWeight: '900',
                      fontSize: 'x-large',
                      lineHeight: '1.1'
                    }}
                  >{user.name}</Typography>
                  <Typography
                    variant="body2"
                    style={{
                      fontFamily: 'Dosis',
                      fontWeight: '600'
                    }}
                  >
                    {user.email}
                  </Typography>
                </div>
                <CardActions>
                  <IconButton
                    aria-describedby={id}
                    onClick={handleClick}
                  >
                    <Icon
                      src={String(IconUserEdit)}
                    />
                  </IconButton>
                  <IconButton>
                    <Icon src={String(IconUserDelete)} />
                  </IconButton>
                </CardActions>
              </CardContent>
            </Card>
        )
      })
    )
  }

  return (
    <>
      {renderUsers()}
      {open ? 
        <ManipulationUser
          id={id}
          anchorEl={anchorEl}
          open={open}
          setAnchorEl={setAnchorEl}
        /> : ''
      }
    </>
  )
}
