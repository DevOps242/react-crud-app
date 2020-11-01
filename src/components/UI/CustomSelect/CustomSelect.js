import React, {Component} from 'react';
import Select from 'react-select';

import Modal from "../Modal/Modal";

import classes from './CustomSelect.module.css';

class CustomSelect extends Component {
    render(){

        let message = null;

        const onSubmit = (event) => {
            event.preventDefault();
            if (this.categoryInput.value == '' || this.categoryInput.value == null){
                message = <p>Please enter in a Category Name</p>
            }
            else {
                message = <p>Category Create Sucessfully</p>
                this.props.saveCatCreateModal(
                    this.categoryInput.value
                )
            }
        
            this.categoryInput.value = '';

            message = <p style={{color: 'green'}}>Category successfully added</p>
        };
        
        
        let select = <Select></Select>

        if (this.props.options) {
            select =
                <Select 
                    options={this.props.options} 
                    onChange={this.props.onChange}
                    defaultValue={this.props.defaultValue}
                    createModal={this.props.createModal}
                    onClick={this.getValue}
                    isMulti={true}
                    placeholder='Select a Category'
                    isSearchable 
                    autoFocus
                    noOptionsMessage={() => 'Create a Category'}
                />
        }
        
        let catCreate = null;
        if (this.props.changeAddPostHandler){            
            catCreate = (
                <div>
                    <Modal style={{zIndex: '1000'}}>
                        <div className={classes.CustomSelect}>
                            <h5>Add Category</h5>
                            <form onSubmit={this.onSubmit}>
                                <input
                                placeholder="Category Name"
                                name=''
                                ref={(categoryInput) => (this.categoryInput = categoryInput)}
                                />
                                <hr/>
                                <button
                                    className={classes.saveButton}
                                    onClick={onSubmit}>Save
                                </button>
                                <button 
                                    className={classes.cancelButton}
                                    onClick={this.props.closeCatCreateModal}>Close
                                </button> 
                            </form>
                        </div>
                    </Modal>
                </div>
            )         
        }

        return (
            <div>
                <h5>{this.props.label}</h5>
                {select}
                {catCreate}
            </div>
        );
        
    }

}
export default CustomSelect;


