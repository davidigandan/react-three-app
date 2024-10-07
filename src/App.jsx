import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { SketchPicker } from 'react-color';
import './App.css';

// Cuboid Component
const Cuboid = ({ color, spinning }) => {
  const meshRef = useRef();

  // Add rotation logic using useFrame
  useFrame(() => {
    if (spinning && meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Spin the cuboid along the Y-axis
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Scene setup component
const Scene = ({ color, spinning }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Cuboid color={color} spinning={spinning} />
      <PerspectiveCamera makeDefault position={[3, 3, 3]} />
      {/* Add OrbitControls for mouse interaction */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  );
};

function App() {
  const [color, setColor] = useState('#ff0000');
  const [spinning, setSpinning] = useState(false); // State to control spinning

  const toggleSpinning = () => {
    setSpinning(!spinning); // Toggle spinning on and off
  };

  return (
    <div className="App">
      <div className="controls">
        <button onClick={toggleSpinning}>{spinning ? 'Stop Spin' : 'Start Spin'}</button>
      </div>
      <div className="color-picker">
        <SketchPicker
          color={color}
          onChangeComplete={(newColor) => setColor(newColor.hex)}
        />
      </div>
      <Canvas style={{ background: '#f0f0f0' }}>
        <Scene color={color} spinning={spinning} />
      </Canvas>
    </div>
  );
}

export default App;
