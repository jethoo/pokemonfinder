import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './App.css';
import SearchView from './SearchView'

const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const App = () => {
    const [ fetchedResult, setfetchedResult] = useState([])
    const [ check, setCheck ] = useState(false)
    const [ firstFilter, setfirstFilter ] = useState([])
    const [ secondFilter, setsecondFilter ] = useState([])
    const [ userEntered, setuserEntered ] = useState([])
    //variables
    
    useEffect(() => {
        (async () => {
            //fetching the data
            const res = await Axios.get(URL_PATH);
            setfetchedResult(res.data)
        })();
    }, []);
    
    //function for sorting by Name
    function compareName(a,b){
        // converting to uppercase to have case-insensitive comparison
        const name1 = a.Name.toLowerCase();
        const name2 = b.Name.toLowerCase();

        let comparison = 0
        if(name1 > name2){
            comparison = 1
        } else if(name1 < name2){
            comparison = -1
        }
        return comparison
    }

    //function to sort by Types
    function compareTypes(a,b){
        //will only take the first value of Types
        const type1 = a.Types[0].toLowerCase();
        const type2 = b.Types[0].toLowerCase();

        let comparison = 0
        if(type1 > type2){
            comparison = 1
        } else if(type1 < type2){
            comparison = -1
        }
        return comparison
    }
    
    const findMatch = event => {
        let userInput = (event.target.value).toLowerCase()
        //setting the state of user input
        setuserEntered(userInput)

        //filtering when user inputs character
        let filteredObjects = fetchedResult.filter(item => item.Types[1] !== undefined ? (item.Types[0].toLowerCase().includes(userInput) || item.Types[1].toLowerCase().includes(userInput) || item.Name.toLowerCase().includes(userInput)) : (item.Types[0].toLowerCase().includes(userInput) || item.Name.toLowerCase().includes(userInput)))
        setfirstFilter(filteredObjects)

        //reducing search results to 4
        let filteredFour = filteredObjects.length > 4 ? filteredObjects.slice(0,4) : filteredObjects 
        
        let sortedByNameorType

        filteredFour.map(item => {
            return item.Name.toLowerCase().includes(userInput) ?
            sortedByNameorType = filteredFour.sort(compareName) :
            sortedByNameorType = filteredFour.sort(compareTypes)
        })
        //set the state with four results
        setsecondFilter(sortedByNameorType);
    }

    return (
        <> 
            <label htmlFor="maxCP" className="max-cp">
                <input type="checkbox" id="maxCP" onClick={() => setCheck(!check)} />
                <small>
                    Maximum Combat Points
                </small>
            </label>
            <input type="text" className="input" placeholder="Pokemon or type" onChange={findMatch}/>
            <SearchView check={check} firstFiltered={firstFilter} secondFiltered={secondFilter} userInput={userEntered}/>
        </>
    )
}
export default App;
