/* eslint-disable react/prop-types */
import React from 'react'
import SVG3 from '../../assets/SVG Components/SVG3';

export default function ArchiveNote({ setSure, isArchived, width, title }) {
    return (
        <button
            onClick={() => {
                setSure({
                    title: title, operation: isArchived ? "Un-Archive" : "archieve", content: "",
                });
            }}
            className="asideBtns"
        >
            <SVG3></SVG3>
            {width > 1025 ? (<span> {isArchived ? "Un-Archive" : "Archive"} Note</span>) : ("")}
        </button>
    )
}


