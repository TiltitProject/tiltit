import { go, filter, map, range } from "fxjs";
import entityInfo from "../../entities/entitiesInfo";
import spreadSheet from "../../../assets/spreadSheet.json";
import {
  defineHeight,
  defineWidth,
  definePositionY,
  definePositionX,
} from "./mapUtils";

const scaffoldEntity = (entities, structure) =>
  go(
    entities,
    Object.entries,
    filter(([_, { number }]) => number),
    map(([k, v]) => [
      k,
      go(range(v.number), (numbers) =>
        numbers.reduce(
          (obj, num) => ((obj[`${num + 1}`] = structure()), obj),
          {},
        ),
      ),
    ]),
    (entries) => entries.reduce((obj, [k, v]) => ((obj[k] = v), obj), {}),
  );

const makeRowAndColumn = () => ({
  row: [],
  col: [],
});

const makePosition = () => ({
  position: {
    x: 0,
    y: 0,
  },
  size: {
    width: 0,
    height: 0,
  },
});

const makeTwoDepthEntry = (spreadsheet) =>
  go(
    spreadsheet,
    Object.entries,
    map(([colIndex, rowsObject]) => [colIndex, Object.entries(rowsObject)]),
  );

const applySheetColAndRow = (stage) => {
  const scaffoldByRowAndCol = scaffoldEntity(
    entityInfo[stage],
    makeRowAndColumn,
  );

  const filteredEntity = go(
    entityInfo[stage],
    Object.entries,
    filter(([_, { number }]) => number),
  );

  const findKeyOfId = (id) => {
    let result = null;
    filteredEntity.forEach(([key, info]) => {
      if (info.id === id) result = key;
    });

    return result;
  };

  return go(
    makeTwoDepthEntry(spreadSheet[stage]),
    (obj) =>
      obj.forEach(([colIndex, rowEntries]) => {
        rowEntries.forEach(([rowIndex, entity]) => {
          if (entity) {
            const [id, ...num] = entity;
            scaffoldByRowAndCol[findKeyOfId(id)][num.join("")].col.push(
              colIndex,
            );
            scaffoldByRowAndCol[findKeyOfId(id)][num.join("")].row.push(
              rowIndex,
            );
          }
        });
      }),
    () => scaffoldByRowAndCol,
  );
};

const mapInfoFromColAndRow = (stage) => {
  const scaffoldByPosition = scaffoldEntity(entityInfo[stage], makePosition);

  return go(
    makeTwoDepthEntry(applySheetColAndRow(stage)),
    (obj) =>
      obj.forEach(([id, entitiesNum]) => {
        entitiesNum.forEach(([num, colAndRow]) => {
          const height = defineHeight({ colAndRow, id, stage });
          const width = defineWidth({ colAndRow, id, stage });
          const y = definePositionY({ colAndRow, id, stage });
          const x = definePositionX({ colAndRow, id, stage });

          scaffoldByPosition[id][num].size.height = height;
          scaffoldByPosition[id][num].size.width = width;
          scaffoldByPosition[id][num].position.x = x;
          scaffoldByPosition[id][num].position.y = y;
        });
      }),
    () => scaffoldByPosition,
  );
};

export default mapInfoFromColAndRow;
