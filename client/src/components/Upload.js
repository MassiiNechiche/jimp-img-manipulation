import React, { useState } from 'react'

import axios from 'axios'

export default function Upload() {
    const [selectedFile, setSelectedFile] = useState(null)

    const submit = () => {
        const formdata = new FormData()
        formdata.append('image', selectedFile)

        axios
            .post('http://localhost:5000/upload', formdata, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => {
                // then print response status
                // console.warn(res)
                if (res.data.success === 1) {
                    alert('success')
                    window.location = '/'
                }
            })
    }

    return (
        <div className="upload">
            <div className="title">
                <h2>Upload your picture 🚀</h2>
            </div>
            <div className="subtitle">
                <span>in JPEG, PNG ... </span>
            </div>

            <div className="form">
                {!selectedFile ? (
                    <label htmlFor="image">Upload </label>
                ) : (
                    <button onClick={submit}>Submit</button>
                )}

                <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        setSelectedFile(file)
                    }}
                />
            </div>

            <div className="preview">
                {selectedFile && (
                    <span onClick={() => setSelectedFile(null)}>
                        <p>{selectedFile.name}</p>
                        <h3>X</h3>
                    </span>
                )}
            </div>
        </div>
    )
}
