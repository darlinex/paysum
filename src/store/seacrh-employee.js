import { create } from "zustand";

export const useSearchEmployeeStore = create((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));
