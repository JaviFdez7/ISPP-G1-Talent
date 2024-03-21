import Swal from "sweetalert2";

const Logout = (logout, navigate, role) => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      confirmButtonColor: "var(--talent-highlight)",
      denyButtonColor: "var(--talent-black)",
      background: "var(--talent-secondary)",
      color: "white",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        Swal.fire({
          title: "Closed session",
          icon: "success",
          background: "var(--talent-secondary)",
          color: "white",
          confirmButtonColor: "var(--talent-highlight)",
        });
      } else if (result.isDenied) {
        if (role === "Representative") {
          navigate("/representative/detail");
        } else if (role === "Candidate") {
          navigate("/candidate/detail");
        }
      }
    });
  };


  export default Logout;