import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

interface TransactionItemProps {
  type: string;
  date: string;
  amount: number;
  currency: string;
  isCredit: boolean;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  date,
  amount,
  currency,
  isCredit,
}) => {
  const formatDate = (dateString: string) => {
    try {
      const dateObj = new Date(dateString);

      // Format as DD/MM/YY
      const day = dateObj.getDate().toString().padStart(2, "0");
      const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
      const year = dateObj.getFullYear().toString().slice(-2);

      // Format as 12-hour time with AM/PM
      let hours = dateObj.getHours();
      const minutes = dateObj.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;

      return `${day}/${month}/${year}, ${hours
        .toString()
        .padStart(2, "0")}:${minutes} ${ampm}`;
    } catch (error) {
      return dateString;
    }
  };

  const formattedDate = formatDate(date);

  return (
    <div className="flex justify-between items-center text-white">
      <div className="flex justify-center items-center gap-3 lg:gap-5">
        <div className="bg-white text-secondary rounded-full p-3">
          {isCredit ? (
            <ArrowDown size={24} />
          ) : (
            <ArrowUp size={24} className="text-red-500" />
          )}
        </div>
        <div className="flex flex-col gap-1 text-white">
          <p className="font-bold text-md lg:text-xl">{type}</p>
          <p className="font-semibold text-sm lg:text-lg opacity-70">
            {formattedDate}
          </p>
        </div>
      </div>
      <p
        className={`font-bold text-lg lg:text-2xl ${
          isCredit ? "text-white" : "text-red-400"
        }`}
      >
        {isCredit ? "+" : "-"} {currency} {Math.abs(amount).toFixed(3)}
      </p>
    </div>
  );
};
