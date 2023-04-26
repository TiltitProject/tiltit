import React, { useState } from "react";
import Modal from "./Modal";
import PauseMenu from "./PauseMenu";
import SelectStage from "./SelectStage";

export default function Menu({
  gameEngine,
  entities,
  isModalVisible,
  isGameOver,
}) {
  const [selectStage, setSelectStage] = useState(false);
  const handleSelectStage = (boolean) => {
    setSelectStage(boolean);
  };

  return (
    <Modal isVisible={isModalVisible}>
      {!selectStage && (
        <PauseMenu
          testID="pause_menu"
          gameEngine={gameEngine}
          entities={entities}
          onSelectStage={handleSelectStage}
          isGameOver={isGameOver}
        />
      )}
      {selectStage && (
        <SelectStage
          testID="select_stage_menu"
          gameEngine={gameEngine}
          entities={entities}
          onSelectStage={handleSelectStage}
        />
      )}
    </Modal>
  );
}
