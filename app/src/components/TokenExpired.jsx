import Swal from 'sweetalert2';

export function handleNetworkError(error, navigate) {
    if (error.code === "ERR_NETWORK") {
        Swal.fire({
            icon: 'error',
            title: 'Token expired',
            text: 'Please login again to continue',
            timer: 1500,
            showConfirmButton: false,
            background: "var(--talent-secondary)",
            color: "white",
            confirmButtonColor: "var(--talent-highlight)",
        });
        navigate('/login');
    } else if (error instanceof TypeError && error.message === "NetworkError when attempting to fetch resource.") {
        Swal.fire({
            icon: 'error',
            title: 'Invalid token',
            text: 'Please login again to continue',
            timer: 1500,
            showConfirmButton: false,
            background: "var(--talent-secondary)",
            color: "white",
            confirmButtonColor: "var(--talent-highlight)",

        });
        navigate('/login');
    } else if (error.response.data.errors[0].title === "Error getting professional experience by user id") {
        Swal.fire({
            icon: 'error',
            title: 'Invalid token',
            text: 'Please login again to continue',
            timer: 1500,
            showConfirmButton: false,
            background: "var(--talent-secondary)",
            color: "white",
            confirmButtonColor: "var(--talent-highlight)",

        });
        navigate('/login');
    } else if (error.response.data.errors[0].detail === "Error when getting the analysis by ID: Cast to ObjectId failed for value \"${undefined}\" (type string) at path \"_id\" for model \"Analysis\"") {
        Swal.fire({
            icon: 'error',
            title: 'Invalid token',
            text: 'Please login again to continue',
            timer: 1500,
            showConfirmButton: false,
            background: "var(--talent-secondary)",
            color: "white",
            confirmButtonColor: "var(--talent-highlight)",

        });
        navigate('/login');
    } else if (error.response.data.errors[0].detail === "Error when getting the analysis by ID: jwt expired") {
        Swal.fire({
            icon: 'error',
            title: 'Invalid token',
            text: 'Please login again to continue',
            timer: 1500,
            showConfirmButton: false,
            background: "var(--talent-secondary)",
            color: "white",
            confirmButtonColor: "var(--talent-highlight)",

        });
        navigate('/login');
    } else if (error.response.data.errors[0].detail === "jwt expired") {
        Swal.fire({
            icon: 'error',
            title: 'Invalid token',
            text: 'Please login again to continue',
            timer: 1500,
            showConfirmButton: false,
            background: "var(--talent-secondary)",
            color: "white",
            confirmButtonColor: "var(--talent-highlight)",

        });
        navigate('/login');
    }

}