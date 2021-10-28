import "./navbar.css";

function navbar(props){
    return (
        <div className="navbar">
            <div className="primary">
                <div className="logo">
                    <p>CediX</p>
                </div>
                <div className="account">
                    <button className="login">Login</button>
                    <div className="profile">
                        <img />
                        <button>Test Name &#9662;</button>
                    </div>
                    <div className="dropdown">
                        <button>Log out</button>
                    </div>
                </div>
            </div>
            <div className="secondary">
                <div className="tabs">
                    <button><i class="fas fa-shopping-cart"></i></button>
                    <button><i class="fas fa-newspaper"></i> </button>
                    <button><i class="fas fa-dollar-sign"></i></button>
                </div>
            </div>
        </div>
    )
}

export default navbar
