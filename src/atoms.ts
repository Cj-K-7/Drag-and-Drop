import "recoil";
import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDarkKey",
  default: false,
});


interface IdataAtom {
  [key: string] : ITask[];
}

export const dataAtom = atom<IdataAtom>({
  key: "dataKey",
  default: {
    Request: [
      {
        id: 123,
        issue: "hi",
        purpose: "a",
        details: "ahelsdl",
      },
      {
        id: 1323,
        issue: "asdadaa",
        purpose: "a",
        details: "adaadssssa",
      },
    ],
    In_Progress: [],
    Completed: [],
    Delayed: [],
  },
});

export interface ITask {
  id:number;
  issue: string;
  purpose: string;
  details: string;
}

export const tasksAtom = atom<ITask[]>({
  key: "taskKey",
  default: []
})