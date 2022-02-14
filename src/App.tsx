import { GlobalStyle } from "./styles/globalStyle";
import { useRecoilValue, useRecoilState } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import { dataAtom, isDarkAtom, tasksAtom } from "./atoms";
import { darkTheme, lightTheme } from "./styles/theme";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Boards from "./components/Boards";
import Form from "./components/Form";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: flex-start;
  align-items: center;
`;
const Title = styled.h1`
  align-self: flex-start;
  margin-top: 20px;
  margin-bottom : 30px;
  font-size: 36px;
`;
const BoardWrap = styled.div`
    display: flex;
    margin-bottom: 60px;
`

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const [data, setData] = useRecoilState(dataAtom);
  console.log();
  const onDragend = (props: DropResult) => {
    const { destination, source } = props;
    if (!destination) return; // prevent destination null

    if (destination?.droppableId === source.droppableId) {
      setData((currData) => {
        const currentBoard = [...currData[source.droppableId]];
        const object = currentBoard[source.index];
        currentBoard.splice(source.index, 1);
        currentBoard.splice(destination?.index, 0, object);

        return { ...currData, [source.droppableId]: currentBoard };
      });
    } else if (destination?.droppableId !== source.droppableId) {
      setData((currData) => {
        const startBoard = [...currData[source.droppableId]];
        const object = startBoard[source.index];
        const targetBoard = [...currData[destination?.droppableId]];
        startBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, object);

        return {
          ...currData,
          [source.droppableId]: startBoard,
          [destination.droppableId]: targetBoard,
        };
      });
    }
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragend}>
        <Container>
          <Title>Project Center</Title>
          <BoardWrap>
            {Object.keys(data).map((key) => (
              <Boards key={key} data={data[key]} boardId={key} />
            ))}
          </BoardWrap>
          <Form data={data[Object.keys(data)[0]]} boardId={Object.keys(data)[0]}/>
        </Container>
      </DragDropContext>
    </ThemeProvider>
  );
}

export default App;
