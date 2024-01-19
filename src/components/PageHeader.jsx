import React from 'react'
import { Link } from 'react-router-dom'

const PageHeader = ({ title, parentPath, currentPage }) => {
    return (
        <div className='pageheader-section'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="pageheader-content text-center">
                            <h2>{title}</h2>
                            <nav aria-label='breadcrumb'>
                                <ol className="breadcrumb justify-content-center align-items-center">
                                    <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                    {parentPath && (
                                        <li className="breadcrumb-item">
                                            <Link to={`/${parentPath.toLowerCase()}`}>{parentPath}</Link>
                                        </li>
                                    )}
                                    <li className="breadcrumb-item active" aria-current="page">{currentPage}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageHeader