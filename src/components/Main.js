import React, { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import List from "./List";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Main = () => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,

    timeOut: "2000",
    extendedTimeOut: "1000",
  };
  const [listData, setListData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [inputVal, setInputVal] = useState("");

  const addData = () => {
    if (inputVal.trim() === "") {
      toastr.error("Kuch To Lik Bhai Add Karneke Liye!");
      setInputVal("");
      return;
    }
    let newData = [
      ...listData,
      {
        itemName: inputVal,
        id: Date.now(),
        checked: false,
      },
    ];
    toastr.success("Item Added!!");
    localStorage.setItem("data", JSON.stringify(newData));
    setListData(newData);
    setInputVal("");
  };

  const hadleCheck = (id) => {
    let newData = listData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !item.checked,
        };
      } else {
        return item;
      }
    });
    toastr.info("List Updated!!!");
    localStorage.setItem("data", JSON.stringify(newData));
    setListData(newData);
  };

  const removeList = (id) => {
    toastr.warning("Item Removed");
    let newData = listData.filter((item) => item.id !== id);
    localStorage.setItem("data", JSON.stringify(newData));
    setListData(newData);
  };
  return (
    <main className="flex flex-col items-center   p-8 w-full min-h-screen relative">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-30"></div>
      <h1 className="text-4xl font-cursive text-shadow-lg z-10 mb-8 underline uppercase">
        Grocery Bud
      </h1>
      <div className="flex flex-col items-center w-full max-w-lg gap-4 z-10 mb-8">
        <div className="flex w-full justify-evenly max-w-md  border-2 border-black bg-slate-200  rounded-md">
          <input
            type="text"
            placeholder="Enter Item"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="text-lg p-2   bg-slate-200"
          />
          <button onClick={addData}>
            <MdAddShoppingCart className="w-12  h-10" />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center w-full max-w-lg gap-4 z-10">
        {listData.map((item, index) => (
          <List
            key={item.id}
            item={item}
            index={index}
            handleCheckbox={() => hadleCheck(item.id)}
            handleRemove={() => removeList(item.id)}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;
