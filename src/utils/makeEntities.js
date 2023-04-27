import BlockMaker from "../components/Block";
import MonsterMaker from "../entities/utils/makeMonster";
import FlagMaker from "../components/Flag";
import { arrowRight, groundInner } from "../../assets/static";
import MakeBoss from "../components/BossMonster";
import AttackMaker from "../components/Attack";

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

export const makeBossMonster = (world, mapInfo, entity) => {
  const objects = {};

  Array.from(Array(entity.boss.number).keys()).forEach((index) => {
    const objectNum = index + 1;

    objects[`boss${objectNum}`] = MakeBoss(
      world,
      mapInfo.boss[objectNum].position,
      mapInfo.boss[objectNum].size,
      entity.boss.specifics[objectNum],
      objectNum,
    );
  });

  return objects;
};

export const makeMonsters = (world, mapInfo, entity) => {
  const objects = {};

  Array.from(Array(entity.monster.number).keys()).forEach((index) => {
    const objectNum = index + 1;

    objects[`monster${objectNum}`] = MonsterMaker(
      world,
      mapInfo.monster[objectNum].position,
      mapInfo.monster[objectNum].size,
      entity.monster.specifics[objectNum],
      objectNum,
    );
  });

  return objects;
};

export const makeAttacks = (world, mapInfo, entity) => {
  const objects = {};

  Array.from(Array(entity.attack.number).keys()).forEach((index) => {
    const objectNum = index + 1;

    objects[`attack${objectNum}`] = AttackMaker(
      world,
      mapInfo.attack[objectNum].position,
      mapInfo.attack[objectNum].size,
      entity.attack.specifics[objectNum],
      objectNum,
    );
  });

  return objects;
};

export const makeFlags = (world, mapInfo, entity) => {
  const objects = {};
  if (entity.flag.number) {
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
  }
};
