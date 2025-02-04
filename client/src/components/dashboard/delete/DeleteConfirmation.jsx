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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Delete "{itemName}"?
        </h2>
        <p className="text-gray-700 mb-4">
          To confirm, please enter the name of the{" "}
          <span className="font-bold">{itemName}</span>.
        </p>
        <input
          type="text"
          placeholder={`Enter "${itemName}"`}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError("");
          }}
          className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${
              inputValue === itemName
                ? "bg-red-600 text-white hover:bg-red-700"
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
