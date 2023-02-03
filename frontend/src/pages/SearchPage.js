import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import AdventureBanner from "../components/Adventure/AdventureBanner";
import SimpleUserBanner from "./../components/Profile/SimpleUserBanner";


function SearchComponent(props) {


  let TOKEN = useSelector((state) => state.token)
  let URL = useSelector((state) => state.url)
  const searchType = props.searchType

  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    // 유저 검색
    console.log(searchType)
    if (searchType === 'users') {
      axios({
        url: URL + '/users/search',
        method: 'get',
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
        params: {
          nickname : search
        }
      })
      .then((res)=> {
        setResult(res.data.result)
        console.log(res)
      })
      .catch((err) => {console.log(err)})

    } // 탐험 검색
    else if (searchType === 'adventures')
    {
      axios({
        url: URL + '/adventures/search',
        method: 'get',
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
        params: {
          keyword : search
        }
      })
      .then((res)=> {
        setResult(res.data.result)
      })
      .catch((err) => {console.log(err)})
    }
  }, [search])


  return (
    <div>
      <input type="text" value={search} onChange={onChange} /> 
      <div>
        {searchType === 'users' 
        ? result.map((user) => {
          return <SimpleUserBanner data={user}/>
        }) 
        : result.map((adventure) => {
        return <AdventureBanner data={adventure}/>})
        }
      </div>
    </div>
  )
}

export default SearchComponent