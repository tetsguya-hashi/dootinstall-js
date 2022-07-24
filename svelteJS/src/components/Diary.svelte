<script>
  import { onMount } from "svelte";
  import { getDiary, updateDiary } from "../helpers/api";
  import { Slider, TextField, Button, ProgressCircular } from "smelte";
  import dayjs from "dayjs";
  export let id;
  console.log(id);
  let promise = getDiary();
  let rate, body;
  onMount(async () => {
    promise = await getDiary(id);
    rate = promise.rate;
    body = promise.body;
    console.log(promise);
  });
  const submit = async () => {
    const returnValue = await updateDiary(id, body, rate);
    if (returnValue) {
      alert("更新が成功しました。");
      document.location.href = "/";
    } else {
      alert("更新ができませんでした。やり直してください。");
      document.location.href = "/";
    }
  };
</script>

{#await promise}
  <p class="mx-auto flex justify-center mt-10">
    <ProgressCircular />
  </p>
{:then diary}
  <h1 class="h4">{dayjs(diary.createAt).format("YYYY年MM月DD日")}に日記</h1>

  <form on:submit|preventDefault={submit} action="" class="p-5">
    <img src={diary.image ? diary.image : "/dummy.jpeg"} alt="画像" />
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
      <Button type="submit" class="text-white-900">日記を更新</Button>
    </div>
  </form>
{/await}
