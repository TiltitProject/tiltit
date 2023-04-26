import gameSlice, {
  collideMonster,
  showCrackEffect,
  changePage,
  backToMainPage,
  showModal,
} from "./gameSlice";

describe("chat reducer", () => {
  const initialState = {
    hasCollideMonster: false,
    isGameRunning: true,
    crackEffect: false,
    currentPage: "MainPage",
    isModalVisible: false,
    runningGame: false,
    currentPoint: 0,
    leftTime: 30,
    getTrophy: false,
    hasClear: false,
    stageInfo: {
      1: {
        itemScore: 0,
        leftTime: 0,
        total: 0,
      },
      2: {
        itemScore: 0,
        leftTime: 0,
        total: 0,
      },
    },
    itemsVisible: {},
    currentStage: 2,
    isPlayerMove: true,
    restartCount: 0,
    mapState: {
      0: null,
      1: null,
      2: null,
    },
    isFadeOut: false,
    initialRotation: {
      beta: 0,
      gamma: 0,
    },
    aliveMonsters: {},
    specialItems: {},
    monsterFlyingVector: {
      x: 0,
      y: 0,
    },
    currentRound: 1,
    isSpecialMode: false,
    bossHP: 20,
    attackId: null,
  };

  it("should change hasCollideMonster state", () => {
    const result = gameSlice(initialState, collideMonster());
    expect(result.hasCollideMonster).toEqual(true);
    expect(result.runningGame).toEqual(false);
  });

  it("should change crackEffect", () => {
    const result = gameSlice(initialState, showCrackEffect());
    expect(result.crackEffect).toEqual(true);
  });

  it("should change currentPage", () => {
    const pageName = "test";
    const result = gameSlice(initialState, changePage(pageName));
    expect(result.currentPage).toEqual("test");
  });

  it("should change main page state", () => {
    const result = gameSlice(initialState, backToMainPage());
    expect(result.currentPage).toEqual("MainPage");
    expect(result.isModalVisible).toEqual(false);
    expect(result.hasCollideMonster).toEqual(false);
    expect(result.isGameRunning).toEqual(false);
    expect(result.crackEffect).toEqual(false);
  });

  it("should stop game and show modal", () => {
    const result = gameSlice(initialState, showModal());
    expect(result.runningGame).toEqual(false);
    expect(result.isModalVisible).toEqual(true);
  });

  it("should stop game and show modal", () => {
    const result = gameSlice(initialState, showModal());
    expect(result.runningGame).toEqual(false);
    expect(result.isModalVisible).toEqual(true);
  });
});
