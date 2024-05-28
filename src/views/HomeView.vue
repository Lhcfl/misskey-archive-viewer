<template>
  <main>
    <h1>Misskey系存档查看器</h1>
    <section class="input-host">
      <span> 请输入您的实例名，不需要输入 <code>https://</code> （用于生成正确的Mention）</span>
      <a-input v-model:value="host" type="text"></a-input>
    </section>
    <section class="upload-file">
      <a-upload-dragger
        v-if="host"
        v-model:filelist="files"
        name="file"
        :multiple="false"
        accept="application/json"
        :beforeUpload="onUpload"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint"></p>
      </a-upload-dragger>
    </section>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { UploadDragger as AUploadDragger } from 'ant-design-vue';
import { InboxOutlined } from '@ant-design/icons-vue';
import router from '@/router';
import { notesList, type Note } from '@/states/notes-list';
import { host } from '@/states/host';

const files = ref([]);

async function onUpload(file: File) {
  console.log(file);
  const text = await file.text();
  notesList.value = (JSON.parse(text) as Note[]).reverse();
  router.push('/notes');
  return false;
}
</script>

<style scoped lang="scss">
section {
  margin: 10px;
}
</style>
