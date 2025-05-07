import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './ContactForm.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    guestCount: '',
    date: '',
    eventType: '',
    needConsultation: false
  });



  return (

    <div className="contact-form-container">
      <h2>LIÊN HỆ ĐẶT TIỆC</h2>

      <p className="instruction-text">
        Quý khách vui lòng điền thông tin để được liên hệ và tư vấn đặt tiệc ngay hôm nay!
      </p>

      <form >
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Nhập họ và tên"
              value={formData.name}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="guestCount"
              placeholder="Chọn số lượng khách"
              value={formData.guestCount}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
            />
          </div>

          <div className="form-group">
            <input
              type="date"
              name="date"
              placeholder="dd/mm/yyyy"
              value={formData.date}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="location"
              placeholder="Địa chỉ tổ chức sự kiện"
              value={formData.location}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="eventType"
              placeholder="Loại sự kiện"
              value={formData.eventType}
            />
          </div>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            name="needConsultation"
            id="needConsultation"
            checked={formData.needConsultation}
          />
          <label htmlFor="needConsultation">
            Nhận tư vấn trọn gói sự kiện(MC, ánh sáng, sân khấu,...)
          </label>
        </div>

        <div className="submit-container">
          <button type="submit" className="submit-button">Gửi thông tin ngay</button>
        </div>
      </form>
    </div>

  );

}

export default ContactForm;