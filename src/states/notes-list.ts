import { ref } from 'vue';

export type DriverFile = {
  id: string;
  createdAt: string;
  name: string;
  type: string;
  md5: string;
  size: number;
  isSensitive: boolean;
  blurhash: string;
  properties?: {
    width: number;
    height: number;
  };
  url: string;
  thumbnailUrl: string;
  comment: null | string;
};

export type Note = {
  id: string;
  text: string | null;
  createdAt: string;
  fileIds: string[];
  files: DriverFile[];
  replyId: string | null;
  renoteId: string | null;
  poll: null | {
    expiresAt: string;
    multiple: boolean;
    choices: string[];
    votes: number[];
  };
  cw: string | null;
  visibility: 'public' | 'home' | 'followers' | 'specified';
  visibleUserIds: string[];
  localOnly: boolean;
};

export const notesList = ref<Note[]>([]);
