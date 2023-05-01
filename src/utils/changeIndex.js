import { useEffect } from "react";

const useChangeIndex = (
  isPlayerMove,
  currentRound,
  specifics,
  isGameRun,
  imageIndex,
  setImageIndex,
) => {
  useEffect(() => {
    if (
      (isPlayerMove && currentRound === specifics.round) ||
      currentRound === 4
    ) {
      const changeIndex = setTimeout(() => {
        if (isGameRun && imageIndex < specifics.image.length - 1) {
          return setImageIndex(imageIndex + 1);
        }
        setImageIndex(0);
      }, 200);

      return () => {
        clearInterval(changeIndex);
      };
    }
  }, [imageIndex, currentRound, isPlayerMove]);
};

export default useChangeIndex;
