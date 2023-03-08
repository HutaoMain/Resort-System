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
