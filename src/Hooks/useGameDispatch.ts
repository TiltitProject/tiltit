import { hit, select } from "../../assets/audio";
import { GameEnginMethods } from "../GameEngine";
import {
  attackOnce,
  getSpecialItemOnce,
  offSpecialMode,
  killMonster,
  applyTranslateX,
  applyTranslateY,
  invisibleAllItems,
  reachGoal,
  getItemOnce,
  collideMonster,
  showModal,
} from "../features/gameSlice";
import { useAppDispatch } from "../store";
import playAudio from "../utils/playAudio";

export default function useGameDispatch(gameEngine: GameEnginMethods | null) {
  const dispatch = useAppDispatch();
  const handleModalOpen = () => {
    dispatch(showModal());
    playAudio(select);
  };
  interface MonsterPayload {
    number: number;
    x: number;
    y: number;
  }

  type GameEngineEvent =
    | { type: "kill_monster"; payload: MonsterPayload }
    | { type: "hit_boss"; payload: number }
    | { type: "off_specialItem" }
    | { type: "get_specialItem"; payload: number }
    | { type: "complete_move_x"; payload: number }
    | { type: "complete_move_y"; payload: number }
    | { type: "move_page" }
    | { type: "clear" }
    | { type: "get_item"; payload: number }
    | { type: "game_over" }
    | { type: "pause" };

  const handleGameEngine = (e: GameEngineEvent) => {
    switch (e.type) {
      case "hit_boss":
        playAudio(hit);
        dispatch(attackOnce(e.payload));
        break;
      case "off_specialItem":
        dispatch(offSpecialMode());
        break;
      case "get_specialItem":
        dispatch(getSpecialItemOnce(e.payload));
        break;
      case "kill_monster":
        dispatch(killMonster(e.payload));
        break;
      case "complete_move_x":
        dispatch(applyTranslateX(e.payload));
        break;
      case "complete_move_y":
        dispatch(applyTranslateY(e.payload));
        break;
      case "move_page":
        dispatch(invisibleAllItems());
        break;
      case "clear":
        dispatch(reachGoal());
        break;
      case "get_item":
        dispatch(getItemOnce(e.payload));
        break;
      case "game_over":
        dispatch(collideMonster());
        gameEngine?.stop();
        break;
      case "pause":
        handleModalOpen();
        break;
      default:
        break;
    }
  };

  return handleGameEngine;
}
