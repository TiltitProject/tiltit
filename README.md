# TILTIT


TILTIT은 핸드폰을 기울여, 몬스터를 피하며 미로를 탈출해 목적지에 도달하는 게임입니다.

모바일 기기의 자이로스코프를 이용해, 캐릭터를 이동시킬 수 있으며, 다양한 아이템 및 몬스터와
상호작용 할 수 있습니다.

<br>
<br>

# 📖 목차
- 🔥 Motivation
- 💻 Development
  + Gyroscope의 값으로 캐릭터를 어떻게 이동시킬 수 있을까?
  + 맵의 entity(미로, 아이템, 몬스터 등)의 좌표와 크기 정보를 선언적으로 얻을 수 있는 방법은 없을까?
- 🛠️ Optimization
  + 대형 맵을 만들었더니 과부하가 걸린다. 최적화를 할 수 있는 방법은 없을까?
    1) 너무 많은 컴포넌트를 한 번에 렌더링 시켰었다.
    2) 물리엔진에 전달되는 컴포넌트는 많은 cost가 소요된다.
    3) audio effect가 메모리 누수를 발생시키고 있었다.
- 🎞️ Animation
  + 게임의 동적 요소를 어떻게 살릴 수 있을까?
    1) 애니메이션으로 fade-in/out 효과를 주어 화면 전환을 부드럽게!
    2) png 이미지를 동적으로 바꾸어 캐릭터 컴포넌트를 생동감 있게 표현하자
    3) 캐릭터가 몬스터와 충돌 시, 몬스터가 무적 캐릭터와 충돌 시 애니메이션 효과를 주자!
       * 사이드 이펙트에 따른 컴포넌트의 애니메이션 효과 부여
       * 최적화를 위해, 애니메이션 효과가 끝나면 컴포넌트 unMount!
    4) 몬스터가 배회하는 효과를 주자
       * 좌표가 이동되는 대형 맵을 구현하니 몬스터에 설정된 배회 좌표가 꼬여버렸다
- 🛠 Tech Stacks

<br>
<br>

# 🔥 Motivation

이번 개인 프로젝트의 메인 목표는 '**1. 동적인 요소와 2. UI/UX의 디테일을 살리고, 3. 스스로 메인 로직을 개발하여 프로젝트에 적용해 보자**'였습니다.

프로젝트 주제를 고민하다 보니, 게임을 개발하면 이번 프로젝트의 메인 목표들을 달성할 수 있을 것이라 생각했습니다. 

1) 게임은 사용자의 다양한 행동에 즉각적으로 반응해야 할 수밖에 없었기에, 첫 번째 목표였던 동적인 요소를 만들어 보는 경험을 쌓을 수 있을 것이라 생각했습니다.
2) 게임은 유저의 플레이 경험이 주요 개발 목표인 만큼. 설명이 필요 없는 직관적인 UI/UX가 필수적일 것이라 생각했고, 두 번째 목표였던 UI/UX의 디테일에 대해 많은 고민을 해볼 수 있을 것이라 생각했습니다.
3) 유저의 활동에 따라 게임오버, 몬스터 처치, 득점 등의 로직을 원하는 만큼 추가할 수 있을 것이라 생각했고, 
  Gyroscope로 개발할 경우 기기의 기울기에 따른 이동 거리 & 방향을 실시간으로 적용하는 과정에서 메인 로직을 개발해 보는 경험을 해볼 수 있을 것이라 생각했습니다.

무엇보다 그동안 배워왔던 웹 기반의 개발 경험을 게임에 어떻게 활용할 수 있을지, 예상하지 못했던 어떤 챌린지들이 있을지 경험해 보고 싶었습니다.

<br>
<br>

# 💻 Development
## 1. Gyroscope의 값으로 캐릭터를 어떻게 이동시킬 수 있을까?
캐릭터는 x축 혹은 y 축 만으로 이동하는 것이 아닌, 핸드폰의 기울어진 정도와 방향에 따라 대각선으로 이동할 수 있어야 했습니다. Gyroscope는 x, y 축의 기울기 데이터를 제공하지만, 대각선의 각도와 값을 제공하지 않기 때문에, 어떻게 캐릭터를 대각선으로 이동시켜야 할지 고민을 해야 했습니다. 방법은 벡터였습니다. 벡터는 수학 개념으로 '**크기와 방향을 갖는 물리량**'을 의미합니다.
<br>

