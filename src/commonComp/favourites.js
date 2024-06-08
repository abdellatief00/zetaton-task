import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "../config/firebase";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function Favourites() {
  const favouriteCollections = collection(db, "Favourites");
  const [favourites, setfavourites] = useState([]);

  //get all items
  useEffect(() => {
    const getmovies = async () => {
      try {
        const q = query(
          favouriteCollections,
          where("userId", "==", auth.currentUser.uid)
        );
        const data = await getDocs(q);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setfavourites(filterData);
      } catch (e) {
        console.log(e);
      }
    };
    getmovies();
  }, []);

  //remove item
  const removeImage = async (id) => {
    try {
      const imageDoc = doc(db, "Favourites", id);
      await deleteDoc(imageDoc);
      setfavourites((prevFavourites) =>
        prevFavourites.filter((item) => item.id !== id)
      );
      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: "The image has been removed from your favourites.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (e) {
      console.log(e);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  //html
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "70%", height: 450, overflowY: "scroll" }}>
          <ImageList variant="masonry" cols={4} gap={8}>
            {favourites.map((item) => (
              <ImageListItem key={item.id}>
                <img
                  srcSet={`${item.ImageLink}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.ImageLink}?w=248&fit=crop&auto=format`}
                  alt={`${"favourites"}`}
                  loading="lazy"
                />
                <ImageListItemBar
                  sx={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                  }}
                  title={item.title}
                  position="top"
                  actionIcon={
                    <IconButton
                      sx={{ color: "yellow" }}
                      onClick={() => removeImage(item.id)}
                    >
                      <StarBorderIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </div>
    </>
  );
}
