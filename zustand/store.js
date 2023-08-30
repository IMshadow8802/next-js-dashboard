import {create} from 'zustand';

const useDataStore = create((set) => ({
  data: [],
  activeBoardId: null,
  dropdownOpen: false, // Add a new state for dropdownOpen
  setData: (newData) => set({ data: newData }),
  setActiveBoard: (boardId) => set({ activeBoardId: boardId }),
  setOpenDropdown: (isOpen) => set({ dropdownOpen: isOpen }), // Set the state of dropdownOpen
}));

export default useDataStore;
