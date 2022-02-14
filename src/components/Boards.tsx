import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITask } from "../atoms";
import Cards from "./Cards";

const BoardBox = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
`;
const Wrapping = styled.div`
  width: 200px;
  padding: 16px;
  background-color: ${(p) => p.theme.boardColor};
  box-shadow: 4px 5px 0px ${p=> p.theme.highlightColor};
  border-radius: 12px;
`;
const Board = styled.ul<{isDraggingOver:boolean, isDraggingOverWith: boolean}>`
  padding : 10px;
  min-height: 235px;
  border-radius: 12px;
  ${p=>p.isDraggingOver && 
 `background-color: ${p.theme.highlightColor}`};
  ${p=>p.isDraggingOverWith && `background-color: white`};
  transition : background-color 0.5s linear;
  `;
const Title = styled.h1`
  margin-bottom: 22px;
  font-size: 18px;
  text-align: center;
`;
export interface IBoardProps {
  data: ITask[];
  boardId: string;
}

function Boards({ data, boardId }: IBoardProps) {
  return (
    <BoardBox>
      <Wrapping>
          <Title>{boardId}</Title>
        <Droppable droppableId={boardId}>
          {(props, snapshot) => (
            <Board
              ref={props.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
              isDraggingOverWith={Boolean(snapshot.draggingFromThisWith)}
              {...props.droppableProps}
            >
              {data.map((value, index) => (
                <Cards key={value.id} value={value.issue} index={index} />
              ))}
              {props.placeholder}
            </Board>
          )}
        </Droppable>
      </Wrapping>
    </BoardBox>
  );
}

export default Boards;
