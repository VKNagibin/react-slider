import React from 'react';
import Slider from "./Slider";
import styled from "styled-components";

const AppWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

  function App():JSX.Element {
  const slides: {img: string, text: string}[] = [
    {
      img: 'https://images.ctfassets.net/hrltx12pl8hq/7JnR6tVVwDyUM8Cbci3GtJ/bf74366cff2ba271471725d0b0ef418c/shutterstock_376532611-og.jpg',
      text: 'Caption Text 1'
    },
    {
      img: 'https://media.istockphoto.com/photos/alexander-nevsky-cathedral-in-sofia-bulgaria-taken-in-may-2019-taken-picture-id1182393363?k=20&m=1182393363&s=612x612&w=0&h=1tVDnEAxLygwPdod5B9ijIBnscyLy-mMNxPI2Mw2RjU=',
      text: 'Caption Text 2'
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZlf5lc5tX-0gY-y94pGS0mQdL-D0lCH2OQ&usqp=CAU',
      text: 'Caption Text 3'
    },
  ];
  return (
      <AppWrapper>
        <Slider
            slides={slides}
            loop={true}
            navs={true}
            pags={true}
            // auto={true}
            // stopMouseHover={true}
            delay={1}
        />
      </AppWrapper>
  );
}

export default App;
