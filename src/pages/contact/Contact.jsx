import React, { useRef, useState } from "react";
import { CiPhone } from "react-icons/ci";
import { AiOutlineMail, AiOutlineTwitter } from "react-icons/ai";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { HiHome, HiChevronRight } from "react-icons/hi";

const Contact = () => {
   const formRef = useRef();
   const [loading, setLoading] = useState(true);

   const sendEmail = (e) => {
      e.preventDefault();
      setLoading(true);
      emailjs
         .sendForm(
            "service_rn5uwdh",
            "template_z55djla",
            formRef.current,
            "onCf_FZuuuG_27Kb_"
         )
         .then(
            (result) => {
               console.log(result.text);
               toast.success("Feedback Recorded. We will Contact you shortly");
            },
            (error) => {
               console.log(error.text);
               toast.error("Something went Wrong , Please try again later");
            }
         );
      setLoading(false);
      e.target.reset(); // clear input fields
   };

   return (
      <>
         <nav className="bg-secondary py-4 md:py-6 shadow-md" aria-label="Breadcrumb">
            <div className="w-full mx-auto px-4 lg:w-9/12 md:px-6">
               <ol className="flex flex-wrap items-center space-x-2 md:space-x-4">
                  <li className="flex items-center">
                     <Link to="/" className="flex items-center text-primary hover:text-accent transition-colors duration-200">
                        <HiHome className="w-5 h-5 mr-1" />
                        <span className="text-sm md:text-base font-medium">Home</span>
                     </Link>
                  </li>
                  <li className="flex items-center">
                     <HiChevronRight className="w-4 h-4 text-primary" />
                     <span className="ml-2 text-sm md:text-base font-medium text-accent">Contact</span>
                  </li>
               </ol>
            </div>
         </nav>

         <main className="w-full mx-auto px-2 lg:w-9/12 md:px-6 mt-4 lg:mt-6 flex flex-col md:flex-row justify-between gap-10">
            <section className="w-full  md:w-[30rem] bg-primary rounded-lg p-6 h-72">
               {/* Card */}
               <div className="mb-10">
                  <h1 className="text-xl md:text-3xl mb-2">
                     Contact Information
                  </h1>
                  <p className="md:text-lg">
                     Fill the form or contact us via other channels
                  </p>
               </div>
               <div>
                  <div className="flex items-center gap-2 my-2 md:text-xl">
                     <AiOutlineMail />
                     <a href="mailto: sahilchandel4200@gmail.com?subject=Feedback&body=message">
                        Support@woodsindica.com
                     </a>
                  </div>
                  <div className="flex items-center gap-2  my-2 md:text-xl">
                     <CiPhone />
                     <a href="tel:+91-123-12345">78763-18945</a>
                  </div>
                  <div className="flex items-center gap-2 md:text-xl  my-2">
                     <AiOutlineTwitter />
                     <a
                        href=""
                        rel="noreferrer"
                        target="_blank"
                     >
                        @sikander
                     </a>
                  </div>
               </div>
            </section>
            <section className="w-full md:w-2/3 rounded-lg bg-primary shadow-lg  p-6">
               {/* Form */}
               <h1 className="text-xl md:text-3xl">Contact Us</h1>
               <form
                  className="form-control"
                  onSubmit={sendEmail}
                  ref={formRef}
               >
                  <div className="py-2">
                     <label className="label-text md:font-semibold mb-2 block text-lg">
                        Name :
                     </label>
                     <input
                        className="input input-bordered max-w-lg text-gray-600 w-full border-2"
                        type="text"
                        placeholder="Full Name"
                        required
                        name="username"
                     />
                  </div>
                  <div className="py-2">
                     <label className="label-text md:font-semibold mb-2 block text-lg">
                        Email :
                     </label>
                     <input
                        className="input input-bordered text-gray-600 max-w-lg w-full border-2"
                        type="email"
                        placeholder="Active Email"
                        required
                        name="email"
                     />
                  </div>
                  <div className="py-2">
                     <label className="label-text md:font-semibold mb-2 block text-lg">
                        Subject :
                     </label>
                     <input
                        className="input input-bordered text-gray-600 max-w-lg w-full border-2"
                        type="text"
                        placeholder="Subject"
                        required
                        name="subject"
                     />
                  </div>
                  <div className="py-2">
                     <label className="label-text md:font-semibold mb-2 block text-lg">
                        Message :
                     </label>
                     <textarea
                        className="textarea text-lg textarea-bordered text-gray-600 max-w-[100%] w-full"
                        rows={5}
                        required
                        name="message"
                     ></textarea>
                  </div>
                  <button className="btn max-w-xs w-full" type="submit">
                     Send Message
                  </button>
               </form>
            </section>
         </main>
      </>
   );
};

export default Contact;