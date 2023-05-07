import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles/theme';

type HistoryIconProps = {
  opacity?: number;
}

const HistoryIcon = ({ opacity = 1 }: HistoryIconProps) => (
  <Icon
    name="history"
    size={32}
    color={theme.colors.background}
    style={{ opacity }} />
);

export default HistoryIcon;