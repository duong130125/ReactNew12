import React from 'react'

export default function SearchJob() {
  return (
    <>
    <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
        <input
        style={{ width: 350 }}
        type="text"
        className="form-control"
        placeholder="Tìm kiếm theo email"
        />
        <i className="fa-solid fa-arrows-rotate" title="Refresh" />
    </div>
    </>
  )
}
