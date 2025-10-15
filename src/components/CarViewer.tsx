import { Suspense, useEffect, useState, useRef } from "react"
import * as THREE from "three"
import "./CarViewer.css"

import { Canvas } from "@react-three/fiber"
import {
  OrbitControls,
  useGLTF,
  Environment,
  PerspectiveCamera,
  Html,
  Reflector,
} from "@react-three/drei"
import { Perf } from "r3f-perf"
import { ControlsPanel } from "./ControlsPanel" // NEW FILE we'll create

function CarModel({
  modelPath,
  color,
  finish,
  tint,
  wheels,
}: {
  modelPath: string
  color: string
  finish: string
  tint: string
  wheels: string
}) {
  const { scene } = useGLTF(modelPath)

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const matName = child.material.name?.toLowerCase() || ""

        // 🎨 Car body
        if (matName.includes("carpaint") || matName.includes("body")) {
          child.material.color = new THREE.Color(color)
          if (finish === "glossy") {
            child.material.metalness = 1
            child.material.roughness = 0.3
          } else {
            child.material.metalness = 0.2
            child.material.roughness = 1
          }
          child.material.needsUpdate = true
        }

        // 🪟 Windows
        if (matName.includes("glass") || matName.includes("window")) {
          child.material.transparent = true
          child.material.opacity = tint === "dark" ? 0.3 : 0.7
          child.material.needsUpdate = true
        }

        // 🛞 Rims
        if (
          matName.includes("rim") ||
          matName.includes("wheel_rim") ||
          child.name.toLowerCase().includes("rim")
        ) {
          if (wheels === "style1") {
            child.material.color = new THREE.Color("#333333")
          } else if (wheels === "style2") {
            child.material.color = new THREE.Color("#aaaaaa")
          } else {
            child.material.color = new THREE.Color("#ffd700")
          }
          child.material.metalness = 0.9
          child.material.roughness = 0.2
          child.material.needsUpdate = true
        }

        // ⬛ Tires
        if (
          matName.includes("tire") ||
          matName.includes("rubber") ||
          child.name.toLowerCase().includes("tire")
        ) {
          child.material.color = new THREE.Color("#111111")
          child.material.roughness = 1
          child.material.metalness = 0
          child.material.needsUpdate = true
        }

        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene, color, finish, tint, wheels])

  return <primitive object={scene} scale={1.1} position={[0, -1, 0]} />
}

export default function CarViewer() {
  const [selectedCar, setSelectedCar] = useState("fortuner")
  const [color, setColor] = useState("#ffffff")
  const [finish, setFinish] = useState("glossy")
  const [tint, setTint] = useState("light")
  const [wheels, setWheels] = useState("style1")
  const [lighting, setLighting] = useState("day")

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const carModels: Record<string, string> = {
    fortuner: "models/toyota_fortuner_2021.glb",
    suv: "/models/suv.glb",
  }

  const resetAll = () => {
    setSelectedCar("fortuner")
    setColor("#ffffff")
    setFinish("glossy")
    setTint("light")
    setWheels("style1")
    setLighting("day")
  }

  const takeScreenshot = () => {
    if (!canvasRef.current) return
    const dataUrl = canvasRef.current.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "custom-car.png"
    link.href = dataUrl
    link.click()
  }

  return (
    <div className="car-viewer-container">
      {/* 🔽 Config Panel (your dropdowns) */}
      <div className="config-panel">
        <label>
          Select Car
          <select
            value={selectedCar}
            onChange={(e) => setSelectedCar(e.target.value)}
          >
            <option value="fortuner">Toyota Fortuner</option>
            <option value="suv">Generic SUV</option>
          </select>
        </label>

        <label>
          Color
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>

        <label>
          Finish
          <select value={finish} onChange={(e) => setFinish(e.target.value)}>
            <option value="glossy">Glossy</option>
            <option value="matte">Matte</option>
          </select>
        </label>

        <label>
          Window Tint
          <select value={tint} onChange={(e) => setTint(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <label>
          Wheels
          <select value={wheels} onChange={(e) => setWheels(e.target.value)}>
            <option value="style1">Style 1</option>
            <option value="style2">Style 2</option>
            <option value="style3">Style 3</option>
          </select>
        </label>

        <label>
          Lighting
          <select value={lighting} onChange={(e) => setLighting(e.target.value)}>
            <option value="day">Day</option>
            <option value="night">Night</option>
          </select>
        </label>

        <div className="config-buttons">
          <button onClick={resetAll}>Reset</button>
          <button onClick={takeScreenshot}>📸 Screenshot</button>
        </div>
      </div>

      {/* 🔽 3D Viewer */}
      <div className="canvas-wrapper">
        <Canvas
          ref={canvasRef}
          shadows
          camera={{ fov: 50 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <PerspectiveCamera makeDefault position={[5, 3, 10]} fov={50} />
          <OrbitControls makeDefault enableDamping dampingFactor={0.05} />

          {/* Day / Night lighting */}
          {lighting === "day" ? (
            <>
              <ambientLight intensity={0.6} />
              <directionalLight
                position={[10, 15, 10]}
                intensity={1.2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
              />
              <Environment preset="city" />
            </>
          ) : (
            <>
              <ambientLight intensity={0.2} />
              <directionalLight position={[2, 5, -3]} intensity={0.5} />
              <Environment preset="night" />
            </>
          )}

          {/* Load Car */}
          <Suspense
            fallback={
              <Html>
                <div style={{ color: "white", fontSize: "20px" }}>
                  Loading Car...
                </div>
              </Html>
            }
          >
            <CarModel
              modelPath={carModels[selectedCar]}
              color={color}
              finish={finish}
              tint={tint}
              wheels={wheels}
            />
          </Suspense>

          {/* 🚗 Ground Plane */}
          <Reflector
            resolution={1024}
            args={[30, 30]}
            mirror={0.4}
            mixBlur={2}
            mixStrength={1.5}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1.05, 0]}
          >
            {(Material, props) => (
              <meshStandardMaterial
                {...props}
                color="white"
                metalness={0.1}
                roughness={0.9}
              />
            )}
          </Reflector>

          {/* 🔥 Advanced floating controls & performance monitor */}
          <ControlsPanel />
                  </Canvas>
      </div>
    </div>
  )
}
