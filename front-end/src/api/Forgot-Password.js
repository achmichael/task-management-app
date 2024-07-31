const forgot_password = async (email) => {
    const response = await fetch('http://localhost:3000/api/user/forgot-password', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })

    const result = await response.json();

    if(!response.ok){
        throw new Error(result.errors);
    }

    return result;
}

export default forgot_password;