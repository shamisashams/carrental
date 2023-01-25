import "./Payment.css";
//import Tbc from "../../assets/images/banks/1.png";
//import Bog from "../../assets/images/banks/2.png";
//import Paypal from "../../assets/images/banks/3.png";
import { MdDownload } from "react-icons/md";
//import Car5 from "../../assets/images/cars/5.png";
import { ImLocation2, ImLocation } from "react-icons/im";

const Payment = () => {
  return (
    <div className="paymentPage wrapper flex">
      <div className="gray_box large">
        <h3>Choose a payment method</h3>
        <button>
          <img src="/client/assets/images/banks/1.png" alt="" />
        </button>
        <button>
          <img src="/client/assets/images/banks/2.png" alt="" />
        </button>
        <button>
          <img src="/client/assets/images/banks/3.png" alt="" />
        </button>
        <button>
          <h5>Download pdf</h5> <MdDownload />
        </button>
      </div>
      <div className="smalls">
        <div className="gray_box">
          <h5>Volkswagen Golf 2019</h5>
          <img src="/client/assets/images/cars/5.png" alt="" />
        </div>
        <div className="gray_box">
          <h5>Booking information</h5>
          <div className="flex">
            <div>Pick up</div>
            <div>December 14, 2022</div>
            <div>10:25</div>
          </div>
          <p>
            {" "}
            <ImLocation2 /> 522 Junkins Avenue. Tbilisi, Georgia{" "}
          </p>
          <div className="flex">
            <div>Drop off</div>
            <div>December 23, 2022</div>
            <div>10:25</div>
          </div>
          <p>
            {" "}
            <ImLocation2 /> 522 Junkins Avenue. Tbilisi, Georgia{" "}
          </p>
        </div>
        <div className="gray_box">
          <h5>Pay now</h5>
          <div className="flex">
            <div>Prepayment x 9 days</div>
            <div>810$</div>
          </div>
          <div className="flex">
            <div>Insurance</div>
            <div>12$</div>
          </div>
          <div className="flex">
            <div>Pay at the counter</div>
            <div>25$</div>
          </div>
          <div className="flex last">
            <h5>Total:</h5>
            <h5 style={{ color: "#FF715A" }}>847$</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
