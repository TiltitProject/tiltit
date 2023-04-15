import BlockMaker from "../components/Block";
import MonsterMaker from "../components/Monster";
import makeMap from "./makeMap";

export const makeBlocks = (world, mapInfo, entity) => {
  const objects = {};

  Array.from(Array(entity.block.number).keys()).forEach((index) => {
    const objectNum = index + 1;
    const { size } = mapInfo.block[objectNum];
    let blockImage = "brownRow";

    if (size.width === size.height) {
      if (size.width === entity.gridSize) {
        blockImage = "gold";
      } else {
        blockImage = "goldTwice";
      }
    }
    if (size.width < size.height) {
      blockImage = "brownColumn";
    }

    objects[`block${objectNum}`] = BlockMaker(
      world,
      mapInfo.block[objectNum].position,
      mapInfo.block[objectNum].size,
      blockImage,
    );
  });

  return objects;
};

export const makeMonsters = (world, mapInfo, entity, image) => {
  const objects = {};

  Array.from(Array(entity.monster.number).keys()).forEach((index) => {
    const objectNum = index + 1;

    objects[`monster${objectNum}`] = MonsterMaker(
      world,
      mapInfo.monster[objectNum].position,
      mapInfo.monster[objectNum].size,
      image,
    );
  });


  return objects;
};
