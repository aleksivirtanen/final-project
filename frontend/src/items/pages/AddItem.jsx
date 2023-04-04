import { React, useContext, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";
import Dropdown from "../../shared/components/dropdown/Dropdown";
import "./AddItem.css";
import { createItem } from "../api/items";
import { AuthContext } from "../../shared/context/auth-context";

const AddItem = () => {
  const [category, setCategory] = useState("");
  const itemNameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();

  const auth = useContext(AuthContext);
  const history = useHistory();

  const createItemMutation = useMutation({
    mutationFn: createItem,
  });

  const handleCategoryChange = (selected) => {
    setCategory(selected);
  };

  const itemSubmitHandler = (event) => {
    event.preventDefault();
    createItemMutation.mutate({
      itemName: itemNameRef.current.value,
      category: category,
      price: priceRef.current.value,
      image: imageRef.current.value,
      token: auth.token,
    });
    history.push("/");
  };

  return (
    <form className="item-form" onSubmit={itemSubmitHandler}>
      <Input id="title" ref={itemNameRef} type="text" label="Title" />
      <Input id="price" ref={priceRef} type="text" label="Price" />
      <Input id="image" ref={imageRef} type="text" label="Image Link" />
      <div className="item-form-dropdown">
        <Dropdown id="category" handleCategoryChange={handleCategoryChange} />
      </div>
      <Button id="add-item" type="submit">
        Add Item
      </Button>
    </form>
  );
};

export default AddItem;
