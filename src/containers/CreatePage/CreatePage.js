import React from 'react';
import FeeForm from '../../components/FeeForm/FeeForm';
import './CreatePage.scss';

const CreatePage = (props) => {
    return (
        <div className="create_page">
            <h1>Create order</h1>
            <FeeForm feeFormDefault={props.feeFormDefault} membership={props.membership}/>
        </div>
    );
};

export default CreatePage;