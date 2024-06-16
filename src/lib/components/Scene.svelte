<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, Grid, OrbitControls } from '@threlte/extras'
  import BirthdayScene from "./models/birthday-set.svelte";
</script>

<T.PerspectiveCamera
  makeDefault
  position={[40, 10, -10]}
  fov={15}
>
  <OrbitControls
    maxPolarAngle={2}
    maxAzimuthAngle={10}
    enableZoom={true}
    enableDamping
    target.y={1.5}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={2} />

<!--<Grid-->
<!--  position.y={-0.001}-->
<!--  cellColor="#ffffff"-->
<!--  sectionColor="#ffffff"-->
<!--  sectionThickness={0}-->
<!--  fadeDistance={25}-->
<!--  cellSize={2}-->
<!--/>-->

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
