import React from "react";
import Matter, { Body } from "matter-js";
import { View, Image, ImageSourcePropType } from "react-native";

interface BlockMakerProps {
  world: Matter.World;
  position: { x: number; y: number };
  size: { width: number; height: number };
  image: ImageSourcePropType;
}

interface ExtendedBody extends Body {
  image: ImageSourcePropType;
}

interface BlockProps {
  body: ExtendedBody;
}

export default function BlockMaker({
  world,
  position,
  size,
  image,
}: BlockMakerProps) {
  const initialFloor = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    {
      label: "Floor",
      isStatic: true,
    }
  ) as ExtendedBody;

  initialFloor.image = image;
  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    position,
    renderer: <Block body={initialFloor} />,
  };
}

function Block({ body }: BlockProps) {
  const { bounds, position, image } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;

  return (
    <View style={viewStyle(xBody, yBody, widthBody, heightBody)}>
      <Image
        style={floorStyle(heightBody, widthBody)}
        resizeMode="repeat"
        source={image}
      />
    </View>
  );
}

function viewStyle(
  xBody: number,
  yBody: number,
  widthBody: number,
  heightBody: number
) {
  return {
    position: "absolute" as "absolute",
    left: xBody,
    top: yBody,
    width: widthBody,
    height: heightBody,
  };
}

function floorStyle(heightBody: number, widthBody: number) {
  return {
    height: heightBody,
    width: widthBody,
    borderWidth: 1,
  };
}
