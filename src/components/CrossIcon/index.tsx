import { Image } from 'react-native';
import MinecraftSword from './../../../assets/minecraft-sword.png';
import IconProps from './../../types/IconProps';

const CrossIcon = ({ size, tileset }: IconProps) => (
  <Image source={MinecraftSword} alt="X" style={{
    width: size,
    height: size,
  }} />
);

export default CrossIcon;