import { Image } from 'react-native';
import MinecraftPickaxe from './../../../assets/minecraft-pickaxe.png';
import IconProps from './../../types/IconProps';

const CircleIcon = ({ size, tileset }: IconProps) => (
  <Image source={MinecraftPickaxe} alt="O" style={{
    width: size,
    height: size
  }} />
);

export default CircleIcon;