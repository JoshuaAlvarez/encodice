import { atom } from "recoil";

export type User = {
  uid: string;
  email: string;
  displayName: string;
  providerData: object;
}

export const userState = atom<User>({
  key: 'user',
  default: {
    uid: '',
    email: '',
    displayName: '',
    providerData: {}
  },
});
