<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { useProgress } from '@threlte/extras';
  import { tweened } from 'svelte/motion';
  import { fade } from 'svelte/transition';

  const { progress } = useProgress()
  const tweenedProgress = tweened($progress, {
    duration: 800
  })
  $: tweenedProgress.set($progress)
</script>

{#if $tweenedProgress < 1}
  <div
    transition:fade|local={{
      duration: 200
    }}
    class="wrapper"
  >
    <p class="loading">Loading</p>
    <div class="bar-wrapper">
      <div
        class="bar"
        style="width: {$tweenedProgress * 100}%"
      />
    </div>
  </div>
{/if}


<Canvas>
  <Scene />
</Canvas>


<style>
  div {
    height: 100%;
  }
  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
    background: #0c121e;
    color: white;
  }
  .loading {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  .bar-wrapper {
    border-radius: 1rem;
    width: 33.333333%;
    height: 10px;
    border: 1px solid white;
    position: relative;
  }
  .bar {
    height: 100%;
    background-color: white;
  }
</style>