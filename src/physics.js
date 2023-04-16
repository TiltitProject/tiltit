import Matter from "matter-js";
import entityInfo from "./entities/entitiesInfo";

export default function Physics(entities, { touches, dispatch }) {
  const { engine } = entities.physics;


  Matter.Engine.update(engine, );
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
