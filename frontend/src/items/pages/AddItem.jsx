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
  const [validTitle, setValidTitle] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [validCategory, setValidCategory] = useState(true);
  const [category, setCategory] = useState("");
  const titleRef = useRef();
  const descriptionRef = useRef();
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
    let valid = true;
    if (
      !(titleRef.current.value.length > 2 && titleRef.current.value.length < 60)
    ) {
      setValidTitle(false);
      valid = false;
    } else setValidTitle(true);
    if (
      !(
        /^\d+\.\d+$/.test(priceRef.current.value) &&
        priceRef.current.value.length -
          priceRef.current.value.lastIndexOf(".") ==
          3
      )
    ) {
      setValidPrice(false);
      valid = false;
    } else setValidPrice(true);
    if (category.length < 1) {
      setValidCategory(false);
      valid = false;
    } else setValidCategory(true);
    if (!valid) return;

    createItemMutation.mutate({
      itemName: titleRef.current.value,
      description: descriptionRef.current.value,
      category: category,
      price: priceRef.current.value,
      image: imageRef.current.value,
      token: auth.token,
    });
    history.push("/");
  };

  return (
    <form className="item-form" onSubmit={itemSubmitHandler}>
      <Input id="title" ref={titleRef} type="text" label="Title" />
      {!validTitle && (
        <p>Invalid input. Title must contain 3 to 60 characters</p>
      )}
      <Input
        id="description"
        ref={descriptionRef}
        type="text"
        label="Description"
      />
      <Input id="price" ref={priceRef} type="text" label="Price" />
      {!validPrice && (
        <p>Invalid input. Please enter the price in the form xx.xx</p>
      )}
      <Input id="image" ref={imageRef} type="text" label="Image Link" />
      <div className="item-form-dropdown">
        <Dropdown id="category" handleCategoryChange={handleCategoryChange} />
      </div>
      {!validCategory && <p>Please select a category.</p>}
      <Button id="add-item" type="submit">
        Add Item
      </Button>
    </form>
  );
};

export default AddItem;
