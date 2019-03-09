import React from 'react';
import FeeForm from '../../components/FeeForm/FeeForm';
import './CreatePage.scss';

const CreatePage = (props) => {
    return (
        <div className="create_page">
            <div className="create_page__header">
                <p><span>1</span></p>
                <p><span>2</span></p>
            </div>
            <FeeForm feeFormDefault={props.feeFormDefault} membership={props.membership}/>
        </div>
    );
};

export default CreatePage;