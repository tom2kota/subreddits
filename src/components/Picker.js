import React from 'react'
import PropTypes from 'prop-types'


const Picker = ({value, onChange, options}) => (
    <div className="two fields">
        <div className="field">
            <h2 className="ui teal header">{value.toUpperCase()}</h2>
        </div>
        <div className="field">
            <select onChange={e => onChange(e.target.value)} value={value}>
                {options.map(option =>
                    <option value={option} key={option}>
                        {option}
                    </option>)
                }
            </select>
        </div>
    </div>
)


Picker.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Picker
