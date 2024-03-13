import React from "react";
import { MdDelete } from "react-icons/md";

const List = ({ item, index, handleCheckbox, handleRemove }) => {
  const { itemName, checked, backgroundColor, textColor } = item;
  return (
    <div
      className="flex items-center justify-between w-full p-4 gap-4 rounded-lg shadow"
      style={{ backgroundColor, color: textColor }}
    >
      <span
        className={`flex-1 text-lg ${checked ? "line-through" : ""}`}
        style={{ textDecorationColor: backgroundColor }}
      >
        {index + 1}. {itemName}
      </span>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckbox}
          className="w-5 h-5 cursor-pointer"
          style={{ accentColor: textColor }}
        />
        <button onClick={handleRemove} className="text-xl">
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default List;
