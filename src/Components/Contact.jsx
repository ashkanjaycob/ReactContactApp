import { useState , useEffect  } from 'react';
import Styles from '../Components/Contact.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone , faEnvelope , faXmark } from '@fortawesome/free-solid-svg-icons';

function Contact () {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submittedList, setSubmittedList] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }


  const validatePhoneNumber = (value) => {
    // Validate if the entered value is a number and has exactly 11 digits
    return /^\d{11}$/.test(value);
  };


  const validateName = (value) => {
    // Validate if the name has a length between 3 and 40 characters
    return value.length >= 3 && value.length <= 40;
  };


  const validateEmail = (value) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
  


  useEffect(() => {
    // Load submittedList from localStorage on component mount
    const storedList = JSON.parse(localStorage.getItem('submittedList'));
    if (storedList) {
      setSubmittedList(storedList);
    }
  }, []);

  const saveToLocalStorage = (list) => {
    // Save submittedList to localStorage
    localStorage.setItem('submittedList', JSON.stringify(list));
  };


    // with no save to local storage 
    // const handleRemoveCard = (index) => {
    //   if (window.confirm('Are you sure you want to remove this contact?')) {
    //     const updatedList = [...submittedList];
    //     updatedList.splice(index, 1);
    //     setSubmittedList(updatedList);
    //   }
    // };

    const handleRemoveCard = (index) => {
      if (window.confirm('Are you sure you want to remove this contact?')) {
        const updatedList = [...submittedList];
        updatedList.splice(index, 1);
        setSubmittedList(updatedList);
        saveToLocalStorage(updatedList);
      }
    };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateName(name) && validatePhoneNumber(phone) && validateEmail(email)) {
      const updatedList = [...submittedList, { name, phone, email }];
      setSubmittedList(updatedList);
      saveToLocalStorage(updatedList);
      
      alert("contact saved !");
      // Clear the input fields after submission
      setName('');
      setPhone('');
      setEmail('');
    } else {
      // If invalid, show an alert
      alert('Please enter a valid name (between 3 and 40 characters) and a valid 11-digit phone number and a valid email and try again.');
    }
    
  };


  return (
    <>
    <div className={Styles.container}>
      <h1>Contact Form by Ashkan</h1>
      <hr />
      <form onSubmit={handleSubmit} className={Styles.form}>
        <label>
          Fullname: 
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
         <br /><br />
         <label>
          Phone Number: 
          <input type="text" value={phone} onChange={handlePhoneChange} />
        </label>

          <label>
          Email : 
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>     

        <br /> <br />
        <button type="submit">Submit</button>
      </form>

      <hr />
      <br />

      <h2>Submitted List:</h2>
      <div className={Styles.cardContainer}>
        {submittedList.map((item, index) => (
          <div key={index} className={Styles.card}>
            <h2>Name: {item.name}</h2>
            <h3> <FontAwesomeIcon className={Styles.icon} icon={faPhone} />  {item.phone}</h3>
            <h3> <FontAwesomeIcon className={Styles.icon} icon={faEnvelope} />  {item.email}</h3>
            <FontAwesomeIcon className={Styles.iconClose} icon={faXmark} onClick={() => handleRemoveCard(index)} />
          </div>
        ))}
      </div>
    </div>      
    </>
  );
}

export default Contact;
