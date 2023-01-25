import "./Destinations.css";
//import Img1 from "../../assets/images/other/3.png";
import { destinations, tags } from "../../components/Data";
import {
  DestinationBox,
  Hashtag,
  Pagination,
} from "../../components/Shared/Shared";

import React from "react";
import Layout from "@/Layouts/Layout";
import {usePage} from "@inertiajs/inertia-react";

const Destinations = ({seo}) => {

    const { localizations } = usePage().props;

  return (
      <Layout seo={seo}>
          <div className="destinationPage wrapper">
              <div className="flex title">
                  <img src="/client/assets/images/other/3.png" alt="" />
                  <div>
                      <h3>{__('client.destination_header',localizations)}</h3>
                      <div>
                          Regardless of the country, you will still need to present your
                          driver’s license and identity documentation. All up mentioned
                          documents are mandatory.
                      </div>
                  </div>
              </div>
              <div className="right">
                  <div className="tags">
                      {tags.map((tag, index) => {
                          return <Hashtag key={index} text={tag} />;
                      })}
                  </div>
                  <div className="destinationGrid">
                      {destinations.map((item, index) => {
                          return (
                              <DestinationBox
                                  key={index}
                                  link={route('client.destination.show','test')}
                                  img={item.img}
                                  title={item.title}
                                  para={item.para}
                              />
                          );
                      })}
                  </div>
                  <Pagination />
              </div>
          </div>
      </Layout>

  );
};

export default Destinations;
