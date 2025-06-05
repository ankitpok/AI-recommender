import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

function FetchItemsDjango() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        dispatch(fetchStatusActions.markFetchingStarted());
        
        const response = await axios.get("http://localhost:8000/items/");
        //console.log(response)
        // Django REST Framework wraps items in a 'items' key
        const items = response.data;

        dispatch(itemsActions.addInitialItems(items));
        dispatch(fetchStatusActions.markFetchingFinished());
      } catch (error) {
        console.error("Error fetching items from Django backend:", error);
        dispatch(fetchStatusActions.markFetchingFinished());
      }
    };

    fetchItems();
  }, [dispatch]);

  return null; // This component doesn't render anything, it just fetches data
}

export default FetchItemsDjango;