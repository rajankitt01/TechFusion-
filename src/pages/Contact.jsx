import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/common/Button';
import { Mail, Phone, MapPin, CheckCircle2, Clock, ExternalLink, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function Contact() {
  const initialForm = {
    firstName: '',
    lastName: '',
    businessEmail: '',
    phoneNumber: '',
    service: 'Website & Web App Development',
    budget: '',
    projectDetails: '',
    _gotcha: '',
  };

  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required.';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required.';
    }
    if (!formData.businessEmail.trim()) {
      errors.businessEmail = 'Business Email is required.';
    } else {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (!emailRegex.test(formData.businessEmail.trim())) {
        errors.businessEmail = 'Please enter a valid business email address.';
      }
    }
    if (!formData.service.trim()) {
      errors.service = 'Primary Service is required.';
    }
    if (formData.budget.trim() && formData.budget.trim().length > 100) {
      errors.budget = 'Project budget must be 100 characters or less.';
    }
    if (!formData.projectDetails.trim()) {
      errors.projectDetails = 'Project Details & Technical Goals are required.';
    } else if (formData.projectDetails.trim().length < 10) {
      errors.projectDetails = 'Please provide at least 10 characters describing your project.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormStatus('submitting');
    setErrorMessage('');

    const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'e8dfe3b2-c10a-428b-b1d1-a44f96876a3a';

    try {
      let isSuccess = false;

      // 1. Direct Web3Forms delivery to rajankitt01@gmail.com
      if (web3FormsKey) {
        const payload = {
          access_key: web3FormsKey,
          subject: `New Project Inquiry — ${formData.firstName} ${formData.lastName}`,
          from_name: `${formData.firstName} ${formData.lastName} [TechFusion]`,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.businessEmail,
          replyto: formData.businessEmail,
          'First Name': formData.firstName,
          'Last Name': formData.lastName,
          'Business Email': formData.businessEmail,
          'Phone Number': formData.phoneNumber || 'Not provided',
          'Primary Service Required': formData.service,
          'Project Budget': formData.budget,
          'Project Details & Technical Goals': formData.projectDetails,
          botcheck: formData._gotcha,
        };

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json().catch(() => null);
        if (response.ok && result?.success) {
          isSuccess = true;
        } else {
          console.warn('Web3Forms response:', result);
        }
      }

      // 2. Fallback to /api/contact endpoint (Resend backend)
      if (!isSuccess) {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json().catch(() => null);
        if (response.ok && result?.success) {
          isSuccess = true;
        }
      }

      if (isSuccess) {
        setFormStatus('success');
        setFormData(initialForm);
      } else {
        setFormStatus('error');
        setErrorMessage('Unable to send your inquiry right now. Please try again or contact us directly.');
      }
    } catch (err) {
      setFormStatus('error');
      setErrorMessage('Unable to send your inquiry right now. Please try again or contact us directly.');
    }
  };

  const handleReset = () => {
    setFormStatus('idle');
    setErrorMessage('');
    setFormErrors({});
    setFormData(initialForm);
  };

  return (
    <PageWrapper>
      {/* Editorial Hero */}
      <section className="bg-[#F7F8FA] tech-subtle-grid py-10 md:py-12 lg:py-14 border-b border-[#E2E7EF] text-left">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EEF3FF] border border-[#C9D7F5] text-xs font-mono font-bold tracking-wider text-[#0B1220] mb-4 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1677FF]"></span>
              <span>// DIRECT TECHNICAL SCOPING</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight leading-[1.15] mb-4">
              Let's Discuss Your Product Architecture & Milestones
            </h1>

            <p className="text-base sm:text-lg text-[#2B384E] leading-relaxed">
              Connect directly with our engineering team. Whether you need a technical audit, a new software MVP, or enterprise cloud scaling, we're ready to review your requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid: Details + Form */}
      <section className="py-10 md:py-12 lg:py-14 bg-[#F1F4F8] border-b border-[#E2E7EF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 text-left">
            
            {/* Left Column: Contact Channels & Location (5 cols) */}
            <div className="lg:col-span-5 space-y-5 md:space-y-6">
              <div>
                <span className="text-xs font-mono text-[#0B1220] font-bold uppercase tracking-wider block mb-2">
                  // CONTACT CHANNELS
                </span>
                <h2 className="text-2xl font-bold text-[#0B1220] mb-4">
                  Headquarters & Inquiries
                </h2>
                <p className="text-sm text-[#2B384E] leading-relaxed">
                  We maintain strict NDA privacy standards. All inquiries are reviewed directly by technical leads, not automated sales pipelines.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] flex items-start gap-4 shadow-[0_4px_20px_rgba(17,24,39,0.04)] transition-all duration-200 group">
                  <div className="h-10 w-10 rounded-lg bg-[#EEF3FF] border border-[#C9D7F5] flex items-center justify-center text-[#0B1220] group-hover:text-[#1677FF] shrink-0 transition-colors duration-200">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono text-[#0B1220] font-bold uppercase tracking-wider">Direct Phone</h3>
                    <a href="tel:+919341660370" className="text-base font-bold text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200 mt-0.5 block">
                      +91 93416 60370
                    </a>
                    <span className="text-[11px] text-[#2B384E]">Mon - Fri, 9:00 AM - 6:00 PM IST</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] flex items-start gap-4 shadow-[0_4px_20px_rgba(17,24,39,0.04)] transition-all duration-200 group">
                  <div className="h-10 w-10 rounded-lg bg-[#EEF3FF] border border-[#C9D7F5] flex items-center justify-center text-[#0B1220] group-hover:text-[#1677FF] shrink-0 transition-colors duration-200">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono text-[#0B1220] font-bold uppercase tracking-wider">Engineering Email</h3>
                    <a href="mailto:rajankitt01@gmail.com" className="text-base font-bold text-[#0B1220] group-hover:text-[#1677FF] transition-colors duration-200 mt-0.5 block">
                      rajankitt01@gmail.com
                    </a>
                    <span className="text-[11px] text-[#2B384E]">Response within 24 business hours</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] flex items-start gap-4 shadow-[0_4px_20px_rgba(17,24,39,0.04)] transition-all duration-200 group">
                  <div className="h-10 w-10 rounded-lg bg-[#EEF3FF] border border-[#C9D7F5] flex items-center justify-center text-[#0B1220] group-hover:text-[#1677FF] shrink-0 transition-colors duration-200">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono text-[#0B1220] font-bold uppercase tracking-wider">Corporate Office</h3>
                    <p className="text-sm font-semibold text-[#0B1220] mt-0.5 leading-snug">
                      Tower A, 3rd Floor, Unitech Cyber Park,<br />
                      Sector 39, Gurugram, Haryana, India
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2E7EF] hover:border-[#BFDBFE] hover:bg-[#F8FAFF] flex items-start gap-4 shadow-[0_4px_20px_rgba(17,24,39,0.04)] transition-all duration-200 group">
                  <div className="h-10 w-10 rounded-lg bg-[#EEF3FF] border border-[#C9D7F5] flex items-center justify-center text-[#0B1220] group-hover:text-[#1677FF] shrink-0 transition-colors duration-200">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono text-[#0B1220] font-bold uppercase tracking-wider">Operating Standards</h3>
                    <p className="text-xs text-[#2B384E] mt-0.5 leading-relaxed">
                      Agile sprint cycles with 24/7 critical incident response on production enterprise SLAs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Confidentiality Box */}
              <div className="p-4 rounded-lg bg-[#EEF3FF] border border-[#C9D7F5] flex items-center gap-3 text-xs font-mono text-[#2B384E] shadow-2xs">
                <ShieldCheck className="h-4 w-4 text-[#1677FF] shrink-0" />
                <span>Mutual Non-Disclosure Agreement (NDA) provided upon request.</span>
              </div>
            </div>

            {/* Right Column: Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2E7EF] p-8 md:p-10 shadow-[0_4px_20px_rgba(17,24,39,0.04)]">
                <span className="text-xs font-mono text-[#0B1220] font-bold uppercase tracking-wider block mb-1">
                  // PROJECT INQUIRY FORM
                </span>
                <h3 className="text-xl font-bold text-[#0B1220] mb-6">
                  Tell Us About Your Project Requirements
                </h3>

                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="h-16 w-16 rounded-full bg-[#EEF3FF] border border-[#C9D7F5] text-[#1677FF] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-bold text-[#0B1220]">Inquiry Submitted Successfully</h4>
                    <p className="text-sm text-[#2B384E] max-w-md mx-auto">
                      Thank you for your project inquiry. Your information has been received successfully. Our team will contact you shortly.
                    </p>
                    <div className="pt-4">
                      <Button onClick={handleReset} variant="outline" size="sm">
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5 text-xs font-mono">
                    {errorMessage && (
                      <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-sans flex items-start gap-2.5">
                        <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Honeypot anti-spam field hidden from human users */}
                    <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                      <input 
                        type="text" 
                        name="_gotcha" 
                        tabIndex={-1} 
                        autoComplete="off" 
                        value={formData._gotcha} 
                        onChange={handleChange} 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="firstName" className="block text-[#0B1220] mb-1.5 font-bold">FIRST NAME *</label>
                        <input 
                          type="text" 
                          id="firstName" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-3.5 py-2.5 bg-[#F7F8FA] border rounded-lg text-[#0B1220] placeholder-[#7A8494] focus:outline-none focus:bg-[#FFFFFF] text-xs font-sans transition-colors duration-200 ${
                            formErrors.firstName ? 'border-red-500 focus:border-red-500' : 'border-[#E2E7EF] focus:border-[#1677FF]'
                          }`}
                          placeholder="John" 
                        />
                        {formErrors.firstName && (
                          <p className="text-red-500 text-[11px] font-sans mt-1">{formErrors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-[#0B1220] mb-1.5 font-bold">LAST NAME *</label>
                        <input 
                          type="text" 
                          id="lastName" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-3.5 py-2.5 bg-[#F7F8FA] border rounded-lg text-[#0B1220] placeholder-[#7A8494] focus:outline-none focus:bg-[#FFFFFF] text-xs font-sans transition-colors duration-200 ${
                            formErrors.lastName ? 'border-red-500 focus:border-red-500' : 'border-[#E2E7EF] focus:border-[#1677FF]'
                          }`}
                          placeholder="Doe" 
                        />
                        {formErrors.lastName && (
                          <p className="text-red-500 text-[11px] font-sans mt-1">{formErrors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="businessEmail" className="block text-[#0B1220] mb-1.5 font-bold">BUSINESS EMAIL *</label>
                        <input 
                          type="email" 
                          id="businessEmail" 
                          name="businessEmail"
                          value={formData.businessEmail}
                          onChange={handleChange}
                          className={`w-full px-3.5 py-2.5 bg-[#F7F8FA] border rounded-lg text-[#0B1220] placeholder-[#7A8494] focus:outline-none focus:bg-[#FFFFFF] text-xs font-sans transition-colors duration-200 ${
                            formErrors.businessEmail ? 'border-red-500 focus:border-red-500' : 'border-[#E2E7EF] focus:border-[#1677FF]'
                          }`}
                          placeholder="john@company.com" 
                        />
                        {formErrors.businessEmail && (
                          <p className="text-red-500 text-[11px] font-sans mt-1">{formErrors.businessEmail}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phoneNumber" className="block text-[#0B1220] mb-1.5 font-bold">PHONE NUMBER</label>
                        <input 
                          type="tel" 
                          id="phoneNumber" 
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-[#E2E7EF] rounded-lg text-[#0B1220] placeholder-[#7A8494] focus:outline-none focus:bg-[#FFFFFF] focus:border-[#1677FF] text-xs font-sans transition-colors duration-200" 
                          placeholder="+1 (555) 000-0000" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="service" className="block text-[#0B1220] mb-1.5 font-bold">PRIMARY SERVICE REQUIRED *</label>
                        <select 
                          id="service" 
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className={`w-full px-3.5 py-2.5 bg-[#F7F8FA] border rounded-lg text-[#0B1220] font-medium focus:outline-none focus:bg-[#FFFFFF] text-xs font-sans transition-colors duration-200 ${
                            formErrors.service ? 'border-red-500 focus:border-red-500' : 'border-[#E2E7EF] focus:border-[#1677FF]'
                          }`}
                        >
                          <option>Website & Web App Development</option>
                          <option>Mobile App Development (iOS & Android)</option>
                          <option>E-commerce Platform & Checkout</option>
                          <option>Admin Panels & Enterprise CRM</option>
                          <option>Cloud Workflow & Business Automation</option>
                          <option>AI API & Intelligent Systems</option>
                          <option>Comprehensive Architecture Audit</option>
                        </select>
                        {formErrors.service && (
                          <p className="text-red-500 text-[11px] font-sans mt-1">{formErrors.service}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="budget" className="block text-[#0B1220] mb-1.5 font-bold">PROJECT BUDGET</label>
                        <input 
                          type="text" 
                          id="budget" 
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className={`w-full px-3.5 py-2.5 bg-[#F7F8FA] border rounded-lg text-[#0B1220] focus:outline-none focus:bg-[#FFFFFF] text-xs font-sans transition-colors duration-200 ${
                            formErrors.budget ? 'border-red-500 focus:border-red-500' : 'border-[#E2E7EF] focus:border-[#1677FF]'
                          }`}
                        />
                        {formErrors.budget && (
                          <p className="text-red-500 text-[11px] font-sans mt-1">{formErrors.budget}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="projectDetails" className="block text-[#0B1220] mb-1.5 font-bold">PROJECT DETAILS & TECHNICAL GOALS *</label>
                      <textarea 
                        id="projectDetails" 
                        name="projectDetails"
                        rows={4} 
                        value={formData.projectDetails}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 bg-[#F7F8FA] border rounded-lg text-[#0B1220] placeholder-[#7A8494] focus:outline-none focus:bg-[#FFFFFF] text-xs font-sans leading-relaxed transition-colors duration-200 ${
                          formErrors.projectDetails ? 'border-red-500 focus:border-red-500' : 'border-[#E2E7EF] focus:border-[#1677FF]'
                        }`}
                        placeholder="Briefly describe your product goals, technical stack preferences, target timeline, or current challenges..." 
                      />
                      {formErrors.projectDetails && (
                        <p className="text-red-500 text-[11px] font-sans mt-1">{formErrors.projectDetails}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full gap-2" 
                      size="lg" 
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Project Inquiry</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Google Map Section (Preserved & Styled) */}
      <section className="relative h-72 md:h-96 w-full bg-[#EEF2F7] border-t border-[#E2E7EF] overflow-hidden">
        <iframe
          title="TechFusion Corporate Headquarters - Unitech Cyber Park, Gurugram"
          src="https://maps.google.com/maps?q=Unitech+Cyber+Park+Tower+A+Sector+39+Gurugram+Haryana+India&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating Headquarters Info Badge */}
        <div className="absolute top-6 left-6 z-10 hidden sm:block max-w-sm bg-[#FFFFFF]/95 backdrop-blur-md p-5 rounded-xl border border-[#E2E7EF] shadow-lg text-left">
          <div className="flex items-center space-x-2 text-[#0B1220] mb-2 font-bold">
            <MapPin className="h-4 w-4 shrink-0 text-[#1677FF]" />
            <span className="text-xs font-mono uppercase tracking-wider">Corporate Headquarters</span>
          </div>
          <p className="text-[#0B1220] font-medium text-xs leading-relaxed mb-3">
            Tower A, 3rd Floor, Unitech Cyber Park, Sector 39, Gurugram, Haryana, India
          </p>
          <a
            href="https://maps.google.com/?q=Unitech+Cyber+Park+Tower+A+Sector+39+Gurugram+Haryana+India"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-semibold text-[#0B1220] hover:text-[#1677FF] transition-colors duration-200 group"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
          </a>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Contact;
