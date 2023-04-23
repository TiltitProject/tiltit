import React, { useState } from "react";
import Modal from "./Modal";
import PauseMenu from "./PauseMenu";
import SelectStage from "./SelectStage";
import ConfigGyro from "./ConfigGyro";


export default function Menu({
  gameEngine,
  entities,
  isModalVisible,
  isGameOver,
}) {
  const [selectStage, setSelectStage] = useState(false);
  const [config, setConfig] = useState(false);
  const handleSelectStage = (boolean) => {
    setSelectStage(boolean);
  };
  const handleSetConfig = (boolean) => {
    setConfig(boolean);
  };

  return (
    <Modal isVisible={isModalVisible}>
      {!selectStage && !config && (
        <PauseMenu
          gameEngine={gameEngine}
          entities={entities}
          onSelectStage={handleSelectStage}
          onSetConfig={handleSetConfig}
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
      {config && (
        <ConfigGyro
          onSetConfig={handleSetConfig}
        />
      )}
    </Modal>
  );
}
