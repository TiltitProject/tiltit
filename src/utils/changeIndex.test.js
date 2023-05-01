import { renderHook } from "@testing-library/react-native";
import useChangeIndex from "./changeIndex";

describe("useChangeIndex", () => {
  jest.useFakeTimers();

  it("should update the image index when conditions are met", () => {
    const setImageIndex = jest.fn();
    const imageIndex = 0;
    const isPlayerMove = true;
    const currentRound = 1;
    const specifics = {
      image: [0, 1, 2, 3],
      round: 1,
    };
    const isGameRun = true;

    renderHook(() =>
      useChangeIndex(
        isPlayerMove,
        currentRound,
        specifics,
        isGameRun,
        imageIndex,
        setImageIndex,
      ),
    );

    jest.advanceTimersByTime(200);
    expect(setImageIndex).toHaveBeenCalledWith(1);
  });

  it("should not increase imageIndex if isPlayerMove is false", () => {
    const setImageIndex = jest.fn();
    const imageIndex = 0;
    const isPlayerMove = false;
    const currentRound = 1;
    const specifics = {
      image: [0, 1, 2, 3],
      round: 1,
    };
    const isGameRun = true;

    renderHook(() =>
      useChangeIndex(
        isPlayerMove,
        currentRound,
        specifics,
        isGameRun,
        imageIndex,
        setImageIndex,
      ),
    );

    jest.advanceTimersByTime(200);
    expect(setImageIndex).not.toHaveBeenCalled();
  });

  it("should not increment imageIndex if currentRound does not match", () => {
    const setImageIndex = jest.fn();
    const imageIndex = 0;
    const isPlayerMove = true;
    const currentRound = 1;
    const specifics = {
      image: [0, 1, 2, 3],
      round: 2,
    };
    const isGameRun = true;

    renderHook(() =>
      useChangeIndex(
        isPlayerMove,
        currentRound,
        specifics,
        isGameRun,
        imageIndex,
        setImageIndex,
      ),
    );

    jest.advanceTimersByTime(200);
    expect(setImageIndex).not.toHaveBeenCalled();
  });
});
