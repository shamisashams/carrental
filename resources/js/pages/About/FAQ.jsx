import "./About.css";
import React from "react";
import Layout from "@/Layouts/Layout";
import {usePage} from "@inertiajs/inertia-react";

const FAQ = ({seo}) => {

    const { faqs, localizations } = usePage().props;

  const questions = [
    {
      q: "What credentials are compulsory?",
      a: "A valid driver’s license and identity card (or passport).",
    },
    {
      q: "Do I need to have an international driver’s license?",
      a: "The presence of an international driver’s license is not mandatoryif your local license contains a translation in the Latin alphabet.",
    },
    {
      q: "What if I’ve forgotten my driver’s license or ID?",
      a: "Regardless of the country, you will still need to present your driver’s license and identity documentation. All up mentioned documents are mandatory.",
    },
    {
      q: "What if my driver’s license or ID card expires soon?",
      a: "To rent a car you require valid documentation. The expiration date of your driver’s license or identity documentation should be valid amid the rental period.",
    },
    {
      q: "What are the age limitations?",
      a: "Restrictions related to the age of the tenant must be checked in advance in the local office of the company at your rental location.",
    },
    {
      q: "What if I’ve forgotten my driver’s license or ID?",
      a: "Regardless of the country, you will still need to present your driver’s license and identity documentation. All up mentioned documents are mandatory.",
    },
  ];
  return (
      <Layout seo={seo}>
          <div className=" faqPage ">
              <div className="wrapper">
                  <h3>{__('client.faq_header',localizations)}</h3>
                  {faqs.map((item, index) => {
                      return (
                          <div key={index} className="qna">
                              <h6>{item.question}</h6>
                              <div>{item.answer}</div>
                          </div>
                      );
                  })}
              </div>
          </div>
      </Layout>

  );
};

export default FAQ;
