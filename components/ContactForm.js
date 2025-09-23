import { useEffect, useState, useRef, useCallback } from 'react'
import { useFormspark } from '@formspark/use-formspark'
import Button from './Button'

const FORMSPARK_FORM_ID = "bLTRpGY7"

export default function ContactForm() {
    const [formStatus, setFormStatus] = useState('init')
    const formRef = useRef()
    const [submit, submitting] = useFormspark({ formId: FORMSPARK_FORM_ID});
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    })

    const handleSubmit = async (e) => {
      e.preventDefault();
      await submit(formData);
      setFormStatus('sent')
    };
  
    const handleChange = useCallback(
      (type) => (event) => {
        setFormData({ ...formData, [type]: event.target.value });
      },
      [formData]
    );

    return (
        <form ref={formRef} id="contactForm" onSubmit={handleSubmit}>
            <div className="form-row mb-3">
                <div className="form-group col-md-6">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" id="name" placeholder="" required onChange={handleChange('name')} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" className="form-control" name="email" id="email" placeholder="" required onChange={handleChange('email')} />
                </div>
            </div>
            <div className="form-row mb-3">
                <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone <span className="font-weight-light">(optional)</span></label>
                    <input type="tel" className="form-control" name="phone" id="phone" placeholder="" onChange={handleChange('phone')} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="company">Company <span className="font-weight-light">(optional)</span></label>
                    <input type="text" className="form-control" name="company" id="company" placeholder="" onChange={handleChange('company')} />
                </div>
            </div>
            <div className="form-group mb-5">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" name="message" id="message" placeholder="" rows="4" required onChange={handleChange('message')}></textarea>
            </div>
            {
                formStatus === 'sent'
                ? <div className="h6 text-uppercase text-success">Thanks! We'll be in touch soon</div>
                : <Button text="Send Message" type="normal" />
            }
        </form>
    )
}