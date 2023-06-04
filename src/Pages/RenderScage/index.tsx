import { CardDay } from '../../Components/Cards/Day';
import { NavBar } from '../../Components/Navbar';
import { UserListFloating } from '../../Components/Users/user-list-floating';

export const RenderScale = () => {
  return (
    <>
      <NavBar />      
      <div
        style={{
          margin: '1%',
          position: 'fixed',
          left: '0'
        }}
      >
        <div
          style={{
            margin: '0% 25rem 2% 2%',
            display: 'flex',
            flexWrap: 'wrap',
            scrollBehavior: 'smooth',
            overflowY: 'scroll',
            right: '40%',
            height: '37rem'
          }}
        >
          <CardDay />
          <CardDay />
          <CardDay />
          <CardDay />
          <CardDay />
          <CardDay />
          <CardDay />
          <CardDay />
          <CardDay />
        </div>
      </div>
      <UserListFloating />
    </>
  );
}
