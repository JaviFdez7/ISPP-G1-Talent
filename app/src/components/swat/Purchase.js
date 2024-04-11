import Swal from "sweetalert2";

const Purchase = (confirmPayment, navigate, role, paymentMethod, subscriptionPlan) => {
    Swal.fire({
      title: `You are about to change your plan to "${subscriptionPlan}". Do you want to proceed?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      confirmButtonColor: "var(--talent-highlight)",
      denyButtonColor: "var(--talent-black)",
      background: "var(--talent-secondary)",
      color: "white",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmPayment(paymentMethod);
        navigate("/");
        Swal.fire({
          title: "Subscription succesfully changed",
          icon: "success",
          background: "var(--talent-secondary)",
          color: "white",
          confirmButtonColor: "var(--talent-highlight)",
        });
      } else if (result.isDenied) {
        if (role === "Representative") {
          navigate("/representative/subscription");
        } else if (role === "Candidate") {
          navigate("/candidate/subscription");
        }
      }
    });
  };


  export default Purchase;