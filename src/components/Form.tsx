import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dataAtom, ITask } from "../atoms";
import { IBoardProps } from "./Boards";

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  min-width: 600px;
  padding: 26px;
  border-radius: 20px;
  box-shadow: 2px 2px 0px rgba(255, 255, 255, 0.8);
  background-color: ${(p) => p.theme.hoverColor};
  input {
    border: none;
    border-radius: 20px;
    background-color: ${(p) => p.theme.boardColor};
    &:focus {
      outline: none;
      background-color: ${(p) => p.theme.highlightColor};
    }
  }
  select {
    border: none;
    border-radius: 20px;
    background-color: ${(p) => p.theme.boardColor};
    &:focus {
      outline: none;
      background-color: ${(p) => p.theme.highlightColor};
    }
  }
`;
const Title = styled.h1`
  margin: 16px;
  font-size: 38px;
`;
const Issue = styled.input.attrs({ type: "text" })`
  margin: 10px;
  padding: 10px 20px;
  font-size: 28px;
`;
const Purpose = styled.input.attrs({ type: "text" })`
  margin: 10px;
  padding: 10px 20px;
  font-size: 18px;
`;
const Select = styled.select`
  margin: 10px;
  padding: 10px 20px;
  font-size: 18px;
`;
const Contents = styled.textarea`
  margin: 10px;
  padding: 10px;
  height: 500px;
  background-color: white;
`;
const Btn = styled.button`
  margin: 10px;
  padding: 10px 20px;
  align-self: flex-end;
  width: fit-content;
`;

interface IForm {
  id: number;
  issue: string;
  purpose: string;
  prior: string;
  details: string;
}

function Form({data, boardId}:IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setData = useSetRecoilState(dataAtom);
  const onSubmit = ({ issue, purpose, details }: IForm) => {
    const newReq = { id: Date.now(), issue, purpose, details };
    setData((prev) => {
      return { ...prev, [boardId]: [newReq, ...prev[boardId]] };
    });
    setValue("details", "");
    setValue("issue", "");
    setValue("purpose", "");
  };
  return (
    <FormBox onSubmit={handleSubmit(onSubmit)}>
      <Title>Request Form</Title>
      <Issue {...register("issue")} placeholder="Request/Agenda" required />
      <Purpose {...register("purpose")} placeholder="Purpose/Goal" required />
      <Contents {...register("details")} placeholder="Write Details..." />
      <Btn>SUBMIT</Btn>
    </FormBox>
  );
}

export default Form;
