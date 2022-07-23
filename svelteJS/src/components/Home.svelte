<script>
  import { onMount, onDestroy } from "svelte";
  import { Button } from "smelte";
  import { userId } from "../store";
  import { fetch } from "../helpers/api";
  let uid;
  const unsbscribe = userId.subscribe((id) => (uid = id));
  let promise;
  onMount(async () => {
    promise = await fetch(uid);
    console.log(promise);
  });
  onDestroy(() => {
    unsbscribe;
  });
</script>

<p>Home</p>
<div class="py-2">
  <Button>Button</Button>
</div>
