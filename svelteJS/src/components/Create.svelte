<script>
  import { onDestroy } from "svelte";
  import { Slider, TextField, Button } from "smelte";
  import { userId } from "../store";
  import { postDiary } from "../helpers/api";
  let uid = null;
  const unsbscribe = userId.subscribe((id) => (uid = id));
  console.log(`CreateUid:${uid}`);

  let rate = 80;
  let body = "";
  const submit = () => {
    if (body.length < 3) {
      alert("日記の内容は１０文字以上にしてください。");
      return;
    }
    const result = postDiary(uid, body, rate);
    if (!result) {
      alert("日記の追加が失敗しました。");
    } else {
      alert("日記が保存されました");
      setInterval(() => {
        document.location.href = "/";
      }, 500);
    }
  };

  onDestroy(() => {
    unsbscribe;
  });
</script>

<h3>日記を書こう</h3>
<form on:submit|preventDefault={submit} action="" class="p-5">
  <p class="mb-4">今日の気分は {rate}点です</p>
  <Slider class="mb-4 block" min="1" max="100" bind:value={rate} />
  <TextField
    label="日記の本文"
    class="bg-white-900"
    bind:value={body}
    textarea
    rows="5"
    outlined
  />
  <div class="py-2">
    <Button type="submit" class="text-white-900">日記を保存</Button>
  </div>
</form>
