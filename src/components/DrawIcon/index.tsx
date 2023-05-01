import { Image } from 'react-native';
import IconProps from './../../types/IconProps';
import { getSource } from './../../utils/tileset_utils';

const DrawIcon = ({ size, tileset }: IconProps) => (
  <Image source={getSource('Velha', tileset)} style={{ width: size, height: size }} />
)

export default DrawIcon;