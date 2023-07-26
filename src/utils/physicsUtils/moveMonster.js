const moveMonster = (Matter, entities, specifics, type) => {
  Object.keys(specifics).forEach((num) => {
    const monster = entities[`${type}${num}`]?.body;
    const moveAxis = specifics[num].axis;
    const stopAxis = moveAxis === "x" ? "y" : "x";
    const moveDistance = specifics[num].distance;
    const { round, translateMap, alive } = specifics[num];
    const translateInfo = translateMap[moveAxis];
    const translatedPixel = entities.translatedInfo[moveAxis];
    const appliedPosition = translateInfo * translatedPixel;

    if (alive && entities.round === round) {
      if (
        monster.position[moveAxis] >=
        monster.initialPosition[moveAxis] + appliedPosition + moveDistance
      ) {
        specifics[num].changeMove = true;
      } else if (
        monster.position[moveAxis] <=
        monster.initialPosition[moveAxis] + appliedPosition - moveDistance
      ) {
        specifics[num].changeMove = false;
      }

      if (!specifics[num].changeMove) {
        Matter.Body.translate(monster, {
          [moveAxis]: specifics[num].speed,
          [stopAxis]: 0,
        });
      } else {
        Matter.Body.translate(monster, {
          [moveAxis]: -specifics[num].speed,
          [stopAxis]: 0,
        });
      }
    }
  });
};

export default moveMonster;
