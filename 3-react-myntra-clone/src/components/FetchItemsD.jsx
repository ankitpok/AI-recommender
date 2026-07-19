import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

function FetchItemsDjango() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        dispatch(fetchStatusActions.markFetchingStarted());
        const response = await api.get("/items");
        dispatch(itemsActions.addInitialItems(response.data));
        dispatch(fetchStatusActions.markFetchingFinished());
      } catch (error) {
        console.error("Error fetching items:", error);
        dispatch(fetchStatusActions.markFetchingFinished());
      }
    };

    fetchItems();
  }, [dispatch]);

  return null;
}

export default FetchItemsDjango;
