import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  color: grey;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: grey;
  
  &.marked {
    background: purple;
  }
`
interface IProps {
    id: number,
    curSlide: number,
    clickHandle: (id: number) => void;
}

export default function PaginationButton(props: IProps): JSX.Element {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.clickHandle(props.id);
    }
    return (
        <StyledButton className={ props.curSlide === props.id ? "marked" : ''} onClick={handleClick}></StyledButton>
    )
}