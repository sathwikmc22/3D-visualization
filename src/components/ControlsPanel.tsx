import { useEffect } from "react"
import { useThree } from "@react-three/fiber"
import { GUI } from "lil-gui"

export const ControlsPanel = () => {
  const { scene, gl } = useThree()

  useEffect(() => {
    const gui = new GUI()

    // DISPLAY
    const display = gui.addFolder("Display")
    const displaySettings = {
      background: "#191919",
      wireframe: false,
      autoRotate: false,
    }

    display.addColor(displaySettings, "background").onChange((val) => {
      gl.setClearColor(val)
    })

    display.add(displaySettings, "wireframe").onChange((val) => {
      scene.traverse((obj: any) => {
        if (obj.material) obj.material.wireframe = val
      })
    })

    display.add(displaySettings, "autoRotate")

    // LIGHTING
    const lighting = gui.addFolder("Lighting")
    const lightSettings = {
      exposure: 0.7,
      ambientIntensity: 0.3,
      directIntensity: 2.5,
    }

    lighting
      .add(lightSettings, "exposure", 0, 2, 0.01)
      .onChange((v) => (gl.toneMappingExposure = v))

    lighting.add(lightSettings, "ambientIntensity", 0, 1, 0.01)
    lighting.add(lightSettings, "directIntensity", 0, 5, 0.1)

    return () => gui.destroy()
  }, [scene, gl])

  return null
}
