import styled from "styled-components";
import PaginationButton from "./PaginationButton";

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
  position: absolute;
  bottom: -40px;
  right: 50%;
  transform: translateX(50%);
`

interface IProps {
    slides: {
        img: string,
        text: string,
    }[],
    curSlide: number,
    handlePaginationClick: (id: number) => void;
    isVisible?: boolean;
}

export default function Pagination(props: IProps): JSX.Element | null{
    const clickHandle = (id: number) => {
        props.handlePaginationClick(id);
    }

    return (
        !props.isVisible ? null :

        <ButtonGroup>
        { props.slides.map((item, index) => (
            <PaginationButton clickHandle={clickHandle} key={index} id={index} curSlide={props.curSlide}/>
            )
        )}
        </ButtonGroup>
    )
}