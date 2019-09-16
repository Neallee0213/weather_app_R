import React from 'react'
import "./form.css"

const Form = (props) => {
    return (
        <div className="container">
        <div>{ props.error ? error() : null }</div>
            <form onSubmit={props.loadweather}>
                <div className="row">
                    <div className="col-md-3 offset-md-2">
                        <input type="text" className="form-control" name="city" autoComplete="off" placeholder="City">
                        </input>
                    </div>
                    <div className="col-md-3">
                        <input type="text" className="form-control" name="country" autoComplete="off" placeholder="Country">
                        </input>
                    </div>
                    <div className="col-md-3 mt-md-0 py-3 text-md-left">
                        <button className="btn btn-link">Get Weater</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
const error =()=>{
return(
    <div className="alert alert-danger mx-5" role="alert">
    Please Enter City and Country
    </div>
)
}
export default Form;