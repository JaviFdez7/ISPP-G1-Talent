import React from 'react';

const Select = ({ label, allValues, defaultValue, functionToApply }) => {
    return (
        <div>
            <label htmlFor="select" style={styles.label}>{label}</label>
            <select id="select" value={defaultValue} onChange={(e) => functionToApply(e.target.value)} style={styles.selector}>
                {allValues.map((item, index) => {
                    return <option key={index} value={item} style={styles.selection}>{item}</option>;
                })}
            </select>
        </div>
    );
}

export default Select;

const styles = {
    label: {
        display: 'block',
        marginBottom: '10px'
    },
    selector: {
        backgroundColor: 'black',
        color: 'white',
        border: '1px solid white',
        padding: '5px',
        borderRadius: '5px',
        width: '200px',
    },
    selection: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white'
    }
};
