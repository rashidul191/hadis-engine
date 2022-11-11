import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allHadis, setAllHadis] = useState({});
  const [findHadis, setFindHadis] = useState([]);

  useEffect(() => {
    const url = "hadis.json";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAllHadis(data);
      });
  }, []);

  // let userText = "অসুখে";
  // let userText = "দায়িত্বের";
  // const map = new Map(Object.entries(allHadis));
  // let hadisArray = map.get(userText);
  // console.log(hadisArray);

  const map = new Map(Object.entries(allHadis));

  const find = (event) => {
    event.preventDefault();
    let userText = event.target.search.value;
    let words = userText.split(" ");
    const hadisSet = new Set();
    for(let i=0; i<words.length; i++){
      let word = words[i];
      let hadisArray = map.get(word);
      for(let j=0; j<hadisArray.length; j++){
        let tag = hadisArray[j];
        hadisSet.add(tag);
      }
    }
    console.log(hadisSet);
    let hadisArray = Array.from(hadisSet);
    setFindHadis(hadisArray);
  };

  return (
    <div className="App">
      <h2>Hadis Engine</h2>
      <form onSubmit={find}>
        <input name="search" type={"text"}></input>
        <input type="submit" value="Search" />
      </form>
      {findHadis?.map(
        (hadis) => (
          <ul key={hadis.key}>
            <li >{hadis}</li>
          </ul>
        )

        // {
        //   console.log(hadis);
        // }
      )}
    </div>
  );
}

export default App;
