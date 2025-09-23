import { atom } from "recoil";

export const awardsPopupState = atom({
  key: 'awardsPopupShown', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});