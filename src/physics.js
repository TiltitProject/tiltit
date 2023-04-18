import Matter from "matter-js";
import { Dimensions } from "react-native";
import entityInfo from "./entities/entitiesInfo";
import makeMapInfo from "./utils/makeMap";
import stageSheet from "../assets/stageSheet.json";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_HEIGHT = WINDOW_HEIGHT - FLOOR_WIDTH;

let translateMapY = false;
let movedHeight = 0;

export default function Physics(entities, { touches, dispatch }) {
  const { engine, world } = entities.physics;
  const player = entities.player.body;
  const { stage } = player || 1;
  const mapInfo = makeMapInfo(stageSheet[stage], entityInfo[stage]);

  const goalPosition = mapInfo.goal[1]?.position;
  const goalWidth = mapInfo.goal[1]?.size.width;

  if (
    goalPosition &&
    player.position.x > goalPosition.x - goalWidth / 2 &&
    player.position.x < goalPosition.x + goalWidth / 2 &&
    player.position.y > goalPosition.y - goalWidth / 2 &&
    player.position.y < goalPosition.y + goalWidth / 2
  ) {
    dispatch({ type: "clear" });
  }

  const itemNumber = entityInfo[stage].item.number;
  const itemArray = Array.from(Array(itemNumber).keys());
  const monsterNumber = entityInfo[stage].monster.number;
  const monsterArray = Array.from(Array(monsterNumber).keys());
  const blockNumber = entityInfo[stage].block.number;
  const blockArray = Array.from(Array(blockNumber).keys());

  // itemArray.forEach((num) => {
  //   const itemPosition = mapInfo.item[num + 1].position;
  //   const itemWidth = mapInfo.item[num + 1].size.width;

  //   if (
  //     player.position.x > itemPosition.x - itemWidth / 2 &&
  //     player.position.x < itemPosition.x + itemWidth / 2 &&
  //     player.position.y > itemPosition.y - itemWidth / 2 &&
  //     player.position.y < itemPosition.y + itemWidth / 2
  //   ) {
  //     dispatch({ type: "get_item", payload: num + 1 });
  //   }
  // });

  const flagNumber = entityInfo[stage].flag.number;
  const flagArray = Array.from(Array(flagNumber).keys());

  flagArray.forEach((num) => {
    const flagPosition = mapInfo.flag[num + 1].position;
    const flagWidth = mapInfo.flag[num + 1].size.width;

    if (
      player.position.x > flagPosition.x - flagWidth / 2 &&
      player.position.x < flagPosition.x + flagWidth / 2 &&
      player.position.y > flagPosition.y - flagWidth / 2 &&
      player.position.y < flagPosition.y + flagWidth / 2
    ) {
      translateMapY = true;
    }
  });

  if (translateMapY && movedHeight < GAME_HEIGHT) {
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
  }

  Matter.Engine.update(engine);

  engine.timing.delta = 1 / 80;

  touches.filter((touch) => {
    if (touch.type === "press") {
      dispatch({ type: "pause" });
    }
  });

  Matter.Events.on(engine, "collisionStart", () => {

    itemArray.forEach((num) => {
      const item = entities[`item${num + 1}`].body;
      const get = Matter.Collision.collides(entities.player.body, item);

      if (get) {
        dispatch({ type: "get_item", payload: num + 1 });
        Matter.World.remove(world, item);
      }
    });

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

  return entities;
}
