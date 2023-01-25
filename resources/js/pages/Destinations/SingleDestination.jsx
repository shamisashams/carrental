import "./Destinations.css";
//import Img1 from "../../assets/images/locations/4.png";
//import Img2 from "../../assets/images/locations/2.png";
//import Img3 from "../../assets/images/locations/3.png";
import React from "react";

import Layout from "@/Layouts/Layout";

const SingleDestination = ({seo}) => {
  return (
      <Layout seo={seo}>
          <div className="singleDestination wrapper">
              <div className="showcase img">
                  <img src="/client/assets/images/locations/4.png" alt="" />
              </div>
              <div className="container">
                  <h6>Destination Name</h6>
                  <p>
                      The landscape of Svaneti is dominated by mountains that are separated
                      by deep gorges. Most of the region which lies below 1,800 meters
                      (5,904 ft) above sea level is covered by mixed and coniferous forests.
                      The forest zone is made up of tree species such as spruce, fir, beech,
                      oak, and hornbeam. Other species that are less common but may still be
                      found in some areas include chestnut, birch, maple, pine and box. The
                      zone which extends from 1,800 meters to roughly about 3,000 meters
                  </p>
                  <div className="img">
                      <img src="/client/assets/images/locations/2.png" alt="" />
                  </div>
                  <p>
                      The landscape of Svaneti is dominated by mountains that are separated
                      by deep gorges. Most of the region which lies below 1,800 meters
                      (5,904 ft) above sea level is covered by mixed and coniferous forests.
                      The forest zone is made up of tree species such as spruce, fir, beech,
                      oak, and hornbeam. Other species that are less common but may still be
                      found in some areas include chestnut, birch, maple, pine and box. The
                      zone which extends from 1,800 meters to roughly about 3,000 meters
                  </p>
                  <p>
                      species such as spruce, fir, beech, oak, and hornbeam. Other species
                      that are less common but may still be found in some areas include
                      chestnut, birch, maple, pine and box. The zone which extends from
                      1,800 meters to roughly about 3,000 meters
                  </p>
                  <div className="img">
                      <img src="/client/assets/images/locations/3.png" alt="" />
                  </div>
                  <p>
                      The landscape of Svaneti is dominated by mountains that are separated
                      by deep gorges. Most of the region which lies below 1,800 meters
                      (5,904 ft) above sea level is covered by mixed and coniferous forests.
                      The forest zone is made up of tree species such as spruce, fir, beech,
                      oak, and hornbeam. Other species that are less common but may still be
                      found in some areas include chestnut, birch, maple, pine and box. The
                      zone which extends from 1,800 meters to roughly about 3,000 meters
                  </p>
                  <p>
                      species such as spruce, fir, beech, oak, and hornbeam. Other species
                      that are less common but may still be found in some areas include
                      chestnut, birch, maple, pine and box. The zone which extends from
                      1,800 meters to roughly about 3,000 meters
                  </p>
              </div>
          </div>
      </Layout>

  );
};

export default SingleDestination;