>![벡터](https://user-images.githubusercontent.com/106131005/236632053-75f6175a-7c0c-4057-a4bb-c8da53867eab.jpeg)

위의 그림에서 볼 수 있듯이, 벡터의 값은 x축의 데이터인 a(x)와 y축의 데이터인 a(y)를 활용하여 계산 할 수 있습니다.

<br>
x, y 축의 기울기 값은 DeviceMotion에서 제공하는 'gamma', 'beta' 개념을 적용하였습니다. beta와 gamma는 각각 y 축, x축을 기준으로 하는 회전 각도를 제공하며, output은 -π ~ π 이내의 값입니다.
<br>

![image](https://user-images.githubusercontent.com/106131005/230624623-6e781a4f-258b-4d8a-ac9d-0fc5316ce11d.png)

<br>
gamma와 beta를 물리엔진 라이브러리에 적용하여 아래와 같이 캐릭터를 실제 기울기 대로 움직이도록 할 수 있었습니다.

```js
  DeviceMotion.addListener((result) => {
    const { beta, gamma } = result.rotation;

    Matter.Body.setVelocity(entities.player.body, {
      x: gamma * 10,
      y: beta * 10,
    }); 
    // Matter.js의 setVelocity 메서드의 인자에 움직일 대상(entities.player.body), 벡터({ x: gamma * 10, y: beta * 10 }) 객체를 반영
    // 기울어진 값에 따른 벡터만큼 캐릭터의 속도가 바뀐다

    Matter.Body.applyForce(
      entities.player.body,
      entities.player.body.position,
      { x: gamma / 20000, y: beta / 20000 },
    );
    // applyForce 메서드의 인자에 움직일 대상(entities.player.body), 포지션, 벡터({ x: gamma * 10, y: beta * 10 }) 객체를 반영
    // 기울어진 값에 따른 벡터만큼 캐릭터의 속도가 가속된다(기존 힘 + 새로운 힘 추가 => 점점 빨라짐)
  });
```

가속도를 적용시키는 두 번째 로직의 경우, 기울기에 따른 속도 증가와 기존 운동 에너지에 새로운 운동에너지가 더해지는 로직입니다. 
현실의 중력가속도를 반영하고 있으나, 난이도의 급격한 상승으로 UX를 해친다 판단되어 실제 게임에서 적용에서는 제외하였습니다.

<br>

## 2. 맵의 entity(미로, 아이템, 몬스터 등)의 좌표와 크기 정보를 선언적으로 얻을 수 있는 방법은 없을까?
미로를 통과 해 목적지에 도착해야 하는 게임의 특성 상, 아래 스크린샷과 같이 직사각형의 Block 컴포넌트들을 여러개 조합하여 미로를 만들어야 했습니다.
<br>

<img width="300" alt="image" src="https://user-images.githubusercontent.com/106131005/232325732-b3da48a5-66ab-45a5-b94f-d4f1a3ca2c71.png">

위의 미로는 아래 코드와 같이 크기와 좌표를 BlockMaker라는 컴포넌트 생성 함수에 인자로 넣어 Block이라는 컴포넌트를 정의하고, 게임엔진에 객체 형식으로 전달하여 구현했습니다.
처음에는 화면을 보며 BlockMaker에 인자로 들어가는 크기와 좌표를 직접 작성했습니다. 하지만, 미로가 복잡해질수록 화면을 보며 직접 조정하는 작업의 생산성과 정교함이 떨어졌습니다.
한 예로 위 스크린샷의 미로를 이루고 있는 Block은 30개인데, 하드코딩으로는 한계가 있다고 생각했습니다.

<br>
<하드코딩 예시>
```js
    block1: BlockMaker(
      world, // 물리엔진을 적용시킬 world
      {
        x: blockLeftBottomX(BLOCK_SIZE * 9),
        y: blockLeftBottomY(BLOCK_SIZE) - GAME_HEIGHT / 8,
      }, // Block 컴포넌트의 좌표
      { height: BLOCK_SIZE, width: BLOCK_SIZE * 9 }, // Block 컴포넌트의 크기
      "brownRow", // png 이미지 분류
    ),
    block2: BlockMaker(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE) + BLOCK_SIZE * 9,
        y: blockLeftBottomY(BLOCK_SIZE * 18) - GAME_HEIGHT / 8,
      },
      { height: BLOCK_SIZE * 18, width: BLOCK_SIZE },
      "brownColumn",
    ),
    ... block30
```

맵의 미로를 선언적으로 만들 수 있는 방법을 고민하다 보니, 일정 등분으로 나누어진 grid와 비슷한 형태를 띠고 있다는 생각이 들었습니다.
그리고 구글 스프레드시트에 맵을 디자인을 한 후 게임에 사용될 entity(Block, item, monster, goal)들의 좌표와 크기를 구할 수 있지 않을까 생각했습니다.
- 맵에 적용될 grid의 크기를 설정(해당 프로젝트는 시연용 Device의 Width를 16등분 한 크기의 정사각형을 grid 크기로 정의).
- gird의 크기에 따라 행은 16등분, 열은 36등분 하기로 결정.
- 행에는 row0 ~ row15, 열은 column0 ~ column35의 값을 주어 각 행렬에 어떠한 게임 entity(Block, item, monster, goal)가 포함되어 있는지를 판별.
- 스프레드시트에 맵을 디자인한 후 각 entity를 구별할 수 있는 고윳값을 입력해, 어떤 행렬에 속해있는지 판별.

<br>
<스프레드시트에 입력된 맵의 정보>
<img width="500" alt="image" src="https://user-images.githubusercontent.com/106131005/236681940-d8bcf2d9-da52-46b8-8e52-dcc31b424d63.png">

위의 이미지와 같이 스프레드시트에 맵을 디자인한 후 게임에 사용될 entity들의 고윳값을 부여했습니다. 고윳값은 맵 디자인 시 가시성을 위해 약어로 부여했고, 설명하면 아래와 같습니다.

- s: Block 
  > s1 ~ s30은 맵에 렌더링 될 Block1 ~ Block30의 좌표와 크기를 나타낸다.
- i: Item 
  > i1 ~ i19는 맵에 렌더링 될 Item1 ~ Item30의 좌표와 크기를 나타낸다.
- m: Monster 
  > m1 ~ m4는 맵에 렌더링 될 Monster1 ~ Monster4의 좌표와 크기를 나타낸다.
- g: Goal 
  > g1는 맵에 렌더링 될 Goal1의 좌표와 크기를 나타낸다.
 
<br>

위의 정보를 통해 entity의 좌표와 크기를 구하는 방식을 s1을 예로 들면 아래와 같습니다.

- s1(Block1)은 row2와 col3~col8의 좌표 값을 갖고 있다.
- x축 좌표: row는 게임의 x축 값을 나타내므로 s1의 x좌표는 s1이 가진 최초 row의 index * grid 크기의 값을 가진다.
  > row2의 index는 2므로 grid가 10이라고 했을 때, x 축의 좌표는 2 * 10
- y 축 좌표: col은 게임의 y 축 값을 나타내므로 s1의 y좌표는 s1이 가진 최초 col의 index * grid 크기의 값을 가진다.
  > row3의 index는 3므로 grid가 10이라고 했을 때, y 축의 좌표는 3 * 10
- width: s1이 가진 row의 최댓값 index - 최솟값 index + 1 * grid의 크기
  > row2만 보유하고 있으므로 gird가 10이라고 했을 때, width는 2 - 2 + 1 * 10
- height: s1이 가진 col의 최댓값 index - 최솟값 index + 1 * grid의 크기
  > col3~col8를 보유하고 있으므로 grid가 10이라고 했을 때, height는 8 - 3 + 1 * 10

<br>
위의 아이디어를 실현하기 위해, 구글 스프레드시트의 데이터를 json 데이터로 추출하면 아래와 같습니다.
<br>

<json 데이터로 추출한 구글 스프레드시트의 데이터>
```
{
    "col0": {
      "row0": null,
      "row1": null,
      "row2": null,
      "row3": null,
      "row4": null,
      "row5": "s5",
      "row6": null,
      "row7": null,
      "row8": null,
      "row9": null,
      "row10": "g1",
      "row11": null,
      "row12": null,
      "row13": null,
      "row14": "s9",
      "row15": "s9"
    },
    "col1": {
      "row0": null,
      "row1": null,
      "row2": null,
      "row3": null,
      "row4": null,
      "row5": "s5",
      "row6": null,
      "row7": null,
      "row8": null,
      "row9": null,
      "row10": null,
      "row11": null,
      "row12": null,
      "row13": "s8",
      "row14": "s9",
      "row15": "s9"
    },
    ..."col35",
}
```

위의 json 데이터에는 col0부터 col35까지의 데이터가 객체 형식으로 있습니다. 하지만 제 프로젝트에서 필요한 데이터는 entity 별 col, row의 값이었으므로, json 정보를 가공해 줄 함수를 만들었습니다.
json 데이터를 인수로 받는 함수는 데이터를 가공하여 아래와 같이 entity 별 col과 row의 값을 반환합니다.

<entity별 col & row 정보 예시>
```js
"s1": {
  "col": [3, 4, 5, 6, 7, 8],
  "row": [2, 2, 2, 2, 2, 2]
},
```
이러한 entity의 col, row 값에 grid와 넓이(필요시)의 값을 적용하는 함수를 통해 아래와 같이 선언적으로 entitye들의 좌표와 크기를 구할 수 있었습니다.
<br>

<엑셀로 추출한 json 데이터를 통해 entity들의 위치와 크기를 반환하는 함수>
```js
const mapInfo = makeMap(stageSheet[stage], entityInfo[stage]);
// 첫 번째 인자: 구글 스프레드시트의 json데이터
// 두 번째 인자: 각 entity들의 개수와 크기를 설정한 객체 데이터

// 반환값 
{
  "block":{
    "1":{
      "  ":{
        "x":207,
        "y":852.625
      },
      "size":{
        "width":382,
        "height":47.75
      }
    },
    "2":{
      "position":{
        "x":218.9375,
        "y":757.125
      },
      "size":{
        "width":23.875,
        "height":143.25
      }
    },
    ... "30" // entityInfo와 구글 스프레드 시트에 표시된 전체 entity들의 position과 size를 반환
  }
```

또한 이 데이터를 순회하며 entity들의 컴포넌트를 생성하는 유틸 함수를 통해, 기존의 하드코딩 방식에 비해 더욱 간결하게 코드를 짤 수 있었습니다.

```js

// 기존 하드코딩 방식: block1부터 block30까지 각각 하드코딩으로 좌표를 정의해주었다.
    block1: BlockMaker(
      world, // 물리엔진을 적용시킬 world
      {
        x: blockLeftBottomX(BLOCK_SIZE * 9),
        y: blockLeftBottomY(BLOCK_SIZE) - GAME_HEIGHT / 8,
      }, // Block 컴포넌트의 좌표
      { height: BLOCK_SIZE, width: BLOCK_SIZE * 9 }, // Block 컴포넌트의 크기
      "brownRow", // png 이미지 분류
    ),
    block2: BlockMaker(
      world,
      {
        x: blockLeftBottomX(BLOCK_SIZE) + BLOCK_SIZE * 9,
        y: blockLeftBottomY(BLOCK_SIZE * 18) - GAME_HEIGHT / 8,
      },
      { height: BLOCK_SIZE * 18, width: BLOCK_SIZE },
      "brownColumn",
    ),
    ... block30
    
// 변경된 방식: 맵 entity의 정보를 바탕으로 선언적으로 컴포넌트를 정의해주는 함수를 실행
    ...makeBlocks(world, mapInfo, entityInfo[stage])
    // 개수에 상관없이 구글 스프레드시트와 entityInfo를 통해 만든 entity 정보를 토대로 전체 entity들을 정의하여 물리엔진에 전달.
```

또한 캐릭터가 특정 위치에 도달하면 모든 entity들이 이동되는 대형 맵을 만들 때, Device의 뷰포트에서는 보이지 않는 맵까지 디자인해야 했습니다.
이때 구글 스프레드시트를 활용하여 entity의 위치 정보를 정확히 알 수 있었기에, 대형 맵을 구현할 수 있었습니다.

<br>

<구글 스프레드시트로 디자인 한 대형 맵의 entity >

<img width="500" alt="image" src="https://user-images.githubusercontent.com/106131005/236690566-98089830-7bc2-4de0-86a4-55d94cae6b4c.png">

