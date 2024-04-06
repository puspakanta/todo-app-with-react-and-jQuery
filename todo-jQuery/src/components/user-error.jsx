import { Link } from "react-router-dom";


export function UserError(){
    return(
        <div className="text-end">
            <h1 className="text-end pt-4">Invalid Credentials</h1>
            <Link to='/login' className="btn btn-warning"> Try Again </Link>
        </div>
    )
}