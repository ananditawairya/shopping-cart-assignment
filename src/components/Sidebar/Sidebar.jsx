import React, { useContext, useState } from "react";
import { Context } from "../../context/Contexts";
import {Link,useParams} from "react-router-dom"
import "./Sidebar.scss";
function Sidebar() {
  const { categoryData,categorySelection,setCategorySelection,lastState,setLastState} = useContext(Context);
  const {id} = useParams()
  const [openSidebar,setOpenSidebar]= useState(false);

  const handleFilter=(dataId)=>{
 
    if (dataId in categorySelection && lastState===dataId) {
      setCategorySelection((prev)=>({...prev,[dataId]:!categorySelection[dataId]}))
    }
    else{
      setCategorySelection((prev)=>({...prev,[dataId]:true}))
    }
    lastState===dataId ? setLastState(null): setLastState(dataId)
}

const buttonName=id && categorySelection[id] ? categoryData.filter((data)=> data.id===id )[0]?.name : categoryData[0]?.name 
  return (
    <div className="category_list">
      <button className="side_mob_button" onClick={() => setOpenSidebar( prevState => !prevState)}>{buttonName}</button>
      {
        categoryData?.map(
        (data) =>
          <Link to={`/plp/${data.id}`} key={data.id} className={`sidebar_link ${openSidebar ? "side_menu_item" : ""}`}>
            <div  className={`category_list_item ${(data.id===id && categorySelection[data?.id]) ?'active' : 'inactive' }`} onClick={()=>handleFilter(data.id)}>{data.name}</div>
          </Link>
      )}
    </div>
  );
}

export default Sidebar;
