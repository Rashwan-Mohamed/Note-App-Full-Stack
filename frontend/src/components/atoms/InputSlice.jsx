import React from 'react'

export default function InputSlice({ error, type, label, name, value, onchange }) {
    return (
        <>
            <div className={`putFrslice`}>
                <label htmlFor="username">{label}</label>
                <input required type={type} name={name} id={name} value={value} onChange={e => onchange(e.target.value)} />
                {error && <p className='errors' >{error}</p>}
            </div>

        </>
    )
}
