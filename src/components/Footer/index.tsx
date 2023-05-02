import { FooterWrapper } from './styles';

type FooterProps = {
  children?: JSX.Element;
}

const Footer = ({ children }: FooterProps) => {

  return (
    <FooterWrapper>
      {children}
    </FooterWrapper>
  );
}

export default Footer;