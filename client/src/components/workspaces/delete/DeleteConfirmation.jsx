import { useState } from "react";
const DeleteConfirmation = ({ itemName, itemId, onDelete, onCancel }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const handleDelete = () => {
    if (inputValue === itemName) {
      onDelete(itemId);
    } else {
      setError("Entered name does not match.");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#8c8b8b] bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#eef7f6] px-6 py-6 rounded-xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-xl font-bold text-red-500 mb-4 border-b border-gray-300 pb-2">
          Delete "{itemName}"?
        </h2>
        <p className="text-[#191D23] text-sm mb-4">
          To confirm, please enter the name of the{" "}
          <span className="text-red-500 font-bold">{itemName}</span>.
        </p>
        <input
          type="text"
          placeholder={`Enter "${itemName}"`}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError("");
          }}
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-[#7dcfb4]"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex gap-4 mt-2">
          <button
            className="flex-1 bg-[#69b098] text-white py-2 rounded-md font-semibold hover:bg-[#6cba9f] transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={`flex-1 py-2 rounded-md font-semibold transition-colors ${
              inputValue === itemName
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleDelete}
            disabled={inputValue !== itemName}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
