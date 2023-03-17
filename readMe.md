1. fix the cookie session

In your case, you're using cookies to store the JWT token, which contains the user's information. This approach is secure, and it's commonly used in web applications. However, it's important to ensure that the cookies are secure, HttpOnly, and have the SameSite attribute set to Strict, as these settings help to prevent CSRF attacks and cookie theft.

#google api
{
id: '107644451770261787100',
displayName: 'Ali Mohamed Alcantara',
name: { familyName: 'Alcantara', givenName: 'Ali Mohamed' },
photos: [
{
value: 'https://lh3.googleusercontent.com/a/AGNmyxYo9SEX-mC8NdOVdaBnWXdCC8CwPJAGh4lPSOz6AA=s96-c'
}
],
provider: 'google',
\_raw: '{\n' +
' "sub": "107644451770261787100",\n' +
' "name": "Ali Mohamed Alcantara",\n' +
' "given_name": "Ali Mohamed",\n' +
' "family_name": "Alcantara",\n' +
' "picture": "https://lh3.googleusercontent.com/a/AGNmyxYo9SEX-mC8NdOVdaBnWXdCC8CwPJAGh4lPSOz6AA\\u003ds96-c",\n' +
' "locale": "en"\n' +
'}',
\_json: {
sub: '107644451770261787100',
name: 'Ali Mohamed Alcantara',
given_name: 'Ali Mohamed',
family_name: 'Alcantara',
picture: 'https://lh3.googleusercontent.com/a/AGNmyxYo9SEX-mC8NdOVdaBnWXdCC8CwPJAGh4lPSOz6AA=s96-c',
locale: 'en'
}
}

#facebook

{
id: '6858018010879926',
username: undefined,
displayName: 'Ali Alcantara',
name: {
familyName: undefined,
givenName: undefined,
middleName: undefined
},
gender: undefined,
profileUrl: undefined,
photos: [
{
value: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=6858018010879926&height=50&width=50&ext=1681550332&hash=AeSnTA9BlTRbK4cSgPE'
}
],
provider: 'facebook',
\_raw: '{"id":"6858018010879926","name":"Ali Alcantara","picture":{"data":{"height":50,"is_silhouette":false,"url":"https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=6858018010879926&height=50&width=50&ext=1681550332&hash=AeSnTA9BlTRbK4cSgPE","width":50}}}',
\_json: {
id: '6858018010879926',
name: 'Ali Alcantara',
picture: { data: [Object] }
}
}
