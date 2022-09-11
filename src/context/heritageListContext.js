import { createContext, useEffect, useState } from "react";

export const HeritageListContext = createContext();

export const HeritageListContextProvider = (props) =>{
    const [list,setList] = useState([]);
    const [error,isError] = useState(false)
    useEffect(()=>{
        const fetchData = async ()=>{
          try{
            const response = await fetch("https://raw.githubusercontent.com/avijit-source/json-worldheritage/gh-pages/newbook.json");
            const res= await response.json();
            const sorted = res.sort((a, b) => {
              const nameA = a.descTitleTxt.trim().toUpperCase(); // ignore upper and lowercase
              const nameB = b.descTitleTxt.trim().toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
               return 0;
            });
            setList(sorted);
          }catch(e){
             isError(true);
             console.log(e);
          }

        };
        fetchData()
      },[])
      if(error){
        return <h2>
          sorry could not fetch data
        </h2>
      }
    return <HeritageListContext.Provider value={list}>
              {props.children}
    </HeritageListContext.Provider>
}

