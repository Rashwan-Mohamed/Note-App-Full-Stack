/* eslint-disable react/prop-types */
import React from 'react'
import SVG4 from '../../assets/SVG Components/SVG4';

export default function DeleteNote({ setSure, width, title }) {
    return (
        <button
            onClick={() => {
                setSure({ title: title, operation: "delete", content: "" });
            }}
            className="asideBtns"
        >
            <SVG4></SVG4>
            {width > 1025 ? <span> Delete Note</span> : ""}
        </button>
    )
}
