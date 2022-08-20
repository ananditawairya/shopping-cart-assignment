import React, { useContext, useState, useEffect } from "react";
import "./Home.scss";
import Button from "../../utilities/Button/Button";
import { Context } from "../../context/Contexts";
import {Link} from "react-router-dom"
function Home() {
  const { categoryData,setCategorySelection,setLastState } = useContext(Context);
  const [banner, setBanner] = useState(null);
  const [bannerCount,setBannerCount]=useState(1)
  
  useEffect(() => {
    fetch(`http://localhost:3010/banners`)
      .then((res) => res.json())
      .then((data) => {
        data.sort(function (a, b) {
          return a.order - b.order;
        });
        setBanner(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const slideNumber=(num)=>{
    if(bannerCount===1 && num < 0) setBannerCount(banner?.length)
    else if(bannerCount===banner?.length && num>0) setBannerCount(1)
    else setBannerCount(bannerCount+num)
  }

  const currentSlide=(number)=>{
      setBannerCount(number)
  }

  const handleButtonClick=(dataId)=>{
    setCategorySelection((prev)=>({...prev,[dataId]:true}))
    setLastState(dataId)
  }

  return (
    <div className="home_container">
      <div className="home_page">
        <div className="slideshow_container">

          <button className="prev" onClick={()=>slideNumber(-1)}>Prev</button>


          {banner?.map((data) => {
            if (data.isActive) {
              return (
                
                <div className={`my_slides fade ${data.order===bannerCount ? 'visible' : 'hidden'}`} key={data.id}>
                  <img
                    src={data.bannerImageUrl}
                    alt={data.bannerImageAlt}
                    className="banner_image"
                    style={{ width: "100%" }}
                  />
                </div>

              );
            }
          })}

        <div style={{ textAlign: "center" }}>
            {banner?.map((data) => {
              if (data.isActive) {
                return (
                    <span className="dot" onClick={()=>currentSlide(data.order)} key={data.id}></span>
                 );
              }
            })}
          </div>

          <button className="next" onClick={()=>slideNumber(1)}>Next</button>
        </div>


        <div className="category_data">
          {categoryData?.map((data) => {
            if (data.order > 0) {
              if (data.order % 2 !== 0)
                return (
                  <article key={data.id} className="category_card">
                    <img
                      src={`${data.imageUrl}`}
                      alt={data.name}
                      className="category_image"
                    ></img>
                    <div className="category_item_details">
                      <h1 className="category_name">{data.name}</h1>
                      <p className="category_description">{data.description}</p>
                      <Link to={`/plp/${data.id}`}>
                      <Button
                        className="category_action"
                        buttonText={`Explore ${data.key}`}
                        handleButtonClick={()=>handleButtonClick(data.id)}
                      />
                      </Link>
                    </div>
                  </article>
                );
              else {
                return (
                  <article key={data.id} className="category_card">
                    <div className="category_item_details">
                      <h1 className="category_name">{data.name}</h1>
                      <p className="category_description">{data.description}</p>
                      <Link to={`/plp/${data.id}`}>
                      <Button
                        className="category_action"
                        buttonText={`Explore ${data.key}`}
                        handleButtonClick={()=>handleButtonClick(data.id)}
                      />
                      </Link>
                    </div>
                    <img
                      src={`${data.imageUrl}`}
                      alt={data.name}
                      className="category_image"
                    ></img>
                  </article>
                );
              }
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
