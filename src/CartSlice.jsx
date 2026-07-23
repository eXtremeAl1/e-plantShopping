import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Inicijalizujemo prazan niz za artikle u korpi
  },
  reducers: {
    // Zadatak 2: Dodavanje artikla u korpu
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    // Zadatak 2: Uklanjanje artikla iz korpe po imenu
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    // Zadatak 2: Ažuriranje količine artikla
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;