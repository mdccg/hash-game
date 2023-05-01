import { Image } from 'react-native';
import IconProps from './../../types/IconProps';
import { getSource } from './../../utils/tileset_utils';

const CrossIcon = ({ size, tileset }: IconProps) => (
  <Image source={getSource('X', tileset)} alt="X" style={{
    width: size,
    height: size,
  }} />
);

export default CrossIcon;