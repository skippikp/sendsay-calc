import React from 'react';

type Props = {
  stroke?: string;
}

export const BracketsIcon = ({ stroke }: Props) => {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.49984 8.33334L1.1665 5.00001L4.49984 1.66668M9.49984 1.66668L12.8332 5.00001L9.49984 8.33334"
        stroke={stroke || "#4D5562"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BracketsIcon;
