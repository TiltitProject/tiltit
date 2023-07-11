import { go, filter, map, range } from "fxjs";
import entityInfo from "../entities/entitiesInfo";
import spreadSheet from "../../assets/spreadSheet.json"

const scaffoldEntity = (entityInfo, structure) =>
  go(
    entityInfo,
    Object.entries,
    filter(([_, { number }]) => number),
    map(([k, v]) => [
      v.id,
      go(range(v.number), (numbers) =>
        numbers.reduce(
          (obj, num) => ((obj[`${v.id}${num + 1}`] = structure), obj),
          {},
        ),
      ),
    ]),
    (entries) => entries.reduce((obj, [k, v]) => ((obj[k] = v), obj), {}),
  );

const scaffoldByRowAndCol = (entity) =>
  scaffoldEntity(entity, {
    row: [],
    col: [],
  });

const scaffoldByPosition = (entity) =>
  scaffoldEntity(entity, {
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
  });

export default function applySheet() {
  const scaffoldDataByRowAndCol = scaffoldByRowAndCol(entityInfo[1]);

  go(
    spreadSheet[1],
    Object.entries,
    (object) =>
      object.forEach(([col, rowsObject]) => {
        Object.values(rowsObject).forEach((entity, rowIndex) => {
          if (entity) {
            const [id, ...nums] = entity;
            scaffoldDataByRowAndCol[id][nums.join("")].col.push(col);
            scaffoldDataByRowAndCol[id][nums.join("")].row.push(rowIndex + 1);
          }
        });
      }),
    () => console.log(JSON.stringify(scaffoldDataByRowAndCol)),
  );
}
