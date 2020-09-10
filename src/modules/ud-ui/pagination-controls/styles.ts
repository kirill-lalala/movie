import styled from "styled-components";

export const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  &.disabled {
    color: currentColor;
    cursor: not-allowed;
    opacity: 0.5;
    text-decoration: none;
  }
`;
