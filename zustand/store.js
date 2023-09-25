import { create } from 'zustand';

const useDataStore = create((set) => ({
  data: [],
  activeBoardId: null,
  dropdownOpen: false,
  menuData: [], // Add the menuData state
  setData: (newData) => set({ data: newData }),
  setActiveBoard: (boardId) => set({ activeBoardId: boardId }),
  setOpenDropdown: (isOpen) => set({ dropdownOpen: isOpen }),
  setMenuData: (newMenuData) => set({ menuData: newMenuData }), // Function to update menuData
}));

export default useDataStore;