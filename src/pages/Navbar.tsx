import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav style={{
            width:'250px',
            backgroundColor:'#007BFF',
            color:'#FFFFFF',
            padding:'15px',
            minHeight:'100vh',
            position:'fixed',
            left:0,
            top:0,
            boxShadow:'2px 0 5px rgba(0,0,0,0.2)'
        }}>
            <h2 style={{textAlign:'center',fontSize:'24px', marginBottom:'20px'}}>Menu</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li>
                    <Link to="/Product" style={linkStyle} className="bg-sky-500 hover:bg-sky-700">Products</Link>
                </li>
                <li>
                    <Link to="/Categories" style={linkStyle} className="bg-sky-500 hover:bg-sky-700">Category</Link>
                </li>
                <li>
                    <Link to="/users" style={linkStyle} >Users</Link>
                </li>
                <li>
                    <Link to="/suppliers" style={linkStyle}>Suppliers</Link>
                </li>
                <li>
                    <Link to="/CreateOrder" style={linkStyle} className="bg-sky-500 hover:bg-sky-700">Place Order</Link>
                </li>
                <li>
                    <Link to="/Orders" style={linkStyle} className="bg-sky-500 hover:bg-sky-700">Orders</Link>
                </li>
                <li>
                    <Link to="/reports" style={linkStyle}>Reports</Link>
                </li>
                <li>
                    <Link to="/creditors" style={linkStyle}>Creditors</Link>
                </li>
            </ul>

        </nav>

    )
}
const linkStyle={
    color:'#FFFFFF',
    textDecoration:'none',
    fontSize:'18px',
    margin:'15px 0',
    display:'block',
    transition:'background-color 0.3s, padding-left 0.3s',
    padding:'10px',
    borderRadius:'5px',

};
const linkHoverStyle={
    ...linkStyle,
    backgroundColor:'#007BFF',
    paddingLeft:'15px',
};

export default Navbar;