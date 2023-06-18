import { Button } from '@mui/material';
import { CardDay } from '../../Components/Cards/Day/index';
import { NavBar } from '../../Components/Navbar';
import { UserListFloating } from '../../Components/Users/user-list-floating';
import { ScroolCustom } from '../../Styles';
import { CardDayContainer } from './style';

export const RenderScale = () => {
  return (
    <>
      <NavBar />
      <div>
        <CardDayContainer>
          <ScroolCustom
            style={{
              margin: '0% 25rem 2% 2%',
              display: 'flex',
              flexWrap: 'wrap',
              right: '40%'
            }}
          >
            <CardDay />
            <CardDay />
            <CardDay />
            <CardDay />
            <CardDay />
            <CardDay />
          </ScroolCustom>
        </CardDayContainer>
        <div
          style={{
            position: 'absolute',
            bottom: '0px',
            backgroundColor: '#CBCBCB',
            width: '100%',
            boxShadow: '0px -6px 15px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div
            style={{
              padding: '20px',
              display: 'flex',
              maxWidth: '60%'
            }}
          >
            <Button
              style={{
                borderRadius: '12px',
                fontFamily: 'Dosis',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: 'rgb(14, 202, 101)',
                margin: '0% 2% 0% 3%'
              }}
              variant="contained"
              size='small'
            fullWidth
            >Gerar nova escala</Button>
            <Button
              style={{
                borderRadius: '12px',
                fontFamily: 'Dosis',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: 'rgb(14, 202, 101)',
                margin: '0% 3% 0% 3%'
              }}
              variant="contained"
              size='small'
            fullWidth
            >Adicionar novo dia</Button>
            <Button
              style={{
                borderRadius: '12px',
                fontFamily: 'Dosis',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#30B2DB',
                margin: '0% 3% 0% 3%'
              }}
              variant="contained"
              size='small'
            fullWidth
            >Exportar escala em PDF</Button>
          </div>
        </div>
      </div>
      <UserListFloating />
    </>
  );
}
