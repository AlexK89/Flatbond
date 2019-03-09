import React from 'react';
import FeeForm from '../../components/FeeForm/FeeForm';
import './CreatePage.scss';

const CreatePage = () => {
    return (
        <div className="create_page">
            <h1>Create order</h1>
            <FeeForm />
        </div>
    );
};

export default CreatePage;