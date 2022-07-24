<script>
  import { onMount } from "svelte";
  import { Hamburger } from "svelte-hamburgers";
  import BrightnessContrast32 from "carbon-icons-svelte/lib/BrightnessContrast.svelte";
  let open;
  import Menu from "./Menu.svelte";
  const toggleDark = () => {
    if (localStorage.isDark === "true") {
      document.getElementById("body").classList.remove("mode-dark");
      localStorage.isDark = "false";
    } else {
      document.getElementById("body").classList.add("mode-dark");
      localStorage.isDark = "true";
    }
  };
  onMount(() => {
    if (localStorage.isDark === "true") {
      document.getElementById("body").classList.add("mode-dark");
      localStorage.isDark = "true";
    } else {
      document.getElementById("body").classList.remove("mode-dark");
      localStorage.isDark = "false";
    }
  });
</script>

<header
  class="bg-primary-900 dark:bg-dark-900 flex justify-between items-center"
>
  <Hamburger bind:open --color="white" />

  <img src="/logo.png" alt="logo" on:click={() => (location.href = "/")} />
  <div class="darkModeBtn" on:click={toggleDark}>
    <BrightnessContrast32 class="block mr-6 text-white-900 " />
  </div>
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
