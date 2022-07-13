import styled, { keyframes } from "styled-components";
import { CaretLeft } from 'react-bootstrap-icons';
import Pagination from "./Pagination";
import React, {useState, useEffect} from "react";

const SliderWrapper = styled.div`
  position: relative;
  width: 1000px;
  height: 500px;
`

const ArrowLeft = styled(CaretLeft)`
  color: white;
`

const ArrowRight = styled(ArrowLeft)`
  transform: rotate(180deg);
`

const LeftControlButton = styled.button`
  cursor: pointer;
  z-index: 10;
  left: 20px;
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  background: transparent;
  border: none;
  
  &.hide {
    display: none;
  }
`

const RightControlButton = styled(LeftControlButton)`
  left: auto;
  right: 20px;
`

const SlideNumberWrapper = styled.div`
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 20px;
  border-radius: 10px;
  z-index: 10;
  background: rgba(100, 98, 98, 0.5);
`

const SlideNumber = styled.span`
  color: white;
`

const Slide = styled.img.attrs(props => (
    { src: props.src }
))`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: initial;
`

const Text = styled.h2`
  position: absolute;
  bottom: 20px;
  right: 50%;
  transform: translateX(50%);
  color: white;
`

interface IProps {
    slides: {
        img: string,
        text: string,
    }[];
    loop?: boolean;
    navs?: boolean;
    pags?: boolean;
    delay?: number;
    auto?: boolean;
    stopMouseHover?: boolean;
}

export default function Slider(props: IProps): JSX.Element {
    const [slide, setSlide] = useState<{ img: string, text: string }>(props.slides[0]);
    const [index, setIndex] = useState<number>(0);
    let timer: any;

    useEffect(() => {
        if (props.auto) {
            autoSlider();
        }
        return (
            function() {
                clearTimeout(timer);
            }
        )
    }, [slide]);

    const autoSlider = () => {
        if (props.delay) {
            delayTrue(props.delay);
        } else {
            delayFalse(5000);
        }
    }

    const delayTrue = (delayProp: number) => {
        let delay = delayProp * 1000;
        timer = setTimeout(() => {
            if (index === props.slides.length - 1) {
                setSlide(props.slides[0]);
                setIndex(0);
            } else {
                setSlide(props.slides[index + 1]);
                setIndex(index + 1);
            }
        }, delay);
    }

    const delayFalse = (delay: number) => {
        timer = setTimeout(() => {
            if (index === props.slides.length - 1) {
                setSlide(props.slides[0]);
                setIndex(0);
            } else {
                setSlide(props.slides[index + 1]);
                setIndex(index + 1);
            }
        }, delay);

    }

    const handlePaginationClick = (id: number): void => {
        if (index === id) {
        }
        else {
            setIndex(id);
            setSlide(props.slides[id]);
        }
    }

    const handleArrowClick = (e: React.MouseEvent<HTMLButtonElement> ): void => {
        if (props.loop) {
            loopTrue(e);

        } else {
            loopFalse(e);
        }

        if (props.auto) {
            clearTimeout(timer);
        }
    };

    const arrowsOverHandler = (e: React.MouseEvent<HTMLButtonElement> ): void => {
        if (props.auto && props.stopMouseHover) {
            clearTimeout(timer);
        }
    };


    const loopFalse = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(e.currentTarget.classList.contains("left")) {
            if (index === 0) {
            } else {
                setSlide(props.slides[index - 1]);
                setIndex(index - 1);
            }
        } else if (e.currentTarget.classList.contains("right")) {
            if (index === props.slides.length - 1) {
            } else {
                setSlide(props.slides[index + 1]);
                setIndex(index + 1);
            }
        }
    }

    const loopTrue = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(e.currentTarget.classList.contains("left")) {
            if (index === 0) {
                setSlide(props.slides[props.slides.length - 1]);
                setIndex(props.slides.length - 1);
            } else {
                setSlide(props.slides[index - 1]);
                setIndex(index - 1);
            }
        } else if (e.currentTarget.classList.contains("right")) {
            if (index === props.slides.length - 1) {
                setSlide(props.slides[0]);
                setIndex(0);
            } else {
                setSlide(props.slides[index + 1]);
                setIndex(index + 1);
            }
        }
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (props.auto && props.stopMouseHover) {
            clearTimeout(timer);
        }
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (props.auto && props.stopMouseHover) {
            autoSlider();
        }
    }


    return (
       <SliderWrapper onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
           <SlideNumberWrapper>
               <SlideNumber>{index + 1} /</SlideNumber>
               <SlideNumber> {props.slides.length}</SlideNumber>
           </SlideNumberWrapper>
           <LeftControlButton className={`left${!props.navs ? " hide": ""}`}
                              onClick={handleArrowClick}
                              onMouseMove={arrowsOverHandler}>
               <ArrowLeft size={35}/>
           </LeftControlButton>
           <RightControlButton className={`right${!props.navs ? " hide": ""}`}
                               onClick={handleArrowClick}
                               onMouseMove={arrowsOverHandler}>
               <ArrowRight size={35}/>
           </RightControlButton>
           <Slide src={slide.img}>
           </Slide>
           <Text>{slide.text}</Text>
           <Pagination isVisible={props.pags}
                       slides={props.slides}
                       curSlide={index}
                       handlePaginationClick={handlePaginationClick}/>
       </SliderWrapper>
    )
}