import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Menu, Item } from "../../service/Service"

type ItemPayload = {
    item: Item,
    menuId: string
};

type AddItemsPayload = {
    items: Item[],
    menuId: string
};

type RemoveItemPayload = {
    item: string,
    menuId: string
};

const initialState: Menu[] = [{id : 'id'}];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCart: () => {
            return [{id : 'id'}];
        },
        addMenu: (state, action: PayloadAction<string>) => {
            return [...state, {id: action.payload}];
        },
        addDish: (state, action: PayloadAction<ItemPayload>) => {
            return state.map(menu => {
                if (menu.id === action.payload.menuId){
                  return {...menu, dish : action.payload.item}
                }
                return menu;
              })
        },
        addSides: (state, action: PayloadAction<AddItemsPayload>) => {
            return state.map(menu => {
                if (menu.id === action.payload.menuId){
                  return {...menu, sides : action.payload.items}
                }
                return menu;
              })
        },
        addDrink: (state, action: PayloadAction<ItemPayload>) => {
            return state.map(menu => {
                if (menu.id === action.payload.menuId){
                  return {...menu, drink : action.payload.item}
                }
                return menu;
              })
        },
        removeItem: (state, action: PayloadAction<RemoveItemPayload>) =>{
            switch (action.payload.item){
                case "dish":
                  return state.filter(menu => {
                    return menu.id !== action.payload.menuId;
                  });
                  case "drink":
                    return state.map(menu => {
                      if (menu.id === action.payload.menuId){
                        const {drink, ...updatedMenu} = menu;
                        drink == null;
                        return updatedMenu;
                      }
                      return menu;
                    });
              }
        },
        removeSide: (state, action: PayloadAction<ItemPayload>) => {
            return state.map(menu => {
                if (menu.id === action.payload.menuId){
                  const updatedSides = menu.sides?.filter(side => side.title !== action.payload.item.title);
                  return {...menu, sides : updatedSides};
                }
                return menu;
              })
        }
    }
})

export const {resetCart, addMenu, addDish, addSides, addDrink, removeItem, removeSide} = cartSlice.actions;
export default cartSlice.reducer;