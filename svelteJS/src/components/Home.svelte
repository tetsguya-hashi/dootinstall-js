<script>
  import { onMount, onDestroy } from "svelte";
  import { signInWithGoogle } from "../helpers/firebase";
  import { Router, Link } from "svelte-routing";
  import { Button, ProgressCircular, TextField } from "smelte";
  import { userId } from "../store";
  import { fetch } from "../helpers/api";
  import StarRating from "svelte-star-rating";
  import dayjs from "dayjs";

  let uid, filterMonth;
  const unsbscribe = userId.subscribe((id) => (uid = id));
  let promise = fetch();
  onMount(async () => {
    promise = await fetch(uid);
  });
  onDestroy(() => {
    unsbscribe;
  });
  const filterHndle = async () => {
    promise = await fetch(uid, filterMonth);
  };
</script>

{#if !uid}
  <Button on:click={signInWithGoogle} class="text-white-900 mt-10"
    >ログイン</Button
  >
{:else}
  <section class="m-auto mb-10 w-6/12">
    <h5>日記を書いた月で検索</h5>
    <TextField type="month" bind:value={filterMonth} on:change={filterHndle} />
  </section>
  {#await promise}
    <p class="mx-auto flex justify-center mt-10">
      <ProgressCircular />
    </p>
  {:then diaries}
    {#if diaries.length > 0}
      <Router>
        {#each diaries as d}
          <Link to={"/diary/" + d.id} class="flex items-center mb-6 border-b-2">
            <aside class="diary-aside">
              <p class="text-left">
                {dayjs(d.createAt).format("YYYY年MM年DD日")}
              </p>
              <img
                class="diary-image"
                src={d.image ? d.image : "/dummy.jpeg"}
                alt="diaryimage"
              />
              <p class="mb-6">
                <StarRating rating={d.rate / 20} />
              </p>
            </aside>
            <p>{d.body}</p>
          </Link>
        {/each}
      </Router>
    {:else}
      <p>日記が見つかりませんでした。</p>
    {/if}
  {/await}
{/if}

<style>
  .diary-aside {
    width: 40%;
    margin-right: 1rem;
  }
  .diary-image {
    width: 100%;
  }
</style>
