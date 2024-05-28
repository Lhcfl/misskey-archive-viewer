<template>
  <main>
    <h1>Misskey系存档查看器</h1>

    <DynamicScroller :items="actualNotesList" :min-item-size="54" class="scroller" page-mode>
      <template v-slot="{ item, index, active }: { item: Note; index: number; active: boolean }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.id]"
          :data-index="index"
        >
          <div class="note" :data-id="item.id">
            <div class="text">
              <p>发布于： {{ new Date(item.createdAt).toLocaleString() }}</p>
              <a-collapse v-if="item.cw" ghost>
                <a-collapse-panel :key="item.id">
                  <template #header>
                    <Mfm :text="item.cw" />
                  </template>
                  <p v-if="item.text"><Mfm :text="item.text" /></p>
                </a-collapse-panel>
              </a-collapse>
              <p v-else-if="item.text"><Mfm :text="item.text" /></p>
              <p v-else>转发帖子</p>
            </div>
            <a-divider />
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>

    <FloatButton description="高级" @click="drawerOpen = true"> </FloatButton>
    <a-drawer message="高级" v-model:open="drawerOpen">
      搜索：
      <a-input v-model:value="searchFilter"></a-input>
      <p>说明：默认模糊搜索，精确搜索请在前面加=</p>
    </a-drawer>
  </main>
</template>
<script setup lang="ts">
import Mfm from '@/components/MkMfm.vue';
import { notesList, type Note } from '@/states/notes-list';
import { computed, onMounted, ref, watch } from 'vue';
// @ts-ignore
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import { FloatButton, Drawer as ADrawer } from 'ant-design-vue';

import Fuse from 'fuse.js';

const fuse = new Fuse(notesList.value, {
  keys: ['text', 'cw', 'id'],
});

const drawerOpen = ref(false);
const searchFilter = ref('');

watch(notesList, () => {
  fuse.setCollection(notesList.value);
});

const actualNotesList = computed<Note[]>(() => {
  if (searchFilter.value.trim() === '') {
    return notesList.value;
  }
  return fuse.search(searchFilter.value).map((some) => some.item);
});

onMounted(() => {
  console.log(notesList.value);
});
</script>
