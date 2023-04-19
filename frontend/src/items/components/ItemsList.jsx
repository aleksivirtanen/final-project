import React from "react";
import Item from "./Item";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ItemsList = ({ items, authRequired, refetchHandler }) => {
  if (items.length === 0) {
    return (
      <div>
        <h2>No items found.</h2>
      </div>
    );
  }
  return (
    <Box sx={{ display: "box" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 1, sm: 2, md: 4 }}
      >
        {items.map((item, index) => (
          <Grid item xs={1} sm={2} md={2} key={index}>
            <Item
              key={item.id}
              id={item.id}
              userId={item.userId}
              userName={item.name}
              itemName={item.itemName}
              description={item.description}
              category={item.category}
              price={item.price}
              image={item.image}
              authRequired={authRequired}
              refetchHandler={refetchHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ItemsList;
