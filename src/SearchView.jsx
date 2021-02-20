import React from 'react'


 //function to sort by MaxCP
 function compareCP(a,b){
    const cp1 = a.MaxCP;
    const cp2 = b.MaxCP;

    let comparison = 0
    if(cp1 > cp2){
        comparison = -1
    } else if(cp1 < cp2){
        comparison = 1
    }
    return comparison
}

const SearchView = ({ check, firstFiltered, secondFiltered, userInput }) => {
    //variable
    let finalFiltered
    if(firstFiltered.length === 0 ){
        finalFiltered = 0
    }else if( secondFiltered === undefined){
        finalFiltered = undefined
    }else{
        finalFiltered = check ? firstFiltered.slice(0,4).sort(compareCP) : secondFiltered
    }
    const regex = new RegExp(userInput, 'gi')
    
    return (
       <>
        {finalFiltered === 0 ? <div className="loader"></div> : ''}
        {finalFiltered.length > 0 ? 
          <ul className="suggestions">
                {finalFiltered.map(item => {
                return (
                    <li key={item.Number}>
                        <img
                            src={`${item.img}`}
                            alt={`${item.Name}`}
                        />
                        <div className="info">
                            <h1 dangerouslySetInnerHTML={{ __html: item.Name.replace(regex, `<span class="hl">${userInput}</span>`)}}></h1>
                            <span className={`type ${item.Types[0].toLowerCase()}`} dangerouslySetInnerHTML={{ __html: item.Types[0].replace(regex, `<span class="hl">${userInput}</span>`)}}></span>
                            {item.Types[1] === undefined ? '' : <span className={`type ${item.Types[1].toLowerCase()}`} dangerouslySetInnerHTML={{ __html: item.Types[1].replace(regex, `<span class="hl">${userInput}</span>`)}}></span>}
                        </div>
                    </li>
                )
            })
        }
          </ul> 
        : 
        <ul className="suggestions">
              <li>
                <img src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png" alt="" />
                <div className="info">
                    <h1 className="no-results">
                        No results
                    </h1>
                </div>
            </li>
        </ul>
        }
      </>
    
)}

export default SearchView;