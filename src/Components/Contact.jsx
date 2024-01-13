import { useState } from 'react';

function Contact () {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submittedList, setSubmittedList] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };



  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const validatePhoneNumber = (value) => {
    // Validate if the entered value is a number and has exactly 11 digits
    return /^\d{11}$/.test(value);
  };


  const validateName = (value) => {
    // Validate if the name has a length between 3 and 40 characters
    return value.length >= 3 && value.length <= 40;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate name and phone number format
    if (validateName(name) && validatePhoneNumber(phone)) {
      // Add the current form state to the submittedList
      setSubmittedList((prevList) => [...prevList, { name, phone }]);
      
      alert(`Name: ${name}\nPhone Number: ${phone}`);
      // Clear the input fields after submission
      setName('');
      setPhone('');
    } else {
      // If invalid, show an alert
      alert('Please enter a valid name (between 3 and 40 characters) and a valid 11-digit phone number.');
    }
  };

  return (
    <div>
      <h1>Vite React Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Fullname: 
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
         <br /><br />
         <label>
          Phone Number: 
          <input type="text" value={phone} onChange={handlePhoneChange} />
        </label>   

        <br /> <br />
        <button type="submit">Submit</button>
      </form>

      <hr />
      <br />

      <h2>Submitted List:</h2>
      <ul>
        {submittedList.map((item, index) => (
          <li key={index}>{`Name: ${item.name}, Phone: ${item.phone}`}</li>
        ))}
      </ul>

    </div>
  );
}

export default Contact;
