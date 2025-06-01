
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import '../css/contact.css'
import Footer from '../component/Footer';
import { toast } from 'react-toastify';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_9xqg9ds', 'template_cnu9e0s', form.current, {
        publicKey: 'cW2whLa58hH9GHc-C',
      })
      .then(
        () => {
          toast.success('successfully sent')
        },
        (error) => {
          toast.error(error)
        },
      );
  };

  return (
<>
    <form ref={form} onSubmit={sendEmail} className='contactForm'>
   <h1>Get Contact</h1>
      <div className='nameDiv' >
      <label className='namesLabel'>Name</label>
      <input className='namesInput' type="text" name="name" required />
      </div>
      <div  className='emailsDiv'>
      <label  className='emailsLabel' >Email</label>
      <input className='emailsInput' type="email" name="email" required />
      </div>
      <div  className='messagesDiv'>
      <label  className='messagesLabel'>Message</label>
      <textarea  className='messagesInput' name="message" required />
      <input className='sendsBtn' type="submit" value="Send"  />
      </div>
    </form>
    <Footer />
    </>
  );
};
export default Contact
