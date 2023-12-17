import React from 'react'
export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <>
                {/* <!-- Footer--> */}
            <footer className="footer text-center mt-5">
                <div className="container">
                    <div className="row">
                        {/* <!-- Footer Location--> */}
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <h4 className="text-uppercase mb-4">Location</h4>
                            <p className="lead mb-0">
                                Kathmandu, Nepal
                            </p>
                        </div>
                        {/* <!-- Footer Social Icons--> */}
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <h4 className="text-uppercase mb-4">DIGITAL PLATFORMS</h4>
                            <a className="btn btn-outline-light btn-social mx-1" target="_blank" href="https://www.facebook.com"><i className="fab fa-fw fa-facebook-f"></i></a>
                            <a className="btn btn-outline-light btn-social mx-1" target="_blank" href="https://www.twitter.com"><i className="fab fa-fw fa-twitter"></i></a>
                            <a className="btn btn-outline-light btn-social mx-1" target="_blank" href="https://www.linkedin.com"><i className="fab fa-fw fa-linkedin-in"></i></a>
                        </div>
                        {/* <!-- Footer About Text--> */}
                        <div className="col-lg-4">
                            <h4 className="text-uppercase mb-4">About TaskDrive</h4>
                            <p className="lead mb-0">
                                For you to manage your tasks.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
            {/* <!-- Copyright Section--> */}
            <div className="copyright py-4 text-center text-white">
                <div className="container"><small>Copyright &copy; TaskDrive {year}</small></div>
            </div>
        </>
    )
}
