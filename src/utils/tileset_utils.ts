import { ImageSourcePropType } from 'react-native';
import DefaultCircle from './../../assets/default-circle.png';
import DefaultCross from './../../assets/default-cross.png';
import DefaultDraw from './../../assets/default-draw.png';
import MinecraftBabyZombie from './../../assets/minecraft-baby-zombie.png';
import MinecraftHerobrineFace from './../../assets/minecraft-herobrine-face.png';
import MinecraftNetheriteSword from './../../assets/minecraft-netherite-sword.png';
import TSILeandro from './../../assets/tsi-leandro.png';
import TSISidney from './../../assets/tsi-sidney.png';
import TSIVelha from './../../assets/tsi-velha.png';
import MatchResultType from './../types/MatchResultType';
import TilesetType from './../types/TilesetType';

export const getSource = (matchResult: MatchResultType, tileset: TilesetType): ImageSourcePropType => {
  switch(tileset) {
    case 'Padrão':
      switch(matchResult) {
        case 'X':
          return DefaultCross;
        
        case 'O':
          return DefaultCircle;
        
        case 'Velha':
          return DefaultDraw;
      }

    case 'Minecraft':
      switch(matchResult) {
        case 'X':
          return MinecraftNetheriteSword;

        case 'O':
          return MinecraftHerobrineFace;
        
        case 'Velha':
          return MinecraftBabyZombie;
      }

    case 'TSI':
      switch(matchResult) {
        case 'X':
          return TSILeandro;

        case 'O':
          return TSISidney;

        case 'Velha':
          return TSIVelha;
      }
  }
}