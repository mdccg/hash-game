import MarkType from './MarkType';

type CellType = {
  rowPosition: number;
  columnPosition: number;
  mark?: MarkType;
}

export default CellType;