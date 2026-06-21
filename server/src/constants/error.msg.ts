export const errors: any  = Object.seal({
    'Email_Password_Required': 'Email or Password Required',
    'Invalid_Credentials': 'Invalid email or password',
    'Name_Username_Email_Password_Required': 'Name, Username, Email and Password are required',
    'Email_Already_Exists': 'Email is already registered',
    'Username_Already_Exists': 'Username is already taken'
})

export const getErrors = (errorName: string) => {
    return errors[errorName];
}
