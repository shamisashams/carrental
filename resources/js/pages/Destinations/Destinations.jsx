import "./Destinations.css";
//import Img1 from "../../assets/images/other/3.png";
import { destinations, tags } from "../../components/Data";
import {
  DestinationBox,
  Hashtag2,
  Pagination,
} from "../../components/Shared/Shared";

import React from "react";
import Layout from "@/Layouts/Layout";
import {usePage, Link} from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import {CgChevronLeft, CgChevronRight} from "react-icons/cg";

const Destinations = ({seo}) => {

    const { localizations, destinations, categories } = usePage().props;

    let appliedFilters = [];
    let urlParams = new URLSearchParams(window.location.search);

    urlParams.forEach((value, index) => {
        appliedFilters[index] = value.split(",");
    });


    function removeA(arr) {
        var what,
            a = arguments,
            L = a.length,
            ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    const handleFilterClick = function (event, code, value) {
        //Inertia.visit('?brand=12');
        delete appliedFilters['page'];
        console.log(event);
        if (event === false) {
            if (appliedFilters.hasOwnProperty(code)) {
                appliedFilters[code].push(value);
            } else appliedFilters[code] = [value];
        } else {
            if (appliedFilters[code].length > 1)
                removeA(appliedFilters[code], value.toString());
            else delete appliedFilters[code];
        }

        let params = [];

        for (let key in appliedFilters) {
            params.push(key + "=" + appliedFilters[key].join(","));
        }

        Inertia.visit("?" + params.join("&"));
    };

    let links = function (links) {
        let rows = [];
        //links.shift();
        //links.splice(-1);
        {
            links.map(function (item, index) {
                if (index > 0 && index < links.length - 1) {
                    rows.push(
                        <Link
                            href={item.url}
                            className={
                                item.active
                                    ? "active"
                                    : ""
                            }
                        >
                            {item.label}
                        </Link>
                    );
                }
            });
        }
        return rows.length > 1 ? rows : null
    };

    let linksPrev = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[0].url}>

                    <CgChevronLeft />

            </Link>
        ) : null;
    };
    let linksNext = function (links) {
        let rowCount = 0;
        links.map(function (item, index) {
            if (index > 0 && index < links.length - 1) {
                rowCount++;
            }
        });
        return rowCount > 1 ? (
            <Link href={links[links.length - 1].url}>
                <CgChevronRight />
            </Link>
        ) : null;
    };


    return (
      <Layout seo={seo}>
          <div className="destinationPage wrapper">
              <div className="flex title">
                  <img src="/client/assets/images/other/3.png" alt="" />
                  <div>
                      <h3>{__('client.destination_header',localizations)}</h3>
                      <div>
                          {__('client.destination_text',localizations)}
                      </div>
                  </div>
              </div>
              <div className="right">
                  <div className="tags">
                      {categories.map((tag, index) => {

                          let checked;

                          if (appliedFilters.hasOwnProperty('tag')) {
                              if (
                                  appliedFilters['tag'].includes(
                                      tag.id.toString()
                                  )
                              ) {
                                  checked = true;
                              } else checked = false;
                          } else checked = false;


                          return <Hashtag2 key={index} text={tag.title} onClick={(e)=>{
                             handleFilterClick(checked,'tag',tag.id);
                          }} active={checked} />;
                      })}
                  </div>
                  <div className="destinationGrid">
                      {destinations.data.map((item, index) => {
                          return (
                              <DestinationBox
                                  key={index}
                                  link={route('client.destination.show',item.slug)}
                                  img={item.latest_image?item.latest_image.file_full_url:null}
                                  title={item.title}
                                  para={item.short_description}
                              />
                          );
                      })}
                  </div>
                  {/*<Pagination />*/}

                  <div className="pagination flex center">
                      {/*<button>
                          <CgChevronLeft />
                      </button>
                      <button className="active">1</button>
                      <button>2</button>
                      <button>3</button>
                      <button>
                          <CgChevronRight />
                      </button>*/}
                      {linksPrev(destinations.links)}{links(destinations.links)}{linksNext(destinations.links)}
                  </div>
              </div>
          </div>
      </Layout>

  );
};

export default Destinations;
