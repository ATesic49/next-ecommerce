import React from "react";
import { formatPrice } from "../lib/db/format";
interface PriceTagProps {
  price: number;
  className?: string;
}
const PriceTag = ({ price, className }: PriceTagProps) => {
  return (
    <span className={`badge badge-primary ${className}`}>
      {formatPrice(price)}
    </span>
  );
};

export default PriceTag;
