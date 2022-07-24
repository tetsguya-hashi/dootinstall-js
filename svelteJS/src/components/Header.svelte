<script>
  import { Hamburger } from "svelte-hamburgers";
  import BrightnessContrast from "carbon-icons-svelte/lib/BrightnessContrast.svelte";
  let open;
  import Menu from "./Menu.svelte";
</script>

<header class="bg-primary-900 flex justify-between items-center">
  <Hamburger bind:open --color="white" />

  <img src="/logo.png" alt="logo" on:click={() => (location.href = "/")} />
  <BrightnessContrast class="mr-6 text-white-900" />
</header>
<Menu bind:open />

<style>
  header {
    height: 60px;
  }
  img {
    max-height: 100%;
  }
</style>
