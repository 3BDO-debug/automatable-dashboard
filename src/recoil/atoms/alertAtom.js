import { atom } from 'recoil';

const alertAtom = atom({
  key: 'alert',
  default: {
    triggered: false,
    type: '',
    message: '',
  },
});

export default alertAtom;
