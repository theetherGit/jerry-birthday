<script lang="ts">
  import { T, useThrelte } from '@threlte/core';
  import { ContactShadows, OrbitControls } from '@threlte/extras'
  import BirthdayScene from "./models/birthday-set-final.svelte";
  import { Color } from 'three';

  const {scene: CanvasScene} = useThrelte()
  CanvasScene.background = new Color('darkslategrey');
  const isMobile = window.innerWidth <= 768
  const viewPort: [x: number, y: number, z:number] = isMobile ? [50, 20, -10] : [30, 7, -15]
</script>

<T.PerspectiveCamera
  makeDefault
  position={viewPort}
  fov={15}
  zoom={0.8}
>
  <OrbitControls
    maxPolarAngle={2}
    maxAzimuthAngle={10}
    enableZoom={true}
    enableDamping
    target.y={isMobile ? 1 : 1.5}
    target.x={4}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={2} />

<ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
/>

<!--<T.Mesh>-->
  <BirthdayScene>
  </BirthdayScene>
<!--</T.Mesh>-->
