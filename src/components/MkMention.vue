<template>
  <a class="mention" :href="url" target="_blank" rel="noopener" @click.stop>
    <span class="main">
      <span class="username">@{{ username }}</span>
      <span class="host" v-if="host">@{{ toUnicode(host) }}</span>
    </span>
  </a>
</template>

<script lang="ts" setup>
import { host as localHost } from '@/states/host';
import { toUnicode } from 'punycode';

const props = defineProps<{
  username: string;
  host: string;
}>();

const url = `https://${props.host || localHost.value}/@${props.username}`;

const isMe = false;
</script>

<style lang="scss" scoped>
.mention {
  position: relative;
  display: inline-block;
  padding: 2px 8px 2px 2px;
  margin-block: 2px;
  border-radius: 999px;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--mention);
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--mention);
    opacity: 0.1;
    z-index: -1;
  }

  &.isMe {
    --mention: var(--mentionMe);
  }

  > .icon {
    width: 1.5em;
    height: 1.5em;
    object-fit: cover;
    margin: 0 0.2em 0 0;
    vertical-align: bottom;
    border-radius: 100%;
  }

  > .main > .host {
    opacity: 0.5;
  }
}
</style>
