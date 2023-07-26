import entityInfo from "../../entities/entitiesInfo";

export const isInItemBoundary = ({ player, item, offset }) => {
  if (!item.position) return;

  const itemPosition = item.position;
  const itemWidth = item.size.width;
  const applyingOffset = offset || 1;

  if (
    player.position.x > itemPosition.x - itemWidth / applyingOffset &&
    player.position.x < itemPosition.x + itemWidth / applyingOffset &&
    player.position.y > itemPosition.y - itemWidth / applyingOffset &&
    player.position.y < itemPosition.y + itemWidth / applyingOffset
  ) {
    return true;
  }
  return false;
};

export const disPatchInteractionWithItem = ({ dispatch, entities }) => {
  const { stage, mapInfo } = entities;
  const player = entities.player.body;
  const { goal } = mapInfo;
  const itemNumber = entityInfo[stage].item.number;
  const itemArray = Array.from({ length: itemNumber }, (_, i) => i);
  const specialItemNumber = entityInfo[stage].special.number;
  const specialItemArray = Array.from(
    { length: specialItemNumber },
    (_, i) => i,
  );

  itemArray.forEach((num) => {
    const item = mapInfo.item[num + 1];

    if (isInItemBoundary({ player, item })) {
      dispatch({ type: "get_item", payload: num + 1 });
    }
  });

  specialItemArray.forEach((num) => {
    const item = mapInfo.special[num + 1];

    if (isInItemBoundary({ player, item, offset: 2 })) {
      dispatch({ type: "get_specialItem", payload: num + 1 });
      entities.specialMode = true;
    }
  });

  if (goal.position && isInItemBoundary({ player, item: goal, offset: 2 })) {
    dispatch({ type: "clear" });
  }
};
