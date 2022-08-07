<script>
  import { onMount } from "svelte";
  import { getDiary, updateDiary, deleteDiary } from "../helpers/api";
  import { Slider, TextField, Button, ProgressCircular } from "smelte";
  import dayjs from "dayjs";
  export let id;
  console.log(id);
  let promise = getDiary();
  let rate, body, image, preview;
  onMount(async () => {
    promise = await getDiary(id);
    rate = promise.rate;
    body = promise.body;
    console.log(promise);
  });
  const submit = async () => {
    const returnValue = await updateDiary(id, body, rate, image);
    if (returnValue) {
      alert("更新が成功しました。");
      document.location.href = "/";
    } else {
      alert("更新ができませんでした。やり直してください。");
      document.location.href = "/";
    }
  };
  const onFileSelect = (e) => {
    let target = e.target.files[0];
    image = target;
    let reader = new FileReader();
    reader.readAsDataURL(target);
    reader.onload = (e) => {
      preview = e.target.result;
    };
  };

  const deleteHandle = async () => {
    const result = await deleteDiary(id);
    if (result) {
      alert("日記の削除が完了しました。");
      document.location.href = "/";
    } else {
      alert("日記の削除にしっぱいしました。通信状態をお確かめください");
      document.location.href = "/";
    }
  };
</script>

{#await promise}
  <p class="mx-auto flex justify-center mt-10">
    <ProgressCircular />
  </p>
{:then diary}
  <h1 class="h4">{dayjs(diary.createAt).format("YYYY年MM月DD日")}</h1>

  <form on:submit|preventDefault={submit} action="" class="p-5 mb-10">
    {#if !preview}
      <img
        class="mb-4"
        src={diary.image ? diary.image : "/dummy.jpeg"}
        alt="画像"
      />
    {:else}
      <img class="mb-4" src={preview} alt="画像" />
    {/if}
    <label
      for="file-input"
      class="bg-primary-900 text-white-900 px-4 py-3 rounded mb-6 inline-block dark:bg-accent-300"
      >画像を選択</label
    >
    <input
      type="file"
      accept="image/*"
      id="file-input"
      class="hidden"
      bind:this={image}
      on:change={(e) => onFileSelect(e)}
    />

    <p class="mb-4">気分は {rate}点です</p>
    <Slider class="mb-4 block" min="1" max="100" bind:value={rate} />
    <TextField
      label="日記の本文(変更する場合は編集)"
      class="bg-white-900"
      bind:value={body}
      textarea
      rows="5"
      outlined
    />
    <div class="py-2">
      <Button type="submit" class="text-white-900 dark:bg-accent-300"
        >日記を更新</Button
      >
    </div>
  </form>
  <Button
    class="bg-alert-900 text-white-900 mb-6  dark:bg-accent-200"
    on:click={deleteHandle}>日記を削除</Button
  >
{/await}
