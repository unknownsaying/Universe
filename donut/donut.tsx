"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

function Torus({ radius, tube, rotationX, rotationY, rotationZ }) {
  return (
    <mesh rotation={[rotationX, rotationY, rotationZ]}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export default function Component() {
  const [radius, setRadius] = useState(1)
  const [tube, setTube] = useState(0.4)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)
  const [rotationZ, setRotationZ] = useState(0)

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-4 space-y-4">
        <div>
          <Label htmlFor="radius">Radius: {radius.toFixed(2)}</Label>
          <Slider
            id="radius"
            min={0.5}
            max={2}
            step={0.1}
            value={[radius]}
            onValueChange={(value) => setRadius(value[0])}
          />
        </div>
        <div>
          <Label htmlFor="tube">Tube Thickness: {tube.toFixed(2)}</Label>
          <Slider
            id="tube"
            min={0.1}
            max={1}
            step={0.1}
            value={[tube]}
            onValueChange={(value) => setTube(value[0])}
          />
        </div>
        <div>
          <Label htmlFor="rotationX">Rotation X: {rotationX.toFixed(2)}</Label>
          <Slider
            id="rotationX"
            min={0}
            max={Math.PI * 2}
            step={0.1}
            value={[rotationX]}
            onValueChange={(value) => setRotationX(value[0])}
          />
        </div>
        <div>
          <Label htmlFor="rotationY">Rotation Y: {rotationY.toFixed(2)}</Label>
          <Slider
            id="rotationY"
            min={0}
            max={Math.PI * 2}
            step={0.1}
            value={[rotationY]}
            onValueChange={(value) => setRotationY(value[0])}
          />
        </div>
        <div>
          <Label htmlFor="rotationZ">Rotation Z: {rotationZ.toFixed(2)}</Label>
          <Slider
            id="rotationZ"
            min={0}
            max={Math.PI * 2}
            step={0.1}
            value={[rotationZ]}
            onValueChange={(value) => setRotationZ(value[0])}
          />
        </div>
      </div>
      <div className="w-full md:w-2/3 h-full">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Torus
            radius={radius}
            tube={tube}
            rotationX={rotationX}
            rotationY={rotationY}
            rotationZ={rotationZ}
          />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}