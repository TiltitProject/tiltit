import BlockMaker from "../components/Block";
import MonsterMaker from "../components/Monster";
import ItemMaker from "../components/Item";
import FlagMaker from "../components/Flag";
import { arrowRight, groundInner } from "../../assets/static";

export const makeBlocks = (world, mapInfo, entity) => {
  const objects = {};

  Array.from(Array(entity.block.renderEntity).keys()).forEach((index) => {
    const objectNum = index + 1;
    const { size } = mapInfo.block[objectNum];
    let blockImage = entity.block.image.row;

    if (size.width > size.height && size.height > entity.gridSize) {
      blockImage = entity.block.image.ground;
    }
    if (size.width === size.height) {
      blockImage = entity.block.image.goldTwice;
    }
    if (size.width < size.height) {
      blockImage = entity.block.image.column;
    }

    if (objectNum === 37) {
      blockImage = groundInner;
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

export const makeMonsters = (world, mapInfo, entity) => {
  const objects = {};

  Array.from(Array(entity.monster.renderEntity).keys()).forEach((index) => {
    const objectNum = index + 1;

    objects[`monster${objectNum}`] = MonsterMaker(
      world,
      mapInfo.monster[objectNum].position,
      mapInfo.monster[objectNum].size,
      entity.monster.specifics[objectNum],
    );
  });

  return objects;
};

export const makeItems = (world, mapInfo, entity) => {
  const objects = {};

  Array.from(Array(entity.item.renderEntity).keys()).forEach((index) => {
    const objectNum = index + 1;

    objects[`item${objectNum}`] = ItemMaker(
      world,
      mapInfo.item[objectNum].position,
      mapInfo.item[objectNum].size,
      entity.item.image,
      objectNum,
    );
  });

  return objects;
};

export const makeFlags = (world, mapInfo, entity) => {
  const objects = {};

  Array.from(Array(entity.flag.number).keys()).forEach((index) => {
    const objectNum = index + 1;
    let { image } = entity.flag;
    if (objectNum === 2) image = arrowRight;

    objects[`flag${objectNum}`] = FlagMaker(
      world,
      mapInfo.flag[objectNum].position,
      mapInfo.flag[objectNum].size,
      image,
      objectNum,
    );
  });

  return objects;
};

export const makeMonster = (
  world,
  mapInfo,
  id,
  image,
  direction,
  speed,
  distance,
) =>
  MonsterMaker(
    world,
    mapInfo.monster[id].position,
    mapInfo.monster[id].size,
    image,
    direction,
    speed,
    distance,
    mapInfo.monster[id].position,
  );
