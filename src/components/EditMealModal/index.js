import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const EditMealModal = ({ meal, setMeal, show, setShow, ingredients }) => {

    const [newTitle, setnewTitle] = useState(meal.strMeal)
    const [newInstructions, setnewInstructions] = useState(meal.strInstructions)
    var newIngredients = [...ingredients];

    const handleClose = () => setShow(false);

    const SaveChanges = () => {
        const newMeal = { ...meal };

        if (newTitle !== undefined)
            newMeal.strMeal = newTitle;
        if (newInstructions !== undefined)
            newMeal.strInstructions = newInstructions;

        for (let i = 0; i < newIngredients.length; i++) {
            const newStrIngredient = "strIngredient" + (i + 1);
            const newStrMeasure = "strMeasure" + (i + 1);
            newMeal[newStrIngredient] = newIngredients[i].ingredient;
            newMeal[newStrMeasure] = newIngredients[i].measure;
        }

        setMeal(newMeal);
        setShow(false);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit meal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Meal title</Form.Label>
                        <Form.Control className='my-modal-title' as='textarea' defaultValue={meal.strMeal} onChange={(e) => setnewTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ingredients and measures</Form.Label>
                        {ingredients.map((element, i) =>
                            <div style={{ display: 'flex' }}>
                                <Form.Control className='modal-ingredients' as='textarea' defaultValue={element.ingredient} onChange={(e) => newIngredients[i].ingredient = e.target.value} />
                                <Form.Control className='modal-ingredients' as='textarea' defaultValue={element.measure} onChange={(e) => newIngredients[i].measure = e.target.value} />
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Meal instructions</Form.Label>
                        <Form.Control className='modal-instructions' as='textarea' defaultValue={meal.strInstructions} onChange={(e) => setnewInstructions(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                <Button variant="purple" onClick={SaveChanges}>
                    Save Changes
                    </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default EditMealModal;
