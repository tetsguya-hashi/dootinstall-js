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
  let image = "";
  let preview = "";
  const submit = async () => {
    if (body.length < 3) {
      alert("日記の内容は１０文字以上にしてください。");
      return;
    }
    const result = await postDiary(uid, body, rate, image);
    if (!result) {
      alert("日記の追加が失敗しました。");
    } else {
      alert("日記が保存されました!");
      document.location.href = "/";
    }
    // ここにfirestoreへPOSTする関数を呼び出す
  };

  onDestroy(() => {
    unsbscribe;
  });

  const onFileSelect = (e) => {
    let target = e.target.files[0];
    image = target;
    let reader = new FileReader();
    reader.readAsDataURL(target);
    reader.onload = (e) => {
      preview = e.target.result;
    };
  };
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
  {#if preview}
    <img src={preview} alt="プレビュー" class="mb-6 mx-auto block" />
  {/if}
  <label
    for="file-input"
    class="bg-primary-900 text-white-900 px-4 py-3 rounded mb-6 inline-block"
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
  <div class="py-2">
    <Button type="submit" class="text-white-900">日記を保存</Button>
  </div>
</form>
