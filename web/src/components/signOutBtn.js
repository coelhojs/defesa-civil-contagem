import React from 'react';

export default function signOutBtn(props) {
    // console.log(`Auth, ${props.auth}`)
    if (props.auth) {
        return (
            <div>
                <button
                    onClick={() => {
                        props.firebase.auth().signOut();
                        console.log(props.firebase)
                    }}
                >
                    Sign Out
                    </button>
                }
        </div>
        );
    } else {
        return null;
    }
};