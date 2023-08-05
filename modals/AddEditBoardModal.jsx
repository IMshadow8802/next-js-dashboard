import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import boardsSlice from "@/redux/boardSlice";
import { Dialog, Input, Textarea } from "@material-tailwind/react";

function AddEditBoardModal({ setIsBoardModalOpen, type }) {
  const crossIcon = "/img/icon-cross.svg";
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    setIsBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  const handleOpen = () => setIsBoardModalOpen((prevState) => !prevState);

  return (
    <>
      {/* Dialog component */}
      <Dialog size="sm" open={true} handler={handleOpen}>
        {/* Dialog content */}
        <div className="p-4">
          <h3 className="text-lg font-poppinsBold">
            {type === "edit" ? "Edit" : "Add New"} Board
          </h3>
          <div className="mt-2">
            <label className="text-sm dark:text-white text-gray-500">
              Board Name
            </label>
            <Input
              className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-900 focus:outline-[#635fc7] outline-1 ring-0 w-full"
              placeholder="e.g Web Design"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="board-name-input"
            />
          </div>
          <div className="mt-4">
            <label className="text-sm dark:text-white text-gray-500">
              Board Columns
            </label>

            {newColumns.map((column, index) => (
              <div key={index} className="flex items-center w-full mt-2">
                <input
                  className="bg-transparent p-2 flex-grow rounded-lg text-sm border border-gray-900 focus:outline-[#635fc7] outline-[1px] w-full"
                  onChange={(e) => {
                    onChange(column.id, e.target.value);
                  }}
                  type="text"
                  value={column.name}
                />
                <img
                  src={crossIcon}
                  onClick={() => {
                    onDelete(column.id);
                  }}
                  className="m-4 cursor-pointer"
                />
              </div>
            ))}

            <button
              className="w-full items-center mt-4 py-2 text-sm hover:opacity-70 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] rounded-xl"
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ]);
              }}
            >
              + Add New Column
            </button>
          </div>
          <button
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit(type);
            }}
            className="w-full mt-2 mb-4 py-2 text-sm hover:opacity-70 dark:text-white dark:bg-[#635fc7] relative text-white bg-[#635fc7] rounded-xl"
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default AddEditBoardModal;

// import React, { useState } from "react";
// import boardsSlice from "@/redux/boardSlice";
// import { v4 as uuidv4 } from "uuid";
// import { useDispatch, useSelector } from "react-redux";
// import { Dialog } from "@headlessui/react";

// function AddEditBoardModal({ setIsBoardModalOpen, type }) {
// const crossIcon = "/img/icon-cross.svg";
// const dispatch = useDispatch();
// const [isFirstLoad, setIsFirstLoad] = useState(true);
// const [name, setName] = useState("");
// const [newColumns, setNewColumns] = useState([
//   { name: "Todo", tasks: [], id: uuidv4() },
//   { name: "Doing", tasks: [], id: uuidv4() },
// ]);
// const [isValid, setIsValid] = useState(true);
// const board = useSelector((state) => state.boards).find(
//   (board) => board.isActive
// );

// if (type === "edit" && isFirstLoad) {
//   setNewColumns(
//     board.columns.map((col) => {
//       return { ...col, id: uuidv4() };
//     })
//   );
//   setName(board.name);
//   setIsFirstLoad(false);
// }

// const validate = () => {
//   setIsValid(false);
//   if (!name.trim()) {
//     return false;
//   }
//   for (let i = 0; i < newColumns.length; i++) {
//     if (!newColumns[i].name.trim()) {
//       return false;
//     }
//   }
//   setIsValid(true);
//   return true;
// };

// const onChange = (id, newValue) => {
//   setNewColumns((prevState) => {
//     const newState = [...prevState];
//     const column = newState.find((col) => col.id === id);
//     column.name = newValue;
//     return newState;
//   });
// };

// const onDelete = (id) => {
//   setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
// };

// const onSubmit = (type) => {
//   setIsBoardModalOpen(false);
//   if (type === "add") {
//     dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
//   } else {
//     dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
//   }
// };

//   return (
//     <Dialog size="sm" open={true} onClose={() => setIsBoardModalOpen(false)}>
//       <Dialog.Overlay className="fixed inset-0 bg-transparent opacity-30" />
//       <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
//         <Dialog.Title className="text-lg mt-4 mb-4">
//           {type === "edit" ? "Edit" : "Add New"} Board
//         </Dialog.Title>

// <div className="mt-2">
//   <label className="text-sm dark:text-white text-gray-500">
//     Board Name
//   </label>
//   <input
//     className="bg-transparent px-4 py-2 rounded-md text-sm border border-gray-900 focus:outline-[#635fc7] outline-1 ring-0 w-full"
//     placeholder="e.g Web Design"
//     value={name}
//     onChange={(e) => setName(e.target.value)}
//     id="board-name-input"
//   />
// </div>

// <div className="mt-4">
//   <label className="text-sm dark:text-white text-gray-500">
//     Board Columns
//   </label>

//   {newColumns.map((column, index) => (
//     <div key={index} className="flex items-center w-full mt-2">
//       <input
//         className="bg-transparent p-2 flex-grow rounded-lg text-sm border border-gray-900 focus:outline-[#635fc7] outline-[1px] w-full"
//         onChange={(e) => {
//           onChange(column.id, e.target.value);
//         }}
//         type="text"
//         value={column.name}
//       />
//       <img
//         src={crossIcon}
//         onClick={() => {
//           onDelete(column.id);
//         }}
//         className="m-4 cursor-pointer"
//       />
//     </div>
//   ))}

//   <button
//     className="w-full items-center mt-4 py-2 text-sm hover:opacity-70 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] rounded-xl"
//     onClick={() => {
//       setNewColumns((state) => [
//         ...state,
//         { name: "", tasks: [], id: uuidv4() },
//       ]);
//     }}
//   >
//     + Add New Column
//   </button>
// </div>

// <button
//   onClick={() => {
//     const isValid = validate();
//     if (isValid === true) onSubmit(type);
//   }}
//   className="w-full mt-2 mb-4 py-2 text-sm hover:opacity-70 dark:text-white dark:bg-[#635fc7] relative text-white bg-[#635fc7] rounded-xl"
// >
//   {type === "add" ? "Create New Board" : "Save Changes"}
// </button>
// </div>
//     </Dialog>
//   );
// }

// export default AddEditBoardModal;
