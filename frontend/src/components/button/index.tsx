import { MouseEventHandler } from "react";
import { ButtonContainer } from "./styles";

interface buttonProps {
  value: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button = ({ value, onClick }: buttonProps) => {
  return <ButtonContainer onClick={onClick}>{value}</ButtonContainer>;
};
