"use client"

import { useState, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

function Torus({ radius, tube, rotationX, rotationY, rotationZ }) {
  const { camera } = useThree()

  useEffect(() => {
    const size = Math.max(radius, tube) * 2
    camera.position.set(size, size, size)
    camera.far = size * 100
    camera.updateProjectionMatrix()
  }, [radius, tube, camera])

  return (
    <mesh rotation={[rotationX, rotationY, rotationZ]}>
      <torusGeometry args={[radius, tube, 32, 100]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

function formatValue(value) {
  if (value >= 1e6) {
    return value.toExponential(2)
  }
  return value.toFixed(2)
}

export default function Component() {
  const [radius, setRadius] = useState(1)
  const [tube, setTube] = useState(0.4)
  const [rotationX, setRotationX] = useState(0)
  const [rotationY, setRotationY] = useState(0)
  const [rotationZ, setRotationZ] = useState(0)

  const logSliderValue = (value, min, max) => {
    const minv = Math.log(min)
    const maxv = Math.log(max)
    const scale = (maxv - minv) / 100
    return Math.exp(minv + scale * value)
  }

  const handleRadiusChange = (value) => {
    setRadius(logSliderValue(value[0], 0.1, 1e10))
  }

  const handleTubeChange = (value) => {
    setTube(logSliderValue(value[0], 0.01, 1e9))
  }

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-4 space-y-4">
        <div>
          <Label htmlFor="radius">Radius: {formatValue(radius)}</Label>
          <Slider
            id="radius"
            min={0}
            max={100}
            step={0.1}
            value={[Math.log(radius) / Math.log(1e10) * 100]}
            onValueChange={handleRadiusChange}
          />
        </div>
        <div>
          <Label htmlFor="tube">Tube Thickness: {formatValue(tube)}</Label>
          <Slider
            id="tube"
            min={0}
            max={100}
            step={0.1}
            value={[Math.log(tube) / Math.log(1e9) * 100]}
            onValueChange={handleTubeChange}
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
        <Canvas>
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