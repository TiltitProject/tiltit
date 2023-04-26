import Matter from "matter-js";
import Stage from "../entities/stage";
import moveMonster from "./moveMonster";

const MOCK_STAGE = 2;
const mockEntities = Stage(MOCK_STAGE);
const monsterSpecific = {
  1: {
    axis: "x",
    speed: 2,
    distance: 100,
    changeMove: false,
    alive: true,
    round: 1,
    translateMap: {
      x: 0,
      y: 0,
    },
  },
};

describe("translate entities", () => {
  const MONSTER_NUM = 1;
  const SPEED = 10;

  it("should move according to specific's axis and speed", () => {
    const monster1InitialPosition = JSON.parse(
      JSON.stringify(mockEntities.monster1.body.position),
    );

    monsterSpecific[MONSTER_NUM].axis = "x";
    monsterSpecific[MONSTER_NUM].speed = SPEED;

    function mockPhysics(entities) {
      moveMonster(Matter, entities, monsterSpecific, "monster");
      return entities;
    }

    const physicsResult = mockPhysics(mockEntities);
    const monster1changedPositionX = physicsResult.monster1.body.position.x;

    expect(monster1changedPositionX).toBe(monster1InitialPosition.x + SPEED);
  });

  it("should change specific's changMove property true if It has moved it's own distance ", () => {
    const DISTANCE = 50;

    monsterSpecific[MONSTER_NUM].distance = DISTANCE;
    mockEntities.monster1.body.position.x += DISTANCE;
    monsterSpecific[MONSTER_NUM].changeMove = false;

    expect(monsterSpecific[MONSTER_NUM].changeMove).toBe(false);

    moveMonster(Matter, mockEntities, monsterSpecific, "monster");

    expect(monsterSpecific[MONSTER_NUM].changeMove).toBe(true);
  });

  it("should change specific's changMove property false if It has moved it's own distance in reverse direction twice", () => {
    const DISTANCE = 50;

    monsterSpecific[MONSTER_NUM].distance = DISTANCE;
    mockEntities.monster1.body.position.x -= DISTANCE * 2;
    monsterSpecific[MONSTER_NUM].changeMove = true;

    expect(monsterSpecific[MONSTER_NUM].changeMove).toBe(true);

    moveMonster(Matter, mockEntities, monsterSpecific, "monster");

    expect(monsterSpecific[MONSTER_NUM].changeMove).toBe(false);
  });

  it("should move revers direction if specific's changeMove property true", () => {
    const monster1InitialPosition = JSON.parse(
      JSON.stringify(mockEntities.monster1.body.position),
    );

    monsterSpecific[MONSTER_NUM].axis = "x";
    monsterSpecific[MONSTER_NUM].speed = SPEED;
    monsterSpecific[MONSTER_NUM].changeMove = true;

    function mockPhysics(entities) {
      moveMonster(Matter, entities, monsterSpecific, "monster");
      return entities;
    }

    const physicsResult = mockPhysics(mockEntities);
    const monster1changedPositionX = physicsResult.monster1.body.position.x;

    expect(monster1changedPositionX).toBe(monster1InitialPosition.x - SPEED);
  });
});
