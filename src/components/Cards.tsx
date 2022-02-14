import React from "react";
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components";

interface ICardProps{
    value: string;
    index: number;
}

const Card = styled.li<{ isDragging: boolean }>`
  padding: 16px 24px;
  margin-bottom: 10px;
  background-color: ${(p) => p.theme.cardColor};
  ${(p) =>
    p.isDragging &&
    `
  background-color: ${p.theme.hoverColor};
  box-shadow: 5px 7px 1px rgba(25, 25, 25, 0.6);
  ;`};
transition: 0.3s ;
`;

function Cards({value, index}:ICardProps) {
  return (
    <Draggable key={value} draggableId={value} index={index}>
      {(props, snapshot ) => (
        <Card isDragging={snapshot.isDragging}
          ref={props.innerRef}
          {...props.draggableProps}
          {...props.dragHandleProps}
        >
          {value}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(Cards)