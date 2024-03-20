import { Button } from "react-bootstrap";
import styled from "styled-components";

const CustomButton = ({
  children,
  type,
  onClick,
  className,
  visibility,
  color,
}) => {
  const CustomButton = styled(Button)`
    background-color: ${(props) => (props.color ? color : "#00cc66;")};
    color: white;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    padding: 10px 25px;
    border: none;
    border-radius: 8px;
    margin: 10px 0px;
    &:hover {
      background-color: #e94a65;
    }
    &:active {
      background-color: #e94a65;
    }

    &:disabled {
      background-color: #f7758b;
    }
  `;

  return (
    <CustomButton
      className={className}
      color={color}
      type={type}
      onClick={onClick}
      disabled={visibility === 0}
    >
      {children}
    </CustomButton>
  );
};

export default CustomButton;
