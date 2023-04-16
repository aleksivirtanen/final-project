import React, { useContext, useState, useRef } from "react";
import { useMutation } from "react-query";
import Card from "../../shared/components/card/Card";
import Button from "../../shared/components/button/Button";
import Modal from "../../shared/components/modal/Modal";
import Input from "../../shared/components/input/Input";
import { AuthContext } from "../../shared/context/auth-context";
import { deleteItem, editItem } from "../api/items";
import "./Item.css";

const Item = (props) => {
  const auth = useContext(AuthContext);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  const [editMode, setEditMode] = useState(false);
  const enterEditModeHandler = () => setEditMode(true);
  const cancelEditModeHandler = () => setEditMode(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const [validTitle, setValidTitle] = useState(true);
  const [validPrice, setValidPrice] = useState(true);

  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (data) => {
      console.log(data);
      props.refetchHandler();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    console.log("Do we get here?");
    deleteItemMutation.mutate({
      id: props.id,
      token: auth.token,
    });
  };

  const editItemMutation = useMutation({
    mutationFn: editItem,
    onSuccess: (data) => {
      console.log(data);
      props.refetchHandler();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const saveChangesHandler = (event) => {
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
    if (!valid) return;

    editItemMutation.mutate({
      id: props.id,
      itemName: titleRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      token: auth.token,
    });
    setEditMode(false);
  };

  const noImagePlaceholder =
    "https://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png";

  const addPlaceholder = (event) => {
    event.target.src = noImagePlaceholder;
  };

  return (
    <>
      <Modal
        show={showConfirmationModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelConfirmationHandler}>
              Cancel
            </Button>
            <Button delete onClick={deleteConfirmedHandler}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure? Once it's gone, it's gone!</p>
      </Modal>
      <li className="item">
        <Card className="item__content">
          <h2>{props.category}</h2>
          <div className="item__image">
            <img
              src={props.image}
              alt={props.itemName}
              onError={addPlaceholder}
            />
          </div>
          <div className="item__info">
            {!editMode && (
              <>
                <h3>{props.itemName}</h3>
                {props.description.length > 0 && <h2>{props.description}</h2>}
                <h2>{props.price}</h2>
              </>
            )}
            {editMode && (
              <>
                <Input
                  id="edit-title"
                  ref={titleRef}
                  type="text"
                  label="Title"
                  defaultValue={props.itemName}
                />
                {!validTitle && (
                  <p>Invalid input. Title must contain 3 to 60 characters</p>
                )}
                <Input
                  id="edit-title"
                  ref={descriptionRef}
                  type="text"
                  label="Description"
                  defaultValue={props.description}
                />
                <Input
                  id="edit-title"
                  ref={priceRef}
                  type="text"
                  label="Price"
                  defaultValue={props.price}
                />
                {!validPrice && (
                  <p>Invalid input. Please enter the price in the form xx.xx</p>
                )}
              </>
            )}
            {props.showUserName && <h2>Owner: {props.userName}</h2>}
          </div>
          <div className="item__actions">
            {auth.userId === props.userId && !editMode && (
              <>
                <Button onClick={enterEditModeHandler}>Edit</Button>
                <Button danger onClick={showConfirmationHandler}>
                  Delete
                </Button>
              </>
            )}
            {auth.userId === props.userId && editMode && (
              <>
                <Button onClick={saveChangesHandler}>Save</Button>
                <Button danger onClick={cancelEditModeHandler}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default Item;
