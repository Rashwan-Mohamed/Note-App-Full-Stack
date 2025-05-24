/* eslint-disable react/prop-types */
import React from 'react'

export default function AssureOperation({ sure, setSure, handleEditNote }) {
    const { operation, title, payload } = sure;
    return (
        <div className="wrapperLay">
            {" "}
            <section className="finalWarning">
                <p>
                    are you sure you want to{" "}
                    {operation === "edit" ? "save" : operation} this note ?
                </p>
                <div className="sureBtns">
                    <button
                        className="ftbtn suDo"
                        onClick={() => {
                            handleEditNote(title, operation, payload);
                            setSure(null);
                        }}
                    >
                        {sure === "edit" ? "save" : operation}
                    </button>
                    <button
                        className="ftbtn fotbtncn"
                        onClick={() => {
                            setSure(null);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </section>
        </div>
    )
}
