import Login from "./Login";
import { render,screen } from "@testing-library/react";

describe('AuthForm Testing', ()=>{
    test('Sign Up Exists', ()=>{
        render(<Login/>)

        const signUpElement = screen.getByText('Sign Up')
        expect(signUpElement).toBeInTheDocument
    })
    test('Email Exists',()=>{
        render(<Login />)
        const emailElement = screen.getByText('Your Email')
        expect(emailElement).toBeInTheDocument
    })
    test('Password Exists',()=>{
        render(<Login />)
        const passElement = screen.getByText('Your Password')
        expect(passElement).toBeInTheDocument

    })
    test('Create Account Exits',()=>{
        render(<Login />)
        const loginElement = screen.getByRole('button')
        expect(loginElement).toBeInTheDocument
    })
    test('Login Link Exists', ()=>{
        render(<Login />)
        const linkElement = screen.getByRole('link')
        expect(linkElement).toBeInTheDocument
    })
})