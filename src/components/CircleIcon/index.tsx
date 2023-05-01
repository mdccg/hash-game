import { Image } from 'react-native';
import { getSource } from './../../utils/tileset_utils';
import IconProps from './../../types/IconProps';

const CircleIcon = ({ size, tileset }: IconProps) => (
  <Image source={getSource('O', tileset)} alt="O" style={{
    width: size,
    height: size
  }} />
);

export default CircleIcon;