# TILTIT


TILTIT은 핸드폰을 기울여, 몬스터를 피하며 미로를 탈출해 목적지에 도달하는 iOS 게임 어플리케이션입니다.
모바일 기기의 자이로스코프를 이용해 캐릭터를 이동시킬 수 있으며, 다양한 아이템 및 몬스터와
상호작용 할 수 있습니다.

- 🎥 [유튜브 링크](https://youtu.be/FuUkK1fcAMY)
<br>
<br>

# 📖 목차
- [🔥 Motivation](#-motivation)
- [📱 Preview](#-preview)
- [💻 Development](#-development)
  * [1. Gyroscope의 값으로 캐릭터를 어떻게 이동시킬 수 있을까?](#1-gyroscope의-값으로-캐릭터를-어떻게-이동시킬-수-있을까)
  * [2. 하드코딩하지 않고 맵을 구현하는 방법은 없을까?](#2-하드코딩하지-않고-맵을-구현하는-방법은-없을까)
    + [2.1 문제점: 하드코딩으로 맵을 만드는 건 한계가 있다.](#21-문제점-하드코딩으로-맵을-만드는-건-한계가-있다)
    + [2.2 아이디어: 구글 스프레드 시트를 활용하자.](#22-아이디어-구글-스프레드시트를-활용하자)
    + [2.3 구현 과정: 'col'과 'row'의 값을 요소의 크기와 좌표로 변환하자.](#23-구현-과정-col과-row의-값을-요소의-크기와-좌표로-변환하자)
    + [2.4 결과: 한 번의 함수 호출로 맵 구현.](#24-결과-한-번의-함수-호출로-맵-구현)
- [🛠️ Optimization](#-optimization)
  * [1. 원인: 물리엔진이 너무 많은 컴포넌트를 전달하고 있었다.](#1-원인-물리엔진이-너무-많은-컴포넌트를-전달하고-있었다)
  * [2. 해결방법](#2-해결방법)
    + [2.1 사용했던 컴포넌트를 재구성하자.](#21-사용했던-컴포넌트를-재구성-하자)
    + [2.2 충돌 감지를 직접 구현하자.](#22-충돌-감지를-직접-구현하자)
- [🎞️ User Experience](#-user-experience)
  * [1. Gyroscope 초기 기울기 설정 및 미리보기 기능](#1-gyroscope-초기-기울기-설정-및-미리-보기-기능)
  * [2. 애니메이션 효과](#2-애니메이션-효과)
    + [2.1 화면 전환](#21-화면-전환)
    + [2.2 정보 전달](#22-정보-전달)
- [🔫 Trouble Shooting](#-trouble-shooting)
  * [1. 캐릭터가 벽을 통과한다?](#1-캐릭터가-벽을-통과한다)
  * [2. 효과음이 메모리 누수를 발생시키고 있었다.](#2-효과음이-메모리-누수를-발생시키고-있었다)
- [🔗 Refactoring](#-refactoring)
  * [1. List](#1-list)
  * [2. 스프레드시트 파싱 로직](#2-스프레드시트-파싱-로직)
- [🕹️ Feature](#-feature)
- [📂 Tech stack](#-tech-stack)
    + [1. Why React Native Game Engine?](#1-why-react-native-game-engine)
    + [2. Why Matter.js?](#2-why-matterjs)
- [🗓️ Timeline](#-timeline)
    + [프로젝트 기간: 2023.04.03(월) ~ 2023.04.28(금)](#---------20230403------20230428---)

<br>
<br>

# 🔥 Motivation

이번 개인 프로젝트의 메인 목표는 '**1. 동적인 요소와 2. UI/UX의 디테일을 살리고, 3. 스스로 메인 로직을 개발하여 프로젝트에 적용해 보자**'였습니다.

프로젝트 주제를 고민하다 보니, 게임을 개발하면 이번 프로젝트의 메인 목표들을 달성할 수 있을 것이라 생각했습니다.

1) 게임은 사용자의 다양한 행동에 즉각적으로 반응해야 할 수밖에 없었기에, 첫 번째 목표였던 동적인 요소를 만들어 보는 경험을 쌓을 수 있을 것이라 생각했습니다.
2) 게임은 유저의 플레이 경험이 주요 개발 목표인 만큼. 설명이 필요 없는 직관적인 UI/UX가 필수적일 것이라 생각했고, 두 번째 목표였던 UI/UX의 디테일에 대해 많은 고민을 해볼 수 있을 것이라 생각했습니다.
3) 유저의 활동에 따라 게임오버, 몬스터 처치, 득점 등의 로직을 원하는 만큼 추가할 수 있을 것이라 생각했고,
  `Gyroscope`로 개발할 경우 기기의 기울기에 따른 이동 거리 & 방향을 실시간으로 적용하는 과정에서 메인 로직을 개발해 보는 경험을 해볼 수 있을 것이라 생각했습니다.

무엇보다 그동안 배워왔던 웹 기반의 개발 경험을 게임에 어떻게 활용할 수 있을지, 예상하지 못했던 어떤 챌린지들이 있을지 경험해 보고 싶었습니다.

<br>
<br>

# 📱 Preview

<img width="200" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/11608e37-e54c-49bf-971a-44a5a880622f">
<img width="200" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/9a08e2b2-19e5-47bb-a297-85590f36db8d">
<img width="200" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/40172f7c-2566-434d-8c5e-3c730aa8a5ca">

<br>
<br>

# 💻 Development
## 1. Gyroscope의 값으로 캐릭터를 어떻게 이동시킬 수 있을까?

캐릭터는 x 축 혹은 y 축 만으로 이동하는 것이 아닌, 핸드폰의 기울어진 정도와 방향에 따라 대각선으로 이동할 수 있어야 했습니다. ```Gyroscope```는 x, y 축의 기울기 데이터를 제공하지만, 대각선의 각도와 값을 제공하지 않기 때문에, 어떻게 캐릭터를 대각선으로 이동시켜야 할지 고민을 해야 했습니다. 방법은 벡터였습니다. 벡터는 수학 개념으로 '**크기와 방향을 갖는 물리량**'을 의미합니다.
<br>

![벡터](https://user-images.githubusercontent.com/106131005/236632053-75f6175a-7c0c-4057-a4bb-c8da53867eab.jpeg)

위의 그림에서 볼 수 있듯이, 벡터의 값은 x 축의 데이터인 a(x)와 y 축의 데이터인 a(y)를 활용하여 계산 할 수 있습니다.

<br>
x, y 축의 기울기 값은 DeviceMotion에서 제공하는 'gamma', 'beta' 개념을 적용하였습니다. beta와 gamma는 각각 x 축, y 축을 기준으로 하는 회전 각도를 제공하며, output은 -π ~ π 이내의 값입니다.
<br>

<img width="600" alt="image" src="https://user-images.githubusercontent.com/106131005/230624623-6e781a4f-258b-4d8a-ac9d-0fc5316ce11d.png">

<br>
gamma와 beta를 물리엔진 라이브러리에 적용하여 아래와 같이 캐릭터를 실제 기울기 대로 움직이도록 할 수 있었습니다.

```js
  DeviceMotion.addListener((result) => {
    const { beta, gamma } = result.rotation;

    Matter.Body.setVelocity(entities.player.body, {
      x: gamma * 10,
      y: beta * 10,
    });
    // gamma, beta의 10은 속도 적용시의 가중치입니다. 리팩터링 해야 할 악취...
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

## 2. 하드코딩하지 않고 맵을 구현하는 방법은 없을까?
미로를 통과 해 목적지에 도착해야 하는 게임의 특성 상, 아래 스크린샷과 같이 직사각형의 ```Block``` 컴포넌트들을 조합하여 미로를 만들어야 했습니다.
<br>


<img width="300" alt="image" src="https://user-images.githubusercontent.com/106131005/232325732-b3da48a5-66ab-45a5-b94f-d4f1a3ca2c71.png">

위의 미로는 아래 코드와 같이 크기와 좌표를 ```BlockMaker```라는 컴포넌트 생성 함수에 블록의 크기와 위치를 인자로 전달하여 ```Block```컴포넌트를 정의하고, 물리엔진에 객체 형식으로 전달하여 구현했습니다.
처음에는 화면을 보며 ```BlockMaker```에 인자로 들어가는 크기와 좌표를 직접 설정했습니다.

<br>

### 2.1 문제점: 하드코딩으로 맵을 만드는 건 한계가 있다.
---
하지만 미로가 복잡해질수록 화면을 보며 직접 크기와 좌표를 설정하는 작업의 생산성과 정교함이 떨어졌습니다.
기존 하드코딩으로 만들었던 코드를 먼저 보겠습니다.

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

위의 하드코딩 방식은 아래와 같았습니다.
- 기준점으로 만들 직사각형 ```Block```의 위치와 크기를 지정한 후
- 직전 블럭의 위치와 크기를 고려해 이어지는 ```Block```의 위치와 크기를 지정

한두개면 모르겠지만 이런 방식으로 30개에서 100개(stage2 기준) 가량의 ```Block```들을 만드는건 비효율적이라 생각했습니다.

<br>

### 2.2 아이디어: 구글 스프레드시트를 활용하자.
---
하드코딩으로 맵을 만들다 보니, **GUI 환경**에서 맵을 만들 수 있다면 가장 이상적일 것 같았습니다. 그렇다고 게임을 만드는 GUI 툴을 만드는 건, 완전히 다른 프로젝트가 될 것 같았습니다.

대중적인 툴을 활용해서, 게임 만들기 GUI로 활용할 수 있는 방법을 고민해 봤습니다. 그러다 구글 스프레드시트가 떠올랐습니다. 제 프로젝트도 일정 등분으로 나누어진 grid와 비슷한 형태라는 생각이 들었기 때문입니다.

<당시 착안했던 grid 형태의 게임 디자인>

<img width="300" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/0575f768-5750-4b14-99c1-25aa4f25c538">

아래와 같이 구글 스프레드시트에 맵을 디자인할 수 있을 것이라 생각했습니다.
> 게임 내 요소들을 entity라고 말하겠습니다. ```entity```는 ```Block```, ```Item```, ```Monster```, ```Goal``` 등이 있습니다.

- 맵에 적용될 grid의 크기를 설정(해당 프로젝트는 시연용 Device의 Width를 16등분 한 크기의 정사각형을 grid 크기로 정의).
- gird의 크기에 따라 행은 16등분, 열은 36등분 하기로 결정.
- 행에는 row0 ~ row15, 열은 column0 ~ column35의 값을 주어 각 행렬에 어떠한 게임 entity가 포함되어 있는지를 판별.
- 스프레드시트에 맵을 디자인한 후 각 entity를 구별할 수 있는 고윳값을 입력해, 어떤 행렬에 속해있는지 판별.

<스프레드시트에 입력된 맵의 정보>

<img height="500" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/5ab55770-5f4b-42e7-85cd-8c0655c42001">
<img height="500" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/1e746211-51e9-4747-9ae5-a1d9128c228a">

위의 이미지와 같이 스프레드시트에 맵을 디자인한 후 게임에 사용될 ```entity```들의 고윳값을 부여했습니다. 고윳값은 맵 디자인 시 가시성을 위해 약어로 부여했고, 설명하면 아래와 같습니다.

- s(```Block```): s1 ~ s30은 맵에 렌더링 될 ```Block1``` ~ ```Block30```의 좌표와 크기를 나타낸다.
- i(```Item```): i1 ~ i19는 맵에 렌더링 될 ```Item1``` ~ ```Item30```의 좌표와 크기를 나타낸다.
- m(```Monster```): m1 ~ m4는 맵에 렌더링 될 ```Monster1``` ~ ```Monster4```의 좌표와 크기를 나타낸다.
- g(```Goal```): g1는 맵에 렌더링 될 ```Goal1```의 좌표와 크기를 나타낸다.

<br>

위의 정보를 통해 entity의 좌표와 크기를 구하는 방식을 s1을 예로 들면 아래와 같습니다.

- s1(Block1)은 row2와 col3~col8의 좌표 값을 갖고 있다.
- x 좌표: row는 x 축 값을 나타내므로 s1의 x좌표는 s1이 가진 최초 row의 index * grid 크기의 값을 가진다.
  > row2의 index는 2므로 grid의 크기가 10이라고 했을 때, x 축의 좌표는 2 * 10
- y 좌표: col은 y 축 값을 나타내므로 s1의 y좌표는 s1이 가진 최초 col의 index * grid 크기의 값을 가진다.
  > row3의 index는 3므로 grid의 크기가 10이라고 했을 때, y 축의 좌표는 3 * 10
- width: s1이 가진 row의 최댓값 index - 최솟값 index + 1 * grid의 크기
  > row2만 보유하고 있으므로 grid의 크기가 10이라고 했을 때, width는 2 - 2 + 1 * 10
- height: s1이 가진 col의 최댓값 index - 최솟값 index + 1 * grid의 크기
  > col3 ~ col8를 보유하고 있으므로 grid의 크기가 10이라고 했을 때, height는 8 - 3 + 1 * 10

<br>

### 2.3 구현 과정: 'col'과 'row'의 값을 요소의 크기와 좌표로 변환하자.
---
이제 스프레드시트의 데이터를 토대로 entity의 크기와 좌표를 계산 해 줄 로직을 만들 차례입니다.
가장 먼저 구글 스프레드시트의 데이터를 json 데이터로 추출했습니다.
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

위의 json 데이터에는 **column 별 row의 entity** 데이터가 객체 형식으로 있습니다.

하지만 제 프로젝트에서 필요한 데이터는 **entity 별 col, row의 값**이었으므로, json 정보를 가공해 줄 함수를 만들어야 했습니다.
json 데이터를 인수로 받는 함수는 데이터를 가공하여 아래와 같이 entity 별 col과 row의 값을 반환합니다.

<entity별 col & row 정보 예시>
```js
"s1": {
  "col": [3, 4, 5, 6, 7, 8],
  "row": [2, 2, 2, 2, 2, 2]
},
```
이러한 entity의 col, row 값에 grid와 넓이(필요시)의 값을 적용하는 함수를 통해 아래와 같이 entity들의 좌표와 크기를 구할 수 있었습니다.
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
      "position":{
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

<br>

### 2.4 결과: 한 번의 함수 호출로 맵 구현.
---
이제 한 번의 함수 호출만으로 map에 표현될 entity들의 위치를 모두 알 수 있게 되었습니다.
남은 건 이 데이터를 순회하며 entity들의 컴포넌트를 생성하는 유틸 함수를 호출하는 것뿐입니다.

<기존 하드코딩 방식>

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
    ...block30
```

<변경된 방식>

```js
    // 변경된 방식: 맵 entity의 정보를 바탕으로 선언적으로 컴포넌트를 정의해주는 함수를 실행
    ...makeBlocks(world, mapInfo, entityInfo[stage])
    // 개수에 상관없이 구글 스프레드시트와 entityInfo를 통해 만든 entity 정보를 토대로
    // 전체 entity들을 정의하여 물리엔진에 전달.
```
기존 방식 대로라면 30개에서 많게는 100개까지 되는 entity들의 위치와 크기를 하나씩 설정해 줘야 했겠지만,
구글 스프레드시트에 디자인한 entity들의 위치와 크기를 함수 호출 하나로 설정해 줄 수 있게 되었습니다.

<br>

또한 stage2의 경우, 캐릭터가 특정 위치에 도달하면 모든 entity들이 이동되는 대형 맵이었습니다.

<실제 게임에서의 뷰포트 변경>

<img width="300" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/30c08b96-1fe5-4aaa-966c-2db1ee497f7f">

그래서 Device의 뷰포트에서는 보이지 않는 맵까지 디자인해야 했습니다.
이때 아래와 같이 구글 스프레드시트를 활용하여 entity의 위치 정보를 정확히 알 수 있었으며, 뷰포트에서 볼 수 없는 위치의 맵까지 구현할 수 있었습니다.

<br>

<구글 스프레드시트로 디자인 한 대형 맵의 entity>

<img width="700" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/e113b96b-8d8b-43c7-8561-004160387ade">

위 스프레드시트에서 초기 뷰포트는 붉은색 박스입니다.
두 번째 뷰포트는 캐릭터가 파란색 테두리의 위치(f1)에 도착해야만 entity들의 좌표가 변경되며 보이게 됩니다.
스프레드시트의 맵 정보를 정확히 게임에 반영할 수 있었기에 뷰포트에 보이지 않는 맵을 디자인할 수 있었습니다.

<br>
<br>

# 🛠 Optimization

구글 스프레드시트의 위치와 크기를 가져올 수 있게 된 이후 대형 맵 제작을 시작했습니다. 스프레드시트에 디자인만 하면 위치와 크기에 맞게 한 번에 렌더링까지 시켜주는 로직을 구현했으니 간단히 끝날 문제로 생각했습니다. 하지만 기껏 4개 뷰포트의 대형 맵을 만들고 나니 화면이 엄청나게 버벅였습니다.

최적화가 문제였습니다.

<br>

## 1. 원인: 물리엔진이 너무 많은 컴포넌트를 전달하고 있었다.

물리엔진은 초당 60회 entity들을 업데이트합니다. 그렇기 때문에 캐릭터는 벽에 가로막히고 몬스터와  등, 물리엔진에 정의해 놓은 물리법칙에 적용되며 상호작용할 수 있습니다.
하지만 초당 60회의 업데이트는 많은 리소스를 필요로 합니다.

최적화에 문제개 생긴 이유는 바로 이 물리엔진에 너무 많은 컴포넌트를 전달했기 때문이었습니다.
첫 번째 스테이지에서 물리엔진에 건네지는 entity는 약 50개였던 반면, 두 번째 스테이지의 entity는 약 100개로 두배 가량 많았습니다.

<br>

## 2. 해결방법

### 2.1 사용했던 컴포넌트를 재구성 하자.
---
<구글 스프레드시트로 디자인 한 대형 맵의 entity >

<img width="700" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/e113b96b-8d8b-43c7-8561-004160387ade">

처음 생각했던건 보라색 테두리의 이동 플래그(f1)에 도달했을 때를 기준으로 물리엔진에 두 번째 뷰포트의 entity를 전달하는 방식이었습니다.
하지만 물리엔진에 다른 entity를 인자로 전달하기 위해서는, 게임엔진을 종료시킨 후 새로운 entity를 전달하는 수밖에 없었습니다.
이런 방식은 처음 구상했던 물 흐르듯이 이동되는 스테이지와는 거리가 있었습니다.

물 흐르듯이 스테이지가 이동되려면, 물리엔진에 전달되는 entity를 바꾸지 않은 채로 최적화를 진행해야 했습니다.
최적화의 포인트는 물리엔진에 전달되는 entity를 줄이는 것이었고, **재구성**을 고안했습니다.

<br>
<br>

다시 위의 구글 스프레드시트와 게임 화면을 보면, 첫 번째 뷰포트에서 두 번째 뷰포트로 이동할 때 두 맵의 요소들은 일정 부분 함께 렌더링 될 수밖에 없습니다.
하지만 첫 번째 뷰포트와 세 번째 뷰포트는 절대 함께 렌더링 될 수 없는 구조였습니다.

결국 첫 번째 뷰포트에서 두 번째 뷰포트로 옮긴 시점에, 첫 번째 뷰포트의 entity들의 위치를 세 번째 뷰포트에 **재구성**했습니다.

<첫 번째 뷰포트 entity의 재구성 예시>

<img width="700" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/21dbdf48-a484-428b-8758-bd9dc638d51a">

두 번째 뷰포트가 메인 뷰포트로 이동이 완료 된 이후, 파란색 박스의 s1은 s38의 좌표로 이동합니다.
마찬가지로 s2 ~ s18에 해당하는 ```Block```들은 s39 ~ s55의 위치로 이동하고, 아이템과 몬스터도 같은 방식으로 재사용 했습니다.
결국 렌더링되는 entity들의 수를 30개(```Block``` 18개, ```Monster``` 2개, ```Item``` 9개) 가량 줄일 수 있었습니다.

이러한 **재구성**의 방식으로 맵을 디자인하다 보니, 맵을 디자인하는데 어려움이 증가하기는 했습니다.
이왕이면 게임엔진에 entity들을 가변적으로 전달하거나 근본적인 해결책을 찾고 싶었지만, 프로젝트의 일정을 고려하여 절충하기로 했습니다.

<br>

### 2.2 충돌 감지를 직접 구현.
---
<img width="300" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/91f508a3-9163-431b-8a45-7c495d128fd5">

물리엔진에 entity를 전달하는 이유 중 하나는 entity들의 영역을 설정 해 충돌을 감지하기 위해서입니다.
하지만 위에 언급했듯이 물리엔진은 많은 코스트를 필요로 합니다. 결국 상호작용이 비교적 간단한 아이템과 같은 entity들은 물리엔진에 건네지 않고 좌표와 크기만 전달했습니다.
그리고 건네받은 좌표와 크기만으로 충돌을 감지하도록 구현했습니다.

<br>

기존에는 물리엔진에서 entity의 영역을 정의해 충동을 구현하고, 아이템과 충돌이 발생하면 점수만 상태로 관리하였습니다.
변경한 방식은 게임엔진에 아이템 entity들의 좌표값만 전달하고, 아이템들의 영역을 직접 설정하여 충돌 여부만 판별하도록 했습니다.

```js
  itemArray.forEach((num) => {
    const itemPosition = mapInfo.item[num + 1].position;
    const itemWidth = mapInfo.item[num + 1].size.width;

    if (
      player.position.x > itemPosition.x - itemWidth &&
      player.position.x < itemPosition.x + itemWidth &&
      player.position.y > itemPosition.y - itemWidth &&
      player.position.y < itemPosition.y + itemWidth
    ) {
      dispatch({ type: "get_item", payload: num + 1 });
    }
  });
```

Development에서 언급한 스프레드시트의 좌표를 가져오는 로직 덕분에, 정확한 좌표와 영역을 계산할 수 있었습니다.
<br>
아이템 획득으로 인한 점수 반영 및 렌더링을 여부는 redux의 상태 관리를 사용했습니다.
아래와 같이 ```Custom Thunk```를 활용하여 이미 획득한 아이팀인지 상태를 확인 후 dispatch 하도록 하였습니다.

```js
export const getItemOnce = (num) => (dispatch, getState) => {
  const canGetItem = selectItemsVisible(getState())[num];

  if (canGetItem) {
    dispatch(getItem(num));
  }
};
```

결국 물리엔진에서 매초 60회 업데이하던 27개 아이템 entity들의 리소스를 절약할 수 있었습니다.

<br>
<br>

# 🎞 User Experience
게임 가장 큰 목적은 유저의 즐거운 플레이 경험이라고 생각합니다.
그러다 보니 지금까지 웹페이지를 개발했을 때 보다 유저 경험을 더욱 신경 쓸 수밖에 없었습니다.

<br>

## 1. Gyroscope 초기 기울기 설정 및 미리 보기 기능

Development 섹션에서 설명했듯이, 캐릭터는 Device의 기울기에 따라 움직이게 됩니다.
그리고 기울기를 계산하기 위한 초기값(beta:0, gamma:0)은 핸드폰이 지면과 수평으로 놓였을 때입니다.
이 상태에서 앞으로 이동하려면 유저 핸드폰을 수평에서 앞쪽으로 더 기울여야 합니다.
고개를 지면으로 숙이면서 게임을 해야만 하는 것이죠.

그래서 유저가 초기 기울기를 설정할 수 있는 기능을 만들었습니다.
유저는 핸드폰을 기울여가며 몇 도의 기울기를 초기로 설정할지 실시간으로 확인할 수 있습니다.
그리고 실제 게임에서 어떻게 동작하는지 preview 기능을 통해 확인 후 수정할 수 있습니다.

<img width="300" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/db7b957f-9565-419b-bb0d-f081c63b8952">

설정한 초기 기울기는 redux의 전역 상태로 관리되며, 이 초기 기울기를 기준으로 캐릭터의 움직임이 계산됩니다.
이제 유저가 원하면 고개를 세우거나 누워서도 게임을 할 수 있습니다.

<br>

## 2. 애니메이션 효과

웹페이지와는 다르게 게임에서 전달하는 정보는 단순합니다. 간단히 예를 들자면 몬스터, 점수, 게임오버, 제한 시간 정도입니다. 하지만 게임은 이런 단순한 정보도 임팩트 있고 재미있게 전달해야 한다고 생각했습니다. 그래야만 게임의 몰입감을 해치지 않을 수 있고, 사용자의 경험을 극대화할 수 있다고 생각했습니다.

### 2.1 화면 전환
---
웹페이지에서 페이지가 변경될 때는 SPI의 지연 없는 화면 이동이 깔끔하고 쾌적하게 느껴졌습니다.
하지만 게임에서 웹페이지처럼 빠른 화면 전환이 이루어지니, 허전하고 게임에 대한 몰입감이 깨지는 느낌이었습니다.

<img width="300" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/e90453a8-970a-4c0e-b2ce-4138a62d9064">

전달하는 정보의 내용이 바뀌는 웹페이지와는 다르게, 게임에서의 화면 이동은 공간이 이동되는 개념으로도 볼 수 있다고 생각했습니다.
그래서 화면을 쓸어내리는 효과를 주어 공간이 바뀌는 효과를 자연스럽게 주고 싶었습니다.

<img width="300" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/b6612a20-0b30-4f90-bb2b-62404d21e08c">

크기와 y 축의 위치가 변경되는 마름모들을 연속하여 렌더링 시키는 로직을 작성해서 화면전환 애니메이션을 구현했습니다.
부족하긴 해도 기존 화면 전환과 비교해 보면 더욱 생동감 있고, 공간적 이동을 연상시키는 것을 확인할 수 있습니다.

<br>

### 2.2 정보 전달
---
게임을 하는 유저는 플레이 중인 캐릭터에 집중하게 됩니다. 하지만 유저가 게임 중이라 하더라도, 꼭 필요한 정보는 효과적이고 확실하게 전달할 필요가 있었습니다.

한 예로, 제한 시간이 10초 이하로 남았을 때에는 애니메이션을 부여하여 유저가 제한 시간이 임박했다는 사실을 알 수 있도록 했습니다.

<img width="300" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/54228706-0017-47cb-b6ef-d70d4ea54ec6">


이외에도 게임오버, 클리어 점수 집계 등 임팩트가 필요한 부분에 애니메이션을 추가하여 사용자가 더욱 생동감 있게 게임에 몰입할 수 있도록 노력했습니다.

<img width="300" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/fbc36ee2-681c-4798-a1b4-586d5896e3ad">
<img width="300" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/6ffbf49f-2948-4709-8511-6453e4639c0a">

<br>
<br>


# 🔫 Trouble Shooting
게임을 개발하다 보니 오류 메시지는 출력되지 않지만, 원하는 대로 작동하지 않는 '예외 상황'이 자주 발생했습니다. 에러 메시지가 없으니 문제가 무엇인지 파악하는데 다소 어려움이 있었습니다.

하지만 '예외 상황'의 전후 문맥을 분석하고 코드의 흐름을 쫓아가며 문제점을 찾는 경험은 의미 있었다고 생각합니다.

<br>

## 1. 캐릭터가 벽을 통과한다?
개발을 하며 기능이 완성될 때마다 주위 사람들에게 플레이를 부탁했습니다. 그러던 중 한 동료가 온몸을 비틀며 게임을 했고, 캐릭터가 벽을 통과하는 현상이 발생했습니다.

<img width="300" alt="image" src="https://github.com/TiltitProject/tiltit/assets/106131005/55d95836-6ba6-4371-baa9-6ac8c9bdd57c">

오류 메시지는 전혀 없었습니다. 게임은 제가 구현한 대로 잘 작동하고 있었고, 그럼에도 캐릭터가 벽을 통화한 것입니다. 오류 메시지가 없었기 때문에, 문제 발생하는 상황을 분석해 봤습니다.

- Device를 대각선으로 심하게 기울이면 벽을 통과하는 현상이 발생한다.
- 두꺼운 벽은 통과하지 못한다.

아무래도 캐릭터의 속도가 문제인 것 같았습니다. 일반적인 플레이 시 gamma, beta 값은 1 ~ -1 이내였던 반면, 대각선으로 심하게 기울이면 2 ~ -2의 범위를 초과했고, 결국 벽을 통과했습니다.

그렇다고 해도 캐릭터의 속도가 빨라진다고 벽을 통과한다는 건 이해할 수 없었습니다. 오류 메시지도 없었기 때문입니다.

하지만 물리엔진의 작동원리를 생각해 보니 납득이 갔습니다. 캐릭터가 벽을 인식하고 통과할 수 없었던 이유는 게임엔진에서 초당 60회 만큼 ```Block``` 컴포넌트의 속성을 ```static```으로 정의하고, 해당 영역을 통과하지 못하도록 업데이트하기 때문입니다.
```js
  const initialFloor = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    {
      label: "Floor",
      isStatic: true,
      image,
    },
  );
```
그런데 캐릭터의 속도가 너무 빨라지다 보니, 프레임당 이동한 거리가 벽의 넓이를 초과하여 벽을 통과했던 것입니다.

결국 속도의 최대치를 제한하여 벽을 통과하는 '예외 상황'을 방지할 수 있었습니다.

<br>

## 2. 효과음이 메모리 누수를 발생시키고 있었다.
최적화 이후 성능 문제는 없다고 생각하고 있었습니다. 적어도 첫 번째 뷰포트에서 플레이할 때는 성능 문제가 없었습니다. 하지만 스테이지 2의 마지막 뷰포트로 진행할수록 버벅임이 증가했고 재생되던 효과음이 멈추기도 했습니다. 이와 중 오류 메시지는 없었기 때문에, 문제의 원인을 찾는 게 다소 막연했습니다.

문제점의 특징은 크게 두 가지였습니다.
- 게임 플레이 초기에는 발생하지 않지만, 게임을 지속할수록 성능 문제가 발생한다.
- 버벅대다 결국 소리가 재생되지 않는다.

마치 게임을 진행하며 메모리에 무언가 누적되는 것과 같은 현상이었습니다.
게임을 하며 누적될 만한 요소가 무엇이 있을지 생각해 봤습니다.

가장 먼저 생각한 건 이벤트리스너였습니다.
Device의 자이로스코프 값을 구독하는 이벤트리스너를 점검했지만 중복되어 호출되지는 않았습니다.

그다음으로 컴포넌트에서 발생하는 애니메이션 효과가 중복으로 발생되는지 점검했습니다.
```useEffect```를 쓰지 않아 중복으로 발생하는 애니메이션 효과를 발견하고 수정했지만 문제 상황은 계속됐습니다.

마지막으로 효과음을 점검했습니다. 캐릭터가 움직일 때마다 효과음이 발생했기 때문이었습니다.
결론적으로 문제는 효과음에 있었습니다. [공식문서](#https://docs.expo.dev/versions/latest/sdk/av/#unloadasync) 확인 결과 React Native Expo에서는 사운드 효과를 언로드하지 않으면 메모리에 계속 쌓이는 문제가 있었습니다.

결국 소리가 재생된 이후 언로드를 통해 메모리에서 효과음을 제거해 줬고 문제 상황을 해결할 수 있었습니다.

```js
export default async function playAudio(resource) {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(resource); // 메모리에 로드
    await soundObject.playAsync();
    setTimeout(() => {
      if (soundObject) {
        soundObject.unloadAsync(); // 메모리에서 언로드
      }
    }, 500);
  } catch (error) {
    console.warn("Failed to load and play audio:", error);
  }
}
```
<br>

# Refactoring
자바스크립트의 이터러블/이터레이터 프로토콜을 활용한 함수형프로그래밍 기법을 적용하여 프로젝트를 개선할 수 있겠다 생각했습니다. 객체나 배열뿐만 아니라 반복적으로 이루어지는 모든 작업에 함수형 프로그래밍을 적용할 수 있을것이라 생각합니다. fxjs 라이브러리를 활용했습니다.

## 1. List
- 스프레드시트 파싱 로직
- 물리엔진의 순회 로직을 함수형 프로그래밍으로
- 제너레이터를 활요하여 몬스터의 좌우 반복 행동을 정의

## 2. 스프레드시트 파싱 로직
스프레드시트 파싱 로직은 상당히 많은 반복로직을 순회합니다.
하지만 기존 코드는 중복이 많고 가독성과 재사용성이 떨어졌습니다.
이러한 방식을 이터러블을 활용한 함수형프로그래밍 기법으로 일부 개선했습니다.

- 기존
```js

const scaffoldByRowAndCol = (entity) => {
  const objects = {
    block: {},
    monster: {},
    item: {},
    goal: {},
    flag: {},
    special: {},
    boss: {},
    attack: {},
  };
  Array.from(Array(entity.block.number).keys()).forEach((num) => {
    objects.block[`s${num + 1}`] = {
      row: [],
      col: [],
    };
  });
  ...
  /// 이후 생략

  return objects;
};

const scaffoldByPosition = (entity) => {
  const objects = {
    block: {},
    monster: {},
    item: {},
    goal: {},
    flag: {},
    special: {},
    boss: {},
    attack: {},
  };
  Array.from(Array(entity.block.number).keys()).forEach((num) => {
    objects.block[num + 1] = {
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: 0,
        height: 0,
      },
    };
  });
  ... 이후 생략

  return objects;
};
```

- 변경
```js
const scaffoldEntity = (entityInfo, structure) =>
  go(
    entityInfo,
    Object.entries,
    filter(([_, { number }]) => number),
    map(([k, v]) => [
      v.id,
      go(range(v.number), (numbers) =>
        numbers.reduce(
          (obj, num) => ((obj[`${num + 1}`] = structure), obj),
          {},
        ),
      ),
    ]),
    (entries) => entries.reduce((obj, [k, v]) => ((obj[k] = v), obj), {}),
  );

const scaffoldByRowAndCol = (entity) =>
  scaffoldEntity(entity, {
    row: [],
    col: [],
  });

const scaffoldByPosition = (entity) =>
  scaffoldEntity(entity, {
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
  });
```

부끄럽지만 기존 코드에서는 반복문으로 처리할 수 있는 부분이 불필요하게 중복되었습니다.
함수형프로그래밍을 적용하여 변경한 코드는 불필요한 중복코드가 없으며 간결하게 표현된 것을 확인할 수 있습니다. 전체 코드를 쓰지는 않았지만, 기존 150줄 가량 차지하던 코드를 단 38줄의 표현으로 대체했습니다.

하지만 위의 로직으로 만든 뼈대 객체에 구글 스프레드시트의 정보를 파싱하여 반영하는 코드는 아직 리팩터링에 성공하지 못했습니다.

- 기존
```js
const crawlingSheetData = (data, entity) => {
  const objectRowCol = scaffoldByRowAndCol(entity);
  const columnArray = Object.values(data);

  columnArray.forEach((eachColumn, columnIndex) => {
    const rowArray = Object.values(eachColumn);

    rowArray.forEach((object, rowIndex) => {
      if (object && [...object].includes("s")) {
        objectRowCol.block[object]?.row.push(rowIndex);
        objectRowCol.block[object]?.col.push(columnIndex);
      }
      ...
      //하드코딩 생략
    });
  });

  return objectRowCol;
};
```

- 변경

```js

export default function applySheet() {
  const scaffoldDataByRowAndCol = scaffoldByRowAndCol(entityInfo[1]);

  go(
    spreadSheet[1],
    Object.entries,
    (object) =>
      object.forEach(([col, rowsObject]) => {
        Object.values(rowsObject).forEach((entity, rowIndex) => {
          if (entity) {
            const [id, ...nums] = entity;
            scaffoldDataByRowAndCol[id][nums.join("")].col.push(col);
            scaffoldDataByRowAndCol[id][nums.join("")].row.push(rowIndex + 1);
          }
        });
      }),
    () => console.log(JSON.stringify(scaffoldDataByRowAndCol)),
  );
}
```
콘솔을 출력해 보면, 뼈대 객체에 반영된 스프레드 시트의 데이터가 비정상적으로 많았습니다. 이터러블을 제대로 제어하지 못해 필요 이상의 데이터가 반영된 것으로 보입니다. 이 부분은 향후 수정하여 반영 할 계획입니다.


<br>

# 🕹 Feature

- 메인페이지
  + 기울기 초기값 설정
    * 초기값 설정: 유저가 원하는 Device의 초기 기울기를 설정 할 수 있습니다. (별도의 설정이 없으면 Device가 지면에 수평인 상태가 초기값입니다.)
    * 미리보기 기능: 기울기 설정 후 실제 게임에서의 움직임을 미리 확인 가능합니다.
  + 게임시작: 원하는 스테이지를 선택해 게임을 시작할 수 있습니다.
- 게임
  + 이동방식: Device 기울기에 따라 속도와 방향이 정해지며 캐릭터가 이동합니다.
  + 승리조건: 트로피를 획득하거나 보스 몬스터를 처치합니다.
  + 게임오버: 캐릭터가 몬스터에 부딪히거나 제한시간이 초과되면 게임오버됩니다.
  + <details>
    <summary>Entity(게임의 캐릭터와 상호작용하는 요소)</summary>

    * 블록(미로): 블록들을 쌓아올려 캐릭터가 이동 할 수 없도록 만든 컴포넌트입니다.
    * 몬스터: 각 몬스터 마다의 이동방향 & 속도대로 움직이며, 캐릭터와 충돌시 게임오버됩니다.
    * 아이템: 과일로 표현되었으며, 캐릭터와의 접촉을 통해 점수에 반영됩니다.
    * 특수 아이템: stage2에 나오는 빛나는 아이템입니다. 특수 아이템 획득 시 무적상태가 되며, 몬스터 캐릭터가 충돌시 몬스터를 튕겨낼 수 있습니다.
    * 보스 몬스터: stage2 마지막에 나오는 몬스터입니다. 보스 몬스터를 만나면 게임은 슈팅게임과 같이 변합니다. 보스 몬스터가 던지는 일반 몬스터를 피하며 열매를 던져 보스 몬스터를 해치워야 합니다.

    </details>
  + 뷰포트 이동: stage2는 총 4개의 뷰포트로 구성되어 있습니다. 게임 내 화살표 지점으로 이동하면 미끄러지듯이 뷰포트의 이동이 이루어집니다.
- 메뉴: 화면 터치 시 게임은 일시정지되며, 스테이지 선택, 재시작, 메인페이지 이동, 게임 계속 메뉴 중 선택할 수 있습니다.
- 헤더
  + 점수: 아이템 획득시 왼쪽 상단의 점수에 반영됩니다.
  + 제한 시간: 남은 시간을 보여줍니다. 10초 이하가 되면 애니메이션이 적용되어 가시성이 높아집니다.
- 게임 결과: 승리조건 달성 시 남은 제한 시간과 획득한 점수로 최종 점수를 보여주는 애니메이션이 실행됩니다.
- <details>
  <summary>사운드</summary>

  + BGM: 메인페이지에서만 재생되는 BGM이 제공됩니다. 메인페이지를 벗어나면 재생은 멈춥니다.
  + 효과음: 게임시작, 버튼 클릭, 화면 전환, 캐릭터 이동, 몬스터와 충돌 시 효과음이 재생됩니다.

  </details>
<br>
<br>

# 📂 Tech stack

- React Native Expo
- Redux-toolkit
- React-Native-Game-Engine
- matter.js
- ESLint
- Jest

### 1. Why React Native Game Engine?

* 성능
  - React Native Game Engine은 React Native의 성능을 최적화하여 게임 개발에 적합한 환경을 제공합니다
* 커뮤니티 및 생태계
  - React Native Game Engine은 활발한 커뮤니티와 생태계를 가지고 있습니다.
* 사용의 편의성
  - React Native Game Engine은 React 컴포넌트 모델을 사용합니다. 리액트 컴포넌트의 다양한 기능들을 게임에 접목시키는 경험을 해보고 싶었습니다.

<br>

### 2. Why Matter.js?

* 기능
  - 다양한 물리 효과를 쉽게 구현할 수 있습니다.
* 커뮤니티 및 생태계
  - 활발한 커뮤니티와 생태계를 가지고 있습니다.
  - 공식문서에 정리가 잘 되어있습니다.
* 사용의 편의성
  - React Native와 호환성: Matter.js는 React Native와 호환성이 좋은 라이브러리입니다.

<br>

# 🗓 Timeline

### 프로젝트 기간: 2023.04.03(월) ~ 2023.04.28(금)

- 1 주차: 기획 및 설계
- 2~3 주차: 기능 개발
- 4 주차: 테스트코드 작성, 발표

<br>
