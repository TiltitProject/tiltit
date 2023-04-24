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
          gameEngine={gameEngine}
          entities={entities}
          onSelectStage={handleSelectStage}
          isGameOver={isGameOver}
        />
      )}
      {selectStage && (
        <SelectStage
          gameEngine={gameEngine}
          entities={entities}
          onSelectStage={handleSelectStage}
        />
      )}
    </Modal>
  );
}
