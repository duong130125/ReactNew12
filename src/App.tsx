import React from 'react'
import AddJob from './components/AddJob'
import ListJob from './components/ListJob'
import SearchJob from './components/SearchJob'

export default function App() {
  return (
    <>
    <div className="w-[80%] m-auto mt-4 h-[100vh]">
    <main className="main">
        <AddJob></AddJob>
        <SearchJob></SearchJob>
        {/* Danh sách nhân viên */}
        <ListJob></ListJob>
        <footer className="d-flex justify-content-end align-items-center gap-3">
            <select className="form-select">
            <option selected>Hiển thị 10 bản ghi trên trang</option>
            <option>Hiển thị 20 bản ghi trên trang</option>
            <option>Hiển thị 50 bản ghi trên trang</option>
            <option>Hiển thị 100 bản ghi trên trang</option>
            </select>
            <ul className="pagination">
            <li className="page-item">
                <a className="page-link" href="#">
                Previous
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="#">
                1
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="#">
                2
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="#">
                3
                </a>
            </li>
            <li className="page-item">
                <a className="page-link" href="#">
                Next
                </a>
            </li>
            </ul>
        </footer>
    </main>
    </div>
    {/* Modal xác nhận chặn tài khoản */}
    {/* Modal xác nhận xóa tài khoản */}
    </>
  )
}
