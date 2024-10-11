import React from 'react';
import "../../css/core/Input.css"
import { GrUserAdmin } from 'react-icons/gr';

const Select = (props) => {
    const handleChange = (event) => props.setFieldValue(event.target.value);

    return (
        <div className="input">
            {props.icon === 'userKind' && <GrUserAdmin className="icon" />}
            <select onChange={handleChange} className="input-field">
                {props.values.map((v, i) => <option value={v} key={i}>{v}</option>)}
            </select>
        </div>
    )
}

export default Select;