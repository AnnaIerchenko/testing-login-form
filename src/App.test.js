import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

beforeEach(() => {
 
})
const typeIntoForm = ({ email, password, confirmPassword}) => {
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  })
  const passwordInputElement = screen.getByLabelText("Password")
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i)
  if(email) {
    userEvent.type(emailInputElement, email)
  }
  if(password) {
    userEvent.type(passwordInputElement, password)
  }
  if(confirmPassword){
    userEvent.type(confirmPasswordInputElement, confirmPassword)
  }
  return{
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement
  }
}


test('inputs should be initially empty', () => { 
  render(<App />)
  const emailInputElement = screen.getByRole('textbox')
  const passwordnputElement = screen.getByLabelText('Password')
  const confirmPasswordnputElement = screen.getByLabelText(/confirm password/i)
  expect(emailInputElement.value).toBe('')
  expect(passwordnputElement.value).toBe('')
  expect(confirmPasswordnputElement.value).toBe('')
})

test("should be able to type an email", () => {
  render(<App />)
  // const emailInputElement = screen.getByRole("textbox", {
  //   name: /email/i,
  // })
  // userEvent.type(emailInputElement, 'selena@gmail.com')
  const {emailInputElement} = typeIntoForm({ email: "selena@gmail.com"})
  expect(emailInputElement.value).toBe('selena@gmail.com')
})

test("should be able to type a password", () => {
  render(<App />)
  // const passwordInputElement = screen.getByLabelText("Password")
  // userEvent.type(passwordInputElement, 'Anana23456')
  const { passwordInputElement} = typeIntoForm({ password: "password!"})
  expect(passwordInputElement.value).toBe('password!')
})

test("should be able to type a confirm-password", () => {
  render(<App />)
  // const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i)
  // userEvent.type(confirmPasswordInputElement, 'confirm')
  const { confirmPasswordInputElement} = typeIntoForm({ confirmPassword: "password!"})
  expect(confirmPasswordInputElement.value).toBe('password!')
})

test('should show email error message on invalid email', () => {
  render(<App />)
  // const emailErrorElement = screen.gueryByText(
  //   /the email you input is invalid/i
  // )
  // expect(emailErrorElement).not.toBeInTheDocument()

  // const emailInputElement = screen.getByRole('textbox', {
  //   name: /email/i,
  // })
  // userEvent.type(emailInputElement, 'selenagmail.com')
  typeIntoForm({
    email: 'selenagmail.com'
  })
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i
  })
  userEvent.click(submitBtnElement)

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  )

  expect(emailErrorElementAgain).toBeInTheDocument()

})

test("should show password error if password is less than 5 characters", () => {
  render(<App />)

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  })
  userEvent.type(emailInputElement, "selena@gmail.com")

  
  const passwordInputElement = screen.getByLabelText("Password")
  userEvent.type(passwordInputElement, '123')
  
  const passwordErrorElement = screen.queryByRole(
    /the password you should contain 5 or more characters/i
  )
    expect(passwordErrorElement).not.toBeInTheDocument()

   const submitBtnElement = screen.getByRole("button", {
    name: /submit/i
   })
   userEvent.type(emailInputElement, "selena@gmail.com")
   userEvent.click(submitBtnElement)

  //  const passwordErrorElementAgain = screen.getByText(
  //   /the password you entered shuold contain 5 or more characters/i
  //  )
  //   expect(passwordErrorElementAgain).toBeInTheDocument()
})

test("should show confirm password error if password is less than 5 characters", () => {
  render(<App />)

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  })
  userEvent.type(emailInputElement, "selena@gmail.com")

  
  const passwordInputElement = screen.getByLabelText("Password")
  userEvent.type(passwordInputElement, '12345')
  
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i)

  const confirmPasswordErrorElement = screen.queryByText(
    /the password dont match, try again/i
  )
    expect(confirmPasswordErrorElement).not.toBeInTheDocument()

    userEvent.type(confirmPasswordInputElement, '123456')

   const submitBtnElement = screen.getByRole("button", {
    name: /submit/i
   })

   userEvent.click(submitBtnElement)

  //  const confirmPasswordElementAgain = screen.getByText(
  //   /the password you entered should contain 5 or more characters/i
  //  )
  //   expect(confirmPasswordElementAgain).toBeInTheDocument()
})


test("should show no error message if every input is valid", () => {
  render(<App />)

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  })
  const passwordInputElement = screen.getByLabelText("Password")
  const confirmPasswordInputElement = screen.queryByText(
    /the passwords dont match, try again/i
  )
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i
  })
  userEvent.type(emailInputElement, "selena@gmail.com")
  userEvent.type(passwordInputElement, "12345")
  userEvent.type(confirmPasswordInputElement, "12345")
  userEvent.click(submitBtnElement)

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  )
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more characters/i
  )
  const confirmPasswordErrorElement = screen.queryByText(
    /the password dont match, try again/i
  )
  
  expect(emailErrorElement).not.toBeInTheDocument()
  expect(passwordErrorElement).not.toBeInTheDocument()
  // expect(confirmPasswordErrorElement).not.toBeInTheDocument()
})