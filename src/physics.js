import Matter from "matter-js";
import entityInfo from "./entities/entitiesInfo";
import makeMapInfo from "./utils/makeMap";
import { sheet } from "../assets/stageMaze.json";

export default function Physics(entities, { touches, dispatch }) {
  const { engine } = entities.physics;
  const player = entities.player.body;
  const mapInfo = makeMapInfo(sheet, entityInfo);

  const itemNumber = entityInfo.item.number;
  const itemArray = Array.from(Array(itemNumber).keys());

  const goalPosition = mapInfo.goal[1].position;
  const goalWidth = mapInfo.goal[1].size.width;

  if (
    player.position.x > goalPosition.x - goalWidth / 2 &&
    player.position.x < goalPosition.x + goalWidth / 2 &&
    player.position.y > goalPosition.y - goalWidth / 2 &&
    player.position.y < goalPosition.y + goalWidth / 2
  ) {
    dispatch({ type: "clear"});
  }

  itemArray.forEach((num) => {
    const itemPosition = mapInfo.item[num + 1].position;
    const itemWidth = mapInfo.item[num + 1].size.width;

    if (
      player.position.x > itemPosition.x - itemWidth / 2 &&
      player.position.x < itemPosition.x - itemWidth / 2 + itemWidth &&
      player.position.y > itemPosition.y - itemWidth / 2 &&
      player.position.y < itemPosition.y - itemWidth / 2 + itemWidth
    ) {
      dispatch({ type: "get_item", payload: num + 1 });
    }
  });

  Matter.Engine.update(engine);
  engine.timing.delta = 1 / 80;

  touches.filter((touch) => {
    if (touch.type === "press") {
      dispatch({ type: "pause" });
    }
  });

  Matter.Events.on(engine, "collisionStart", () => {
    const monsterNumber = entityInfo.monster.number;
    const monsterArray = Array.from(Array(monsterNumber).keys());
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
    // const itemNumber = entityInfo.item.number;
    // const itemArray = Array.from(Array(itemNumber).keys());
    // itemArray.forEach((num) => {
    //   const item = `item${num + 1}`;
    //   if (entities[item]?.body) {
    //     const collision = Matter.Collision.collides(
    //       entities.player.body,
    //       entities[item]?.body,
    //     );
    //     if (collision) {
    //       delete entities[item];
    //     }

    // dispatch({ type: "game_over" });
    //   }
    // });
    // const collision = Matter.Collision.collides(
    //   entities.player.body,
    //   entities.topMonster.body,
    // );
    // if (collision) {
    //   delete entities.item;

    //   dispatch({ type: "game_over" });
    // }
  });

  return entities;
}
