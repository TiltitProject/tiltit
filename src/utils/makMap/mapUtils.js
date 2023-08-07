import { Dimensions } from "react-native";
import entityInfo from "../../entities/entitiesInfo";

const FLOOR_WIDTH = 32;
const WINDOW_HEIGHT = Dimensions.get("window").height;

export const defineOffset = ({ id, stage }) => {
  if (id === "item" || id === "flag" || id === "special") {
    return entityInfo[stage].gridSize / 2;
  }

  return 0;
};

export const defineHeight = ({ colAndRow, id, stage }) => {
  const propIndex = colAndRow.col.length - 1;
  return (
    (colAndRow.col[propIndex] - colAndRow.col[0] + 1) *
    entityInfo[stage][id].size
  );
};

export const defineWidth = ({ colAndRow, id, stage }) => {
  const propIndex = colAndRow.col.length - 1;

  return (
    (colAndRow.row[propIndex] - colAndRow.row[0] + 1) *
    entityInfo[stage][id].size
  );
};

export const definePositionY = ({ colAndRow, id, stage }) => {
  const margin = FLOOR_WIDTH / 2;

  return (
    -(entityInfo[stage].columnMultiply - 1) * WINDOW_HEIGHT +
    (entityInfo[stage].columnMultiply - 1) * FLOOR_WIDTH +
    margin +
    10 +
    defineOffset({ id, stage }) +
    defineHeight({ colAndRow, id, stage }) / 2 +
    colAndRow.col[0] * entityInfo[stage].gridSize -
    entityInfo[stage].gridSize
  );
};

export const definePositionX = ({ colAndRow, id, stage }) => {
  const margin = FLOOR_WIDTH / 2;

  return (
    margin +
    defineOffset({ id, stage }) +
    defineWidth({ colAndRow, id, stage }) / 2 +
    colAndRow.row[0] * entityInfo[stage].gridSize -
    entityInfo[stage].gridSize
  );
};
