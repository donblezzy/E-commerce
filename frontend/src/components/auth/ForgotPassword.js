import React, { useState, useEffect } from 'react'
import { useForgotPasswordMutation } from '../../redux/api/userApi'
import toast from "react-hot-toast"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import MetaData from '../layout/MetaData'

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [forgotPassword, { isLoading, error, isSuccess}] = useForgotPasswordMutation()

    const { isAuthenticated } = useSelector((state) => state.auth)

    const navigate = useNavigate()
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/")
      }
      if (error) {
        toast.error(error?.data?.message);
      }
      if (isSuccess) {
        toast.success("Email Sent. Please check your mail")
      }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isAuthenticated, isSuccess]);
  
    const submitHandler = (e) => {
      e.preventDefault();
  
      forgotPassword({ email });
    };

  return (
    <>
    <MetaData title={"Forget Password"} />
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}

        >
          <h2 className="mb-4">Forgot Password</h2>
          <div className="mt-3">
            <label htmlFor="email_field" className="form-label">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default ForgotPassword
