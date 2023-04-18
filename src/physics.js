import Matter from "matter-js";
import { Dimensions } from "react-native";
import entityInfo from "./entities/entitiesInfo";
import makeMapInfo from "./utils/makeMap";
import stageSheet from "../assets/stageSheet.json";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;
const GAME_WIDTH = WINDOW_WIDTH - FLOOR_WIDTH;

let translateMapY = false;
let translateMapX = false;
let movedHeight = 0;
let movedWidth = 0;
const stage = 2;
const mapInfo = makeMapInfo(stageSheet[stage], entityInfo[stage]);
const goalPosition = mapInfo.goal[1]?.position;
const goalWidth = mapInfo.goal[1]?.size.width;
const monsterNumber = entityInfo[stage].monster.number;
const monsterArray = Array.from(Array(monsterNumber).keys());
const itemNumber = entityInfo[stage].item.number;
const itemArray = Array.from(Array(itemNumber).keys());
const blockNumber = entityInfo[stage].block.renderNum;
const blockArray = Array.from(Array(blockNumber).keys());
const firstBlocksNum = entityInfo[stage].block.firstBlocks;
const firstBlockArray = Array.from(Array(firstBlocksNum).keys());

export default function Physics(entities, { touches, dispatch }) {
  const { engine, world } = entities.physics;
  const player = entities.player.body;

  Matter.Engine.update(engine);
  engine.timing.delta = 1 / 80;
  touches.filter((touch) => {
    if (touch.type === "press") {
      dispatch({ type: "pause" });
    }
  });

  if (
    goalPosition &&
    player.position.x > goalPosition.x - goalWidth / 2 &&
    player.position.x < goalPosition.x + goalWidth / 2 &&
    player.position.y > goalPosition.y - goalWidth / 2 &&
    player.position.y < goalPosition.y + goalWidth / 2
  ) {
    dispatch({ type: "clear" });
  }

  const flagNumber = entityInfo[stage].flag.number;
  const flagArray = Array.from(Array(flagNumber).keys());

  if (translateMapX) {
    if (movedWidth > -GAME_WIDTH) {
      movedWidth -= 5;

      Matter.Body.setVelocity(entities.player.body, {
        x: 0,
        y: 0,
      });

      Matter.Body.translate(entities.player.body, { x: -5, y: 0 });

      blockArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`block${entityNum + 1}`].body, {
          x: -5,
          y: 0,
        });
      });

      flagArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`flag${entityNum + 1}`].body, {
          x: -5,
          y: 0,
        });
      });

      monsterArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`monster${entityNum + 1}`].body, {
          x: -5,
          y: 0,
        });
      });

      itemArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`item${entityNum + 1}`].body, {
          x: -5,
          y: 0,
        });
      });
    } else {
      translateMapX = false;
      movedWidth = 0;
    }
  }

  if (translateMapY) {
    if (movedHeight < GAME_HEIGHT) {
      movedHeight += 10;

      Matter.Body.setVelocity(entities.player.body, {
        x: 0,
        y: 0,
      });

      Matter.Body.translate(entities.player.body, { x: 0, y: 10 });

      blockArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`block${entityNum + 1}`].body, {
          x: 0,
          y: 10,
        });
      });

      flagArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`flag${entityNum + 1}`].body, {
          x: 0,
          y: 10,
        });
      });

      monsterArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`monster${entityNum + 1}`].body, {
          x: 0,
          y: 10,
        });
      });

      itemArray.forEach((entityNum) => {
        Matter.Body.translate(entities[`item${entityNum + 1}`].body, {
          x: 0,
          y: 10,
        });
      });
    } else {
      firstBlockArray.forEach((entityNum) => {
        Matter.Body.setPosition(entities[`block${entityNum + 1}`].body, {
          x: mapInfo.block[entityNum + 39].position.x,
          y: mapInfo.block[entityNum + 39].position.y + movedHeight,
        });
      });
      translateMapY = false;
      movedHeight = 0;
    }
  }

  Matter.Events.on(engine, "collisionStart", () => {
    itemArray.forEach((num) => {
      const item = entities[`item${num + 1}`].body;
      const get = Matter.Collision.collides(entities.player.body, item);

      if (get) {
        dispatch({ type: "get_item", payload: num + 1 });
        Matter.World.remove(world, item);
      }
    });

    const flag1 = entities.flag1.body;
    const arrivedFlag1 = Matter.Collision.collides(entities.player.body, flag1);

    const flag2 = entities.flag2.body;
    const arrivedFlag2 = Matter.Collision.collides(entities.player.body, flag2);

    if (arrivedFlag2) {
      translateMapX = true;
      Matter.World.remove(world, flag2);
    }

    if (arrivedFlag1) {
      translateMapY = true;
      Matter.World.remove(world, flag1);
    }

    monsterArray.forEach((num) => {
      const monster = `monster${num + 1}`;
      const collision = Matter.Collision.collides(
        entities.player.body,
        entities[monster].body,
      );
      if (collision) {
        dispatch({ type: "game_over" });
      }
    });
  });

  // const blocks = BLOCK_STAGE_1.forEach((num) => entities[`block${num + 23}`]);

  return entities;
}
