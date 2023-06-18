import { CardDay } from '../../Components/Cards/Day/index';
import { NavBar } from '../../Components/Navbar';
import { UserListFloating } from '../../Components/Users/user-list-floating';
import { ScroolCustom } from '../../Styles';
import { CardDayContainer } from './style';

export const RenderScale = () => {
  return (
    <>
      <NavBar />
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
      <UserListFloating />
    </>
  );
}
