import Swal from "sweetalert2";
const register = async (formData) => {
    const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    const result = await response.json();
    if(!response.ok){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.errors,
            footer: "Silakan coba lagi nanti.",
        })
        return;
    }
    return result;
}

export default register;