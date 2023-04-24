import makeMapInfo from "./makeMap";
import stageSheet from "../../assets/stageSheet.json";
import entityInfo from "../entities/entitiesInfo";

const STAGE = 2;

describe("makeMapInfo", () => {
  const stageArray = Array(STAGE)
    .fill(0)
    .map((_, i) => i + 1);

  stageArray.forEach((stage) => {
    const map = makeMapInfo(stageSheet[stage], entityInfo[stage]);

    it("has all the block entities", () => {
      const blockEntitiesNumber = Object.keys(map.block).length;
      expect(blockEntitiesNumber).toBe(entityInfo[stage].block.number);
    });

    it("has all the item entities", () => {
      const itemEntitiesNumber = Object.keys(map.item).length;
      expect(itemEntitiesNumber).toBe(entityInfo[stage].item.number);
    });

    it("has all the monster entities", () => {
      const monsterEntitiesNumber = Object.keys(map.monster).length;
      expect(monsterEntitiesNumber).toBe(entityInfo[stage].monster.number);
    });

    it("has all the flag entities", () => {
      const flagEntitiesNumber = Object.keys(map.flag).length;
      expect(flagEntitiesNumber).toBe(entityInfo[stage].flag.number);
    });

    it("has all the attack entities", () => {
      const attackEntitiesNumber = Object.keys(map.attack).length;
      expect(attackEntitiesNumber).toBe(entityInfo[stage].attack.number);
    });

    it("has all the boss entities", () => {
      const bossEntitiesNumber = Object.keys(map.boss).length;
      expect(bossEntitiesNumber).toBe(entityInfo[stage].boss.number);
    });

    it("has all the goal entities", () => {
      const goalEntitiesNumber = Object.keys(map.goal).length;
      expect(goalEntitiesNumber).toBe(entityInfo[stage].goal.number);
    });

    it("has all the special entities", () => {
      const specialEntitiesNumber = Object.keys(map.special).length;
      expect(specialEntitiesNumber).toBe(entityInfo[stage].special.number);
    });
  });
});
