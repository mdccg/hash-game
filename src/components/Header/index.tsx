import { HeaderWrapper } from './styles';

type HeaderProps = {
  children?: JSX.Element[];
}

const Header = ({ children }: HeaderProps) => {
  return (
    <HeaderWrapper>
      {children}
    </HeaderWrapper>
  );
}

export default Header;