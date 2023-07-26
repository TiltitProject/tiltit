export const translateEntitiesX = (
  entityNumber,
  distance,
  type,
  entities,
  Matter,
) => {
  const entityArray = Array(entityNumber)
    .fill(0)
    .map((_, i) => i);
  entityArray.forEach((entityNum) => {
    Matter.Body.translate(entities[`${type}${entityNum + 1}`].body, {
      x: distance,
      y: 0,
    });
  });
};

export const translateEntitiesY = (
  entityNumber,
  distance,
  type,
  entities,
  Matter,
) => {
  const entityArray = Array(entityNumber)
    .fill(0)
    .map((_, i) => i);
  entityArray.forEach((entityNum) => {
    Matter.Body.translate(entities[`${type}${entityNum + 1}`].body, {
      x: 0,
      y: distance,
    });
  });
};
