import "./About.css";
import React from "react";
//import Img1 from "../../assets/images/other/2.png";
import Layout from "@/Layouts/Layout";

const About = ({seo}) => {
  return (
      <Layout seo={seo}>
          <div className="wrapper aboutPage ">
              <img src="/client/assets/images/other/2.png" alt="" />
              <h3>About us</h3>
              <p>
                  The landscape of Svaneti is dominated by mountains that are separated by
                  deep gorges. Most of the region which lies below 1,800 meters (5,904 ft)
                  above sea level is covered by mixed and coniferous forests. The forest
                  zone is made up of tree species such as spruce, fir, beech, oak, and
                  hornbeam. Other species that are less common but may still be found in
                  some areas include chestnut, birch, maple, pine and box. The zone which
                  extends from 1,800 meters to roughly about 3,000 meters
              </p>
              <p>
                  The landscape of Svaneti is dominated by mountains that are separated by
                  deep gorges. Most of the region which lies below 1,800 meters (5,904 ft)
                  above sea level is covered by mixed and coniferous forests. The forest
                  zone is made up of tree species such as spruce, fir, beech, oak, and
                  hornbeam. Other species that are less common but may still be found in
                  some areas include chestnut, birch, maple, pine and box. The zone which
                  extends from 1,800 meters to roughly about 3,000 meters
              </p>
          </div>
      </Layout>

  );
};

export default About;
