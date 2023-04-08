import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import Card from "../../shared/components/card/Card";
import Button from "../../shared/components/button/Button";
import Modal from "../../shared/components/modal/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import { deleteItem } from "../api/items";
import "./Item.css";

const Item = (props) => {
  const auth = useContext(AuthContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (data) => {
      console.log(data);
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
          <div className="item__image">
            <img src={props.image} alt={props.itemName} />
          </div>
          <div className="item__info">
            <h3>{props.itemName}</h3>
            <h2>{props.category}</h2>
            <h2>{props.description}</h2>
            <h2>{props.price}</h2>
          </div>
          <div className="item__actions">
            {auth.userId === props.userId && (
              <Button danger onClick={showConfirmationHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default Item;
