import Matter from "matter-js";
import entityInfo from "../../entities/entitiesInfo";
import Stage from "../../entities/stage";
import { translateEntitiesX, translateEntitiesY } from "./translateEntity";

const STAGES = 2;

describe("translate entities", () => {
  const mockEntities = Stage(STAGES);
  const blockNumber = entityInfo[STAGES].block.renderEntity;
  const block1InitialPosition = JSON.parse(
    JSON.stringify(mockEntities.block1.body.position),
  );

  it("it should change block position X distance", () => {
    const DISTANCE = 50;

    function mockPhysics(entities) {
      translateEntitiesX(blockNumber, DISTANCE, "block", entities, Matter);
      return entities;
    }

    const physicsResult = mockPhysics(mockEntities);
    const block1changedPositionX = physicsResult.block1.body.position.x;

    expect(block1changedPositionX).toBe(block1InitialPosition.x + DISTANCE);
  });

  it("it should change block position Y distance", () => {
    const DISTANCE = 50;

    function mockPhysics(entities) {
      translateEntitiesY(blockNumber, DISTANCE, "block", entities, Matter);
      return entities;
    }

    const physicsResult = mockPhysics(mockEntities);
    const block1changedPositionY = physicsResult.block1.body.position.y;

    expect(block1changedPositionY).toBe(block1InitialPosition.y + DISTANCE);
  });
});
