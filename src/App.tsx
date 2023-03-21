import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: auto;
  height: auto;
  border: 2px solid gray;
  background-color: black;
`;

function App() {
  return (
    <Container>
      <button onClick={(e) => {}}>버튼</button>
      Effective-TypeScript STUDY
    </Container>
  );
}

export default App;
