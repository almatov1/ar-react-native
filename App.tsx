import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ViroAmbientLight, ViroARScene, ViroARSceneNavigator, ViroBox, ViroDirectionalLight, ViroMaterials, ViroText, ViroTrackingReason, ViroTrackingStateConstants } from '@reactvision/react-viro';

const HelloWorldSceneAR = () => {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, -0.5, -1]);
  const [scale, setScale] = useState([0.2, 0.2, 0.2]);
  const [initialScale, setInitialScale] = useState([0.2, 0.2, 0.2]);

  return (
    <ViroARScene>
      {/* Освещение для лучшей видимости текстуры и граней */}
      <ViroAmbientLight color={"#aaaaaa"} />
      <ViroDirectionalLight color={"#ffffff"} direction={[0, -1, -0.5]} />

      {/* Куб с текстурой и жестами */}
      <ViroBox
        position={position as any}
        scale={scale as any}
        rotation={rotation as any}
        materials={["cubeTexture"]}
        onDrag={(draggedPosition) => setPosition(draggedPosition)}
        onPinch={(pinchScaleFactor, pinchState, source) => {
          if (pinchState === 1) { // Начало жеста "щипка", сохраняем начальный масштаб
            setInitialScale(scale);
          }

          if (pinchState === 2) { // Во время жеста "щипка"
            const newScaleFactor = Math.max(0.05, Math.min(0.5, initialScale[0] * pinchScaleFactor));
            setScale([newScaleFactor, newScaleFactor, newScaleFactor]);
          }
        }}

      // onRotate={(rotateState, rotationFactor, source) => {
      //   if (rotateState === 3) { // Завершение вращения
      //     const newRotation = [rotation[0], rotation[1] + rotationFactor, rotation[2]];
      //     setRotation(newRotation);
      //   }
      // }}
      />
    </ViroARScene>
  );
};

const App = () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
}
export default App;

var styles = StyleSheet.create({
  f1: { flex: 1 }
});

ViroMaterials.createMaterials({
  cubeTexture: {
    diffuseTexture: require('./wood.jpg'), // путь к вашей текстуре
  },
});
